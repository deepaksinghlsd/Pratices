import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Media Gallery</h1>
      <Outlet />
    </div>
  );
};
export default Layout;