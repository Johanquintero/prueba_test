import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {blue, red} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
          // Purple and green play nicely together.
          main: blue[500],
        },
        secondary: {
          // This is green.A700 as hex.
          main: red[500],
        },
      },
});

export const AdminLayout = ({children}) => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                {/* <Navbar /> */}
                {children}
            </ThemeProvider>
        </div>
    )
}
