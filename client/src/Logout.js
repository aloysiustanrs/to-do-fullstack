// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      // Perform logout actions (e.g., clear local storage)
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to the login page
      navigate('/');
    };

    // Call the handleLogout function when the component mounts
    handleLogout();
  }, [navigate]);

  // You can also return some UI elements here if needed
  return (
    <div>
      <h1>Logging Out...</h1>
      {/* You can add a loading spinner or a message here if needed */}
    </div>
  );
};

export default Logout;
