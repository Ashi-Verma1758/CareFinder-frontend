import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './HospitalDetail.css';

function HospitalDetail() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [beds, setBeds] = useState([]);

  useEffect(() => {
   const fetchHospitalDetails = async () => {
  try {
    const res = await axios.get(`http://localhost:8000/api/${id}`);
    console.log("✅ Hospital response:", res.data);

    setHospital(res.data.hospitals); // ✅ FIXED
  } catch (error) {
    console.error("❌ Error fetching hospital:", error);
    setHospital(null);
  }
};


    const fetchBeds = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/beds/${id}`);
        console.log("✅ Beds response:", res.data);
        const bedArray = Array.isArray(res.data) ? res.data : res.data.beds || [];
        setBeds(bedArray);
      } catch (error) {
        console.error("❌ Error fetching beds:", error);
        setBeds([]);
      }
    };

    fetchHospitalDetails();
    fetchBeds();
  }, [id]);

  return (
    <div className="hospital-detail-container">
      {!hospital || !hospital.name ? (
  <p>Loading hospital details...</p>
) : (
  <>
    <h2>{hospital.name}</h2>
    <p><strong>Location:</strong> {hospital.city}</p>
    <p><strong>Status:</strong> {hospital.isApproved ? 'Approved' : 'Pending'}</p>
  </>
)}


      <h3>Available Beds</h3>
      {Array.isArray(beds) && beds.length > 0 ? (
        <table className="beds-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Total</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {beds.map((bed, index) => (
              <tr key={bed._id || index}>
                <td>{bed.type}</td>
                <td>{bed.totalBeds}</td>
                <td>{bed.availableBeds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No beds available or error in data format.</p>
      )}
    </div>
  );
}

export default HospitalDetail;
