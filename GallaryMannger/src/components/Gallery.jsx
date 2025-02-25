import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchMedia = async () => {
      let q = query(collection(db, "media"), where("userId", "==", auth.currentUser.uid));
      if (filter !== "all") {
        q = query(q, where("type", "==", filter));
      }
      q = query(q, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      setMedia(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchMedia();
  }, [filter]);

  return (
    <div>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="image/png">Images</option>
        <option value="video/mp4">Videos</option>
      </select>
      {media.map((item) => (
        <div key={item.url}>{item.title}</div>
      ))}
    </div>
  );
};
export default Gallery;
