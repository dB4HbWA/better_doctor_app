import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import {
  Link
} from 'react-router-dom'

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
            <img src={this.props.doctor.profile.image_url}
             style={{ float: 'left', display: 'inline-block', height: '135px', width: '100px' }} />
            <div style={{ display: 'inline-block' }}>
              <Link to={'/doctor/' + this.props.doctor.uid} >{this.props.doctor.profile.first_name + ' ' + this.props.doctor.profile.last_name + ' ' + this.props.doctor.profile.title} </Link>
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
