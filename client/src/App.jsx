import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import UserProfile from './Components/User/Profile/UserProfile';
import ProtectedRoute from './Components/Auth/AuthChecker';
import Maize from './Components/Crops/Maize/Maize';
import Tomato from './Components/Crops/Tomato/Tomato';

function App() {
  const theme = useSelector(state => state.Theme.currentTheme);
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/crops/maize" element={<Maize />} />
        <Route path="/crops/tomato" element={<Tomato />} />
        <Route path="/u/profile" element={<ProtectedRoute element={<UserProfile />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
