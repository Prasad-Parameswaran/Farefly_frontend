import React from 'react'
import farfly from '../../../assets/Firefly.png';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate()
    return (
        <footer className="bg-gray-900 border-t border-white/10 pt-16 pb-8 font-sans mt-auto">
            <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
                <div className="md:flex md:justify-between mb-12">
                    <div className="mb-8 md:mb-0 max-w-sm">
                        <a onClick={() => navigate('/')} className="flex items-center cursor-pointer mb-4">
                            {/* <img src={farfly} className="h-10 me-3 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" alt="Farefly Logo" /> */}
                            <span className="self-center text-3xl font-extrabold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 tracking-tight">Farefly</span>
                        </a>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Experience the premium way to rent a car. Discover a seamless journey with exclusive deals, top-tier vehicles, and dedicated support.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">Quick Links</h2>
                            <ul className="text-gray-400 font-medium space-y-4">
                                <li>
                                    <a onClick={() => navigate('/')} className="hover:text-teal-400 transition-colors cursor-pointer inline-flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 opacity-0 hover:opacity-100 transition-opacity"></span> Home
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => navigate('/coupon')} className="hover:text-teal-400 transition-colors cursor-pointer inline-flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 opacity-0 hover:opacity-100 transition-opacity"></span> Coupon
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">Business</h2>
                            <ul className="text-gray-400 font-medium space-y-4">
                                <li>
                                    <a onClick={() => navigate('/partner/joinus')} className="hover:text-teal-400 transition-colors cursor-pointer inline-flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 opacity-0 hover:opacity-100 transition-opacity"></span> Join us
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => navigate('/partner/partnerlogin')} className="hover:text-teal-400 transition-colors cursor-pointer inline-flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 opacity-0 hover:opacity-100 transition-opacity"></span> Partner Login
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">Account</h2>
                            <ul className="text-gray-400 font-medium space-y-4">
                                <li>
                                    <a onClick={() => navigate('/profile')} className="hover:text-teal-400 transition-colors cursor-pointer inline-flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 opacity-0 hover:opacity-100 transition-opacity"></span> Profile
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => navigate('/login')} className="hover:text-teal-400 transition-colors cursor-pointer inline-flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 opacity-0 hover:opacity-100 transition-opacity"></span> Login
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-gray-800" />

                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">© 2024 <a href="/" className="hover:text-teal-400 transition-colors">Farefly™</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-6">
                        <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors transform hover:scale-110">
                            <span className="sr-only">Facebook page</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 8 19">
                                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors transform hover:scale-110">
                            <span className="sr-only">Twitter page</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 17">
                                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors transform hover:scale-110">
                            <span className="sr-only">Instagram page</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer