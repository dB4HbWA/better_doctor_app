import { LOAD_DOC_DATA, SET_SIGNED_IN_USER, UPDATE_FAVORITE_DOCTORS,CLEAR_DOC_DATA } from './actions';

const initialState = {
  docData: [],
  signedInUser: undefined,
  gettingCurrentLocation: undefined,
  currentLocation: undefined,
  favoriteDoctors: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DOC_DATA:
      return { ...state, docData: action.payload }
    case SET_SIGNED_IN_USER:
      return { ...state, signedInUser: action.payload}
    case UPDATE_FAVORITE_DOCTORS:
      return { ...state, favoriteDoctors: action.payload}
    case CLEAR_DOC_DATA:
      return { ...state, docData: []}
    default:
      return state;
  }
}

export default reducer;