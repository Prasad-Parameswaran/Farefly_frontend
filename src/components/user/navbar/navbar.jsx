import React, { useState } from 'react';
import farfly from '../../../assets/Firefly.png';
import { profileData } from '../../../apiConfig/axiosConfig/axiosClientConfig';
import { Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLO } from '../../../redux/slices/userSlice';




function Navbar() {
    const [isuser, setIsuser] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        localStorage.removeItem('Token')
        dispatch(userLO())

    }
    let userLogined = [
        { label: <a onClick={() => { navigate('/profile') }}>Profile</a>, key: '0' },
        //{ label: <a>Wallet</a>, key: '1' },
        { label: <a>Bookings</a>, key: '2' },
        { label: <a a onClick={() => { navigate('/partner/partnerlogin') }}>Login Partner</a>, key: '3' },
        {
            label: <a onClick={() => { handleLogout() }}> Logout</ a >, key: '4'
        },
    ];

    let noUser = [
        { label: <a onClick={() => { navigate('/login') }}>Login</a>, key: '0' },
        { label: <a onClick={() => { navigate('/partner/partnerlogin') }}>Login Partner</a>, key: '1' },
        { label: <a onClick={() => { navigate('/SignUp') }}>Register</a>, key: '2' },
    ];

    //const [isDropdownOpen, setDropdownOpen] = useState(false);
    const handleProfile = async () => {
        await profileData().then((re) => {
            re.data.user ? setIsuser(true) : setIsuser(false)

        }
        )
    }
    const menuItems = isuser ? userLogined : noUser;

    return (
        <nav class=" bg-white border-gray-200 dark:bg-black" >
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" class="flex items-center">
                    <img src={farfly} class=" h-10 mr-3" alt="Flowbite Logo" />
                    {/*<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>*/}
                </a>


                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a onClick={() => { navigate('/') }} class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 cursor-pointer " aria-current="page">Home</a>
                        </li>
                        {/*<li>
                            <a onClick={() => { navigate('/cars') }} class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer ">Cars</a>
                        </li>*/}
                        <li>
                            <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer ">About</a>
                        </li>
                        <li>
                            {/*<a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer ">blog</a>*/}
                        </li>
                        <li>
                            <a onClick={() => { navigate('/partner/joinus') }} class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer " > Join Us</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer ">Offers</a>
                        </li>
                        <li>
                            <Dropdown pdown
                                overlay={
                                    <Menu>
                                        {menuItems.map((item) => (
                                            <Menu.Item key={item.key}>{item.label}</Menu.Item>
                                        ))}
                                    </Menu>
                                }
                                trigger={['click']}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <div
                                        onClick={() => {
                                            handleProfile();
                                        }}
                                        className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                                    >
                                        <svg
                                            className="absolute w-12 h-12 text-gray-400 -left-1 cursor-pointer "
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </a>
                            </Dropdown>
                        </li>

                    </ul>
                </div>
            </div >
        </nav >

    )
}

export default Navbar



