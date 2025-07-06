// src/HospitalStaff/UpdateBedPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateBedForm from './UpdateBedForm';

function UpdateBedPage() {
  const { id } = useParams(); // bed ID from URL
  const [bed, setBed] = useState(null);

  useEffect(() => {
    const fetchBed = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/beds/bed/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBed(res.data?.data);
      } catch (err) {
        console.error("❌ Failed to fetch bed:", err);
      }
    };

    fetchBed();
  }, [id]);

  return (
    <div>
      <h2>Update Bed</h2>
      {!bed ? (
        <p>Loading bed data...</p>
      ) : (
        <UpdateBedForm bed={bed} onUpdateSuccess={() => console.log('Updated')} />
      )}
    </div>
  );
}

export default UpdateBedPage;
