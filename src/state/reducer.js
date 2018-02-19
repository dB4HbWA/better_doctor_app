import { LOAD_DOC_DATA, UPDATE_CURRENT_LOCATION, NULL_CURRENT_POSITION, RETRIEVE_LOCATION } from './actions';

const initialState = {
  docData: [],
  signedInUser: undefined,
  gettingCurrentLocation: undefined,
  currentLocation: undefined
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DOC_DATA:
      return { ...state, docData: action.payload }
    case RETRIEVE_LOCATION:
      return { ...state, gettingCurrentLocation: "retrieving"}
    case UPDATE_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload, gettingCurrentLocation: "retrieved"}
    case NULL_CURRENT_POSITION:
      return { ...state, currentLocation: undefined, gettingCurrentLocation: undefined}
    default:
      return state;
  }
}

export default reducer;