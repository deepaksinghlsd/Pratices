import { db, auth } from "./firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  doc,
  getDocs,
  writeBatch,
  
} from "firebase/firestore";

// Get user-specific task collection reference
const getUserTaskCollection = (userId) => collection(db, "users", userId, "tasks");

//  Add a new task
export const addTask = async (taskTitle, userId) => {
  if (!userId || !taskTitle.trim()) return;

  const timestamp = new Date().toISOString();
  await addDoc(getUserTaskCollection(userId), {
    title: taskTitle,
    userId: userId,
    completed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
};

// Fetch tasks (real-time updates)
export const fetchTasks = (userId, setTasks) => {
  if (!userId) return;

  const q = query(getUserTaskCollection(userId));

  return onSnapshot(q, (snapshot) => {
    const tasksData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksData);
  });
};

// Update a task
export const updateTask = async (taskId, newTaskTitle, userId) => {
  if (!taskId || !newTaskTitle.trim() || !userId) return;

  const taskRef = doc(db, "users", userId, "tasks", taskId);
  await updateDoc(taskRef, {
    title: newTaskTitle,
    updatedAt: new Date().toISOString(),
  });
};

// Toggle task completion
export const toggleTaskCompletion = async (taskId, completed, userId) => {
  if (!taskId || !userId) return;

  const taskRef = doc(db, "users", userId, "tasks", taskId);
  await updateDoc(taskRef, { completed, updatedAt: new Date().toISOString() });
};

//  Delete a single task
export const deleteTask = async (taskId, userId) => {
  if (!taskId || !userId) return;

  const taskRef = doc(db, "users", userId, "tasks", taskId);
  await deleteDoc(taskRef);
};

// Delete all tasks for a user
export const deleteAllTasks = async (userId) => {
  if (!userId) return;

  try {
    const taskCollection = getUserTaskCollection(userId);
    const snapshot = await getDocs(taskCollection);

    const batch = writeBatch(db);

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log("Successfully deleted all user tasks");
  } catch (error) {
    console.error("Error deleting user tasks:", error);
    throw error;
  }
};

//  Disable all tasks for a user
// export const disableAllTasks = async (userId) => {
//   if (!userId) return;

//   try {
//     const taskCollection = getUserTaskCollection(userId);
//     const snapshot = await getDocs(taskCollection);
//     const batch = writeBatch(db);

//     snapshot.docs.forEach((taskDoc) => {
//       batch.update(taskDoc.ref, { disabled: true });
//     });

//     await batch.commit();
//     console.log("All tasks disabled successfully");
//   } catch (error) {
//     console.error("Error disabling tasks:", error);
//     throw error;
//   }
// };

// // Disable user account (instead of deleting)
// export const disableUserAccount = async () => {
//   try {
//     const user = auth.currentUser;
//     if (!user) throw new Error("No user is currently signed in");

//     const userDocRef = doc(db, "users", user.uid);
//     const userDocSnap = await getDoc(userDocRef);

//     if (!userDocSnap.exists()) {
//       // If user document doesn't exist, create it with "disabled" status
//       await setDoc(userDocRef, {
//         email: user.email,
//         createdAt: new Date().toISOString(),
//         disabled: true,
//         disabledAt: new Date().toISOString(),
//       });
//       console.log("User document was missing, so it was created and disabled.");
//     } else {
//       // Otherwise, update the existing document
//       await updateDoc(userDocRef, {
//         disabled: true,
//         disabledAt: new Date().toISOString(),
//         lastLoginAt: deleteField(),
//       });
//       console.log("User account flagged as disabled in Firestore.");
//     }

//     // Disable all tasks for this user
//     await disableAllTasks(user.uid);

//     // Sign out the user
//     // await auth.signOut();
//     console.log("User signed out successfully.");
//   } catch (error) {
//     console.error("Error disabling account:", error.message);
//     throw error;
//   }
// };

// Check if user has tasks
const getUserTaskCount = async (userId) => {
  const taskCollection = getUserTaskCollection(userId);
  const snapshot = await getDocs(taskCollection);
  return snapshot.size; // Returns the number of tasks
};

// Delete user account only if there are no tasks
export const deleteUserAccount = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is currently signed in");
      return;
    }

    const taskCount = await getUserTaskCount(user.uid);

    if (taskCount > 0) {
      console.warn(`User has ${taskCount} tasks. Cannot delete account.`);
      return { success: false, message: `You have ${taskCount} tasks. Please delete them first.` };
    }

    // Proceed with user deletion
    await user.delete();
    console.log("User account deleted successfully");

    return { success: true, message: "Account deleted successfully." };
  } catch (error) {
    console.error("Error deleting account:", error.message);
    return { success: false, message: error.message };
  }
};