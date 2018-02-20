import { LOAD_DOC_DATA, SET_SIGNED_IN_USER } from './actions';

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
    case SET_SIGNED_IN_USER:
      return { ...state, signedInUser: action.payload}
    default:
      return state;
  }
}

export default reducer;