import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
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
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <>Editor</>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
