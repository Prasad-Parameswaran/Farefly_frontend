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
    let user = location.state.userDetails;
    let Userotp = location.state.otp;
    console.log(errors, 'llllllllllll');

    useEffect(() => {
        inputRef.current[0].focus();
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
        await axios.post('http://localhost:4000/otpVarify', { user, Userotp, otp }).then((response) => {
            if (response.data.success) {
                navigate('/');
            } else {

                toast.error('Invalid otp..')

            }
        }
        )
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
                className="w-10 h-12 rounded-md mr-3 text-center text-xl bg-slate-400"
                value={otp[keys]}
                name={keys}
                onChange={(event) => handleChange(event, index)}
                onKeyUp={(event) => handleBackSpace(event, index)}
                type="text"
            />
        ));
    };

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-100 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your Phone 90********</p>
                        </div>
                        {errors.otp && (
                            <div className="flex flex-row text-sm font-medium text-red-500">
                                <p>{errors.otp}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <form>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    <div className="w-12 h-12 flex">{renderInput()}</div>
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button
                                            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                            onClick={otpVarify}
                                        >
                                            Verify Account
                                        </button>
                                        <Toaster />
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't receive the code?</p>{' '}
                                        <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">
                                            Resend
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
