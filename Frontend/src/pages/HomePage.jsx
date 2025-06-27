import React from 'react';
import { useFirebase } from '../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.jsx'


const HomePage = () => {
  const { logout,authUser } = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <Footer />
  );
};

export default HomePage;
