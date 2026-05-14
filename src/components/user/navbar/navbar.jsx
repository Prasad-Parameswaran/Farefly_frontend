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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const HandleLogout = () => {
        localStorage.removeItem('Token')
        dispatch(userLO())
    }

    let userLogined = [
        { name: 'Profile', onClick: () => navigate('/profile'), key: '0' },
        { name: 'Login Partner', onClick: () => navigate('/partner/partnerlogin'), key: '1' },
        { name: 'Logout', onClick: HandleLogout, key: '2' },
    ];

    let noUser = [
        { name: 'Login', onClick: () => navigate('/login'), key: '0' },
        { name: 'Login Partner', onClick: () => navigate('/partner/partnerlogin'), key: '1' },
        { name: 'Register', onClick: () => navigate('/SignUp'), key: '2' },
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

    // Call profile whenever it's opened in mobile 
    const toggleMobileMenu = () => {
        handleProfile();
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-gray-900/80 backdrop-blur-lg border-b border-white/10 transition-all duration-300 font-sans">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a onClick={() => navigate('/')} className="flex items-center cursor-pointer group">
                    <span className="self-center text-2xl font-extrabold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 tracking-tight block">Farefly</span>
                </a>

                {/* Mobile Hamburger Button */}
                <div className="flex md:hidden">
                    <button 
                        onClick={toggleMobileMenu} 
                        type="button" 
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>

                <div className={`items-center justify-between ${isMobileMenuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1 transition-all duration-300`} id="navbar-user">
                    <ul className="w-full flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800/90 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent backdrop-blur-md md:backdrop-blur-none">
                        <li>
                            <a onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }} className="block py-2 pl-3 pr-4 text-white hover:text-teal-400 rounded md:bg-transparent md:p-0 transition-colors cursor-pointer font-semibold relative overflow-hidden group">
                                Home
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => { navigate('/partner/joinus'); setIsMobileMenuOpen(false); }} className="block py-2 pl-3 pr-4 text-gray-300 hover:text-teal-400 rounded md:bg-transparent md:p-0 transition-colors cursor-pointer font-semibold relative overflow-hidden group" >
                                Join Us
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => { navigate('/coupon'); setIsMobileMenuOpen(false); }} className="block py-2 pl-3 pr-4 text-gray-300 hover:text-teal-400 rounded md:bg-transparent md:p-0 transition-colors cursor-pointer font-semibold relative overflow-hidden group" >
                                Coupon
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                            </a>
                        </li>
                        
                        {/* Mobile options from userLogined/noUser */}
                        <li className="md:hidden mt-4 border-t border-gray-700 pt-4">
                            <ul className="flex flex-col space-y-2">
                                {menuItems.map((item) => (
                                    <li key={item.key}>
                                        <a onClick={() => { item.onClick(); setIsMobileMenuOpen(false); }} className="block py-2 pl-3 pr-4 text-gray-300 hover:text-teal-400 rounded md:bg-transparent md:p-0 transition-colors cursor-pointer font-semibold relative overflow-hidden group">
                                            {item.name}
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        {/* Desktop Profile Icon */}
                        <li className="hidden md:flex items-center ml-4">
                            <Dropdown overlay={
                                <Menu className="rounded-xl shadow-xl overflow-hidden mt-2 p-1 border border-gray-100">
                                    {menuItems.map((item) => (
                                        <Menu.Item key={item.key} className="py-2 px-4 hover:bg-teal-50 rounded-lg transition-colors">
                                            <a onClick={item.onClick} className={`font-semibold transition-colors block w-full py-1 ${item.name === 'Logout' ? 'text-red-500 hover:text-red-600' : 'text-gray-700 hover:text-teal-500'}`}>
                                                {item.name}
                                            </a>
                                        </Menu.Item>
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
