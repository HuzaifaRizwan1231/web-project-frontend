import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/editor" element={<Editor />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
