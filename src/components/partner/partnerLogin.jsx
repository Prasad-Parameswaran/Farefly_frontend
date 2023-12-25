import React, { useState } from 'react'
import { partnerLogin } from '../../apiConfig/axiosConfig/axiosPartnerConfig'
import { useNavigate } from 'react-router-dom';
import img from '../../assets/—Pngtree—cartoon business handshake free_5457089.png'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { partnerLG } from '../../redux/slices/partnerSlice';

function PartnerLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch()

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
            }

            await partnerLogin(user).then((res) => {
                if (res.data.success) {
                    localStorage.setItem('partnerToken', res.data.Token)

                    dispatch(partnerLG(res.data.Token))
                    toast.success(res.data.message)
                    navigate('/partner/partnerHome')
                } else {
                    toast.error(res.data.message)

                }

            }).catch((err) => {
                console.log(err.message, "jjjjjjj2");
            })

        }
    }
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full '>
                <div className='hidden sm:block '>
                    <img className='w-full h-full object-cover ' src={img} alt="" />
                </div>
                <div className='bg-slate-500 flex flex-col justify-center '>
                    <form className='max-w-[400px] w-full mx-auto  p-8 px-8 rounded rounded-lg border border-white '>
                        <h1 className='text-4xl dark:text-white font-bold text-center'>PARTNER SIGNIN </h1>
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
                            className='w-full my-5 py-2 bg-lime-600 shadow-lg shadow-teal-50/40 hover:shadow-teal-20 text-white font-semibold rounded-lg'
                            onClick={handleSubmit}
                        >
                            SIGN IN
                        </button>

                        <div className='flex justify-center text-gray-400'>
                            <a onClick={() => { navigate('/partner/joinus') }}> REGISTER</a>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}


export default PartnerLogin