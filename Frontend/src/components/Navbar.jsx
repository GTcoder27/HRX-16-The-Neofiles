import React, { useState } from 'react';
import Logo from '../../public/logo.svg';
import { useFirebase } from '../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [currentPage, setCurrentPage] = useState('Home');
  const navigate = useNavigate();

  return (
    <header className="w-[100%] bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 cursor-pointer group focus:outline-none" tabIndex={0} onClick={() => navigate('/')} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/'); }} aria-label="Go to Home">
            <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center group-hover:scale-105 transition">
              <img src={Logo} alt="Logo" className="w-8 h-8 lg:w-10 lg:h-10 object-contain" />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-lg lg:text-xl font-bold text-left">
                <span
                  className="bg-clip-text text-transparent text-left"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #22d3ee, #34d399, #3b82f6, #f472b6)',
                  }}
                >
                  Svādhyāya

                </span>
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">Where curiosity meets creation</p>
            </div>
          </div>



          {/* Right Side Controls */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Profile Initial Circle with Dropdown */}
            {(() => {
              const { authUser, logout } = useFirebase();
              const navigate = useNavigate();
              const email = authUser?.email || '';
              const initial = email ? email[0].toUpperCase() : '?';
              const [open, setOpen] = React.useState(false);
              const menuRef = React.useRef();

              // Close dropdown on outside click
              React.useEffect(() => {
                function handleClick(e) {
                  if (menuRef.current && !menuRef.current.contains(e.target)) {
                    setOpen(false);
                  }
                }
                if (open) document.addEventListener('mousedown', handleClick);
                return () => document.removeEventListener('mousedown', handleClick);
              }, [open]);

              const handleLogout = async () => {
                await logout();
                setOpen(false);
              };

              return (
                <div className="relative flex items-center" ref={menuRef}>
                  <button
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg focus:outline-none"
                    onClick={() => setOpen((v) => !v)}
                  >
                    {initial}
                  </button>
                  {open && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 rounded-xl shadow-lg z-50 py-3 px-4 text-slate-200 border border-slate-700 animate-fade-in">
                      <div className="mb-2">
                        <button
                          type="button"
                          className="w-full flex justify-center items-center px-4 py-2 rounded-lg bg-slate-800 text-slate-200 font-semibold hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                          onClick={() => { navigate('/userdetails'); setOpen(false); }}
                        >
                          User Details
                        </button>
                        <div className="text-xs text-gray-500 break-all">{email}</div>
                      </div>
                      <button
                        className="w-full mt-2 py-2 px-4 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:from-pink-500 hover:to-red-500 transition"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>


      </div>
    </header>
  );
};