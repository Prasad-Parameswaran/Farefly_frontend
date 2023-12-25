import { Routes, Route } from 'react-router-dom'
import Login from '../components/user/userLog/login'
import SignUp from "../components/user/userSignup/signUp";
import Otp from '../components/user/otp/otp'
import Home from '../components/user/userHome/home'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserLG } from '../redux/slices/userSlice';
import UserProfile from '../../src/components/user/userProfile/userProfile'
import Cars from '../../src/components/user/cars/carsList'
import ForgotOtp from '../../src/components/user/forgotOtp/forgotOtp'
import Create from '../components/user/create/create'
import Booking from '../components/user/booking/booking'
import Edit from '../../src/components/user/userProfile/editProfile'
import BookingSuccessfull from '../components/user/booking/bookingSuccess';
import Orderlist from '../components/user/orderList/orderList'

function User() {
    const [userToken, setuserToken] = useState()
    const dispatch = useDispatch()
    const user = useSelector((value) => {
        return value.users.userSlice.userToken
    })
    useEffect(() => {
        const checkData = localStorage.getItem('Token')
        setuserToken(checkData)
        dispatch(UserLG(checkData))
    }, [user])


    return (
        <div >
            <Routes>
                <Route path='/login' element={!userToken ? < Login /> : <Home />} />
                <Route path='/SignUp' element={!userToken ? < SignUp /> : <Home />} />
                <Route path='/otp' element={<Otp />} />
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<UserProfile />} />
                <Route path='/cars' element={userToken ? <Cars /> : <Login />} />
                <Route path='/forgotOtp' element={<ForgotOtp />} />
                <Route path='/view' element={<Create />} />
                <Route path='/booking' element={<Booking />} />
                <Route path='/edit' element={<Edit />} />
                <Route path='/BookingSuccessfull' element={<BookingSuccessfull />} />
                <Route path='/orderlist' element={<Orderlist />} />


            </Routes>

        </div >
    )
}

export default User;