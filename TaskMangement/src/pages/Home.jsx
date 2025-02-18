import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6">
      <h1>Welcome to Task Manager</h1>
      <Link to="/login">Get Started</Link>
    </div>
  );
};

export default Home;
