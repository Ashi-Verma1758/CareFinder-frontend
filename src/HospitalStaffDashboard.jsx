import { useEffect, useState } from "react";
import axios from "axios";
import AddHospitalForm from "./HospitalStaff/AddHospitalForm";
import AddBedForm from "./HospitalStaff/AddBedForm";
import UpdateBedForm from "./HospitalStaff/UpdateBedForm";
import "./HospitalStaffDashboard.css";

function HospitalStaffDashboard() {
  const [hospitalId, setHospitalId] = useState(null);
  const [beds, setBeds] = useState([]);

  // Fetch the hospital registered by the current user
  const fetchHospital = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/hospitals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filter hospital registered by this user (assuming only one for staff)
      const myHospital = res.data.data.find(h => h.registeredBy === JSON.parse(localStorage.getItem("user"))._id);
      if (myHospital) {
        setHospitalId(myHospital._id);
        fetchBeds(myHospital._id);
      }
    } catch (err) {
      console.error("Failed to fetch hospital:", err);
    }
  };

  const fetchBeds = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/beds/${id}`);
      setBeds(res.data.data);
    } catch (err) {
      console.error("Failed to fetch beds:", err);
    }
  };

  useEffect(() => {
    fetchHospital();
  }, []);

 return (
  <div className="staff-dashboard">
    <h2>Welcome, {user.fullName} (Hospital Staff)</h2>

    {/* 🏥 Show this only if hospital exists */}
    {hospital ? (
      <>
        <h3>Hospital: {hospital.name}</h3>

        {/* ➕ Show Add Bed Form */}
        <AddBedForm hospitalId={user.hospitalId} />

        {/* 🔄 Show existing beds and allow update */}
        <div className="bed-list">
          <h4>Manage Beds:</h4>
          {beds.length === 0 ? (
            <p>No beds added yet.</p>
          ) : (
            beds.map((bed) => (
              <div key={bed._id} className="bed-block">
                <p><strong>Type:</strong> {bed.type}</p>
                <p>Total: {bed.totalBeds}, Available: {bed.availableBeds}</p>
                <UpdateBedForm bed={bed} onUpdateSuccess={fetchBeds} />
              </div>
            ))
          )}
        </div>
      </>
    ) : (
      // 📝 No hospital found — allow staff to create it
      <AddHospitalForm onHospitalCreated={setHospital} />
    )}
  </div>
);

}

export default HospitalStaffDashboard;
