import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";


import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();
 const {theme} = useThemeStore();
 
console.log((onlineUsers));

useEffect(()=>{
  checkAuth();
},[checkAuth]);


if(isCheckingAuth && !authUser) return (

<div className="loader-container">
  <div className="spinner-group">
    <div className="spinner" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div className="spinner" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div className="spinner" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
</div>


);

console.log({ authUser});

  return (
    <div data-theme={theme}>
       <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage />: <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" /> } />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" /> } />
      </Routes>

      <Toaster/>
    </div>
  );
};

export default App;
