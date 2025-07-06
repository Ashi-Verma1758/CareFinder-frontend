import { useState} from 'react';
import './HospitalCard.css';
import { Link } from 'react-router-dom';


function HospitalCard({ hospital }) {
  return (
    <div className="hospital-card">
        <div className="hospital-header">
        <img src="/card.png" alt="Hospital Logo" className="hospital-logo" />
      <h3 className="hospital-name">{hospital.name}</h3>
</div>
 {/* <div className="bed-info">
        <div className="bed-row">
          <span className="bed-label">Total Beds</span>
          <div className="bed-bar total-bar">{hospital.totalBeds}</div>
        </div>
        <div className="bed-row">
          <span className="bed-label">Available</span>
          <div className="bed-bar available-bar">{hospital.availableBeds}</div>
        </div>
        <div className="bed-row">
          <span className="bed-label">ICU</span>
          <div className="bed-bar icu-bar">{hospital.icuBeds}</div>
        </div>
        <div className="bed-row">
          <span className="bed-label">General</span>
          <div className="bed-bar general-bar">{hospital.generalBeds}</div>
        </div> */}
        {/* <div className="bed-row">
          <span className="bed-label">Ventilators</span>
          <div className="bed-bar ventilator-bar">{hospital.ventilators}</div>
        </div>
        <div className="bed-row">
          <span className="bed-label">Oxygen</span>
          <div className="bed-bar oxygen-bar">{hospital.oxygenSupport}</div>
        </div> */}
      {/* </div> */}

      <div className="contact-info">
        📞 {hospital.contact}
      </div>
      <div className="view-more-container">
        <Link to={`/hospitals/${hospital.id}`} className="view-more-button">
          View More
        </Link>
      </div>
      </div>
       );
}
export default HospitalCard;