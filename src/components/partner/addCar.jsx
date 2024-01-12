import React, { useState, useRef, useEffect } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import axios from "axios";
import { addCarImg } from '../../apiConfig/axiosConfig/axiosPartnerConfig'
import toast from "react-hot-toast";
import imag from '../../assets/car1.avif'


function CarDetailsForm() {

    const [items, setItems] = useState([])
    const [imageOne, setImageOne] = useState('')
    const [imageTwo, setImageTwo] = useState('')
    const [imageThree, setImageThree] = useState('')
    const [imageFour, setImageFour] = useState('')
    const [rcimage, setRcImage] = useState('')
    const [selectedCarCategory, setSelectedCarCategory] = useState('all');
    const [selectedTransmission, setSelectedTransmission] = useState('all');
    const [selectedFuel, setselectedFuel] = useState('all');
    const [value, setValue] = useState({
        carLicenseNumber: 'KL-00-000',
    });
    const formattedLicenseNumber = value.carLicenseNumber.replace(/(\w{2})(\w{2})(\w{3})/, '$1-$2-$3');



    const [refrsh, setRefresh] = useState(false)

    const [name, setName] = useState('');
    const [index, setIndex] = useState(0); // Initialize index state
    const inputRef = useRef(null);
    const [uploadError, setUploadError] = useState()

    const upload_preset = 'vytol9u4'
    const cloud_name = 'djbokpgy8'


    const validateImage = (file, field) => {
        if (file == '') {
            setUploadError((prev) => ({ ...prev, [field]: 'Please select an image.' }));
            return false;
        } else {
            setUploadError((prev) => ({ ...prev, [field]: '' }));
            return true;
        }

    }

    const image1 = async (e) => {
        const file = e.target.files[0]
        const isValid = validateImage(file, 'image1');
        if (!isValid) return;
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', upload_preset)
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        if (response?.data?.secure_url) {
            const data = response.data.secure_url
            setImageOne(data)
            //refrsh ? setRefresh(false) : setRefresh(true)
        }
    }
    const image2 = async (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0],)
        formData.append('upload_preset', upload_preset)
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)

        if (response?.data?.secure_url) {
            const data = response.data.secure_url
            setImageTwo(data)


        }
    }
    const image3 = async (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0],)
        formData.append('upload_preset', upload_preset)
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        if (response?.data?.secure_url) {
            const data = response.data.secure_url
            setImageThree(data)


        }
    }
    const image4 = async (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0],)
        formData.append('upload_preset', upload_preset)
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        if (response?.data?.secure_url) {
            const data = response.data.secure_url
            setImageFour(data)
        }
    }
    const RCimage = async (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0],)
        formData.append('upload_preset', upload_preset)
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        if (response?.data?.secure_url) {
            const data = response.data.secure_url
            setRcImage(data)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        for (const [key, value] of formData.entries()) {
            if (value.trim() === '') {
                toast.error(`Please fill ${key}`);
                return;
            }
        }
        const areImagesValid =
            validateImage(imageOne, 'image1') &&
            validateImage(imageTwo, 'image2') &&
            validateImage(imageThree, 'image3') &&
            validateImage(imageFour, 'image4') &&
            validateImage(rcimage, 'RCimage');

        if (!areImagesValid) {
            toast.error('Please select Images')
            return;
        } else {

            const formDataObject = {};
            formData.forEach((value, key) => {
                if (value == '') {
                    toast.error('please fill'[key])
                } else {
                    formDataObject[key] = value;
                }

            })


            formDataObject.image1 = imageOne;
            formDataObject.image2 = imageTwo;
            formDataObject.image3 = imageThree;
            formDataObject.image4 = imageFour;
            formDataObject.Rc = rcimage;
            formDataObject.dropPoint = items;
            console.log(formDataObject);
            const response = await addCarImg(formDataObject)
            if (response.data.success) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        }


        //}
    }




    useEffect(() => {

    }, [])


    return (
        <div className=" w-full h-screen flex flex-col justify-center items-center">
            <div className="w-full h-10 text-center text-2xl font-bold">
                <h1>ADD CAR</h1>
            </div>
            < form onSubmit={handleSubmit} className="flex w-2/3 h-full border shadow-lg" >
                <div className="w-1/2 h-full p-3">

                    <div className="w-full  ">
                        <h1>owner name</h1>
                        <input className='w-full h-9 p-3 border rounded ' name='ownerName' type="text" />
                    </div>
                    <div className="w-full  ">
                        <h1>owner  email</h1>
                        <input className='w-full h-9 p-3 border rounded ' name='ownerEmail' type="text" />
                    </div>
                    <div className="flex w-full ">
                        <div className="w-1/2 p-2">
                            <h1>car make</h1>
                            <input className='w-full h-9 p-3 border rounded' name='carMake' type="text" />
                        </div>
                        <div className="w-1/2 p-2">
                            <h1>model</h1>
                            <input className='w-full h-9 p-3 border rounded' name='carModel' type="text" />
                        </div>

                    </div>
                    <div className="flex w-full ">
                        <div className="w-1/2 p-2">
                            <h1>car year</h1>
                            <input className='w-full h-9 p-3 border rounded' name='carYear' type="number" />
                        </div>
                        <div className="w-1/2 p-2">
                            <h1>car License plate</h1>
                            <input className='w-full h-9 p-3 border rounded' name='carLicensePlate' type="text" />
                        </div>

                    </div>
                    <div className="flex flex-col gap-1 w-full ">
                        <h1>features</h1>
                        <input className='w-full h-9 p-3 border rounded' name='featureOne' type="text" />
                        <input className='w-full h-9 p-3 border rounded' name='featureTwo' type="text" />
                    </div>
                    <div className="w-full ">

                        <h1>discription</h1>
                        <textarea className='w-full p-3 border rounded  ' name='discription' type="textArea" />
                    </div>
                    <div className="w-full  ">
                        <h1>phone number</h1>
                        <input className='w-full h-9  p-3 border rounded' name='phone' type="number" />
                    </div>
                    <div className="w-full ">
                        <h1>price</h1>
                        <input className='w-full h-9  p-3 border rounded ' name='price' type=" number" />
                    </div>
                    <div className="w-full flex justify-center items-center my-2">
                        <button type="submit" className="w-2/3 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">add car</button>
                    </div>
                </div>
                <div className="w-1/2 h-full p-3 ">

                    <div className="w-full my-2 ">
                        <h1>transmission</h1>
                        <select onChange={(e) => {
                            setSelectedTransmission(e.target.value)
                        }}
                            value={selectedTransmission}
                            className='w-full h-10 border text-black rounded' name='transmission' id="">
                            <option value="auto">auto</option>
                            <option value="manual">manual</option>
                            <option value="power">power</option>
                        </select>
                    </div>
                    <div className="w-full my-2 ">
                        <h1>Fuel type</h1>
                        <select onChange={(e) => {
                            setselectedFuel(e.target.value)
                        }}
                            value={selectedFuel}
                            className='w-full h-10 border text-black rounded' name="fuelType" id="">
                            <option value="desel">desel</option>
                            <option value="petrol">petrol</option>
                            <option value="nitragen">nitragen</option>
                            <option value="electric">electric</option>
                        </select>
                    </div>
                    <div className="w-full my-2 ">
                        <h1>Car category</h1>
                        <select onChange={(e) => {
                            setSelectedCarCategory(e.target.value)
                        }}
                            value={selectedCarCategory}
                            name="carCategory" className=' w-full h-10 border text-black rounded' >
                            <option value='all'> all</option>
                            <option value='Racing' > Racing</option>
                            <option value='advanture'> advanture</option>
                            <option value='normal' > normal </option>

                        </select>
                    </div>
                    {/*<div>
                        <h1>Drop Point</h1>

                        <Select
                            className="w-full rounded"
                            placeholder="custom dropdown render"
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider
                                        style={{
                                            margin: '8px 0',
                                        }}
                                    />
                                    <Space
                                        style={{
                                            padding: '0 8px 4px',
                                        }}
                                    >
                                        <Input
                                            placeholder="Please enter item"
                                            ref={inputRef}
                                            value={name}
                                            onChange={onNameChange}
                                            onKeyDown={(e) => e.stopPropagation()}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={items.map((item) => ({
                                label: item,
                                value: item,
                            }))}
                            name='dropPoint'
                        />
                    </div>*/}
                    <div>
                        <h1>RC image</h1>
                    </div>
                    <div onClick={() => {
                        document.getElementById('5').click()
                    }} className="w-1/12 m-1 h-[30px] flex justify-center items-center border border-blue-950 hover:bg-slate-500 hover:shadow-lg hover:shadow-indigo-500/50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16"> <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" /> <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" /> </svg>
                        <input id='5' type="file" onChange={RCimage} hidden />

                    </div>
                    <div className='w-full md:w-[30%] h-[10%] flex justify-center border '>
                        <img
                            alt="example"
                            src={rcimage ? rcimage : ''}
                            className='w-full h-full' />
                    </div>
                    <div>
                        <h1 >Add car image</h1>
                    </div>
                    <div className="grid grid-cols-2 w-1/3 gap-1 border">

                        <div onClick={() => {
                            document.getElementById('1').click()
                        }} className="w-full m-1 h-[50px] flex justify-center items-center border border-blue-950 hover:bg-slate-500 hover:shadow-lg hover:shadow-indigo-500/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16"> <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" /> <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" /> </svg>
                            <input id='1' type="file" onChange={image1} hidden />

                        </div>
                        <div onClick={() => {
                            document.getElementById('2').click()
                        }} className="w-full m-1 h-[50px] flex justify-center items-center border border-blue-950  hover:bg-slate-500 hover:shadow-lg hover:shadow-indigo-500/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16"> <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" /> <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" /> </svg>
                            <input id='2' type="file" onChange={image2} hidden />
                        </div>
                        <div onClick={() => {
                            document.getElementById('3').click()
                        }} className="w-full m-1 h-[50px] flex justify-center items-center border border-blue-950  hover:bg-slate-500 hover:shadow-lg hover:shadow-indigo-500/50" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16"> <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" /> <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" /> </svg>
                            <input id='3' type="file" onChange={image3} hidden />

                        </div>
                        <div onClick={() => {
                            document.getElementById('4').click()
                        }} className="w-full m-1 h-[50px] flex justify-center items-center border border-blue-950  hover:bg-slate-500 hover:shadow-lg hover:shadow-indigo-500/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16"> <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" /> <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" /> </svg>
                            <input id='4' type="file" onChange={image4} hidden />

                        </div>

                    </div>

                    < div className='flex flex-wrap w-1/2 h-1/3/2 border'>
                        <div className='w-full md:w-1/2 h-1/2 flex justify-center border'>
                            <img
                                alt="example"
                                src={imageOne ? imageOne : ''}
                                className='w-full h-full' />
                        </div>
                        <div className='w-full md:w-1/2 h-1/2 flex justify-center border'>
                            <img
                                alt="example"
                                src={imageTwo ? imageTwo : ''}
                                className='w-full h-full' />
                        </div>
                        <div className='w-full md:w-1/2 h-1/2 flex justify-center border'>
                            <img
                                alt="example"
                                src={imageThree ? imageThree : ''}
                                className='w-full h-full'
                            />
                        </div>
                        <div className='w-full md:w-1/2 h-1/2 flex justify-center '>
                            <img
                                alt="example"

                                src={imageFour ? imageFour : ''}
                                className='w-full h-full'

                            />
                        </div>
                    </div>





                </div >
            </form >
        </div >

    )
}

export default CarDetailsForm;
