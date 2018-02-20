import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';

class DoctorCard extends Component {
  render() {
    return (
      <div className="App">
        <div class="heart" ></div>
        {/* //has to have an onclick event to toggle css class="heart-blast" */}
        <button onClick={() => { alert('alert'); }}>alert</button>
        <div>
          <div class="card" style={{ width: '700px', display: 'inline-block', float: 'center' }}>
            <img src="https://vignette.wikia.nocookie.net/simpsons/images/0/05/Nick_Riviera.png/revision/latest?cb=20170903205918" style={{ float: 'left', display: 'inline-block', height: '135px', width: '100px' }} />
            <div style={{ display: 'inline-block' }}>
              <div>Dr. Nicholas Riviera</div>
              <div>Specialty: Physical Therapy</div>
              <div>123 Fake St.</div>
              <div>Springfield, IL 62704</div>
              <input style={{ float: 'right' }} class="star" type="checkbox" title="savedoc" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorCard;
