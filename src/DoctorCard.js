import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';

class DoctorCard extends Component {
  render() {
    return (
      <div>
        <div class="card" style={{ width: '700px', display: 'inline-block', float: 'center' }}>
          <img src="dr_nick.jpg" style={{ float: 'left', display: 'inline-block' }} />
          <div style={{ display: 'inline-block' }}>
            <div>Dr. Nicholas Riviera</div>
            <div>Specialty: Physical Therapy</div>
            <div>123 Fake St.</div>
            <div>Springfield, IL 62704</div>
            <input style={{ float: 'right', display: 'inline-block' }} class="star" type="checkbox" title="bookmark page" />
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorCard;
