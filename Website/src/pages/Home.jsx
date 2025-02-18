import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Task Manager</h1>
      <p className="text-lg text-gray-600 mb-6">
        Manage your tasks efficiently with our simple and powerful app.
      </p>
      {/* <div className="flex gap-4">
        <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600">
          Login
        </Link>
        <Link to="/signup" className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600">
          Sign Up
        </Link>
      </div> */}
    </div>
  );
};

export default Home;
