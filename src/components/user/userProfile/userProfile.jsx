import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../navbar/navbar'
import axios from 'axios'
import { addProfile, profileData } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import Footer from '../footer/footer'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function UserProfile() {
    const upload_preset = 'vytol9u4'
    const cloud_name = 'djbokpgy8'
    const [profileDetails, setprofileDetails] = useState([])
    const [refrsh, setRefresh] = useState(true)
    const [profileImage, setProfileImage] = useState('')
    const [front, setFront] = useState('')
    const [back, setBack] = useState('')
    const fileInputRef = useRef(null);
    const navigate = useNavigate()

    const handleFile = async (event, setter) => {
        try {
            const file = event.target.files[0]
            if (!file) return;
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', upload_preset)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            if (response?.data?.secure_url) {
                setter(response.data.secure_url)
                if(setter === setProfileImage) setRefresh(!refrsh);
            }
        } catch (error) { toast.error("File upload failed"); }
    }

    const submitProfile = async (e) => {
        e.preventDefault();
        const ProfileForm = new FormData(e.target);
        const formDataObject = {};
        ProfileForm.forEach((value, key) => { formDataObject[key] = value; });
        formDataObject.licenceFront = front;
        formDataObject.licenceBack = back;
        formDataObject.profileImage = profileImage;

        const response = await addProfile(formDataObject)
        if (response.data.success) {
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    const userdata = async () => {
        const profile = await profileData()
        setprofileDetails(profile.data.user)
    }
    
    useEffect(() => { userdata() }, [refrsh])

    return (
        <div className="bg-gray-900 min-h-screen font-sans text-gray-100 flex flex-col pt-16">
            <div className='sticky top-0 z-50'>
                <Navbar />
            </div>
            
            <div className="flex-grow container mx-auto px-4 py-8 mb-16 relative z-10">
                <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="mb-8 pl-4">
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 tracking-wide">My Profile</h1>
                    <p className="text-gray-400 mt-2">Manage your personal information and documents</p>
                </div>

                <div className='flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto'>
                    {/* Left Sidebar Profile Image */}
                    <div className='w-full lg:w-1/3 xl:w-1/4'>
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] sticky top-28">
                            
                            <div className="relative group mx-auto w-40 h-40 mb-6">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                                <div className="relative w-full h-full rounded-full border-2 border-teal-500/50 p-1 overflow-hidden bg-gray-800">
                                    <img src={profileImage || profileDetails?.userImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} className="w-full h-full object-cover rounded-full" alt="Profile" />
                                </div>
                                <label className="absolute bottom-0 right-0 bg-teal-500 hover:bg-teal-400 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors border-2 border-gray-900">
                                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <input type="file" className="hidden" onChange={(e) => handleFile(e, setProfileImage)} />
                                </label>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-xl font-bold text-white mb-1">{profileDetails?.firstName || 'User Name'}</h2>
                                <p className="text-sm text-gray-400">{profileDetails?.email || 'user@example.com'}</p>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 font-semibold transition-all hover:bg-teal-500/20" onClick={() => navigate('/orderlist')}>
                                    <span className="flex items-center"><svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> My Bookings</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>
                                
                                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 font-semibold transition-all hover:bg-gray-800 hover:text-white">
                                    <span className="flex items-center"><svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className='w-full lg:w-2/3 xl:w-3/4'>
                        <form onSubmit={submitProfile} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                            
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mr-3 border border-blue-500/30 text-sm">1</span>
                                Personal Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                                    <input className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors" type="text" name='firstName' defaultValue={profileDetails?.firstName} placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                                    <input className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors" type="email" name='email' defaultValue={profileDetails?.email} placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Phone Number</label>
                                    <input className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors" type="tel" name='phone' defaultValue={profileDetails?.phone} placeholder="+91 9876543210" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">District Focus</label>
                                    <input className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors" type="text" name='district' defaultValue={profileDetails?.district} placeholder="E.g., Malappuram" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Age</label>
                                    <input className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors" type="number" name='age' defaultValue={profileDetails?.age} placeholder="25" />
                                </div>
                            </div>

                            <div className="border-t border-gray-700/50 my-8"></div>

                            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mr-3 border border-emerald-500/30 text-sm">2</span>
                                Driving License Documents
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Front Side Upload */}
                                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-4 flex flex-col hover:border-teal-500/50 transition-colors group">
                                    <h4 className="text-gray-300 font-medium mb-3">Front Side</h4>
                                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-800 mb-4 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                                        {(front || profileDetails?.licenseFront) ? (
                                            <img src={front || profileDetails?.licenseFront} className="w-full h-full object-cover" alt="License Front" />
                                        ) : (
                                            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path></svg>
                                        )}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <label className="cursor-pointer bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg font-semibold shadow-lg flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg> Replace
                                                <input type="file" className="hidden" onChange={(e) => handleFile(e, setFront)} />
                                            </label>
                                        </div>
                                    </div>
                                    <label className="w-full text-center py-2 bg-gray-800 hover:bg-gray-700 text-teal-400 rounded-xl border border-gray-700 cursor-pointer transition-colors text-sm font-semibold">
                                        Upload Front
                                        <input type="file" className="hidden" onChange={(e) => handleFile(e, setFront)} />
                                    </label>
                                </div>

                                {/* Back Side Upload */}
                                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-4 flex flex-col hover:border-emerald-500/50 transition-colors group">
                                    <h4 className="text-gray-300 font-medium mb-3">Back Side</h4>
                                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-800 mb-4 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                        {(back || profileDetails?.licenseBack) ? (
                                            <img src={back || profileDetails?.licenseBack} className="w-full h-full object-cover" alt="License Back" />
                                        ) : (
                                            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path></svg>
                                        )}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <label className="cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg font-semibold shadow-lg flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg> Replace
                                                <input type="file" className="hidden" onChange={(e) => handleFile(e, setBack)} />
                                            </label>
                                        </div>
                                    </div>
                                    <label className="w-full text-center py-2 bg-gray-800 hover:bg-gray-700 text-emerald-400 rounded-xl border border-gray-700 cursor-pointer transition-colors text-sm font-semibold">
                                        Upload Back
                                        <input type="file" className="hidden" onChange={(e) => handleFile(e, setBack)} />
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700/50">
                                <button type="button" onClick={() => navigate('/edit')} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl border border-gray-700 transition-colors">
                                    Edit Values
                                </button>
                                <button type="submit" className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)] transform hover:-translate-y-0.5 transition-all">
                                    Save Profile
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}

export default UserProfile