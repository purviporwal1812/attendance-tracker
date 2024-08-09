import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarkAttendance from "./components/MarkAttendance";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
