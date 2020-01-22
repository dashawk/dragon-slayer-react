import React from 'react'

function HealthBar() {
  return (
    <div className="health-bar-wrapper">
      <div className="bar">
        <div className="bar-inner">
          <span className="value"></span>
          <span className="state"></span>
          <span className="background"></span>
        </div>
      </div>
    </div>
  );
}

export default HealthBar;
