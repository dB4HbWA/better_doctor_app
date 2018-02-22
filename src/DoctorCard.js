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
            ['doctor_' + doctor.uid]: {uid: doctor.uid, first_name: doctor.profile.first_name, last_name: doctor.profile.last_name,
              image_url: this.props.doctor.profile.image_url, specialties: this.props.doctor.specialties.map((specialty) => specialty.name).join(', ')}
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
        <div>
        <div class="row card floating-box">
          <div class="small-5 medium-5 large-4 xlarge-4 columns">
            <img src={this.props.doctor.profile.image_url} alt="" />
       
          </div>
          <div class="small-6 medium-6 large-6 xlarge6 columns">
          <Link to={'/doctor/' + this.props.doctor.uid} >{this.props.doctor.profile.first_name + ' ' + this.props.doctor.profile.last_name + ' ' + this.props.doctor.profile.title} </Link>
            <div>Specialty: {this.props.doctor.specialties.map((specialty) => specialty.name).join(', ')}</div>
            {this.props.doctor.practices !== undefined && this.props.doctor.practices.length > 0 && this.props.doctor.practices[0].distance &&
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>Nearest Location:</div>
                <NearestLocation practices={this.props.doctor.practices} />
              </div>}
          </div>
          <div class="small-2 medium-2 large-2 xlarge-2 columns">
            {(this.props.signedInUser && this.props.favoriteDoctors) && <input onChange={() => this.handleHeartClick(this.props.doctor, this.props.favoriteDoctors.find((faveDoc) => faveDoc.uid === this.props.doctor.uid))} checked={this.props.favoriteDoctors.find((faveDoc) => faveDoc.uid === this.props.doctor.uid) ? true : false} style={{ float: 'right' }} className="star" type="checkbox" title="savedoc" />}
          </div>
        </div>

          {/* <div className="card floating-box">
            <img src={this.props.doctor.profile.image_url} />
            <div style={{ display: 'inline-block' }}>
              <Link to={'/doctor/' + this.props.doctor.uid} >{this.props.doctor.profile.first_name + ' ' + this.props.doctor.profile.last_name + ' ' + this.props.doctor.profile.title} </Link>
              <div>Specialty: {this.props.doctor.specialties.map((specialty) => specialty.name).join(', ').length < 40 ? this.props.doctor.specialties.map((specialty) => specialty.name).join(', ') : this.props.doctor.specialties.map((specialty) => specialty.name).join(', ').substring(0,40) + '...'}</div>
              {this.props.doctor.practices !== undefined && this.props.doctor.practices.length > 0 && this.props.doctor.practices[0].distance && <div>
                <div>Nearest Location:</div>
                <NearestLocation practices={this.props.doctor.practices} />
              </div>}
              {(this.props.signedInUser && this.props.favoriteDoctors) && <input onChange={() => this.handleHeartClick(this.props.doctor, this.props.favoriteDoctors.find((faveDoc) => faveDoc.uid === this.props.doctor.uid))} checked={this.props.favoriteDoctors.find((faveDoc) => faveDoc.uid === this.props.doctor.uid) ? true : false} style={{ float: 'right' }} className="star" type="checkbox" title="savedoc" />} 
            </div>
          </div> */}
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
