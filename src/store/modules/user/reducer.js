/* import { LOG_OUT, SIGN_IN } from "./actionTypes";

const userId = localStorage.getItem("@Kenziehub:id") || "";
const token = localStorage.getItem("@Kenziehub:token") || "";

const defaultState = {
  userId,
  token,
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SIGN_IN:
      const { userData } = action;
      const { id, token } = userData;
      return { userId: id, token };

    case LOG_OUT:
      return { ...state, userId: "", token: "" };

    default:
      return state;
  }
};

export default userReducer; */
