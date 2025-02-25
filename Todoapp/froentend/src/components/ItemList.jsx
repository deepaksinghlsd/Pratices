import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Stored Items</h1>
      <ul className="grid gap-4 grid-cols-2">
        {items.map((item) => (
          <li key={item.id} className="border p-2 rounded-lg shadow-lg bg-white">
            <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded" />
            <p className="text-center font-semibold mt-2">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
