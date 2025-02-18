import { useState } from "react";
import { updateTask, toggleTaskCompletion, deleteTask } from "../firebase/firestore";

const TaskItem = ({ task, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.task);

  const handleToggleComplete = async () => {
    await toggleTaskCompletion(task.id, !task.completed);
  };

  const handleDelete = async () => {
    await deleteTask(task.id, setTasks);
  };

  const handleUpdate = async () => {
    if (editedTask.trim() === "") return;
    await updateTask(task.id, editedTask, setTasks);
    setIsEditing(false);
  };

  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mr-2"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="border p-1"
          />
        ) : (
          <span className={task.completed ? "line-through text-gray-500" : ""}>{task.task}</span>
        )}
      </div>
      <div>
        {isEditing ? (
          <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
            Edit
          </button>
        )}
        <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
