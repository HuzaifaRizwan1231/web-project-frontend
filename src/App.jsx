import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/editor" element={<Editor />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
