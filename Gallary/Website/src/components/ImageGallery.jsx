import React, { useEffect, useState } from "react";
import { storage, auth } from "../firebase/firebaseConfig";
import { ref, listAll, getDownloadURL, deleteObject, uploadBytesResumable, getMetadata } from "firebase/storage";

const ImageGallery = ({ refreshTrigger = 0, onDeletePerformed, onUpdatePerformed }) => {
  const [media, setMedia] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      fetchMedia();
    }
  }, [userId, refreshTrigger]);

  const fetchMedia = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const userFolderRef = ref(storage, `uploads/${userId}/`);
      const fileList = await listAll(userFolderRef);
      const mediaList = await Promise.all(
        fileList.items.map(async (fileRef) => {
          try {
            const url = await getDownloadURL(fileRef);
            const metadata = await getMetadata(fileRef);
            return {
              id: fileRef.name,
              name: fileRef.name,
              url,
              filePath: fileRef.fullPath,
              title: metadata.customMetadata?.title || "No Title",
              uploadTime: new Date(metadata.customMetadata?.uploadedAt || metadata.timeCreated).toLocaleDateString(),
              type: fileRef.name.toLowerCase().match(/\.(mp4|mov|avi|wmv)$/) ? "video" : "image",
            };
          } catch (error) {
            console.error("Error fetching metadata:", error);
            return null;
          }
        })
      );
      
      // Sort by upload time (newest first)
      const sortedMedia = mediaList.filter(Boolean).sort((a, b) => {
        return new Date(b.uploadTime) - new Date(a.uploadTime);
      });
      
      setMedia(sortedMedia);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (filePath, fileName) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    
    try {
      await deleteObject(ref(storage, filePath));
      setMedia((prev) => prev.filter((item) => item.filePath !== filePath));
      if (onDeletePerformed) onDeletePerformed(fileName, filePath);
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file. Please try again.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please upload an image (JPEG, PNG, GIF) or video (MP4, MOV).");
        event.target.value = null;
        return;
      }
      
      if (file.size > maxSize) {
        alert("File is too large. Maximum size is 10MB.");
        event.target.value = null;
        return;
      }
      
      setNewFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleUpdateFile = async () => {
    if (!newFile && !newTitle) {
      alert("Please select a new file or update the title");
      return;
    }
    
    try {
      if (newFile) {
        // If a new file is selected, delete the old one and upload the new one
        const fileRef = ref(storage, editingFile);
        await deleteObject(fileRef);
        
        const fileName = newFile.name;
        const newFileRef = ref(storage, `uploads/${userId}/${fileName}`);
        
        const uploadTask = uploadBytesResumable(newFileRef, newFile, {
          customMetadata: { 
            title: newTitle || fileName,
            uploadedAt: new Date().toISOString(),
          },
        });
        
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Upload error:", error);
            alert("Update failed. Please try again.");
            setUploadProgress(0);
          },
          async () => {
            await fetchMedia();
            setEditingFile(null);
            setNewFile(null);
            setPreviewURL(null);
            setNewTitle("");
            setShowModal(false);
            setUploadProgress(0);
            if (onUpdatePerformed) onUpdatePerformed(fileName, newFileRef.fullPath);
          }
        );
      } else {
        // If only the title is changed, update the metadata
        const fileRef = ref(storage, editingFile);
        const metadata = await getMetadata(fileRef);
        const fileName = editingFile.split('/').pop();
        
        // Create new file reference with the same content but updated metadata
        const newFileRef = ref(storage, editingFile);
        
        // Get the file content
        const url = await getDownloadURL(fileRef);
        const response = await fetch(url);
        const blob = await response.blob();
        
        // Upload with new metadata
        const uploadTask = uploadBytesResumable(newFileRef, blob, {
          customMetadata: {
            ...metadata.customMetadata,
            title: newTitle,
          },
        });
        
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Metadata update error:", error);
            alert("Title update failed. Please try again.");
            setUploadProgress(0);
          },
          async () => {
            await fetchMedia();
            setEditingFile(null);
            setPreviewURL(null);
            setNewTitle("");
            setShowModal(false);
            setUploadProgress(0);
            if (onUpdatePerformed) onUpdatePerformed(fileName, editingFile);
          }
        );
      }
    } catch (error) {
      console.error("File update failed:", error);
      alert("Update failed. Please try again.");
    }
  };

  const openModal = (item) => {
    setEditingFile(item.filePath);
    setPreviewURL(item.url);
    setNewTitle(item.title);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingFile(null);
    setNewFile(null);
    setPreviewURL(null);
    setNewTitle("");
    setUploadProgress(0);
  };

  // Filter media based on date and type
  const filteredMedia = media.filter(item => {
    const dateMatches = !filterDate || (item.uploadTime && item.uploadTime.includes(filterDate));
    const typeMatches = filterType === 'all' || item.type === filterType;
    return dateMatches && typeMatches;
  });

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Media Gallery</h2>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by date</label>
          <input 
            type="date" 
            onChange={(e) => setFilterDate(e.target.value)} 
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by type</label>
          <select 
            onChange={(e) => setFilterType(e.target.value)} 
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="all">All Media</option>
            <option value="image">Images Only</option>
            <option value="video">Videos Only</option>
          </select>
        </div>
      </div>
      
      {/* Gallery */}
      {isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your media...</p>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No media found. Try uploading some files or adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="relative h-48 bg-gray-100">
                {item.type === "video" ? (
                  <video 
                    className="w-full h-full object-cover cursor-pointer" 
                    onClick={() => openModal(item)}
                  >
                    <source src={item.url} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover cursor-pointer" 
                    onClick={() => openModal(item)} 
                  />
                )}
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${item.type === 'video' ? 'bg-purple-500' : 'bg-blue-500'} text-white`}>
                    {item.type}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800 truncate">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">Uploaded: {item.uploadTime}</p>
                <div className="flex space-x-2 mt-3">
                  <button 
                    onClick={() => openModal(item)} 
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(item.filePath, item.name)} 
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Update Media</h3>
              
              {/* Preview */}
              <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
                {previewURL && (
                  newFile && newFile.type.startsWith('video') ? (
                    <video controls className="w-full h-64 object-contain">
                      <source src={previewURL} type={newFile.type} />
                    </video>
                  ) : (
                    <img src={previewURL} alt="Preview" className="w-full h-64 object-contain" />
                  )
                )}
              </div>
              
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a title for this media"
                />
              </div>
              
              {/* File Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Replace with new file (optional)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*, video/mp4, video/quicktime"
                  className="w-full border border-gray-300 p-2 rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              
              {/* Progress Bar */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">{Math.round(uploadProgress)}% uploaded</p>
                </div>
              )}
              
              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateFile}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  disabled={uploadProgress > 0 && uploadProgress < 100}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;