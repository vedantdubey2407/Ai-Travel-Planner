import React, { useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <header className="p-4 shadow-md bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-10" />
          <span className="text-xl font-bold text-white">Travel Planner</span>
        </a>

        {/* Navigation */}
<div className="flex items-center gap-6">
  <a
    href="/create-trip"
    className="bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
  >
    Create Trip
  </a>
  <a
    href="/my-trips"
    className="bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
  >
    My Trips
  </a>

  {/* User Section */}
  {user ? (
    <div className="flex items-center gap-4">
      <div className="relative group">
        <img
          src={user?.picture}
          alt="User Avatar"
          className="h-10 w-10 rounded-full object-cover border-2 border-white cursor-pointer"
        />
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg hidden group-hover:block">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              googleLogout();
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <button
      onClick={() => setOpenDialog(true)}
      className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:from-purple-600 hover:to-purple-700 transition-all"
    >
      Sign In
    </button>
  )}
</div>
      </div>

      {/* Dialog for Sign In */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Sign In Required</h2>
            <img src="/logo.svg" alt="App Logo" className="mx-auto my-4" />
            <p className="text-gray-600 mb-4">Sign in to the App with Google authentication securely.</p>
            <button
              onClick={() => {
                setOpenDialog(false);
                setTimeout(() => login(), 200);
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700"
            >
              <FcGoogle className="h-6 w-6" />
              Sign In with Google
            </button>
            <button
              onClick={() => setOpenDialog(false)}
              className="w-full mt-4 text-purple-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;