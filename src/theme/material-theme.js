import { createTheme } from "@mui/material";

export const themeOptions = createTheme({
    palette: {
        primary: {
            main: '#1bd760',
            light: '#39d472',
            dark: '#3b5249',
            contrastText: '#fff'
        },
        background: {
            default: '#000',
            paper: '#121212'
        },
        text: {
            primary: '#fff',
            secondary: '#b3b3b3'
        },
        devider: '#292929'
    }
})