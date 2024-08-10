import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/admin/dashboard">ADMIN DASHBOARD</Link>
    </div>
  );
}

export default Login;
