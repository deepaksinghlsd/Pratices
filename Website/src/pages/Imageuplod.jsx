import { useState, useEffect } from "react";
// import{auth} from "../firebase/auth"
import { storage, db } from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

const FirebaseImageHandler = () => {
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState({ title: "", description: "" });
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);

  // Function to handle metadata input changes
  const handleInputChange = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  // Function to upload image with metadata
  const handleUpload = async () => {
    if (!image || !metadata.title || !metadata.description) {
      alert("Please select an image and enter metadata!");
      return;
    }

    const imageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

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

        // Store metadata in Firestore
        await addDoc(collection(db, "images"), {
          title: metadata.title,
          description: metadata.description,
          imageName: image.name,
          url: downloadURL,
          timestamp: new Date(),
        });

        setMetadata({ title: "", description: "" });
        setImage(null);
        setProgress(0);
        fetchImages(); // Refresh images list
      }
    );
  };

  // Fetch images & metadata from Firestore
  const fetchImages = async () => {
    const querySnapshot = await getDocs(collection(db, "images"));
    const imageList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setImages(imageList);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Function to delete image & metadata
  const handleDelete = async (imageId, imageName) => {
    try {
      // Delete image from Firebase Storage
      const storageRef = ref(storage, `images/${imageName}`);
      await deleteObject(storageRef);

      // Delete metadata from Firestore
      await deleteDoc(doc(db, "images", imageId));

      setImages(images.filter((img) => img.id !== imageId));
      alert("Image and metadata deleted successfully!");
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Image Gallery Manager</h2>
      
      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Upload New Image</h3>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      {image ? image.name : "Click to upload"}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => setImage(e.target.files[0])} 
                  />
                </label>
              </div>
            </div>
            
            <div className="w-full sm:w-2/3 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={metadata.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Image title"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={metadata.description}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Image description"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div>
            {progress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
                {/* <p className="text-xs text-gray-500 mt-1">Upload progress: {Math.round(progress)}%</p> */}
              </div>
            )}
            
            <button
              onClick={handleUpload}
              disabled={!image || !metadata.title || !metadata.description}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>
      
      {/* Images Gallery */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-gray-700">Image Gallery</h3>
        
        {images.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No images uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div key={img.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105">
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1 truncate">{img.title}</h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{img.description}</p>
                  
                  <div className="flex space-x-2">
                    <a 
                      href={img.url} 
                      download 
                      className="flex-1 text-center text-sm bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition-colors"
                    >
                      Download
                    </a>
                    <button 
                      onClick={() => handleDelete(img.id, img.imageName)} 
                      className="flex-1 text-center text-sm bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FirebaseImageHandler;