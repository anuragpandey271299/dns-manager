import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './Components/DashboardPage';
import LoginUser from './Components/LoginUser';
import SignupUser from './Components/SignupUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginUser/>} />
        <Route path='/' element={<SignupUser/>} />
        <Route path='/dashboard' element={<DashboardPage/>} />
      </Routes>
      <ToastContainer position='top-center'/>
    </BrowserRouter>

  );
}

export default App;
