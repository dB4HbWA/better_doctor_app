import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import {
  Link
} from 'react-router-dom'
import * as firebase from 'firebase';
import { connect } from 'react-redux'
import { UPDATE_FAVORITE_DOCTORS } from './state/actions'

const NearestLocation = ({ practices }) => {
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

  handleHeartClick(doctor, checked) {
    if (!checked) {
      var database = firebase.database();
      var profilesRef = firebase.database().ref("profiles/" + this.props.signedInUser.uid);
      profilesRef.update({
            ['doctor_' + doctor.uid]: {uid: doctor.uid, first_name: doctor.profile.first_name, specialties: this.props.doctor.specialties.map((specialty) => specialty.name).join(', ')}
      });
  
      
      var ref = firebase.database().ref();
      ref.on("value", (snapshot) => {
        if (snapshot.val() !== null && snapshot.val().profiles[this.props.signedInUser.uid] !== null && snapshot.val().profiles[this.props.signedInUser.uid] !== undefined) {
          const doctors = snapshot.val().profiles[this.props.signedInUser.uid];
          this.props.updateFavorites(Object.values(doctors))
        }
      }, function (error) {
        console.log("Error: " + error.code);
      });

      
    } else {
      var docRef = firebase.database().ref("profiles/" + this.props.signedInUser.uid + '/doctor_' + doctor.uid);
      docRef.remove();
  
      var ref = firebase.database().ref();
      ref.on("value", (snapshot) => {
        if (snapshot.val() !== null && snapshot.val().profiles[this.props.signedInUser.uid] !== null && snapshot.val().profiles[this.props.signedInUser.uid] !== undefined) {
        const doctors = snapshot.val().profiles[this.props.signedInUser.uid];
        this.props.updateFavorites(Object.values(doctors))
        }
        else
          this.props.updateFavorites([])

      }, function (error) {
        console.log("Error: " + error.code);
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <div className="card" style={{ width: '700px', display: 'inline-block', float: 'center' }}>
            <img src={this.props.doctor.profile.image_url}
              style={{ float: 'left', display: 'inline-block', height: '135px', width: '100px' }} />
            <div style={{ display: 'inline-block' }}>
              <Link to={'/doctor/' + this.props.doctor.uid} >{this.props.doctor.profile.first_name + ' ' + this.props.doctor.profile.last_name + ' ' + this.props.doctor.profile.title} </Link>
              <div>Specialty: {this.props.doctor.specialties.map((specialty) => specialty.name).join(', ')}</div>
              <div>Nearest Location:</div>
              <NearestLocation practices={this.props.doctor.practices} />
              {(this.props.signedInUser && this.props.favoriteDoctors) && <input onChange={() => this.handleHeartClick(this.props.doctor, this.props.favoriteDoctors.find((faveDoc) => faveDoc.uid === this.props.doctor.uid))} checked={this.props.favoriteDoctors.find((faveDoc) => faveDoc.uid === this.props.doctor.uid) ? true : false} style={{ float: 'right' }} className="star" type="checkbox" title="savedoc" />} 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    signedInUser: state.signedInUser,
    favoriteDoctors: state.favoriteDoctors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFavorites: (favoriteList) => dispatch({type: UPDATE_FAVORITE_DOCTORS, payload: favoriteList})
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(DoctorCard)
