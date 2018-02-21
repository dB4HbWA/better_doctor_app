import axios from "axios"
import * as firebase from 'firebase';

export const LOAD_DOC_DATA = "LOAD_DOC_DATA";
export const SET_SIGNED_IN_USER = "SET_SIGNED_IN_USER";
export const UPDATE_FAVORITE_DOCTORS = "UPDATE_FAVORITE_DOCTORS"

export function loadDocData(filter) {
  return (dispatch, getState, api) => {

    const location = filter.location.lat + ',' + filter.location.lng
    const miles = filter.miles

    const promise = axios.get('https://api.betterdoctor.com/2016-03-01/doctors?location=' + location + ',' + miles + '&sort=distance-asc&skip=0&limit=50&user_key=1beb2ecd945d9c2a3079c77dc33129ce');

    promise.then(({ data: docData }) => {
      console.log(docData)
      dispatch({ type: LOAD_DOC_DATA, payload: docData.data })
    }, () => { })
    promise.catch((data) => {
      console.log(data)
    }
    )
  }
}

export function loadFavorites(uid) {
  return (dispatch, getState, api) => {
    if (uid === undefined) {
      dispatch({ type: UPDATE_FAVORITE_DOCTORS, payload: undefined })
    } else {
      var database = firebase.database();
      var ref = firebase.database().ref();
      ref.on("value", (snapshot) => {
        if (snapshot.val() !== null && snapshot.val().profiles[uid] != null && snapshot.val().profiles[uid] !== undefined) {
          const doctors = snapshot.val().profiles[uid];
          dispatch({ type: UPDATE_FAVORITE_DOCTORS, payload: Object.values(doctors) })
        }
        else
          dispatch({ type: UPDATE_FAVORITE_DOCTORS, payload: [] })
      }, function (error) {
        console.log("Error: " + error.code);
      });
    }
  }
}