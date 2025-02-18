// import { useState } from "react";
// import { updateTask, toggleTaskCompletion, deleteTask } from "../firebase/firestore";

// const TaskItem = ({ task, setTasks }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTask, setEditedTask] = useState(task.task);

//   const handleToggleComplete = async () => {
//     await toggleTaskCompletion(task.id, !task.completed);
//   };

//   const handleDelete = async () => {
//     await deleteTask(task.id, setTasks);
//   };

//   const handleUpdate = async () => {
//     if (editedTask.trim() === "") return;
//     await updateTask(task.id, editedTask, setTasks);
//     setIsEditing(false);
//   };

//   return (
//     <div className="p-4 border-b flex justify-between items-center">
//       <div>
//         <input
//           type="checkbox"
//           checked={task.completed}
//           onChange={handleToggleComplete}
//           className="mr-2"
//         />
//         {isEditing ? (
//           <input
//             type="text"
//             value={editedTask}
//             onChange={(e) => setEditedTask(e.target.value)}
//             className="border p-1"
//           />
//         ) : (
//           <span className={task.completed ? "line-through text-gray-500" : ""}>{task.task}</span>
//         )}
//       </div>
//       <div>
//         {isEditing ? (
//           <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2">
//             Save
//           </button>
//         ) : (
//           <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
//             Edit
//           </button>
//         )}
//         <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskItem;


import { useState } from "react";
import { updateTask, toggleTaskCompletion, deleteTask } from "../firebase/firestore";

const TaskItem = ({ task, userId }) => {
  // State for managing edit mode and edited task content
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.title);

  // Handle toggling task completion status
  const handleToggleComplete = async () => {
    try {
      await toggleTaskCompletion(task.id, !task.completed, userId);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  // Handle deleting a single task
  const handleDelete = async () => {
    try {
      await deleteTask(task.id, userId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle updating task title
  const handleUpdate = async () => {
    if (editedTask.trim() === "") return;
    try {
      await updateTask(task.id, editedTask, userId);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-4 border-b bg-white rounded-lg shadow-sm mb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Checkbox for task completion */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="w-4 h-4"
          />
          {/* Conditional rendering for edit mode */}
          {isEditing ? (
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              className="border rounded p-1"
              onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
            />
          ) : (
            <span className={task.completed ? "line-through text-gray-500" : ""}>
              {task.title}
            </span>
          )}
        </div>
        {/* Action buttons */}
        <div className="flex gap-2">
          {isEditing ? (
            <button 
              onClick={handleUpdate} 
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
            >
              Save
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)} 
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors"
            >
              Edit
            </button>
          )}
          <button 
            onClick={handleDelete} 
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;