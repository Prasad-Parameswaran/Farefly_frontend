import React, { useEffect, useState } from 'react';
import { clientLogin, varifyOtp, forgotPass, newPassword } from '../../../apiConfig/axiosConfig/axiosClientConfig';
import carImg from '../../../assets/Rental Car Logo Template Design Vector.jpeg';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { UserLG } from '../../../redux/slices/userSlice';
import OtpInput from "react18-input-otp";
import LogInButton from './loginButton';
import { gapi } from 'gapi-script';
import LogOutButton from './logOutButton';

const client = '206906884823-mbu9f6qhm15tr239h09epl6ap7g137hb.apps.googleusercontent.com'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const storedValue = localStorage.getItem('key');

    const [code, setCode] = useState("");
    const [arrayVal, setArrayVal] = useState(false)
    const [otp, setOtp] = useState(false)

    const [blur, setBlur] = useState(false)
    const [forgot, setForgot] = useState(false)
    const [jwtauth, setJwtAuth] = useState(false)

    const validateForm = () => {
        const newErrors = {};

        if (email.trim() === '' || !email.includes('@')) {
            newErrors.email = 'Valid email is required';
        }

        if (password.trim() === '') {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const user = { email, password };
            console.log('Attempting login with user:', user);

            try {
                const response = await clientLogin(user);
                console.log('Login response:', response);

                if (response.data.success) {
                    localStorage.setItem('Token', response.data.partnerToken);
                    dispatch(UserLG(response.data.partnerToken))
                    toast.success(`${response.data.message}`)
                    //navigate('/');
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error('Login error:', error);
                console.error('Error message:', error.message);
                if (error.response) {
                    console.error('Error response status:', error.response.status);
                    console.error('Error response data:', error.response.data);
                }
            }
        } else {
            console.log('Form is not valid. Please fix the errors.');
        }
    };

    const handleForgotSub = async (e) => {
        e.preventDefault()
        const email = { email: e.target.email.value }
        const response = await forgotPass(email)
        if (response.data.succes) {
            setShowModal(false)
            setOtp(true)
            setTimeout(() => {
                setArrayVal(true)
            }, 100);
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    const handleChange = (otp) => setCode(otp);

    const otpSubmit = async (e) => {
        console.log('hihhhhhhhhhhhhh');
        e.preventDefault()
        const response = await varifyOtp(code)
        if (response.data.succes) {
            toast.success(response.data.message)
            setForgot(true)
            setOtp(false)
        } else {
            toast.error(response.data.message)
        }
    }

    const handleForgot = async (e) => {
        e.preventDefault()
        const data = {
            Newpassword: e.target.Newpassword.value
        }
        if (data.Newpassword === e.target.conformPassword.value) {
            const response = await newPassword(data)
            if (response.data.succes) {
                setForgot(false)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } else {
            toast.error('Please enter correct conform password')
        }
    }

    return (
        <div className='min-h-screen relative overflow-hidden bg-gray-900 font-sans' >
            <div className='grid grid-cols-1 sm:grid-cols-2 min-h-screen w-full relative z-10'>
                <div className='hidden sm:block relative overflow-hidden'>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10 w-full h-full"></div>
                    <img className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000 ease-in-out' src={carImg} alt="Login Premium Rental" />
                    <div className="absolute top-16 left-12 z-20 text-white">
                        <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Back</span></h2>
                        <p className="text-lg text-gray-300 max-w-md leading-relaxed">Log in to manage your bookings and enjoy exclusive personalized offers.</p>
                    </div>
                </div>
                <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col justify-center px-6 py-10 sm:py-0 relative overflow-hidden'>
                    {/* Decorative blobs */}
                    <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

                    <form className='max-w-[450px] w-full mx-auto bg-white/5 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative z-10'>
                        <h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 text-center mb-8'>Sign In </h1>
                        <div className='flex flex-col text-gray-300 py-3'>
                            <label className="text-sm font-semibold mb-1 ml-1 text-gray-400" htmlFor="email">Email</label>
                            <input
                                id="email"
                                className='rounded-xl bg-gray-800/50 p-3 border border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-gray-800 focus:outline-none transition-all duration-300'
                                type="email"
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                            {errors.email && (<span className='text-red-400 text-sm mt-1 ml-1'>{errors.email}</span>)}
                        </div>
                        <div className='flex flex-col text-gray-300 py-3'>
                            <label className="text-sm font-semibold mb-1 ml-1 text-gray-400" htmlFor="password">Password</label>
                            <input
                                id="password"
                                className='rounded-xl bg-gray-800/50 p-3 border border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-gray-800 focus:outline-none transition-all duration-300'
                                type="password"
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                            {errors.password && (<span className='text-red-400 text-sm mt-1 ml-1'>{errors.password}</span>)}
                        </div>

                        <button
                            className='w-full my-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold tracking-wide rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transform hover:-translate-y-1 transition-all duration-300'
                            onClick={handleSubmit}
                        >
                            SIGN IN
                        </button>
                        <div className='w-full mb-6'>
                            <LogInButton />
                        </div>

                        <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff', borderRadius: '10px' } }} />
                        <div className='flex justify-between text-gray-400 text-sm mt-4 pt-4 border-t border-gray-700/50'>
                            <div className='cursor-pointer flex items-center group' onClick={() => navigate('/signup')}>
                                <span className='group-hover:text-teal-400 transition-colors'>Create Account</span>
                            </div>
                            <div className='cursor-pointer flex items-center group'>
                                <a onClick={() => setShowModal(true)} className='group-hover:text-teal-400 transition-colors' >Forgot password?</a>
                            </div>
                        </div>

                    </form >
                </div >

            </div >
            {/* Modal: Forgot Password */}
            {
                showModal ? (
                    <div id="content" className="fixed inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-md z-50 transition-opacity" >
                        <div className="mt-7 bg-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] w-full max-w-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 cursor-pointer text-gray-400 hover:text-white transition" onClick={() => setShowModal(false)}>✕</div>
                            <div className="p-6 sm:p-8">
                                <div className="text-center pt-4 mb-6">
                                    <h1 className="block text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-2">Password Reset</h1>
                                    <p className="text-sm text-gray-400">
                                        Remember your password? 
                                        <a className="text-teal-400 hover:text-teal-300 hover:underline font-medium ml-1 cursor-pointer" onClick={() => { setShowModal(false) }}>
                                            Sign in here
                                        </a>
                                    </p>
                                </div>

                                <div>
                                    <form onSubmit={handleForgotSub}>
                                        <div className="grid gap-y-4">
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-semibold ml-1 mb-2 text-gray-300">Email address</label>
                                                <div className="relative">
                                                    <input type="email" id="email" name="email" className="py-3 px-4 block w-full rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-200 text-sm focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-gray-800 focus:outline-none transition-all duration-300 shadow-sm" required />
                                                </div>
                                            </div >
                                            <button type="submit" className="w-full mt-4 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold tracking-wide rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transform hover:-translate-y-1 transition-all duration-300" >
                                                Send Reset Link
                                            </button>
                                        </div >
                                    </form >
                                </div >
                            </div >
                        </div >
                    </div >
                ) : null
            }
            {/* Modal: New Password */}
            {
                forgot ?
                    (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-md z-50 transition-opacity">
                            <div className="relative py-3 w-full max-w-md mx-auto px-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-500 shadow-lg transform -skew-y-3 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl opacity-30"></div>
                                <div className="relative px-6 py-10 bg-gray-800/90 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/10 sm:rounded-3xl sm:p-12">
                                <div className="absolute top-0 right-0 p-4 cursor-pointer text-gray-400 hover:text-white transition" onClick={() => setForgot(false)}>✕</div>
                                    <div className="max-w-md mx-auto">
                                        <div className="text-center mb-8">
                                            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Create New Password</h1>
                                        </div>
                                        <form onSubmit={handleForgot} className="divide-y divide-gray-700" >
                                            <div className="py-4 text-base space-y-6 text-gray-300">
                                                <div className="relative">
                                                    <label htmlFor="newPassword" className="text-sm font-semibold ml-1 mb-1 block text-gray-400">New Password</label>
                                                    <input id="newPassword" name="Newpassword" type="password" className="rounded-xl w-full bg-gray-900/50 p-3 border border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:outline-none transition-all text-white" placeholder="Enter new password" />
                                                </div>
                                                <div className="relative">
                                                    <label htmlFor="conformPassword" className="text-sm font-semibold ml-1 mb-1 block text-gray-400">Confirm Password</label>
                                                    <input id="conformPassword" name="conformPassword" type="password" className="rounded-xl w-full bg-gray-900/50 p-3 border border-gray-700/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:outline-none transition-all text-white" placeholder="Confirm new password" />
                                                </div>
                                                <div className="relative pt-4">
                                                    <button type='submit' className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold tracking-wide rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transform hover:-translate-y-1 transition-all duration-300">Complete Reset</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
            }
            {/* Modal: OTP */}
            {
                otp ? (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-md z-50 transition-opacity" >
                        <div className="relative w-full max-w-md mx-auto px-4 z-50">
                            <div className={`w-full bg-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-8 ${arrayVal ? 'transform translate-x-full opacity-0 transition duration-700' : 'transition duration-700'}`}>
                                <div className="absolute top-0 right-0 p-4 cursor-pointer text-gray-400 hover:text-white transition" onClick={() => setOtp(false)}>✕</div>
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-2">Enter Verification Code</h1>
                                    <p className="text-gray-400 text-sm">We've sent a code to your email.</p>
                                </div>
                                <div className="flex items-center justify-center mb-10">
                                    <OtpInput
                                        value={code}
                                        onChange={handleChange}
                                        numInputs={6}
                                        separator={<span style={{ width: "12px" }}></span>}
                                        isInputNum={true}
                                        shouldAutoFocus={true}
                                        inputStyle={{
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "12px",
                                            width: "48px",
                                            height: "56px",
                                            fontSize: "20px",
                                            color: "#fff",
                                            fontWeight: "bold",
                                            backgroundColor: "rgba(17, 24, 39, 0.7)",
                                            caretColor: "#2dd4bf",
                                            transition: "all 0.3s ease"
                                        }}
                                        focusStyle={{
                                            border: "1px solid #2dd4bf",
                                            outline: "none",
                                            boxShadow: "0 0 0 2px rgba(45, 212, 191, 0.2)"
                                        }}
                                        inputContainerStyle={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        onClick={otpSubmit}
                                        className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold tracking-wide rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transform hover:-translate-y-1 transition-all duration-300"
                                    >
                                        VERIFY CODE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div >
                ) : null
            }
        </div >
    );
}

export default Login;
