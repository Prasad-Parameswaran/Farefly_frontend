import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/user/userLog/login";
import SignUp from "./components/user/userSignup/signUp";
import AdminLogin from "./components/admin/adminLog/adminLogin";
import Otp from './components/user/otp/otp'
import Joinus from './components/user/joinUs/Joinus'
import Home from './components/user/userHome/home'
import AdminDash from './components/admin/adminLog/adminDashboad/adminDash';
import { useEffect, useState } from 'react';




function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    const checkData = localStorage.getItem('Token')
    setUser(checkData)
  }, [user])


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={!user ? < Login /> : <Home />} />
          <Route path='/SignUp' element={!user ? < SignUp /> : <Home />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/' element={<Home />} />
          <Route path='/joinus' element={<Joinus />} />
          <Route path='/admindash' element={<AdminDash />} />

        </Routes>
      </Router>

    </div >
  )
}

export default App;
