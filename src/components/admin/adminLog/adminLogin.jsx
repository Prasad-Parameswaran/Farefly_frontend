import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { adminLG } from '../../../redux/slices/adminSlice'
import { adminLogin } from '../../../apiConfig/axiosConfig/axiosAdminConfig';
//import { adminLogin } from '../../../apiConfig/axiosConfig/axiosAdminConfig'


export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const validateForm = () => {
        const newErrors = {};

        if (email.trim() === '' && !email.includes('@')) {
            newErrors.email = 'Valid email is required';
        }

        if (password.trim() === '') {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        //e.preventDefault()
        e.preventDefault();


        if (validateForm()) {
            const admin = {
                email,
                password,
            };
            await adminLogin(admin).then((response) => {
                console.log("oooooooooooooooooooo")
                if (response.data.success) {
                    localStorage.setItem('adminToken', response.data.adminToken)
                    dispatch(adminLG(response.data.adminToken))
                    toast.success('Welcome back')
                    navigate('/admin/admindash')


                } else {
                    toast.error(`${response.data.message}`)
                }

            })

        }
        else {
            console.log('Form is not valid. Please fix the errors.');
        }
    }





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
                    <button onClick={handleSubmit} className='w-full my-5 py-2 bg-blue-700 shadow-lg hover:bg-blue-800   text-white font-semibold rounded-lg border border-white' > SIGN IN</button>
                    {/*<Toaster />*/}
                </form >

            </div >
        </div >
    )
}
