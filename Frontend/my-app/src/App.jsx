import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/Login/Login';
import Signup from './pages/SignUp/Signup';
import Forget from './pages/Forget/Forget';
import SeatDesign from './pages/SeatDesign/SeatDesign';
import BusSearch from './pages/BusSearch/BusSearch';
import SelectBus from './pages/SelectBus/SelectBus';
import Payment from './pages/Payment/Payment';
import MainLayout from './pages/Navbar/MainLayout';
import Help from './pages/Help/Help';
import NoBusAvailable from './pages/Nobus/Nobus';
import Ticket from './pages/Tickit/Ticket';
import { BusProvider } from './pages/BusContext/BusContext';
import Dashboard from './admin/pages/Dashboard';
import About from './pages/About/About';
import Mybooking from './pages/MyBooking/Mybooking';
import ContactPage from './pages/Contact/Contact';

import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <BusProvider>
      <Routes>

        {/* 🔐 PROTECTED USER ROUTES */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path='/seat' element={<SeatDesign/>}/>
          <Route path='/search' element={<BusSearch/>}/>
          <Route path='/select-bus' element={<SelectBus/>}/>
          <Route path='/no-bus' element={<NoBusAvailable/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/ticket' element={<Ticket/>}/>
          <Route path='/help' element={<Help/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/bookings' element={<Mybooking/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
        </Route>

        {/* 🌍 PUBLIC ROUTES */}
        <Route path='/' element={<Login/>}/>
        <Route path="/admin/login" element={<Login />} />
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/forget' element={<Forget/>}/>

        {/* 👮 ADMIN */}
        <Route path='/admin/login/dashboard' element={<Dashboard/>}/>

      </Routes>
    </BusProvider>
  );
}

export default App;
