import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Main Layout Wrapper */}
          <Route element={<MainLayout />}>
            {/* Protected Routes wrapper */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<></>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/editor" element={<Editor />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
