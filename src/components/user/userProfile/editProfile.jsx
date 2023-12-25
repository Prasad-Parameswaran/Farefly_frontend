import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../navbar/navbar'
import axios from 'axios'
import { editProfile, profileData } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import { CameraOutlined } from '@ant-design/icons'
import Footer from '../footer/footer'
import backsideImg from '../../../assets/UK driving licence back side Stock Photo - Alamy_files/uk-driving-licence-back-side-e1n51n(1).jpg'
import frontsideImg from '../../../assets/licence front.jpg'
import img from '../../../assets/profile.png'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function Edit() {

    const upload_preset = 'vytol9u4'
    const cloud_name = 'djbokpgy8'
    const [profileDetails, setprofileDetails] = useState([])
    const [refrsh, setRefresh] = useState(true)
    const [profileImage, setProfileImage] = useState(img)
    const [front, setFront] = useState(frontsideImg)
    const [back, setBack] = useState(backsideImg)
    const fileInputRef = useRef(null);

    const navigate = useNavigate()
    const handleFile = async (event) => {
        try {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', upload_preset)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            if (response?.data?.secure_url) {
                setFront(response.data.secure_url)
                const data = response.data.secure_url
                //await postProfileImage(data).then((res) => {
                //    console.log(res, "data");
                //})
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleProfile = async (event) => {
        try {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', upload_preset)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            if (response?.data?.secure_url) {
                setProfileImage(response.data.secure_url)
                const data = response.data.secure_url
                //await postProfileImage(data).then((res) => {
                //    console.log(res, "data");
                //})
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleback = async (event) => {
        try {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', upload_preset)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            if (response?.data?.secure_url) {
                console.log(response.data.secure_url, "this is my license backside url ");
                setBack(response.data.secure_url)
                const data = response.data.secure_url
                //await postProfileImage(data).then((res) => {
                //    console.log(res, "data");
                //})
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const submitProfile = async (e) => {
        e.preventDefault();
        const ProfileForm = new FormData(e.target);
        const formDataObject = {};
        ProfileForm.forEach((value, key) => {
            formDataObject[key] = value;
        });
        formDataObject.licenseFront = front;
        formDataObject.licenseBack = back;
        formDataObject.userImage = profileImage;
        console.log(formDataObject, 'this is my form all details ');

        const response = await editProfile(formDataObject)
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
    useEffect(() => {
        userdata()
    }, [])


    return (
        <div >
            <div className='sticky top-0 z-50   '>
                <Navbar />
            </div>
            {/*<div className='text-center text-4xl'>userProfile</div>*/}
            <div >

                <div className=' flex p-10  text-center gap-5 justify-center  '>
                    <div
                        className='w-1/5 h-full   border     rounded-lg '>
                        <div className='relative rounded-lg'>
                            <div className='w-full h-1/2 flex justify-center  p-4  rounded-lg'>

                                <img
                                    alt="example"
                                    src={profileImage ? profileImage : profileDetails.userImage}
                                    className='rounded-full w-48 h-48 p-4 shadow-lg border border-yellow-300'

                                />
                            </div>

                            <input
                                type="file"
                                className='hidden'
                                name="image"
                                id="frontFileInput"
                                ref={fileInputRef}
                                onChange={handleProfile}
                            />
                            <div className="group cursor-pointer absolute top-[80%] left-[70%] " >
                                <span onClick={() => {
                                    document.getElementById('frontFileInput').click();
                                }} className=" items-center justify-center">
                                    <span className="bg-gray-300 p-2 rounded-lg group-hover:bg-gray-400 transition duration-300">
                                        <CameraOutlined />
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className='flex bg-yellow-100 h-11 border'>

                            <h1 className='pl-2 pt-1 text-center w-full font-serif '>{profileDetails ? profileDetails.firstName : ''}</h1>

                        </div>
                        {/*<div className='flex bg-gray-100 h-11 justify-between border hover:bg-yellow-100'>
                            <div className='flex w-full justify-center'>
                                <h1 className='pl-2 pt-1 text-center w-full font-bold'>wallet amount : 2000</h1>
                            </div>

                        </div>*/}
                        <div className='flex bg-gray-100 h-11 border hover:bg-yellow-100'>

                            <h1 className='pl-2 pt-1 text-center font-bold w-full'>Bookings</h1>
                        </div>
                        <div className='flex bg-gray-100 h-11 border hover:bg-yellow-100'>

                            <h1 className='pl-2 pt-1 text-center font-bold w-full'>Logout</h1>
                        </div>


                        {/* <p>wallet amount : 2000</p> */}

                    </div>

                    <div className='w-7/12  flex flex-row rounded-lg border-2  border-lime-400  '>


                        <form onSubmit={submitProfile} className='w-full m-14  flex flex-col rounded-lg shadow-md shadow-white saturate-200' >
                            <div className='md:flex w-full'>
                                <div className='md:w-full h-full'>
                                    <div className='w-full h-20 '>
                                        {/* {/<h1>Name</h1>/} */}
                                        <input
                                            className={'border border-lime-400 w-full h-2/3 rounded-lg px-3 text-black'}
                                            type="text"
                                            name='firstName'
                                            placeholder='Name'
                                            defaultValue={profileDetails && profileDetails.firstName}
                                        />

                                    </div>
                                    <div className='w-full h-20 '>
                                        {/* {/<h1>Email</h1>/} */}
                                        <input className={'border border-lime-400 w-full h-2/3 rounded-lg px-3 text-black'}
                                            type="text"
                                            placeholder='Email'
                                            name='email'
                                            defaultValue={profileDetails && profileDetails.email}

                                        />
                                    </div>
                                    <div className='w-full h-20 '>
                                        {/* {/<h1>Phone</h1>/} */}
                                        <input className={'border border-lime-400 w-full h-2/3 rounded-lg px-3 text-black'}
                                            type="number"
                                            name='phone'
                                            placeholder='Phone'
                                            defaultValue={profileDetails && profileDetails.phone}

                                        />
                                    </div>
                                    <div className='w-full h-20 '>
                                        {/* {/<h1>District</h1>/} */}
                                        <input className={'border border-lime-400 w-full h-2/3 rounded-lg px-3 text-black'}
                                            type="text"
                                            name='district'
                                            placeholder='District'
                                            defaultValue={profileDetails && profileDetails.district}
                                        />
                                    </div>
                                    <div className='w-full h-20 '>
                                        {/* {/<h1>Age</h1>/} */}
                                        <input className={'border border-lime-400 w-full h-2/3 rounded-lg px-3 text-black'}
                                            type="number"
                                            name='age'
                                            placeholder='Age'
                                            defaultValue={profileDetails && profileDetails.age}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <h1 className='text-start pl-4' >Driving licence</h1>
                            </div>


                            <div className="flex p-4 gap-4 ">

                                <div className="w-1/2 p-4 border    border-lime-400  ">
                                    <h1 className='text-start'>front side</h1>
                                    <img alt="example" src={front ? front : profileDetails.licenseFront} className="w-full h-[90%]" />
                                    <input
                                        type="file"
                                        name="image"
                                        id='front'
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFile}

                                    />
                                    <div
                                        className="group cursor-pointer"
                                    >

                                        <span className=" items-center justify-center" onClick={() => { document.getElementById('front').click() }}>
                                            <span className="bg-gray-300 p-2 rounded-lg group-hover:bg-gray-400 transition duration-300">
                                                {/* Add your camera icon here */}
                                                Click here to upload  back side license.
                                                {/*<CameraOutlined />*/}
                                            </span>
                                        </span>
                                    </div>
                                    {/* Other content for the first div */}
                                </div>

                                <div className="w-1/2 p-4 border border-lime-400">
                                    <h1 className='text-start'>back side</h1>

                                    <img alt="example" src={back ? back : profileDetails.licenseBack} className="w-full h-[90%]" />
                                    <input
                                        type="file"
                                        name="image"
                                        id='back'
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleback}
                                    />
                                    <div
                                        className="group cursor-pointer"

                                    >
                                        <span className=" items-center justify-center" onClick={() => { document.getElementById('back').click() }}>

                                            <span className="bg-gray-300 p-2 rounded-lg group-hover:bg-gray-400 transition duration-300">
                                                {/* Add your camera icon here */}
                                                Click here to upload  front side license.
                                            </span>
                                        </span>
                                    </div>
                                    {/* Other content for the second div */}
                                </div>
                            </div>
                            <div className='pt-6 w-full flex justify-center'>
                                <button type="submit" className="text-white border bg-lime-500 hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:bg-lime-200 me-2 mb-2" >
                                    Edit
                                </button>

                            </div>
                        </form>

                    </div >
                    <div className=''>
                        <button onClick={() => { navigate('/profile') }} className="text-white border bg-lime-500 hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:bg-lime-200 me-2 mb-2" >
                            Back
                        </button>
                    </div>
                </div>
            </div >
            <div>
                <Footer />
            </div>
        </div >
    )
}

export default Edit