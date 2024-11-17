import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

import MovieDetail from './components/MovieDetail'; 
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import AdminDetail from './pages/AdminDetail/AdminDetail';
import Login from './pages/Auth/Login/Login';
import ProtectedRoute from './ProtectedRoutes/ProtecteRoute';
import Signup from './pages/Auth/Signup/Signup';
import About from './components/footerpages/About'
import Contact from './components/footerpages/Contact'
import Disclaimer from './components/footerpages/Disclaimer'
import Privacy from './components/footerpages/PrivacyPolicy'
import AdminPage from './components/AdminPage';
import DMCA from './components/footerpages/DMCA';
import TermsAndConditions from './components/footerpages/TermsAndConditions';


const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      offset: 200,    // offset (in pixels) from the original trigger point
      once: true,     // whether animation should happen only once
    });
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/admin/detail/:media/:id" element={<AdminDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/admin/page" element={<AdminPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/disclaimer' element={<Disclaimer />}/>
        <Route path='/privacy' element={<Privacy />}/>
        <Route path='/dmca' element={<DMCA />}/>
        <Route path='/terms' element={<TermsAndConditions />}/>
      </Routes>
    </Router>
  );
};

export default App;
