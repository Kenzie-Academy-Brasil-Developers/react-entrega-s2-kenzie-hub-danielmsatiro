/* import { useHistory } from "react-router"; */
import { api } from "../../../services/api";
import { logOut, signIn } from "./actions";
import { toast } from "react-toastify";

export const signInThunk = (userData, history) => (dispatch, getState) => {
  /* const history = useHistory(); */
  api
    .post("/sessions", userData)
    .then((response) => {
      const { token, user } = response.data;

      localStorage.clear();

      localStorage.setItem("@Kenziehub:token", JSON.stringify(token));
      localStorage.setItem("@Kenziehub:id", JSON.stringify(user.id));
      dispatch(signIn(response.data));

      history.push(`/dashboard`);
    })
    .catch((error) => {
      toast.error("E-mail ou senha inválidos");
    });
};

export const logOutThunk = (history) => (dispatch, getState) => {
  localStorage.clear();
  dispatch(logOut());
  history.push("/");
};

export const updateProfile = (userId, userData, token) => (dispatch) => {
  api.patch(`/users/${userId}`, userData);
};
