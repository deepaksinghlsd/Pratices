import { db } from "./firebaseConfig";
import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot, query, where } from "firebase/firestore";

export const addTask = async (task, userId) => {
  if (!userId) return;
  await addDoc(collection(db, "tasks"), { task, completed: false, userId, createdAt: Date.now() });
};

export const fetchTasks = (userId, setTasks) => {
  if (!userId) return;
  const q = query(collection(db, "tasks"), where("userId", "==", userId));

  return onSnapshot(q, (snapshot) => {
    const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTasks(tasksData); // ✅ Fix: Tasks now load properly on refresh
  });
};

export const updateTask = async (taskId, newTask, setTasks) => {
  if (!taskId || !newTask) return;
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, { task: newTask });

  // ✅ Fix: Ensure task updates instantly in UI
  setTasks((prevTasks) =>
    prevTasks.map((task) => (task.id === taskId ? { ...task, task: newTask } : task))
  );
};

export const toggleTaskCompletion = async (taskId, completed) => {
  if (!taskId) return;
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, { completed });
};

export const deleteTask = async (taskId, setTasks) => {
  if (!taskId) return;
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);

  // ✅ Fix: Ensure task is removed from UI instantly
  setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
};
