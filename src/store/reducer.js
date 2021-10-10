import { firebase } from "../firebase";
const initialState = {
  auth: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === "SETUSER") {
    console.log(action);
      return {
        auth:action.user
      };

  }
  else if (action.type === "LOGOUT") {
    return {
      auth: null,
    };
  }

  return state;
};

export default reducer;
