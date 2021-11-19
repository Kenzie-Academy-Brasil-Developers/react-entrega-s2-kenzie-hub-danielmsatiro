import { Routes } from "./routes";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <>
      <Routes />
      <CssBaseline />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
