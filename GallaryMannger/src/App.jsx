import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Gallery from "./components/Gallery";
import UploadMedia from "./components/UploadMedia";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Auth />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="upload" element={<UploadMedia />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;