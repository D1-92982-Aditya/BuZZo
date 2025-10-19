import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes ,Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/SignUp/Signup'
import Forget from './pages/Forget/Forget'
import SeatDesign from './pages/SeatDesign/SeatDesign'
import BusSearch from './pages/BusSearch/BusSearch'
import SelectBus from './pages/SelectBus/SelectBus'
import Payment from './pages/Payment/Payment'
import TopNav from './pages/Navbar/Navbar'
import MainLayout from './pages/Navbar/MainLayout'
import Help from './pages/Help/Help'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       
      <Routes>
        <Route element={<MainLayout/>}>
        <Route path='/seat' element={<SeatDesign/>}/>
        <Route path='/search' element={<BusSearch/>}/>
        <Route path='/select-bus' element={<SelectBus/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/help' element={<Help/>}/>
          
        </Route>
        <Route>
          <Route path='/' element={<Login/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/forget' element={<Forget/>}/>
        </Route>
        
      </Routes>
    </>
  )
}

export default App

