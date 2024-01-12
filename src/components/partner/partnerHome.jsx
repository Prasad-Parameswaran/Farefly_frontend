import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { partnerLO } from '../../redux/slices/partnerSlice'
import PartnerProfile from './partnerProfile'
import CarDetailsForm from './addCar'
import Cars from '../partner/carListPartner'
import CarList from '../admin/tables/carList'
import Bookings from './bookings'
import PartnerChart from './partnerChart'
import PartnerSales from './salesReport'

function PartnerHome() {
    const [patnerPage, setpatnerPage] = useState('dashboad')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.removeItem('partnerToken')
        dispatch(partnerLO())
        navigate('/partner/partnerlogin')
    }

    const handleclick = (x) => {

        switch (x) {
            case 'dashboad':
                setpatnerPage('dashboad')
                break;
            case 'Profile':
                setpatnerPage('Profile')
                break;
            //case 'Chat':
            //    setpatnerPage('Chat')
            //    break;
            case 'Add car':
                setpatnerPage('Add car')
                break;
            case 'Cars List':
                setpatnerPage('Cars List')

                break;
            case 'Bookings':
                setpatnerPage('Bookings')
                break;
            case 'SalesReport':
                setpatnerPage('SalesReport')
                break;
        }
    }

    return (
        <div className="flex h-screen font-sans bg-gray-100">

            {/* Sidebar */}
            <div className="bg-slate-700 text-white w-16 lg:w-64 p-4 fixed inset-0 lg:relative lg:flex lg:flex-col lg:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold mb-4 lg:mb-6">Partner Dashboard</h1>
                    <ul className='p-3 w-full'>


                        <li className="w-full h-10 hover:bg-gray-300 flex justify-center items-center text-blue-300  hover:text-black cursor-pointer">
                            <a onClick={() => { handleclick('dashboad') }}  >Dashboad</a>
                        </li>
                        <li className="w-full h-10 hover:bg-gray-300 flex justify-center items-center  text-blue-300  hover:text-black cursor-pointer">

                            <a onClick={() => { handleclick('Profile') }} >Profile</a>
                        </li>
                        {/*<li className="w-full h-10 hover:bg-gray-300 flex justify-center items-center  text-blue-300  hover:text-black cursor-pointer">
                            <a></a>
                        </li>*/}
                        {/*<li className="w-full h-10 hover:bg-gray-300 flex justify-center items-center  text-blue-300  hover:text-black cursor-pointer">
                            <a onClick={() => { handleclick('Chat') }} >Chat</a>
                        </li>*/}
                        <li className="w-full h-10 hover:bg-gray-300 flex justify-center items-center  text-blue-300  hover:text-black cursor-pointer">
                            <a onClick={() => { handleclick('Add car') }} >Add car</a>
                        </li>
                        <li className="w-full h-10 hover:bg-gray-300 flex justify-center items-center  text-blue-300  hover:text-black cursor-pointer">
                            <a onClick={() => { handleclick('Cars List') }} >Cars List</a>
                        </li>
                        <li className="w-full h-10 hover:bg-gray-300 flex justify-center items-center  text-blue-300  hover:text-black cursor-pointer">
                            <a onClick={() => { handleclick('Bookings') }} >Bookings</a>
                        </li>
                        <li className="w-full h-10 hover:bg-gray-300 flex justify-center items-center  text-blue-300  hover:text-black cursor-pointer">
                            <a onClick={() => { handleclick('SalesReport') }} >salesReport</a>
                        </li>
                    </ul>
                </div>
                <div className="hidden lg:block">
                    <a onClick={() => { handleLogout() }} className="text-blue-300 hover:text-white cursor-pointer" > Logout</a>
                </div>
            </div >

            {/* Main Content */}
            < div className="flex-1 flex flex-col overflow-hidden pl-0 " >

                {/* Navigation Bar */}
                < nav className="bg-slate-700 p-4 text-white w-full flex justify-center text-center" >
                    {/*<div className="container mx-auto">*/}
                    < h1 className="text-2xl font-semibold" > Farefly Partner</h1 >
                    {/*</div>*/}
                </nav >

                {/* Content Area */}
                < div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4" >
                    <div className="container mx-auto mt-4">
                        <div>
                            {
                                patnerPage === 'dashboad' ? <PartnerChart /> : null
                            }
                            {
                                patnerPage === 'Profile' ? <PartnerProfile /> : null
                            }
                            {/*{
                                patnerPage === 'Chat' ? <h1>chat</h1> : null
                            }*/}
                            {
                                patnerPage === 'Add car' ? <CarDetailsForm /> : null
                            }
                            {
                                patnerPage === 'Cars List' ? <Cars /> : null
                            }
                            {
                                patnerPage === 'Bookings' ? <Bookings /> : null
                            }
                            {
                                patnerPage === 'SalesReport' ? <PartnerSales /> : null
                            }

                        </div>

                    </div>

                </div >
            </div >
        </div >
    )

}

export default PartnerHome