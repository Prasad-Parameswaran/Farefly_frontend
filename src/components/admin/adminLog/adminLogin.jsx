import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLogin() {
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
            const admin = {
                email,
                password,
            };

            try {
                await axios.post('http://localhost:4000/admin/adminLog', { admin }).then((response) => {
                    if (response.data.success) {
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
        <div className='grid grid-cols-1  h-screen w-full  '>

            <div className=' bg-black flex flex-col justify-center  bg-cover bg-center bg-custom-image bg-cover  p-8 px-8 relative' >
                <div className='absolute inset-0 blur-sm bg-custom-image'></div>
                <form className='max-w-[400px] w-full mx-auto bg-opacity-50 py-16  p-8 px-8 rounded rounded-lg border border-white hover:border-blue-400   backdrop-blur-sm bg-black/30 backdrop-blur-sm '>

                    <h1 className='text-4xl text-gray-400 shadow-lg  font-bold text-center font-bold font  '>ADMIN SIGN IN </h1>
                    <div className='flex flex-col text-gray-400  py-2'>
                        <label htmlFor="">Admin Email</label>
                        <input className='rounded-lg bg-gray-700 bg-opacity-10 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none border border-white'
                            type="email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                        {errors.password && (<span className='text-red-500'>{errors.password}</span>)}
                    </div>
                    <div className='flex flex-col text-gray-400  py-2'>
                        <label htmlFor="">Password</label>
                        <input className='rounded-lg bg-gray-700  bg-opacity-10 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none border border-white'
                            type="password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                        {errors.password && (<span className='text-red-500'>{errors.password}</span>)}
                    </div>
                    <div className='flex justify-between text-white '>
                        <p className='flex items-center  hover:text-blue-400'><input className='mr-2' type="checkbox" />Remember me</p>
                        <a href="" className=' hover:text-blue-400'> Forgot password</a>
                    </div>
                    <button className='w-full my-5 py-2 bg-blue-700 shadow-lg hover:bg-blue-800   text-white font-semibold rounded-lg border border-white'>SIGN IN</button>
                    <Toaster />
                </form >

            </div >
        </div >
    )
}
