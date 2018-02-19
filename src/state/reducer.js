import { LOAD_DOC_DATA } from './actions';

const initialState = {
  docData: [],
  signedInUser: undefined
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DOC_DATA:
      return { ...state, docData: action.payload }
    default:
      return state;
  }
}

export default reducer;