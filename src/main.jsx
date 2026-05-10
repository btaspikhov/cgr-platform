import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import App from './App'

const theme = createTheme({
  palette: {
    primary: { main: '#2563EB' },
    success: { main: '#059669' },
    warning: { main: '#D97706' },
    error:   { main: '#DC2626' },
    background: { default: '#F8FAFF' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif'
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
