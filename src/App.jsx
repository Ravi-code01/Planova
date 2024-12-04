import { useState, useEffect } from "react";
import "./index.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/tasks");
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/tasks" exact element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </>
  );
}

export default App;
