import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarkAttendance from "./components/MarkAttendance";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
