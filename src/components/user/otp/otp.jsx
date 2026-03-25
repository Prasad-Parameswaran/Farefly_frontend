import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


function Otp() {
    const inputRef = useRef({});
    const [otp, setOtp] = useState({
        digitOne: '',
        digitTwo: '',
        digitThree: '',
        digitFour: '',
        digitFive: '',
        digitSix: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    let user = location.state?.userDetails || {};
    let Userotp = location.state?.otp || '';

    useEffect(() => {
        if(inputRef.current[0]) inputRef.current[0].focus();
    }, []);

    const validation = () => {
        const newErrors = {};
        if (
            otp.digitOne.trim() === '' ||
            otp.digitTwo.trim() === '' ||
            otp.digitThree.trim() === '' ||
            otp.digitFour.trim() === '' ||
            otp.digitFive.trim() === '' ||
            otp.digitSix.trim() === ''
        ) {
            newErrors.otp = 'Invalid OTP';
        }
        setErrors(newErrors);
        return newErrors;
    };

    const otpVarify = async (event) => {
        event.preventDefault();
        const otpValidation = validation();
        if (Object.keys(otpValidation).length > 0) {
            return;
        }
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/otpVarify`, { user, Userotp, otp }).then((response) => {
            if (response.data.success) {
                navigate('/');
            } else {
                toast.error('Invalid otp..')
            }
        }
        ).catch((err) => {
            toast.error('Verification failed');
        })
    };

    const handleBackSpace = (event, index) => {
        if (index > 0) {
            if (event.key === 'Backspace') {
                inputRef.current[index - 1].focus();
            }
        }
    };

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        if (/[a-z]/gi.test(value)) return;
        setOtp((prev) => ({
            ...prev,
            [name]: value.slice(-1),
        }));
        if (value && index < 5) {
            inputRef.current[index + 1].focus();
        }
    };

    const renderInput = () => {
        return Object.keys(otp).map((keys, index) => (
            <input
                key={index}
                ref={(element) => (inputRef.current[index] = element)}
                className="w-12 h-14 rounded-xl mx-1 text-center text-2xl font-bold bg-gray-800/50 border border-gray-700/50 text-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-gray-800 focus:outline-none transition-all duration-300"
                value={otp[keys]}
                name={keys}
                onChange={(event) => handleChange(event, index)}
                onKeyUp={(event) => handleBackSpace(event, index)}
                type="text"
                maxLength={1}
            />
        ));
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-900 py-12 px-4 font-sans">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

            <div className="relative bg-white/5 backdrop-blur-xl px-8 pt-12 pb-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/10 mx-auto w-full max-w-lg rounded-3xl z-10">
                <div className="mx-auto flex w-full flex-col space-y-10">
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                            <p>Verify Email</p>
                        </div>
                        <div className="flex flex-col text-sm font-medium text-gray-400 leading-relaxed">
                            <p>We've sent a verification code to your email.</p>
                            <p>Please enter it below to confirm your account.</p>
                        </div>
                        {errors.otp && (
                            <div className="flex flex-row text-sm font-medium text-red-400 bg-red-400/10 px-4 py-2 rounded-lg mt-2 border border-red-400/20">
                                <p>{errors.otp}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <form onSubmit={otpVarify}>
                            <div className="flex flex-col space-y-8">
                                <div className="flex flex-row items-center justify-center w-full">
                                    <div className="flex">{renderInput()}</div>
                                </div>

                                <div className="flex flex-col space-y-6 pt-4">
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold tracking-wide rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transform hover:-translate-y-1 transition-all duration-300"
                                        >
                                            Verify Account
                                        </button>
                                        <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff', borderRadius: '10px' } }} />
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-2 text-gray-400 pb-2">
                                        <p>Didn't receive the code?</p>
                                        <a className="text-teal-400 hover:text-teal-300 font-semibold hover:underline transition-all cursor-pointer">
                                            Resend OTP
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Otp;
