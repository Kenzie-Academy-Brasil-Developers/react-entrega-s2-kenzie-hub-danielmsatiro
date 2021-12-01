import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "solid 1px transparent",
          "&:hover": {
            border: "solid 1px black",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#403CAA",
    },
    secondary: {
      main: "#11995E",
    },
    grey: {
      0: "#F5F5F5",
      50: "#999999",
      100: "#333333",
    },
    action: {
      hover: "rgba(0,0,0,0)",
      hoverOpacity: 0,
    },
  },
  typography: {
    fontFamily: "inter",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: "32px",
    },
    h2: {
      fontWeight: 700,
      fontSize: "28px",
    },
    h3: {
      fontWeight: 700,
      fontSize: "22px",
    },
    h4: {
      fontWeight: 700,
      fontSize: "18px",
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "16px,",
    },
    body1: {
      fontSize: "14px",
    },
    caption: {
      fontSize: "12px",
    },
    button: {
      fontSize: "12px",
      textTransform: "capitalize",
    },
  },
});
