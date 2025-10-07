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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/forget' element={<Forget/>}/>
        <Route path='/seat' element={<SeatDesign/>}/>
        <Route path='/search' element={<BusSearch/>}/>
      </Routes>
    </>
  )
}

export default App
