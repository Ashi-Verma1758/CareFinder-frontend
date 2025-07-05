import { useState } from 'react'
import './HealthTips.css';

function HealthTips() {
  return (
    <div className="health-tips-section">
      <h3 className="tips-title">Health Tips</h3>

      <div className="tip-card">
       <img src="/emergency.png" alt="Health Tips" className="emergency"></img>
        <div className="tip-text">
          <strong>Emergency Room</strong>
          <p>Visit immediately in case of severe symptoms.</p>
        </div>
      </div>

      <div className="tip-card">
         <img src="/call.png" alt="Health Tips" className="call"></img>
        <div className="tip-text">
          <strong>National Helpline</strong>
          <p>Call 112 for immediate assistance.</p>
        </div>
      </div>
    </div>
  );
}

export default HealthTips;
