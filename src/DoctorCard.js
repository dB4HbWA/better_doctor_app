import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import {
  Link
} from 'react-router-dom'
import * as firebase from 'firebase';
import { connect } from 'react-redux'

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

  handleHeartClick(uid) {
    //add doctor to favorites by uid
    var database = firebase.database();
    // function writeUserData(userId, name, email, imageUrl) {
    //   firebase.database().ref('profile/QmGhROPRF7bpgbUT1B2kuhpWfDP2' + userId).set({
    //     username: name,
    //     email: email,
    //     profile_picture: imageUrl
    //   });
    // }

    // return firebase.database().ref('/profiles/' + this.props.signedInUser.email).once('value').then(function(snapshot) {
    //   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    //   console.log(username)
    // });

    // var ref = firebase.database().ref();
    // ref.on("value", function (snapshot) {
    //   console.log(snapshot.val());
    // }, function (error) {
    //   console.log("Error: " + error.code);
    // });

    // var profilesRef = firebase.database().ref("profiles/");
    // profilesRef.({
    //       [this.props.signedInUser.uid]: {
    //         doctors: uid
    //       }
    // });

    // var profilesRef = firebase.database().ref("profiles/" + this.props.signedInUser.uid);
    // profilesRef.update({
    //       doctors: uid
    // });

    // var profilesRef = firebase.database().ref();
    // profilesRef.child(this.props.signedInUser.uid).set({['doctor' + uid]: uid})

    // var profilesRefObject = firebase.database().ref("profiles/").child(this.props.signedInUser.uid)
    // var doctorsRefObject = firebase.child('doctors')

    // var profilesRef = firebase.database().ref("profiles/" + this.props.signedInUser.uid);
    // profilesRef.update({
    //       doctors: [uid]
    // });

    // var ref = firebase.database().ref();
    // ref.on("value", (snapshot) => {
    //   let doctorArray = snapshot.val().profiles[this.props.signedInUser.uid].doctors;
    //   doctorArray += ',' + uid
    //   var profilesRef = firebase.database().ref("profiles/" + this.props.signedInUser.uid);
    //   profilesRef.update({
    //         doctors: doctorArray
    //   });

    // }, function (error) {
    //   console.log("Error: " + error.code);
    // });

    
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
              <input onChange={() => this.handleHeartClick(this.props.doctor.uid)} style={{ float: 'right' }} className="star" type="checkbox" title="savedoc" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    signedInUser: state.signedInUser
  };
};



export default connect(mapStateToProps)(DoctorCard)
