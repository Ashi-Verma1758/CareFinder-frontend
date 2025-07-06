import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HospitalList.css";

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hospitals?approved=true`);
        setHospitals(res.data.data);
      } catch (err) {
        console.error("Error fetching hospitals:", err);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="hospital-list-container">
      <h2>Approved Hospitals</h2>
      {hospitals.length === 0 ? (
        <p>No approved hospitals found.</p>
      ) : (
        <ul>
          {hospitals.map((hospital) => (
            <li key={hospital._id} className="hospital-card">
              <div className="hospital-name">{hospital.name}</div>
              <div className="hospital-address">
                {hospital.address}, {hospital.city}, {hospital.state}
              </div>
              <div className="hospital-phone">Phone: {hospital.phone}</div>
              <Link to={`/hospital/${hospital._id}`} className="view-link">
                View Bed Availability
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HospitalList;
