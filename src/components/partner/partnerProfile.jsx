import React, { useEffect, useState } from 'react'
import { profileDetails, editPartnerProfile } from '../../apiConfig/axiosConfig/axiosPartnerConfig'
import toast from 'react-hot-toast'
import { CameraOutlined } from '@ant-design/icons'
import axios from 'axios'


function PartnerProfile() {

    const upload_preset = 'vytol9u4'
    const cloud_name = 'djbokpgy8'
    const [partner, setPartner] = useState([])
    const [partnerImg, setPartnerImg] = useState('')

    const partnerProfile = async () => {
        try {
            const res = await profileDetails()
            if (res.data.success) {
                setPartner(res.data.data)
                console.log(res.data.data, "this is partners profile details")
            }

        } catch (error) {
            toast.error('something went wrong..')
        }

    }

    const handleProfile = async (event) => {
        try {
            console.log('ibide ethiyittund');
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', upload_preset)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            if (response?.data?.secure_url) {
                console.log(response.data.secure_url, '12345');
                setPartnerImg(response.data.secure_url)
                const data = response.data.secure_url
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const submitPartnerProfile = async (e) => {
        e.preventDefault();
        const ProfileForm = new FormData(e.target);
        const formDataObject = {};
        ProfileForm.forEach((value, key) => {
            formDataObject[key] = value;
        });
        formDataObject.partnerImage = partnerImg;
        console.log(formDataObject, 'this is my form all details ');

        const response = await editPartnerProfile(formDataObject)
        if (response.data.success) {
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }

    }

    useEffect(() => {
        partnerProfile()

    }, [])

    return (
        < div >
            <div className='bg-red-600 w-full h-4'>

            </div>
            <div>
                <div class="md:grid grid-cols-4 grid-rows-2  bg-white gap-2 p-4 rounded-xl">
                    <div class="md:col-span-1 h-58 shadow-xl ">
                        <div class="flex w-full h-full relative">
                            <img src={partnerImg ? partnerImg : partner.partnerImage} class="w-44 h-44 m-auto" alt="" />
                            <input
                                type="file"
                                className='hidden'
                                name="image"
                                id="frontFileInput"
                                //ref={ }
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

                    </div>
                    <form onSubmit={submitPartnerProfile} class="md:col-span-3 h-58 shadow-xl p-4 space-y-2 p-3" >
                        <div class="flex ">
                            <span
                                class="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Name:</span>
                            <input
                                class="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                                name='name' type="text" defaultValue={partner.name} />
                        </div>
                        <div class="flex ">
                            <span
                                class="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Email:</span>
                            <input
                                class="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                                name='email' type="text" defaultValue={partner.email} />
                        </div>
                        <div class="flex ">
                            <span
                                class="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Phone:</span>
                            <input
                                class="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                                name='phone' type="text" defaultValue={partner.phone} />
                        </div>
                        <div class="flex ">
                            <span
                                class="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">district:</span>
                            <input
                                class="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                                name='district' type="text" defaultValue={partner.district} />
                        </div>
                        <div class="flex ">
                            <span
                                class="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">local area:</span>
                            <input
                                class="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                                name='localArea' type="text" defaultValue={partner.localArea} />
                        </div>
                        <div class="flex justify-center pt-3 ">

                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0" >EDIT</span>
                            </button>
                        </div>


                    </form>
                    <div class="md:col-span-3 h-48 shadow-xl  p-4 space-y-2 hidden md:block">
                        <h3 class="font-bold uppercase"> Profile Description</h3>
                        <p class="">
                            Meet our premier car rental partner—your gateway to hassle-free travel! Offering a diverse fleet, from stylish sedans to spacious SUVs, they prioritize your comfort and safety. With flexible options and competitive rates, experience seamless journeys tailored to your needs. Trust our partner to elevate your travel with reliability and unparalleled service.
                        </p>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default PartnerProfile