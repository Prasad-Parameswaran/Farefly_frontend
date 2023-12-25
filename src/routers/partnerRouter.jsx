import { Routes, Route } from 'react-router-dom'
import Joinus from '../components/user/joinUs/Joinus'
import PartnerLogin from '../components/partner/partnerLogin';
import PartnerHome from '../components/partner/partnerHome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { partnerLG } from '../redux/slices/partnerSlice';
import CarDetailsForm from '../components/partner/addCar'



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
                <Route path='/joinus' element={<Joinus />} />
                <Route path='/partnerlogin' element={partnerToken ? <PartnerHome /> : <PartnerLogin />} />
                <Route path='/partnerHome' element={partnerToken ? <PartnerHome /> : < PartnerLogin />} />
                <Route path='/addCar' element={partnerToken ? < CarDetailsForm /> : < PartnerLogin />} />
            </Routes>
        </div >
    )
}

export default Partner;