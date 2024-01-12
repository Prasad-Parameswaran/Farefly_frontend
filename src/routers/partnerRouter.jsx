import { Routes, Route } from 'react-router-dom'
import Joinus from '../components/user/joinUs/Joinus'
import PartnerLogin from '../components/partner/partnerLogin';
import PartnerHome from '../components/partner/partnerHome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { partnerLG } from '../redux/slices/partnerSlice';
import CarDetailsForm from '../components/partner/addCar'
import Booking from '../components/partner/bookings'
import Page404notfind from '../components/errorPage/page404'
import ServerErr from '../components/errorPage/page500'
import PartnerChart from '../components/partner/partnerChart'



function Partner() {
    const [partnerToken, setPartnerToken] = useState()
    const dispatch = useDispatch()
    const partner = useSelector((value) => {
        return value.partner.partnerSlice.partnerToken
    })
    useEffect(() => {
        const checkPartner = localStorage.getItem('partnerToken')
        setPartnerToken(checkPartner)
        dispatch(partnerLG(checkPartner))
    }, [partner])


    return (
        <div>
            <Routes>
                <Route path="/*" element={<Page404notfind />} />
                <Route path='/joinus' element={<Joinus />} />
                <Route path='/partnerlogin' element={partnerToken ? <PartnerHome /> : <PartnerLogin />} />
                <Route path='/partnerHome' element={partnerToken ? <PartnerHome /> : < PartnerLogin />} />
                <Route path='/addCar' element={partnerToken ? < CarDetailsForm /> : < PartnerLogin />} />
                <Route path='/bookings' element={partnerToken ? < Booking /> : < PartnerLogin />} />
                <Route path="/error404" element={<Page404notfind />} />
                <Route path="/error500" element={<ServerErr />} />
                <Route path="/partnerChart" element={<PartnerChart />} />
            </Routes>
        </div >
    )
}

export default Partner;