import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './HospitalPage.css';

function HospitalPage() {
  const { id } = useParams(); // Get hospitalId from URL
  const [hospital, setHospital] = useState(null);
  const [beds, setBeds] = useState([]);

  useEffect(() => {
    // Fetch hospital details
    const fetchHospital = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/hospital/${id}`);
        const data = await res.json();
        setHospital(data?.data);
      } catch (error) {
        console.error("Failed to fetch hospital:", error);
      }
    };

    // Fetch bed data
    const fetchBeds = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/bed/${id}`);
        const data = await res.json();
        setBeds(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch beds:", error);
      }
    };

    if (id) {
      fetchHospital();
      fetchBeds();
    }
  }, [id]);

  if (!hospital) return <p>Loading hospital details...</p>;

return (
<div className="hospital-detail">
<div className="hospital-header">
<h2>{hospital.name}</h2>
<div className="hospital-info">
<p><span>Address:</span> {hospital.address}</p>
<p><span>City:</span> {hospital.city}, <span>State:</span> {hospital.state}</p>
<p><span>Pincode:</span> {hospital.pincode}</p>
<p><span>Phone:</span> {hospital.phone}</p>
<p><span>Email:</span> {hospital.email}</p>
</div>
</div>
  <div className="facilities-section">
    <h3>Facilities</h3>
    <div className="facilities-list">
      {hospital.facilities?.ambulanceAvailable && (
        <div className="facility-item">🚑 Ambulance Available</div>
      )}
      {hospital.facilities?.oxygenAvailable && (
        <div className="facility-item">🩺 Oxygen Support</div>
      )}
      {hospital.facilities?.covidTesting && (
        <div className="facility-item">🧪 COVID Testing</div>
      )}
    </div>
  </div>

  <div className="bed-info-section">
    <h3>Bed Availability</h3>
    <div className="bed-grid">
      <div className="bed-item">
        <span>{hospital.beds?.totalBeds || 0}</span>
        <small>Total Beds</small>
      </div>
      <div className="bed-item">
        <span>{hospital.beds?.availableBeds || 0}</span>
        <small>Available Beds</small>
      </div>
      <div className="bed-item">
        <span>{hospital.beds?.icu || 0}</span>
        <small>ICU Beds</small>
      </div>
      <div className="bed-item">
        <span>{hospital.beds?.general || 0}</span>
        <small>General Beds</small>
      </div>
    </div>
  </div>
</div>
);
}

export default HospitalPage;