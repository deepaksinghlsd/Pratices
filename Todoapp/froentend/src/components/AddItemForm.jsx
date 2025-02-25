import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddItemForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      alert("Please enter a name and select an image.");
      return;
    }

    setLoading(true);

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Save data in Firestore
      await addDoc(collection(db, "items"), { name, imageUrl });

      alert("Item added successfully!");
      setName("");
      setImage(null);
    } catch (error) {
      console.error("Error adding item:", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg w-96">
      <h2 className="text-lg font-semibold mb-3">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
