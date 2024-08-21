import { INCREMENT, DECREMENT } from "../action/counterAction";
import { FRTCH_USER_LOGIN_SUCCSESS } from "../action/userAction";
const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    role: "",
    image: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FRTCH_USER_LOGIN_SUCCSESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          role: action?.payload?.DT?.role,
          image: action?.payload?.DT?.image,
        },
        isAuthenticated: true,
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default userReducer;
