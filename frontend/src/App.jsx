import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Navbar from "./components/Navbar.jsx"
import Homepage from "./components/features/Homepage.jsx";
import Profile from './pages/Profile.jsx'

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFoundPage from "./components/features/NotFoundPage.jsx";
import AddPost from "./pages/AddPost.jsx";
import SubFrenz from "./pages/SubFrenz.jsx";
import EditPost from "./pages/EditPost.jsx";
import PostPage from "./pages/PostPage.jsx";
import Notifications from "./pages/Notifications.jsx";
import Settings from "./pages/Settings.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import SavedPost from './pages/SavedPost.jsx';
import OtherUserProfil from './pages/OtherUserProfil.jsx';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-base-100">
      {!hideNavbar && <Navbar />}
      <main className="w-full lg:px-8 sm:px-6 pt-3">
        <Routes>
          <Route path="/f/:thematique" element={<SubFrenz />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/editprofile/:id" element={<EditProfile />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:id' element={<OtherUserProfil />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/editpost/:id" element={<EditPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/savedPost" element={<SavedPost />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;