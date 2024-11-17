import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MovieProvider } from './context/MovieContext.jsx'
import 'aos/dist/aos.css'; // Import AOS styles
import { HelmetProvider } from 'react-helmet-async'


createRoot(document.getElementById('root')).render(
  <MovieProvider>
    {/* <StrictMode> */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
    {/* </StrictMode>, */}
  </MovieProvider>
)
