import React, { useState } from 'react';
import farfly from '../../../assets/Firefly.png';
import { profileData } from '../../../apiConfig/axiosConfig/axiosClientConfig';
import { Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLO } from '../../../redux/slices/userSlice';
import LogOutButton from '../userLog/logOutButton';

function Navbar() {
    const [isuser, setIsuser] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const HandleLogout = () => {
        localStorage.removeItem('Token')
        dispatch(userLO())
    }

    let userLogined = [
        { label: <a onClick={() => { navigate('/profile') }} className="font-semibold text-gray-700 hover:text-teal-500 transition-colors">Profile</a>, key: '0' },
        { label: <a onClick={() => { navigate('/partner/partnerlogin') }} className="font-semibold text-gray-700 hover:text-teal-500 transition-colors">Login Partner</a>, key: '1' },
        { label: <a onClick={() => { HandleLogout() }} className="font-semibold text-red-500 hover:text-red-600 transition-colors"> Logout</a>, key: '2' },
    ];

    let noUser = [
        { label: <a onClick={() => { navigate('/login') }} className="font-semibold text-gray-700 hover:text-teal-500 transition-colors">Login</a>, key: '0' },
        { label: <a onClick={() => { navigate('/partner/partnerlogin') }} className="font-semibold text-gray-700 hover:text-teal-500 transition-colors">Login Partner</a>, key: '1' },
        { label: <a onClick={() => { navigate('/SignUp') }} className="font-semibold text-gray-700 hover:text-teal-500 transition-colors">Register</a>, key: '2' },
    ];

    const handleProfile = async () => {
        await profileData().then((re) => {
            re.data.user ? setIsuser(true) : setIsuser(false)
        })
    }

    const handleAuth = (a) => {
        console.log(a, 'this sisjs')
    }
    const menuItems = isuser ? userLogined : noUser;

    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-gray-900/80 backdrop-blur-lg border-b border-white/10 transition-all duration-300 font-sans">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a onClick={() => navigate('/')} className="flex items-center cursor-pointer group">
                    {/* <img src={farfly} className="h-10 mr-3 transform group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" alt="Farefly Logo" /> */}
                    <span className="self-center text-2xl font-extrabold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 tracking-tight hidden sm:block">Farefly</span>
                </a>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800/90 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent backdrop-blur-md md:backdrop-blur-none">
                        <li>
                            <a onClick={() => { navigate('/') }} className="block py-2 pl-3 pr-4 text-white hover:text-teal-400 rounded md:bg-transparent md:p-0 transition-colors cursor-pointer font-semibold relative overflow-hidden group">
                                Home
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => { navigate('/partner/joinus') }} className="block py-2 pl-3 pr-4 text-gray-300 hover:text-teal-400 rounded md:bg-transparent md:p-0 transition-colors cursor-pointer font-semibold relative overflow-hidden group" >
                                Join Us
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => { navigate('/coupon') }} className="block py-2 pl-3 pr-4 text-gray-300 hover:text-teal-400 rounded md:bg-transparent md:p-0 transition-colors cursor-pointer font-semibold relative overflow-hidden group" >
                                Coupon
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                            </a>
                        </li>
                        <li className="flex items-center ml-4">
                            <Dropdown overlay={
                                <Menu className="rounded-xl shadow-xl overflow-hidden mt-2 p-1 border border-gray-100">
                                    {menuItems.map((item) => (
                                        <Menu.Item key={item.key} className="py-2 px-4 hover:bg-teal-50 rounded-lg transition-colors">{item.label}</Menu.Item>
                                    ))}
                                </Menu>
                            } trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()} className="cursor-pointer flex items-center justify-center">
                                    <div
                                        onClick={() => handleProfile()}
                                        className="relative w-10 h-10 overflow-hidden bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.6)] transform hover:scale-105 transition-all duration-300 flex items-center justify-center p-[2px]"
                                    >
                                        <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
                                            <svg className="w-6 h-6 text-gray-300 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
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
