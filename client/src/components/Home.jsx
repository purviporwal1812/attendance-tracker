import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>HOME</h1>
      <Link to="/users/login">User LOGIN</Link>
      <br></br>
      <Link to="/admin/dashboard">Admin Dashboard</Link><br></br>
      
    </div>
  );
}

export default Home;
