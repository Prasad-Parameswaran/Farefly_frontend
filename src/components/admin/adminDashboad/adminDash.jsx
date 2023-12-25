import React, { useState } from 'react'
import UserLists from '../tables/userList'
import PartnerList from '../tables/partnerList'
import { useNavigate } from 'react-router-dom'
import { adminLO } from '../../../redux/slices/adminSlice'
import PartnerUnvarified from '../tables/partnerUnvarified'
import { useDispatch } from 'react-redux'
import CarList from '../tables/carList'

function AdminDash() {

    const [page, setPage] = useState('dashboad')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        dispatch(adminLO())
        navigate('/admin/adminLogin')
    }
    const handleclick = (x) => {

        switch (x) {
            case 'dashboad':
                setPage('dashboad')
                break;
            case 'user':
                setPage('user')
                break;

            case 'partner':
                setPage('partner')
                break;
            case 'cars':
                setPage('cars')

                break;
            case 'booking':
                setPage('booking')
                break;
            case 'partnerRequest':
                setPage('partnerRequest')
                break;
            case 'userRequest':
                setPage('userRequest')
                break;
        }
    }


    return (
        <div className="flex h-screen  font-sans bg-gray-100 ">

            {/* Sidebar */}
            <div className="bg-gray-800 text-white w-16 lg:w-64 p-4 fixed inset-0 lg:relative lg:flex lg:flex-col lg:justify-between ">
                <div>
                    <h1 className="text-2xl font-semibold mb-4 lg:mb-6">Admin Dashboard</h1>
                    <ul className='p-3 w-full'>
                        <li className={page == "dashboad" ? "w-full h-10 bg-gray-300 flex justify-center items-center  text-black cursor-pointer" : "w-full h-10 hover:bg-gray-300 flex justify-center items-center text-blue-300  hover:text-black cursor-pointer"} >
                            <a onClick={() => { handleclick('dashboad') }}  >Dashboad</a>
                        </li>
                        <li className={page == "user" ? "w-full h-10 bg-gray-300 flex justify-center items-center  text-black cursor-pointer" : "w-full h-10 hover:bg-gray-300 flex justify-center items-center text-blue-300  hover:text-black cursor-pointer"}>

                            <a onClick={() => { handleclick('user') }} > Users</a>
                        </li>
                        <li className={page == "partner" ? "w-full h-10 bg-gray-300 flex justify-center items-center  text-black cursor-pointer" : "w-full h-10 hover:bg-gray-300 flex justify-center items-center text-blue-300  hover:text-black cursor-pointer"}>
                            <a onClick={() => { handleclick('partner') }} >Patners</a>
                        </li>
                        <li className={page == "cars" ? "w-full h-10 bg-gray-300 flex justify-center items-center  text-black cursor-pointer" : "w-full h-10 hover:bg-gray-300 flex justify-center items-center text-blue-300  hover:text-black cursor-pointer"}>
                            <a onClick={() => { handleclick('cars') }} >Cars</a>
                        </li>
                        <li className={page == "booking" ? "w-full h-10 bg-gray-300 flex justify-center items-center  text-black cursor-pointer" : "w-full h-10 hover:bg-gray-300 flex justify-center items-center text-blue-300  hover:text-black cursor-pointer"}>
                            <a onClick={() => { handleclick('booking') }} >Booking</a>
                        </li>
                        <li className={page == "partnerRequest" ? "w-full h-10 bg-gray-300 flex justify-center items-center  text-black cursor-pointer" : "w-full h-10 hover:bg-gray-300 flex justify-center items-center text-blue-300  hover:text-black cursor-pointer"}>
                            <a onClick={() => { handleclick('partnerRequest') }} >Patner Request</a>
                        </li>
                        {/*<li className={page == "dashboad" ? "w-full h-10 bg-gray-300 flex justify-center items-center  text-black cursor-pointer" : "w-full h-10 hover:bg-gray-300 flex justify-center items-center text-blue-300  hover:text-black cursor-pointer"}>*/}

                        {/*<a onClick={() => { handleclick('userRequest') }} > Users Request</a>*/}
                        {/*</li>*/}
                    </ul>
                </div>
                <div className="hidden lg:block">
                    <a onClick={() => { handleLogout() }} className="text-blue-300 hover:text-white cursor-pointer" > Logout</a>
                </div>
            </div >

            {/* Main Content */}
            < div className="flex-1 flex flex-col overflow-hidden pl-0 " >

                {/* Navigation Bar */}
                < nav className="bg-gray-800 p-4 text-white w-full flex justify-center text-center" >
                    {/*<div className="container mx-auto">*/}
                    < h1 className="text-2xl font-semibold" > Firefly</h1 >
                    {/*</div>*/}
                </nav >

                {/* Content Area */}
                < div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-400 p-4" >
                    <div className="container mx-auto mt-4">
                        <div>
                            {
                                page === 'dashboad' ? <h1>dashboard</h1> : null
                            }
                            {
                                page === 'user' ? <UserLists /> : null
                            }
                            {
                                page === 'partner' ? <PartnerList /> : null
                            }
                            {
                                page === 'cars' ? <CarList /> : null
                            }
                            {
                                page === 'booking' ? <h1>booking</h1> : null
                            }
                            {
                                page === 'partnerRequest' ? <PartnerUnvarified /> : null
                            }
                            {
                                page === 'userRequest' ? <h1>booking</h1> : null
                            }
                        </div>

                    </div>

                </div >
            </div >
        </div >
    )
}


export default AdminDash
