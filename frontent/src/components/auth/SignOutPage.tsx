import React from 'react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';

const SignOutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear localStorage
    localStorage.clear();

    // Clear cookies
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

   
    navigate('/');
    window.location.reload()
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-blue-500 mb-6">Sign Out</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to sign out from your account?
        </p>
        <div className="flex space-x-4 justify-center">
          <Link to="/user/dashboard/blogs">
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </Link>
          <Button
            variant="secondary"
            className="w-full bg-red-500 text-white hover:bg-red-600"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignOutPage;
