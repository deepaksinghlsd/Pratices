import { useState, useRef, useEffect } from "react";
import { storage, auth } from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FileUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [metadata, setMetadata] = useState({ title: "" });
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleTitleChange = (e) => {
    setMetadata((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleUpload = async () => {
    if (!file || !auth.currentUser || !metadata.title) return;

    const userId = auth.currentUser.uid;
    const fileRef = ref(storage, `uploads/${userId}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file, {
      customMetadata: {
        title: metadata.title,
        userId,
        uploadedAt: new Date().toISOString(),
      },
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onUploadSuccess(downloadURL, metadata);
        setFile(null);
        setPreview(null);
        setMetadata({ title: "" });
        setProgress(0);
      }
    );
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        className="mb-2"
      />
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover mb-2" />}
      <input
        type="text"
        placeholder="Title"
        value={metadata.title}
        onChange={handleTitleChange}
        className="border p-2 rounded-md w-full mb-2"
      />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded-md">
        Upload
      </button>
      {progress > 0 && <p>Uploading: {Math.round(progress)}%</p>}
    </div>
  );
};

export default FileUploader;
