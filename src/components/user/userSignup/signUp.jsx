import React, { useState } from 'react'
import img from '../../../assets/Premium Vector _ Rental car deal logo template design vector.jpeg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const validateForm = () => {
        const newErrors = {};
        if (firstName.trim() === '') newErrors.firstName = 'First name is required';
        if (lastName.trim() === '') newErrors.lastName = 'Last name is required';
        if (phone.trim() === '') newErrors.phone = 'Phone is required';
        if (email.trim() === '' || !email.includes('@')) newErrors.email = 'Valid email is required';
        if (password.trim() === '') newErrors.password = 'Password is required';
        if (repassword.trim() === '' || repassword !== password) newErrors.repassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const userDetails = { firstName, lastName, phone, email, password, repassword };
            console.log('Attempting signup with userDetails:', userDetails);

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`, { email, phone }).then((response) => {
                console.log('Signup response:', response);
                if (response.data.success) {
                    navigate('/otp', { state: { userDetails: userDetails, otp: response.data.otp } })
                } else {
                    toast.error('User is already exist')
                }
            }).catch((error) => {
                console.error('Signup error:', error);
                console.error('Error message:', error.message);
                if (error.response) {
                    console.error('Error response status:', error.response.status);
                    console.error('Error response data:', error.response.data);
                }
            })
        } else {
            console.log('Form is not valid. Please fix the errors.');
        }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 min-h-screen w-full bg-gray-900 text-gray-100 font-sans'>
            <div className='hidden sm:block relative overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10 w-full h-full"></div>
                <img className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000 ease-in-out' src={img} alt="Premium Rental" />
                <div className="absolute bottom-16 left-12 z-20 text-white">
                    <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Farefly</span></h2>
                    <p className="text-lg text-gray-300 max-w-md leading-relaxed">Experience a seamless, premium car rental journey. Unlock exclusive deals today.</p>
                </div>
            </div>
            <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col justify-center px-6 py-10 sm:py-0 relative overflow-hidden'>
                {/* Decorative blobs */}
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

                <form className='max-w-[450px] w-full mx-auto bg-white/5 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative z-10'>
                    <h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 text-center mb-8'>Sign Up</h1>
                    
                    <div className='flex flex-col text-gray-300 py-2'>
                        <label className="text-sm font-semibold mb-1 ml-1 text-gray-400">First Name</label>
                        <input className='rounded-xl bg-gray-800/50 p-3 border border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-gray-800 focus:outline-none transition-all duration-300' type="text"
                            value={firstName}
                            onChange={(event) => { setFirstName(event.target.value) }}
                        />
                        {errors.firstName && (<span className='text-red-400 text-sm mt-1 ml-1'>{errors.firstName}</span>)}
                    </div>
                    <div className='flex flex-col text-gray-300 py-2'>
                        <label className="text-sm font-semibold mb-1 ml-1 text-gray-400">Last Name</label>
                        <input className='rounded-xl bg-gray-800/50 p-3 border border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-gray-800 focus:outline-none transition-all duration-300'
                            type="text"
                            value={lastName}
                            onChange={(event) => { setLastName(event.target.value) }} />
                        {errors.lastName && (<span className='text-red-400 text-sm mt-1 ml-1'>{errors.lastName}</span>)}
                    </div>
                    <div className='flex flex-col text-gray-300 py-2'>
                        <label className="text-sm font-semibold mb-1 ml-1 text-gray-400">Phone Number</label>
                        <input className='rounded-xl bg-gray-800/50 p-3 border border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-gray-800 focus:outline-none transition-all duration-300'
                            type="number"
                            value={phone}
                            onChange={(event) => { setPhone(event.target.value) }} />
                        {errors.phone && (<span className='text-red-400 text-sm mt-1 ml-1'>{errors.phone}</span>)}
                    </div>
                    <div className='flex flex-col text-gray-300 py-2'>
                        <label className="text-sm font-semibold mb-1 ml-1 text-gray-400">Email</label>
                        <input className='rounded-xl bg-gray-800/50 p-3 border border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-gray-800 focus:outline-none transition-all duration-300'
                            type="email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }} />
                        {errors.email && (<span className='text-red-400 text-sm mt-1 ml-1'>{errors.email}</span>)}
                    </div>
                    <div className='flex flex-col text-gray-300 py-2'>
                        <label className="text-sm font-semibold mb-1 ml-1 text-gray-400">Password</label>
                        <input className='rounded-xl bg-gray-800/50 p-3 border border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-gray-800 focus:outline-none transition-all duration-300'
                            type="password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }} />
                        {errors.password && (<span className='text-red-400 text-sm mt-1 ml-1'>{errors.password}</span>)}
                    </div>
                    <div className='flex flex-col text-gray-300 py-2'>
                        <label className="text-sm font-semibold mb-1 ml-1 text-gray-400">Confirm Password</label>
                        <input className='rounded-xl bg-gray-800/50 p-3 border border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-gray-800 focus:outline-none transition-all duration-300'
                            type="password"
                            value={repassword}
                            onChange={(event) => { setRepassword(event.target.value) }} />
                        {errors.repassword && (<span className='text-red-400 text-sm mt-1 ml-1'>{errors.repassword}</span>)}
                    </div>
                    <div className='flex items-center text-gray-400 mt-2 mb-4'>
                        <label className='flex items-center cursor-pointer'>
                            <input className='mr-3 w-4 h-4 rounded border-gray-600 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900 cursor-pointer bg-gray-700' type="checkbox" />
                            <span className="text-sm hover:text-gray-200 transition-colors">Remember me</span>
                        </label>
                    </div>
                    <button className='w-full my-4 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold tracking-wide rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transform hover:-translate-y-1 transition-all duration-300' onClick={handleSubmit}>
                        CREATE ACCOUNT
                    </button>
                    <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff', borderRadius: '10px' } }} />
                    <div className='flex justify-center text-gray-400 mt-6 pt-4 border-t border-gray-700/50 text-sm'>
                        <span>Already have an account? <a onClick={() => { navigate('/login') }} className='cursor-pointer text-teal-400 hover:text-teal-300 font-semibold hover:underline transition-all'>Sign in</a></span>
                    </div>
                </form >
            </div >
        </div >
    )
}

export default SignUp