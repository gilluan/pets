import Constants from "../constants";

const initialState = {
  isAuthenticated: localStorage.getItem("access_token") ? true : false,
  authenticatedUser: JSON.parse(localStorage.getItem("current_user")) || {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Constants.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        user: action.credentials
      }
    case Constants.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        authenticatedUser: action.payload
      }
    default:
      return state
  }
}
