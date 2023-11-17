import React, { useState } from 'react';
import axios from 'axios';
import carImg from '../../../assets/Rental Car Logo Template Design Vector.jpeg';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
                await axios.post('http://localhost:4000/login', { user }).then((response) => {
                    if (response.data.success) {
                        console.log(response.data.Token, "fffffffffffffff");
                        localStorage.setItem('Token', response.data.Token)
                        navigate('/')
                    } else {
                        toast.error(response.data.message)
                    }

                })

            } catch (error) {

                console.error('Error:', error.message);
            }

            console.log('Form is valid. Ready to submit!');
        } else {
            console.log('Form is not valid. Please fix the errors.');
        }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full '>
            <div className='hidden sm:block '>
                <img className='w-full h-full object-cover ' src={carImg} alt="" />
            </div>
            <div className='bg-gray-800 flex flex-col justify-center '>
                <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded rounded-lg border border-white '>
                    <h1 className='text-4xl dark:text-white font-bold text-center'>SIGN IN </h1>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="">Email</label>
                        <input
                            className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type="email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                        {errors.email && (<span className='text-red-500'>{errors.email}</span>)}
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="">Password</label>
                        <input
                            className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type="password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                        {errors.password && (<span className='text-red-500'>{errors.password}</span>)}
                    </div>
                    <button
                        className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-50/40 hover:shadow-teal-20 text-white font-semibold rounded-lg'
                        onClick={handleSubmit}
                    >
                        SIGN IN
                    </button>
                    <Toaster />
                    <div className='flex justify-center text-gray-400'>
                        <a href=""> SIGN UP</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
