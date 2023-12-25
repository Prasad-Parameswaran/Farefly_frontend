import { Routes, Route } from 'react-router-dom'
import AdminLogin from "../components/admin/adminLog/adminLogin";
import AdminDash from '../components/admin/adminDashboad/adminDash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLG } from '../redux/slices/adminSlice';
import CarList from '../components/admin/tables/carList';


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
                <Route path='/adminlogin' element={admin ? <AdminDash /> : < AdminLogin />} />
                <Route path='/admindash' element={admin ? <AdminDash /> : <AdminLogin />} />
                <Route path='/carlist' element={<CarList />} />
            </Routes>

        </div >
    )
}

export default Admin;