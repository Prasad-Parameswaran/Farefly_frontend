import React, { useRef, useState } from 'react';
import { partnerSignup } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

export default function Joinus() {
    const upload_preset = 'vytol9u4'
    const cloud_name = 'djbokpgy8'
    const [panCard, setPanCard] = useState()
    const [adhar, setAdhar] = useState()
    
    const [validation, setValidation] = useState({
        name: true, email: true, phone: true, district: true,
        password: true, conformPassword: true, age: true, localArea: true,
    });

    const formRef = useRef({
        name: React.createRef(), email: React.createRef(), phone: React.createRef(),
        district: React.createRef(), password: React.createRef(), conformPassword: React.createRef(),
        age: React.createRef(), localArea: React.createRef(),
    });

    const panCardhandleFile = async (event) => {
        try {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', upload_preset)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            if (response?.data?.secure_url) setPanCard(response.data.secure_url)
        } catch (error) { console.log(error) }
    }

    const adharHandleFile = async (event) => {
        try {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', upload_preset)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            if (response?.data?.secure_url) setAdhar(response.data.secure_url)
        } catch (error) { console.log(error) }
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

        const newValidation = {};
        Object.keys(formData).forEach((key) => {
            if (key !== 'aadhaar' && key !== 'panCard') {
                newValidation[key] = formData[key].trim() !== '';
            }
        });
        setValidation(newValidation);

        if (Object.values(newValidation).every((isValid) => isValid)) {
            if (!formData.email.includes('@')) {
                toast.error('Invalid email address')
            } else if (formData.phone.length !== 10) {
                toast.error('Phone number must be exactly 10 digits')
            } else if (formData.password !== formData.conformPassword) {
                toast.error('Passwords do not match')
            } else if (!panCard || !adhar) {
                toast.error('Please upload both PAN and Aadhaar documents')
            } else {
                const response = await partnerSignup(formData)
                if (response?.data?.succes) {
                    toast.success(`${response.data.message}`)
                } else {
                    toast.error(`${response.data.message}`)
                }
            }
        } else {
            toast.error('Please fill all required fields')
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen font-sans flex flex-col pt-16">
            <Navbar />
            
            <div className="flex-grow flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none"></div>

                <div className="z-10 text-center mb-10 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-4 tracking-tight">Become a Partner</h1>
                    <p className="text-gray-400 text-lg">Join the Farefly network. List your vehicles, earn steady income, and manage everything from a premium dashboard.</p>
                </div>

                <div className="w-full max-w-4xl z-10">
                    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            
                            {/* Column 1 */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 ml-1 text-gray-300">Full Name</label>
                                    <input 
                                        className={`w-full bg-gray-800/50 border transition-all duration-300 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/20 ${!validation.name ? 'border-red-400 focus:border-red-400' : 'border-gray-700/50 focus:border-teal-400'}`}
                                        ref={formRef.current.name} type="text" placeholder="John Doe" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 ml-1 text-gray-300">Email Address</label>
                                    <input 
                                        className={`w-full bg-gray-800/50 border transition-all duration-300 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/20 ${!validation.email ? 'border-red-400' : 'border-gray-700/50 focus:border-teal-400'}`}
                                        ref={formRef.current.email} type="email" placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 ml-1 text-gray-300">Phone Number</label>
                                    <input 
                                        className={`w-full bg-gray-800/50 border transition-all duration-300 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/20 ${!validation.phone ? 'border-red-400' : 'border-gray-700/50 focus:border-teal-400'}`}
                                        ref={formRef.current.phone} type="number" placeholder="Enter 10 digit number"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 ml-1 text-gray-300">District</label>
                                        <input 
                                            className={`w-full bg-gray-800/50 border transition-all duration-300 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/20 ${!validation.district ? 'border-red-400' : 'border-gray-700/50 focus:border-teal-400'}`}
                                            ref={formRef.current.district} type="text" placeholder="City"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 ml-1 text-gray-300">Age</label>
                                        <input 
                                            className={`w-full bg-gray-800/50 border transition-all duration-300 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/20 ${!validation.age ? 'border-red-400' : 'border-gray-700/50 focus:border-teal-400'}`}
                                            ref={formRef.current.age} type="number" placeholder="e.g. 30"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 ml-1 text-gray-300">PAN Card Upload</label>
                                    <div className="relative">
                                        <input 
                                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-teal-400 hover:file:bg-gray-700 transition cursor-pointer border border-gray-700/50 rounded-xl bg-gray-800/30"
                                            onChange={panCardhandleFile} type="file" accept="image/*"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 ml-1 text-gray-300">Password</label>
                                    <input 
                                        className={`w-full bg-gray-800/50 border transition-all duration-300 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/20 ${!validation.password ? 'border-red-400' : 'border-gray-700/50 focus:border-teal-400'}`}
                                        ref={formRef.current.password} type="password" placeholder="Create robust password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 ml-1 text-gray-300">Confirm Password</label>
                                    <input 
                                        className={`w-full bg-gray-800/50 border transition-all duration-300 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/20 ${!validation.conformPassword ? 'border-red-400' : 'border-gray-700/50 focus:border-teal-400'}`}
                                        ref={formRef.current.conformPassword} type="password" placeholder="Repeat password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 ml-1 text-gray-300">Local Area</label>
                                    <input 
                                        className={`w-full bg-gray-800/50 border transition-all duration-300 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/20 ${!validation.localArea ? 'border-red-400' : 'border-gray-700/50 focus:border-teal-400'}`}
                                        ref={formRef.current.localArea} type="text" placeholder="Neighborhood"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 ml-1 text-gray-300 mt-28 md:mt-[76px]">Aadhaar Upload</label>
                                    <div className="relative">
                                        <input 
                                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-teal-400 hover:file:bg-gray-700 transition cursor-pointer border border-gray-700/50 rounded-xl bg-gray-800/30"
                                            onChange={adharHandleFile} type="file" accept="image/*"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-12 flex justify-center">
                            <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold tracking-wider rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                SUBMIT APPLICATION
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff', borderRadius: '10px' } }} />
            <Footer />
        </div>
    )
}
