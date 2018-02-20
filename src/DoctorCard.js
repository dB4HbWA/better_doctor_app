import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';

const NearestLocation = ({ practices }) => {
  console.log(practices)
  let sortedPractices = practices.sort((a, b) => { return a.distance - b.distance })
  if (sortedPractices !== undefined && sortedPractices.length > 0) {
    const closestPractice = sortedPractices[0]
    return (
      <div>
        <div>{closestPractice.visit_address.street}</div>
        <div>{closestPractice.visit_address.city}, {closestPractice.visit_address.state} {closestPractice.visit_address.zip}</div>
      </div>
    )
  }
}

class DoctorCard extends Component {

  render() {
    return (
      <div className="App">
        <div>
          <div class="card" style={{ width: '700px', display: 'inline-block', float: 'center' }}>
            <img src={this.props.doctor.profile.image_url === "https://asset1.betterdoctor.com/assets/general_doctor_male.png" || this.props.doctor.profile.image_url === "https://asset2.betterdoctor.com/assets/general_doctor_male.png" || this.props.doctor.profile.image_url === "https://asset3.betterdoctor.com/assets/general_doctor_male.png"? "https://vignette.wikia.nocookie.net/simpsons/images/0/05/Nick_Riviera.png/revision/latest?cb=20170903205918" : this.props.doctor.profile.image_url}
            
             style={{ float: 'left', display: 'inline-block', height: '135px', width: '100px' }} />
            <div style={{ display: 'inline-block' }}>
              <div>{this.props.doctor.profile.first_name + ' ' + this.props.doctor.profile.last_name + ' ' + this.props.doctor.profile.title} </div>
              <div>Specialty: {this.props.doctor.specialties.map((specialty) => specialty.name).join(', ')}</div>
              <div>Nearest Location:</div>
              <NearestLocation practices={this.props.doctor.practices} />

              <input style={{ float: 'right' }} class="star" type="checkbox" title="savedoc" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorCard;
