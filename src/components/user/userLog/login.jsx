import React, { useEffect, useState } from 'react';
import { clientLogin, varifyOtp, forgotPass, newPassword } from '../../../apiConfig/axiosConfig/axiosClientConfig';
//import { forgotPass } from '../../../apiConfig/axiosConfig/axiosClientConfig';
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
            const user = {
                email,
                password,
            };

            try {
                const response = await clientLogin(user);

                if (response.data.success) {
                    localStorage.setItem('Token', response.data.partnerToken);
                    dispatch(UserLG(response.data.partnerToken))
                    toast.success(`${response.data.message}`)
                    //navigate('/');
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        } else {
            console.log('Form is not valid. Please fix the errors.');
        }
    };


    const handleForgotSub = async (e) => {
        e.preventDefault()
        const email = {
            email: e.target.email.value
        }
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
        }
        else {
            toast.error('Please enter correct conform password')
        }

    }


    return (
        <div className=' min-h-screen flex items-center justify-center' >
            <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full   '>
                <div className='hidden sm:block'>
                    <img className='w-full h-full object-cover' src={carImg} alt="" />
                </div>
                <div className='bg-gray-800 flex flex-col justify-center   '>
                    <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8  rounded-lg border border-white '>
                        <h1 className='text-4xl dark:text-white font-bold text-center'>SIGN IN </h1>
                        <div className='flex flex-col text-gray-400 py-2'>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                                type="email"
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                            {errors.email && (<span className='text-red-500'>{errors.email}</span>)}
                        </div>
                        <div className='flex flex-col text-gray-400 py-2'>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                                type="password"
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                            {errors.password && (<span className='text-red-500'>{errors.password}</span>)}
                        </div>


                        < button
                            className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-50/40 hover:shadow-teal-20 text-white font-semibold rounded-lg'
                            onClick={handleSubmit}
                        >
                            SIGN IN
                        </button>
                        <div className='w-full my-5 py-2'>

                            <LogInButton />
                        </div>

                        <Toaster />
                        <div className='flex justify-around text-white font-thin  '>
                            <div className='cursor-pointer' onClick={() => navigate('/signup')}>Signup </div>
                            {/*<div className='cursor-pointer' onClick={() => navigate('/partner/partnerlogin')}>Partner signin</div>*/}
                            <div className='cursor-pointer'>
                                <a onClick={() => setShowModal(true)} className='p-3 font-thin text-white cursor-pointer ' >Forgot password</a>
                            </div>
                        </div>

                    </form >
                </div >

            </div >
            {
                showModal ? (
                    <div id="content" className=" fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm" >
                        <div className="mt-7 bg-white  rounded-xl shadow-lg   dark:bg-white border border-red-600 dark:border-gray-700">
                            <div className="p-4   sm:p-7 h-[375px] ">
                                <div className="text-center w-[300px] sm:w-[380px] pt-11">
                                    <h1 className="block text-2xl font-bold ">Forgot Password?</h1>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Register Here.....?
                                        <a className="text-blue-600 decoration-2 hover:underline font-medium" onClick={() => { navigate('/signup') }}>
                                            Register here
                                        </a>
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <form onSubmit={
                                        handleForgotSub
                                    } >
                                        <div className="grid gap-y-4">
                                            <div>
                                                <label for="email" className="block text-sm font-bold ml-1 mb-2">Email address</label>
                                                <div className="relative">
                                                    <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                                                </div>
                                                <p className="hidden text-xs text-red-600 mt-2" id="email-error" > Please include a valid email address so we can get back to you</p >
                                            </div >
                                            <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" > Check Email</button>
                                        </div >
                                    </form >

                                </div >
                            </div >
                        </div >

                    </div >
                ) : null
            }
            {
                forgot ?
                    (
                        <div class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                                <div
                                    class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                                </div>
                                <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                                    <div class="max-w-md mx-auto">
                                        <div>
                                            <h1 class="text-2xl font-semibold">Create New Password</h1>
                                        </div>
                                        <form onSubmit={handleForgot} class="divide-y divide-gray-200" >
                                            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                                <div class="relative">
                                                    <input autocomplete="off" id="newPassword" name="Newpassword" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                                    <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">New Password</label>
                                                </div>
                                                <div class="relative">
                                                    <input autocomplete="off" id="password" name="conformPassword" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                                    <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm New Password </label>
                                                </div>
                                                <div class="relative">
                                                    <button type='submit' class="bg-blue-500  rounded-md px-2 py-1">Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
            }
            {
                otp ? (
                    <div className="fixed inset-0 flex items-center  bg-black/30 backdrop-blur-sm" >
                        <div className='flex items-center w-full h-full ml-36 '>
                            <div

                                className={` w-[30%] h-[45%] text-white rounded-3xl flex flex-col ${arrayVal ? 'transform translate-x-full transition duration-500' : null
                                    }`}
                            >
                                <div className="flex-grow flex items-center justify-center bg-gray-800 bg-opacity-90 border  border-white rounded-3xl">
                                    <div className="w-full text-center">
                                        <h1 className="m-8 text-white font-bold">ENTER YOUR OTP</h1>
                                        <div className="flex items-center justify-center">
                                            <OtpInput
                                                value={code}
                                                onChange={handleChange}
                                                numInputs={6}
                                                separator={<span style={{ width: "8px" }}></span>}
                                                isInputNum={true}
                                                shouldAutoFocus={true}
                                                inputStyle={{
                                                    border: "1px solid transparent",
                                                    borderRadius: "8px",
                                                    width: "54px",
                                                    height: "54px",
                                                    fontSize: "12px",
                                                    color: "#000",
                                                    fontWeight: "400",
                                                    caretColor: "blue",
                                                }}
                                                inputContainerStyle={{
                                                    display: "flex",
                                                    justifyContent: "center", // Center the OTP inputs
                                                }}
                                            />
                                        </div>
                                        {/*<div className='pt-6 text-blue-400 underline'>
                                            <a  > Resend otp</a>

                                        </div>*/}
                                    </div>
                                </div>

                                <div className="flex items-center justify-center h-[30%] rounded-3xl">
                                    <button
                                        //type="submit"
                                        onClick={
                                            otpSubmit
                                        }
                                        className="text-gray-900 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-100 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    >
                                        Verify Otp
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
