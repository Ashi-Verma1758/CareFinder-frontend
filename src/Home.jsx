import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to CareFinder</h1>
      <p>Find available hospital beds instantly.</p>
      <Link to="/hospitals" className="home-link">Search Hospitals</Link>
    </div>
  );
}

export default Home;