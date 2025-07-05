
import { useState, useEffect } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './FindNearby.css';
import L from 'leaflet';
import HealthTips from './HealthTips';
import HospitalCard from './HospitalCard';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
function FindNearby() {
  const [hospitals, setHospitals] = useState([]);
useEffect(() => {
  fetch('http://localhost:8000/api/search')
    .then(res => res.json())
    .then(data => {
       console.log("Backend response:", data.data);
      const formatted = data?.data.map(entry => {
        const bedData = {
          totalBeds: 0,
          availableBeds: 0,
          icuBeds: 0,
            generalBeds: 0
        };

        entry.beds.forEach(bed => {
          bedData.totalBeds += bed.totalBeds;
          bedData.availableBeds += bed.availableBeds;

          const type = bed.type.toLowerCase();
          if (type.includes('icu')) bedData.icuBeds += bed.totalBeds;
          if (type.includes('general')) bedData.generalBeds += bed.totalBeds;
          // if (type.includes('ventilator')) bedData.ventilators += bed.totalBeds;
          // if (type.includes('oxygen')) bedData.oxygenSupport += bed.totalBeds;
        });

        return {
          _id: entry.hospital._id,
          name: entry.hospital.name,
          contact: entry.hospital.phone,
          location: {
            lat: entry.hospital.latitude || 28.6139,
            lng: entry.hospital.longitude || 77.2090
          },
          ...bedData
        };
      });
console.log("Formatted hospitals:", formatted);

      setHospitals(formatted.slice(0, 3)); // only show 3 hospitals
    })
    .catch(err => {
      console.error('Failed to fetch hospitals:', err);
    });
}, []);

  return (
    <div className="find-nearby-section">
      <h1 className="section-title">Find nearby hospitals</h1>
      <div className='letsee'>

      <div className='mapcont'><MapContainer
        center={[28.6139, 77.2090]}
        zoom={13}
        style={{ height: '30vh', width: '60vw', borderRadius: '12px', margin: '0 auto' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hospitals.map((hospital, index) => (
          <Marker key={index} position={[hospital.location.lat, hospital.location.lng]}>
            <Popup>
  <strong>{hospital.name}</strong><br />
  ICU Beds: {hospital.icuBeds}<br />
  General Beds: {hospital.generalBeds}
</Popup>

          </Marker>
        ))}
      </MapContainer>
</div>
<HealthTips/>
</div>
    {hospitals.length === 0 && (
  <p style={{ textAlign: 'center', marginTop: '1rem' }}>
    No hospital data found. Please check backend or database.
  </p>
)}

      <div className="hospital-cards">
        {hospitals.map((hospital, index) => (
          <HospitalCard key={index} hospital={hospital} />
        ))}
      </div>
    </div>
  );
}

export default FindNearby;