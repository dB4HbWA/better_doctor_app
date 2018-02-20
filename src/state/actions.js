import axios from "axios"

export const LOAD_DOC_DATA = "LOAD_DOC_DATA";

export function loadDocData(filter) {
  return (dispatch, getState, api) => {

    const location = filter.location.lat + ',' + filter.location.lng
    const miles = filter.miles

    const promise = axios.get('https://api.betterdoctor.com/2016-03-01/doctors?location=' + location + ',' + miles + '&skip=2&limit=50&user_key=1beb2ecd945d9c2a3079c77dc33129ce');

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