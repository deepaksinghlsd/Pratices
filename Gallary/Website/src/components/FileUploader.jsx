import { useState, useRef, useEffect } from "react";
import { storage, auth } from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";

const FileUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [metadata, setMetadata] = useState({ title: "" });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const compressImage = async (imageFile) => {
    try {
      const options = { 
        maxSizeMB: 1, 
        maxWidthOrHeight: 1920, 
        useWebWorker: true,
        onProgress: (progress) => console.log(`Compression progress: ${progress}%`)
      };
      return await imageCompression(imageFile, options);
    } catch (error) {
      console.error("Error compressing image:", error);
      setError("Failed to compress image. Using original file.");
      return imageFile;
    }
  };

  const handleFileChange = async (e) => {
    setError("");
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    await processFile(selectedFile);
  };

  const processFile = async (selectedFile) => {
    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
    const maxSize = 50 * 1024 * 1024; // 50MB max for videos
    
    if (!validTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload an image (JPEG, PNG, GIF) or video (MP4, MOV).");
      return;
    }
    
    if (selectedFile.size > maxSize) {
      setError("File is too large. Maximum size is 50MB for videos and 10MB for images.");
      return;
    }
    
    let processedFile = selectedFile;
    let previewURL = URL.createObjectURL(selectedFile);

    // Extract filename without extension for default title
    const defaultTitle = selectedFile.name.split('.').slice(0, -1).join('.') || selectedFile.name;
    setMetadata({ title: defaultTitle });

    if (selectedFile.type.startsWith("image/")) {
      if (selectedFile.size > 1024 * 1024) {
        // Only compress if larger than 1MB
        processedFile = await compressImage(selectedFile);
        previewURL = URL.createObjectURL(processedFile);
      }
    }

    setFile(processedFile);
    setPreview(previewURL);
  };

  const handleTitleChange = (e) => {
    setMetadata((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleUpload = async () => {
    if (!file || !auth.currentUser) {
      setError("Please select a file to upload");
      return;
    }
    
    if (!metadata.title.trim()) {
      setError("Please enter a title for your file");
      return;
    }

    setError("");
    setUploading(true);
    
    try {
      const userId = auth.currentUser.uid;
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = `${metadata.title.replace(/[^a-z0-9]/gi, '_')}_${timestamp}.${fileExtension}`;
      
      const fileRef = ref(storage, `uploads/${userId}/${uniqueFileName}`);
      const uploadTask = uploadBytesResumable(fileRef, file, {
        customMetadata: {
          title: metadata.title,
          userId,
          originalFileName: file.name,
          uploadedAt: new Date().toISOString(),
          fileType: file.type,
        },
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.error("Upload failed:", error);
          setError("Upload failed. Please try again.");
          setUploading(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            onUploadSuccess(downloadURL, {
              ...metadata,
              path: fileRef.fullPath,
              name: uniqueFileName,
              type: file.type.startsWith("image/") ? "image" : "video",
            });
            
            resetForm();
          } catch (error) {
            console.error("Error getting download URL:", error);
            setError("Upload completed but couldn't retrieve file URL.");
            setUploading(false);
          }
        }
      );
    } catch (error) {
      console.error("Error initiating upload:", error);
      setError("Failed to start upload. Please try again.");
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setMetadata({ title: "" });
    setProgress(0);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  // Calculate type badge and icon
  const getFileTypeInfo = () => {
    if (!file) return { icon: "📁", label: "No file" };
    
    if (file.type.startsWith("image/")) {
      return { icon: "🖼️", label: "Image", colorClass: "bg-blue-500" };
    } else if (file.type.startsWith("video/")) {
      return { icon: "🎬", label: "Video", colorClass: "bg-purple-500" };
    }
    
    return { icon: "📄", label: "File", colorClass: "bg-gray-500" };
  };

  const fileTypeInfo = getFileTypeInfo();

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Upload Media</h2>
      
      {/* Drag & Drop area */}
      <div 
        className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } ${file ? "bg-gray-50" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="space-y-3">
            <div className="text-5xl mb-2">📤</div>
            <p className="text-gray-600">Drag and drop your file here, or</p>
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              disabled={uploading}
            >
              Select File
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: JPG, PNG, GIF, MP4, MOV
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              {/* Preview container */}
              <div className="relative inline-block">
                {preview && file?.type.startsWith("image/") && (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-64 h-64 object-contain rounded-md border border-gray-200" 
                  />
                )}
                {preview && file?.type.startsWith("video/") && (
                  <video className="w-64 h-64 object-contain rounded-md border border-gray-200" controls>
                    <source src={preview} type={file.type} />
                  </video>
                )}
                <span 
                  className={`absolute top-2 right-2 ${fileTypeInfo.colorClass} text-white text-xs px-2 py-1 rounded-full`}
                >
                  {fileTypeInfo.label}
                </span>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>File: {file.name}</p>
              <p>Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>

            <button 
              onClick={() => resetForm()} 
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition text-sm"
              disabled={uploading}
            >
              Remove
            </button>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/gif,video/mp4,video/quicktime"
          className="hidden"
          disabled={uploading}
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md mb-4 border border-red-200">
          {error}
        </div>
      )}
      
      {/* Title input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          placeholder="Give your file a descriptive title"
          value={metadata.title}
          onChange={handleTitleChange}
          className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          disabled={uploading || !file}
        />
      </div>
      
      {/* Progress indicator */}
      {uploading && (
        <div className="mb-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Uploading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      )}
      
      {/* Upload button */}
      <button 
        onClick={handleUpload} 
        className={`w-full py-3 rounded-md font-medium transition ${
          !file || uploading 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUploader;