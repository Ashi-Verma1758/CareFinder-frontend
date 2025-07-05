import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./HospitalDetail.css";

function HospitalDetail() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [beds, setBeds] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const hospitalRes = await axios.get(`http://localhost:8000/api/hospitals/${id}`);
        setHospital(hospitalRes.data.data);

        const bedsRes = await axios.get(`http://localhost:8000/api/beds/${id}`);
        setBeds(bedsRes.data.data);
      } catch (err) {
        console.error("Error fetching hospital details:", err);
        setError("Failed to load hospital data. Please try again later.");
      }
    };

    fetchHospitalDetails();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!hospital) return <p>Loading hospital info...</p>;

  return (
    <div className="hospital-detail-container">
      <div className="hospital-info">
        <h2>{hospital.name}</h2>
        <p>{hospital.address}, {hospital.city}, {hospital.state}</p>
        <p>Email: {hospital.email}</p>
        <p>Phone: {hospital.phone}</p>
      </div>

      <h3>Bed Availability</h3>
      <ul className="bed-list">
        {beds.length === 0 ? (
          <p>No beds listed for this hospital.</p>
        ) : (
          beds.map((bed) => (
            <li key={bed._id} className="bed-item">
              <strong>{bed.type}</strong><br />
              Total: {bed.totalBeds}, Available: {bed.availableBeds}
            </li>
          ))
        )}
      </ul>

      <div className="back-link">
        <Link to="/hospitals">← Back to Hospital List</Link>
      </div>
    </div>
  );
}

export default HospitalDetail;
