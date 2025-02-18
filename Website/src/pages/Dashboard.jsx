import TaskList from "../components/TaskList";
import { auth } from "../firebase/firebaseConfig";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {auth.currentUser ? <TaskList /> : <p>Please log in to view tasks.</p>}
    </div>
  );
};

export default Dashboard;
