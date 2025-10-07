import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes ,Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/SignUp/Signup'
import Forget from './pages/Forget/Forget'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/forget' element={<Forget/>}/>
      </Routes>
    </>
  )
}

export default App
