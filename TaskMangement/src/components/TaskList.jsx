import { useState, useEffect } from "react";
import { fetchTasks, addTask } from "../firebase/firestore";
import { auth } from "../firebase/firebaseConfig";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const unsubscribeTasks = fetchTasks(currentUser.uid, setTasks);
        console.log(`feccting taskk ----> ${unsubscribeTasks}`);
        
        return () => unsubscribeTasks();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim() === "" || !user) return;
    try {
      console.log(`post task ${newTask} ${user.uid}`);
      
      await addTask(newTask,user.uid).then().catch(
        (error) => console.error(error)
      );
      console.log('post task successfully');
      
      setNewTask("");
    } catch (error) {
      console.error(`error in post `)
    }
  };

  if (!user) {
    return <p className="text-center text-gray-500">Please log in to see your tasks.</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Your Task List</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter a task..."
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <div className="bg-gray-100 p-4 rounded">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task.id} task={task} setTasks={setTasks} />)
        ) : (
          <p className="text-center text-gray-500">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
