import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HospitalPage from './HospitalPage';

function HospitalDetailsWrapper() {
const { id } = useParams();
const [hospital, setHospital] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hospitals/${id}`)
.then(res => {
if (!res.ok) {
throw new Error('Failed to fetch hospital details');
}
return res.json();
})
.then(data => {
if (data?.data) {
setHospital(data.data);
} else {
setError('No hospital data received');
}
})
.catch(err => {
console.error('Error fetching hospital:', err);
setError(err.message);
});
}, [id]);

if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
if (!hospital) return <p>Loading...</p>;

return <HospitalPage hospital={hospital} />;
}

export default HospitalDetailsWrapper;