import { useState, useEffect, useRef } from "react";
import { auth, storage } from "../firebase/firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  getMetadata,
  deleteObject,
} from "firebase/storage";

const FirebaseImageHandler = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [metadata, setMetadata] = useState({ title: "", description: "" });
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle metadata input
  const handleInputChange = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  // Reset form
  const resetForm = () => {
    setImage(null);
    setImagePreview(null);
    setMetadata({ title: "", description: "" });
    setProgress(0);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Upload Image with Metadata to Firebase Storage
  const handleUpload = async () => {
    if (!image || !metadata.title || !metadata.description || !auth.currentUser) {
      alert("Please select an image, enter metadata, and ensure you're logged in!");
      return;
    }

    setIsUploading(true);
    const userId = auth.currentUser.uid;
    console.log(userId);
    
    const imageRef = ref(storage, `images/${userId}/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image, {
      customMetadata: {
        userId,
        title: metadata.title,
        description: metadata.description,
        
      },
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
        setIsUploading(false);
      },
      async () => {
        resetForm();
        setIsUploading(false);
        fetchUserImages();
      }
    );
  };

  // Fetch only logged-in user's images from Firebase Storage
  const fetchUserImages = async () => {
    if (!auth.currentUser) return;
    
    const userId = auth.currentUser.uid;
    const userImagesRef = ref(storage, `images/${userId}`);

    try {
      const imageList = await listAll(userImagesRef);
      const imagePromises = imageList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        const metadata = await getMetadata(item);
        return {
          name: item.name,
          url,
          title: metadata.customMetadata?.title || "No Title",
          description: metadata.customMetadata?.description || "No Description",
        };
      });

      const userImages = await Promise.all(imagePromises);
      setImages(userImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchUserImages();
  },[]);

  // Delete Image
  const handleDelete = async (imageName) => {
    if (!auth.currentUser) return;

    const userId = auth.currentUser.uid;
    const imageRef = ref(storage, `images/${userId}/${imageName}`);

    try {
      await deleteObject(imageRef);
      setImages(images.filter((img) => img.name !== imageName));
      alert("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Image Manager</h2>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Upload New Image</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Image Preview */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
              ) : (
                <div className="text-center p-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-500">Image preview will appear here</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Image
              </label>
              <div className="flex items-center justify-center">
                <label className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input 
                    type="file" 
                    className="sr-only" 
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    accept="image/*"
                  />
                  <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Choose Image
                </label>
              </div>
              {image && (
                <p className="mt-2 text-sm text-gray-500 truncate">
                  Selected: {image.name}
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Metadata Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter a title for your image"
                value={metadata.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your image"
                value={metadata.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-24 resize-none"
              />
            </div>
            
            {progress > 0 && (
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-indigo-600">Upload Progress</span>
                  <span className="text-sm font-medium text-indigo-700">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}
            
            <div className="flex space-x-2 pt-4">
              <button
                onClick={handleUpload}
                disabled={isUploading || !image}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isUploading || !image
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload Image"}
              </button>
              {image && (
                <button
                  onClick={resetForm}
                  className="w-1/3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <h3 className="text-2xl font-semibold mb-6 text-gray-700">Your Images</h3>
      {images.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-lg text-gray-600">No images uploaded yet.</p>
          <p className="text-sm text-gray-500">Upload your first image to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img.name} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold truncate">{img.title}</h4>
                <p className="text-sm text-gray-600 h-12 overflow-hidden">{img.description}</p>
                <div className="flex justify-between mt-4">
                  <a 
                    href={img.url} 
                    download 
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    <svg className="-ml-0.5 mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </a>
                  <button 
                    onClick={() => handleDelete(img.name)} 
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                  >
                    <svg className="-ml-0.5 mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FirebaseImageHandler;