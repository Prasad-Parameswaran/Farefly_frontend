import React, { useState } from 'react'
import img from '../../../assets/Premium Vector _ Rental car deal logo template design vector.jpeg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import { FormValidate } from '../../ValidationForm'
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

        // Simple validation rules, adjust as needed
        if (firstName.trim() === '') {
            newErrors.firstName = 'First name is required';
        }

        if (lastName.trim() === '') {
            newErrors.lastName = 'Last name is required';
        }

        if (phone.trim() === '') {
            newErrors.phone = 'Phone is required';
        }

        if (email.trim() === '' || !email.includes('@')) {
            newErrors.email = 'Valid email is required';
        }

        if (password.trim() === '') {
            newErrors.password = 'Password is required';
        }

        if (repassword.trim() === '' || repassword !== password) {
            newErrors.repassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const userDetails = {
                firstName,
                lastName,
                phone,
                email,
                password,
                repassword
            }

            await axios.post('http://localhost:4000/signup', { email, phone }).then((response) => {
                if (response.data.success) {
                    navigate('/otp', { state: { userDetails: userDetails, otp: response.data.otp } })
                } else {
                    toast.error('User is already exist')
                }

            })
            console.log('Form is valid. Ready to submit!');
        } else {
            console.log('Form is not valid. Please fix the errors.');
        }
    };




    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full '>
            <div className='hidden sm:block '>
                <img className='w-full h-full object-cover' src={img} alt="" />
            </div>
            <div className='bg-gray-800 flex flex-col justify-center '>
                <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded rounded-lg border border-white  '>
                    <h1 className='text-4xl dark:text-white font-bold text-center'>SIGN IN </h1>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="">User Name</label>
                        <input className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text"
                            value={firstName}
                            onChange={(event) => { setFirstName(event.target.value) }}
                        />
                        {
                            errors.firstName && (<span className='text-red-500'>{errors.firstName}</span>)
                        }

                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="">Last Name</label>
                        <input className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type="text"
                            value={lastName}
                            onChange={(event) => { setLastName(event.target.value) }} />
                        {
                            errors.lastName && (<span className='text-red-500'>{errors.lastName}</span>)
                        }
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="">Phone Number</label>
                        <input className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type="number"
                            value={phone}
                            onChange={(event) => { setPhone(event.target.value) }} />
                        {
                            errors.phone && (<span className='text-red-500'>{errors.phone}</span>)
                        }

                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="">Email</label>
                        <input className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type="email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }} />
                        {
                            errors.email && (<span className='text-red-500'>{errors.email}</span>)
                        }

                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="">password</label>
                        <input className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type="password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }} />
                        {
                            errors.password && (<span className='text-red-500'>{errors.password}</span>)
                        }
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="">Re-Password</label>
                        <input className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type="password"
                            value={repassword}
                            onChange={(event) => { setRepassword(event.target.value) }} />
                        {
                            errors.repassword && (<span className='text-red-500'>{errors.repassword}</span>)
                        }
                    </div>
                    <div className='flex justify-between text-gray-400'>
                        <p className='flex items-center'><input className='mr-2' type="checkbox" />Remember me</p>
                        <a href=""> Forgot password</a>
                    </div>
                    <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-50/40 hover:shadow-teal-20 text-white font-semibold rounded-lg' onClick={handleSubmit}>SIGN UP</button>
                    <Toaster />
                    <div className='flex justify-center text-gray-400'>
                        <a onClick={() => { navigate('/login') }}> SIGN IN</a>
                    </div>
                </form >
            </div >
        </div >
    )
}

export default SignUp