import { Routes, Route } from 'react-router-dom'
import AdminLogin from "../components/admin/adminLog/adminLogin";
import AdminDash from '../components/admin/adminDashboad/adminDash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLG } from '../redux/slices/adminSlice';
import CarList from '../components/admin/tables/carList';
import Coupon from '../components/admin/tables/coupon';
import Page404notfind from '../components/errorPage/page404'
import ServerErr from '../components/errorPage/page500'



function Admin() {
    const [adminToken, setadminToken] = useState()
    const dispatch = useDispatch()
    const admin = useSelector((value) => {
        return value.admin.adminSlice.adminToken
    })
    useEffect(() => {
        if (!admin) {
            const checkAdmin = localStorage.getItem('adminToken')
            setadminToken(checkAdmin)
            dispatch(adminLG(checkAdmin))
        }

    }, [admin])



    return (
        <div >
            <Routes>
                <Route path="/*" element={<Page404notfind />} />
                <Route path='/adminlogin' element={admin ? <AdminDash /> : < AdminLogin />} />
                <Route path='/admindash' element={admin ? <AdminDash /> : <AdminLogin />} />
                <Route path='/carlist' element={admin ? < CarList /> : <AdminLogin />} />
                <Route path='/Coupon' element={admin ? < Coupon /> : <AdminLogin />} />
                <Route path="/error404" element={<Page404notfind />} />
                <Route path="/error500" element={<ServerErr />} />
            </Routes>

        </div >
    )
}

export default Admin;