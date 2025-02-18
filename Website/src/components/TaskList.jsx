// import { useState, useEffect } from "react";
// import { fetchTasks, addTask } from "../firebase/firestore";
// import { auth } from "../firebase/firebaseConfig";
// import TaskItem from "./TaskItem";

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const unsubscribeTasks = fetchTasks(currentUser.uid, setTasks);
//         console.log(`feccting taskk ----> ${unsubscribeTasks}`);
        
//         return () => unsubscribeTasks();
//       }
//     });

//     return () => unsubscribeAuth();
//   }, []);

//   const handleAddTask = async () => {
//     if (newTask.trim() === "" || !user) return;
//     try {
//       console.log(`post task ${newTask} ${user.uid}`);
      
//       await addTask(newTask,user.uid).then().catch(
//         (error) => console.error(error)
//       );
//       console.log('post task successfully');
      
//       setNewTask("");
//     } catch (error) {
//       console.error(`error in post `)
//     }
//   };

//   if (!user) {
//     return <p className="text-center text-gray-500">Please log in to see your tasks.</p>;
//   }

//   return (
//     <div className="max-w-lg mx-auto p-4">
//       <h2 className="text-xl font-semibold mb-4">Your Task List</h2>
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           className="border p-2 w-full"
//           placeholder="Enter a task..."
//         />
//         <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add
//         </button>
//       </div>
//       <div className="bg-gray-100 p-4 rounded">
//         {tasks.length > 0 ? (
//           tasks.map((task) => <TaskItem key={task.id} task={task.title} setTasks={setTasks} />)
//         ) : (
//           <p className="text-center text-gray-500">No tasks available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;

import { useState, useEffect } from "react";
import { fetchTasks, addTask, deleteAllTasks, deleteUserAccount , disableUserAccount } from "../firebase/firestore";
import { auth } from "../firebase/firebaseConfig";
import TaskItem from "./TaskItem";

const TaskList = () => {
  // State management
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState(null);

  // Set up real-time listener for auth and tasks
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const unsubscribeTasks = fetchTasks(currentUser.uid, setTasks);
        return () => unsubscribeTasks();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Handle adding a new task
  const handleAddTask = async () => {
    if (newTask.trim() === "" || !user) return;
    try {
      await addTask(newTask, user.uid);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle deleting all tasks
  const handleDeleteAllTasks = async () => {
    if (!user) return;
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      try {
        await deleteAllTasks(user.uid);
      } catch (error) {
        console.error("Error deleting all tasks:", error);
      }
    }
  };

  // Handle deleting user account
  const handleDeleteAccount = async () => {
    if (!user) return;
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
       const result = await deleteUserAccount();
       alert(result.message)
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  const handleDisableAccount = async () =>{
    if (!user) return;
    if (window.confirm("Are you sure you want to Diactivat your account.")) {
      try {
        await disableUserAccount()
        alert("your account has been disable")
      } catch (error) {
        alert('Error in disaable' , error.message);
        
      }
      
    }
  }

  // Show login message if no user
  if (!user) {
    return <p className="text-center text-gray-500">Please log in to see your tasks.</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Header with delete buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Task List</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleDeleteAllTasks}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
          >
            Delete All Tasks
          </button>
          <button 
            onClick={handleDeleteAccount}
            className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded transition-colors"
          >
            Delete Account
          </button>
          <button 
            onClick={handleDisableAccount}
            className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded transition-colors"
          >
            Disable Account
          </button>
        </div>
      </div>

      {/* Add task input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          className="border p-2 w-full rounded"
          placeholder="Enter a task..."
        />
        <button 
          onClick={handleAddTask} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Add
        </button>
      </div>

      {/* Task list */}
      <div className="bg-gray-50 p-4 rounded-lg">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              userId={user.uid}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
