import { useState } from "react";
import { storage, db, auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { requestForToken } from "../firebase";

const UploadMedia = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const uploadFile = async () => {
    if (!file) return;
    const storageRef = ref(storage, `media/${auth.currentUser.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    const token = await requestForToken();
    
    await addDoc(collection(db, "media"), {
      title,
      url,
      type: file.type,
      createdAt: serverTimestamp(),
      userId: auth.currentUser.uid,
      fcmToken: token,
    });
  };

  return (
    <div>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};
export default UploadMedia;