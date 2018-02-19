import axios from "axios"

export const LOAD_DOC_DATA = "LOAD_DOC_DATA";
export const UPDATE_CURRENT_LOCATION = "UPDATE_CURRENT_LOCATION";
export const NULL_CURRENT_POSITION = "NULL_CURRENT_POSITION";
export const RETRIEVE_LOCATION = "RETRIEVE_LOCATION";

export function loadDocData() {
  return (dispatch, getState, api) => {
    const promise = axios.get('https://api.betterdoctor.com/2016-03-01/doctors?location=WI&skip=2&limit=50&user_key=1beb2ecd945d9c2a3079c77dc33129ce');

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

export function getCurrentPosition() {
  return (dispatch, getState, api) => {
    dispatch({type: RETRIEVE_LOCATION })
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        dispatch({type: UPDATE_CURRENT_LOCATION, payload: pos})
    })
  }
}