import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SearchResults.css";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/search?query=${query}`);
        const data = await res.json();
        setResults(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="search-results-container">
      <h2>Search Results for: <span>{query}</span></h2>
      {results.length === 0 ? (
        <p>No hospitals found.</p>
      ) : (
        <ul className="results-list">
          {results.map((item) => (
            <li key={item.hospital._id} className="result-card" onClick={() => navigate(`/hospitals/${item.hospital._id}`)}>
              <h3>{item.hospital.name}</h3>
              <p>{item.hospital.city}, {item.hospital.state}</p>
              <p>Email: {item.hospital.email}</p>
              <p>Phone: {item.hospital.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
