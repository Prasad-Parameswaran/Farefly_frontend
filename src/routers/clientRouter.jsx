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
import Coupon from '../components/user/coupon/coupon'
import Chat from '../components/user/chat/chat';
import Page404notfind from '../components/errorPage/page404'
import ServerErr from '../components/errorPage/page500'
import Map from '../../src/components/user/map/carLocation'

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
                <Route path="/*" element={<Page404notfind />} />
                <Route path='/login' element={!userToken ? < Login /> : <Home />} />
                <Route path='/SignUp' element={!userToken ? < SignUp /> : <Home />} />
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={userToken ? < UserProfile /> : < Login />} />
                <Route path='/cars' element={userToken ? <Cars /> : <Login />} />
                <Route path='/forgotOtp' element={<ForgotOtp />} />
                <Route path='/booking' element={userToken ? < Booking /> : <Login />} />
                <Route path='/edit' element={userToken ? < Edit /> : <Login />} />
                <Route path='/BookingSuccessfull' element={userToken ? < BookingSuccessfull /> : <Login />} />
                <Route path='/orderlist' element={userToken ? < Orderlist /> : <Login />} />
                <Route path='/otp' element={< Otp />} />
                <Route path='/coupon' element={userToken ? < Coupon /> : <Login />} />
                <Route path='/chat' element={userToken ? < Chat /> : <Login />} />
                <Route path="/error404" element={<Page404notfind />} />
                <Route path="/error500" element={<ServerErr />} />
                {/*<Route path="/map" element={<ServerErr />} />*/}
                <Route path="/map2" element={< Map />} />
            </Routes>

        </div >
    )
}

export default User;