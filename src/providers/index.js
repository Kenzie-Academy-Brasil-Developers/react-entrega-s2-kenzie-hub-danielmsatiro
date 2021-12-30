import { AuthProvider } from "./user";

export const Providers = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
