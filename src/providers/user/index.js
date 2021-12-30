import { createContext, useContext, useState } from "react";
import { api } from "../../services/api";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@kenziehub:token");
    const user = localStorage.getItem("@kenziehub:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = (data) => async (data) => {
    const response = await api.post("/sessions", data);

    const { token, user } = response.data;

    localStorage.setItem("@kenziehub:token", token);
    localStorage.setItem("@kenziehub:user", JSON.stringify(user));

    setData({ token, user });
  };

  const signOut = () => {
    localStorage.removeItem("@kenziehub:token");
    localStorage.removeItem("@kenziehub:user");

    setData({});
  };

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        user: data.user,
        signIn,
      }}
    ></AuthContext.Provider>
  );
};
