import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>HOME</h1>
      <Link to="/users/login">LOGIN</Link>
      <br></br>
      <Link to="/mark-attendance">MARK ATTENDANCE</Link><br></br>
      
    </div>
  );
}

export default Home;
