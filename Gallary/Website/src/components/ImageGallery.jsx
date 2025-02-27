import React, { useEffect, useState } from "react";
import { storage, auth } from "../firebase/firebaseConfig";
import { ref, listAll, getDownloadURL, deleteObject, uploadBytesResumable, getMetadata } from "firebase/storage";

const ImageGallery = () => {
  const [media, setMedia] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedDate, setSelectedDate] = useState("");
  const [editingFile, setEditingFile] = useState(null);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      fetchMedia();
    }
  }, [userId, filterType, sortOrder, selectedDate]);

  const fetchMedia = async () => {
    if (!userId) return;
    
    const userFolderRef = ref(storage, `uploads/${userId}/`);
    const fileList = await listAll(userFolderRef);
    const mediaList = await Promise.all(
      fileList.items.map(async (fileRef) => {
        try {
          const url = await getDownloadURL(fileRef);
          const metadata = await getMetadata(fileRef);
          
          return {
            id: fileRef.name, // Using file name as ID
            url,
            filePath: fileRef.fullPath,
            uploadDate: metadata.customMetadata?.uploadedAt 
              ? new Date(metadata.customMetadata.uploadedAt) 
              : new Date(), // Default to now if metadata is missing
            fileType: /\.(mp4|mov|avi|mkv)$/.test(fileRef.name) ? "video" : "image",
            title: metadata.customMetadata?.title || "No Title",
          };
        } catch (error) {
          console.error("Error fetching metadata:", error);
          return null;
        }
      })
    );

    const filteredMedia = mediaList
      .filter(Boolean) // Remove any failed fetches
      .filter((item) => (filterType === "all" ? true : item.fileType === filterType))
      .filter((item) => (selectedDate ? item.uploadDate.toISOString().split("T")[0] === selectedDate : true))
      .sort((a, b) => (sortOrder === "asc" ? a.uploadDate - b.uploadDate : b.uploadDate - a.uploadDate));

    setMedia(filteredMedia);
  };

  const handleDelete = async (filePath) => {
    try {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
      setMedia((prev) => prev.filter((item) => item.filePath !== filePath));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleUpdateFile = async (oldFilePath, file) => {
    if (!file || !userId) return;

    try {
      const fileRef = ref(storage, oldFilePath);
      const uploadTask = uploadBytesResumable(fileRef, file, {
        customMetadata: { uploadedAt: new Date().toISOString(), title: file.name },
      });

      uploadTask.on(
        "state_changed",
        null,
        (error) => console.error("Upload error:", error),
        async () => {
          await fetchMedia();
          setEditingFile(null);
        }
      );
    } catch (error) {
      console.error("File update failed:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto mt-6">
      <div className="flex justify-between mb-4">
        <select onChange={(e) => setFilterType(e.target.value)} className="border p-2 rounded-md">
          <option value="all">All</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
        <input type="date" onChange={(e) => setSelectedDate(e.target.value)} className="border p-2 rounded-md" />
        <select onChange={(e) => setSortOrder(e.target.value)} className="border p-2 rounded-md">
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {media.map((item) => (
          <div key={item.id} className="border p-2 rounded-md shadow">
            <div onClick={() => setEditingFile(item.filePath)} className="cursor-pointer">
              {item.fileType === "image" ? (
                <img src={item.url} alt={item.title} className="w-full h-32 object-cover" />
              ) : (
                <video src={item.url} controls className="w-full h-32" />
              )}
            </div>
            <p className="text-sm text-gray-500">Uploaded: {item.uploadDate.toLocaleDateString()}</p>
            <div className="text-sm font-bold">{item.title}</div>
            {editingFile === item.filePath && (
              <input
                type="file"
                onChange={(e) => handleUpdateFile(item.filePath, e.target.files[0])}
                className="border mt-2 p-1 w-full rounded-md"
              />
            )}
            <button onClick={() => handleDelete(item.filePath)} className="bg-red-500 text-white p-2 rounded-md mt-2 w-full">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
