import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { loadDocData, updateFavorites } from './state/actions';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom'
import * as firebase from 'firebase';
import { UPDATE_FAVORITE_DOCTORS } from './state/actions'


class FavoritesView extends Component {

  handleHeartClick(doctor, checked) {

    if (!checked) {
      var database = firebase.database();
      var profilesRef = firebase.database().ref("profiles/" + this.props.signedInUser.uid);
      profilesRef.update({
            ['doctor_' + doctor.uid]: {uid: doctor.uid, first_name: doctor.first_name, last_name: doctor.last_name,
              image_url: doctor.image_url, specialties: doctor.specialties.map((specialty) => specialty.name).join(', ')}
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
        <h1 className="pageHeader">My Favorite Doctors</h1>
        {(this.props.docData && this.props.docData.length > 0) && (
          <div>
            {this.props.docData.map((doctor) =>

              <div className="card floating-box "  key={doctor.uid}>
                <img src={doctor.image_url} style={{ padding: '30px' }} alt="" />
                <div style={{ display: 'inline-block' }}>
                  <Link to={'/doctor/' + doctor.uid} >{doctor.first_name + ' ' + doctor.last_name} </Link>
                  <div>Specialty: {doctor.specialties}</div>
                </div>
             <input onChange={() =>  this.handleHeartClick(doctor, this.props.docData.find((faveDoc) => 
             faveDoc.uid === doctor.uid))} checked={this.props.docData.find((faveDoc) => faveDoc.uid === doctor.uid) ? true : false} style={{ float: 'right' }} className="star" type="checkbox" title="remove doc" />} 
              </div>
            )}

          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    signedInUser: state.signedInUser,
    docData: state.favoriteDoctors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDocData: () => dispatch(loadDocData()),
    updateFavorites: (favoriteList) => dispatch({type: UPDATE_FAVORITE_DOCTORS, payload: favoriteList})
    
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(FavoritesView)