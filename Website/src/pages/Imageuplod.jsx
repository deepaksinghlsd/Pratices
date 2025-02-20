import { useState, useEffect } from "react";
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage";

const FirebaseImageHandler = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);

  const handleUpload = () => {
    if (!image) return;

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImages((prev) => [...prev, { name: image.name, url: downloadURL }]);
        setImage(null);
        setProgress(0);
      }
    );
  };

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, "images/");
      const result = await listAll(storageRef);
      const urls = await Promise.all(
        result.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { name: item.name, url };
        })
      );
      setImages(urls);
    };
    fetchImages();
  }, []);

  const handleDelete = async (imageName) => {
    const storageRef = ref(storage, `images/${imageName}`);
    try {
      await deleteObject(storageRef);
      setImages(images.filter((img) => img.name !== imageName));
      alert("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Image Upload</h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
          className="mb-4 p-2 border rounded-md w-full"
        />
        <button 
          onClick={handleUpload} 
          disabled={!image} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
        >
          Upload
        </button>
        {/* <p className="mt-2 text-gray-600">Progress: {progress > 0 ? `${progress}%` : "Not started"}</p> */}
      </div>
      
      <h3 className="text-xl font-semibold mt-6">Uploaded Images</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {images.map((img, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <img src={img.url} alt={`Uploaded ${index}`} className="w-40 h-40 object-cover rounded-md" />
            <div className="mt-2 flex space-x-2">
              <button 
                onClick={() => handleDelete(img.name)} 
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
              <a 
                href={img.url} 
                download 
                className="bg-green-500 text-white px-3 py-1 rounded-md"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirebaseImageHandler;
