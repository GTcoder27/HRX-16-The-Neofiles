import React from 'react';
import { useFirebase } from '../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';


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

  const handlePerformCRUD = ()=>{
    navigate('/performCRUD');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1a1a1a] text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
      
      {authUser && (
        <div className="mb-6">
          <p><strong>Logged in as:</strong> {authUser.email || authUser.displayName}</p>
        </div>
      )}

      <button 
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 rounded hover:bg-red-600 transition"
      >
        Logout
      </button> 

      <button onClick={handlePerformCRUD}> 
        Perform CRUD Operations
      </button>
    </div>
  );
};

export default HomePage;
