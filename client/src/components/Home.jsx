import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>HOME</h1>
      <Link to="/users/login">LOGIN</Link>
      <Link to="/mark-attendance">MARK ATTENDANCE</Link>
    </div>
  );
}

export default Home;
