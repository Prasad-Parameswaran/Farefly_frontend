import React, { useRef, useState } from 'react';
import { partnerSignup } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';



export default function MyForm() {
    const upload_preset = 'vytol9u4'
    const cloud_name = 'djbokpgy8'
    //const [refrsh, setRefresh] = useState(true)
    const [panCard, setPanCard] = useState()
    const [adhar, setAdhar] = useState()
    const fileInputRef = useRef(null);
    const [validation, setValidation] = useState({
        name: true,
        email: true,
        phone: true,
        district: true,
        password: true,
        conformPassword: true,
        age: true,
        localArea: true,
    });

    const formRef = useRef({
        name: React.createRef(),
        email: React.createRef(),
        phone: React.createRef(),
        district: React.createRef(),
        password: React.createRef(),
        conformPassword: React.createRef(),
        age: React.createRef(),
        localArea: React.createRef(),
    });

    const panCardhandleFile = async (event) => {
        try {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', upload_preset)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            if (response?.data?.secure_url) {
                const data = response.data.secure_url

                setPanCard(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const adharHandleFile = async (event) => {
        try {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', upload_preset)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            if (response?.data?.secure_url) {
                const data = response.data.secure_url
                setAdhar(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: formRef.current.name.current.value,
            email: formRef.current.email.current.value,
            phone: formRef.current.phone.current.value,
            district: formRef.current.district.current.value,
            password: formRef.current.password.current.value,
            conformPassword: formRef.current.conformPassword.current.value,
            age: formRef.current.age.current.value,
            localArea: formRef.current.localArea.current.value,
            aadhaar: adhar,
            panCard: panCard
        };

        // Validate form fields
        const newValidation = {};
        Object.keys(formData).forEach((key) => {
            if (!key === 'aadhaar' && !key === 'panCard') {
                newValidation[key] = formData[key].trim() !== '';
            }

        });
        setValidation(newValidation);

        if (Object.values(newValidation).every((isValid) => isValid)) {

            if (!formData.email.includes('@')) {

            } else if (formData.phone.length != 10) {
                alert('phone is not correct 1 to 10....')


            } else if (formData.password !== formData.conformPassword) {
                alert(' conform passord is not matching  ....')

            } else {

                const response = await partnerSignup(formData)
                if (response?.data?.succes) {
                    toast.success(`${response.data.message}`)
                } else {
                    toast.error(`${response.data.message}`)
                }


            }
        }
    };

    return (
        <>
            <div className='sticky top-0 z-50 '>
                <Navbar />
            </div>
            <div className='bg-black text-white flex flex-col  justify-center items-center w-full h-screen gap-y-6'>
                <div className='w-full h-11 text-center font-bold text-3xl '>JOIN US NOW...  </div>
                <div className='w-full  flex  flex-col items-center justify-center'>

                    <form onSubmit={handleSubmit} className='w-1/2 p-3 border rounded-lg shadow-md shadow-lime-400  '>
                        <div className='md:flex w-full'>
                            <div className='md:w-1/2 h-full'>
                                <div className='w-full h-20 p-3'>
                                    <h1>Name</h1>
                                    <input
                                        className={`border w-full h-2/3 rounded-lg px-3 text-black ${!validation.name && 'border-red-500 border-2'}`}
                                        ref={formRef.current.name}
                                        type="text"
                                    />

                                </div>
                                <div className='w-full h-20 p-3'>
                                    <h1>Email</h1>
                                    <input className={`border w-full h-2/3 rounded-lg px-3 text-black ${!validation.email && 'border-red-500 border-2'}`}
                                        ref={formRef.current.email} type="text" />
                                </div>
                                <div className='w-full h-20 p-3'>
                                    <h1>Phone</h1>
                                    <input className={`border w-full h-2/3 rounded-lg px-3 text-black ${!validation.phone && 'border-red-500 border-2'}`}
                                        ref={formRef.current.phone} type="number" />
                                </div>
                                <div className='w-full h-20 p-3'>
                                    <h1>District</h1>
                                    <input className={`border w-full h-2/3 rounded-lg px-3 text-black ${!validation.district && 'border-red-500 border-2'}`}
                                        ref={formRef.current.district} type="text" />
                                </div>
                                <div className='w-full h-20 p-3'>
                                    <h1>PAN Card Image upload</h1>
                                    <input className={`border w-full h-2/3 rounded-lg px-3 text-black`}
                                        ref={formRef.current.age} onChange={panCardhandleFile} type="file" name='image' />
                                </div>
                            </div>
                            <div className='md:w-1/2 h-full'>
                                <div className='w-full h-20 p-3 '>
                                    <h1>Password</h1>
                                    <input className={`border w-full h-2/3 rounded-lg px-3 text-black ${!validation.password && 'border-red-500 border-2'}`}
                                        ref={formRef.current.password} type="password" />
                                </div>
                                <div className='w-full h-20 p-3'>
                                    <h1>RePassword</h1>
                                    <input className={`border w-full h-2/3 rounded-lg px-3 text-black ${!validation.conformPassword && 'border-red-500 border-2'}`}
                                        ref={formRef.current.conformPassword} type="password" />
                                </div >
                                <div className='w-full h-20 p-3'>
                                    <h1>Local Area</h1>
                                    <input className={`border w-full h-2/3 rounded-lg px-3 text-black ${!validation.localArea && 'border-red-500 border-2'}`}
                                        ref={formRef.current.localArea} type="text" />
                                </div>
                                <div className='w-full h-20 p-3'>
                                    <h1>Age</h1>
                                    <input className={`border w-full h-2/3 rounded-lg px-3 text-black ${!validation.age && 'border-red-500 border-2'}`}
                                        ref={formRef.current.age} type="number" />
                                </div>
                                <div className='w-full h-20 p-3'>
                                    <h1>Adhar Image upload</h1>
                                    <input className={` w-full h-2/3 rounded-lg px-3 text-black border `}
                                        onChange={adharHandleFile} type="file" name='image' />
                                </div>
                            </div>

                        </div>
                        <div className='pt-6 w-full flex justify-center'>
                            <button type="submit" className="text-white border bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2" >
                                <svg className='pt-1 mr-2' width="35" height="30">
                                    <rect x="5" y="1" width="18" height="11" fill="transparent" rx="15" stroke="crimson" strokeWidth="2" />

                                    <rect x="1" y="8" width="28" height="8" fill="crimson" rx="5" />

                                    <line x1="7" y1="1" x2="7" y2="8" stroke="crimson" strokeWidth="2" />

                                    <line x1="10.5" y1="1" x2="10.5" y2="8" stroke="crimson" strokeWidth="2" />

                                    <rect x="0" y="11" width="4" height="2" fill="#999" rx="1" />

                                    <rect x="26" y="11" width="4" height="2" fill="#999" rx="1" />

                                    <circle r="3" fill="#222" stroke="white" strokeWidth="2" cx="7" cy="15" />
                                    <circle r="2" fill="#555" cx="7" cy="15" />

                                    <circle r="3" fill="#222" stroke="white" strokeWidth="2" cx="23" cy="15" />
                                    <circle r="2" fill="#555" cx="23" cy="15" />

                                    <circle r="2" fill="gold" cx="29" cy="9" />

                                    <circle r="1" fill="orange" cx="4" cy="9" />
                                </svg>
                                REGISTER NOW
                            </button>

                        </div>
                    </form>


                </div >

            </div >
            <div>
                <Footer />
            </div>
        </>
    )
}
