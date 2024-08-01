import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarkAttendance from "./components/MarkAttendance";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
      </Routes>
    </Router>
  );
}

export default App;
