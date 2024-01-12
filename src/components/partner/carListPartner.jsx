import React, { useEffect, useRef, useState } from 'react'
import { partnerCars, partnerCarDetail, editPartnerCar } from '../../apiConfig/axiosConfig/axiosPartnerConfig'
import img from '../../assets/car1.avif'
import toast from 'react-hot-toast'
import imag from '../../assets/car1.avif'
import { editCar } from '../../apiConfig/axiosConfig/axiosPartnerConfig'

import axios from 'axios'


function PartnerCarList() {
    const [viewCar, setViewCar] = useState(false)
    const [carList, setCarList] = useState([])
    const [carView, setCarView] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [editTrue, setEditTrue] = useState(false)
    const [cars, setCars] = useState(false)
    const [carEdit, setCarEdit] = useState([])
    const [searchCar, setSearchCar] = useState('')

    const [items, setItems] = useState([])
    const [imageOne, setImageOne] = useState('no image')
    const [imageTwo, setImageTwo] = useState('no image')
    const [imageThree, setImageThree] = useState('no image')
    const [imageFour, setImageFour] = useState('no image')
    const [rcimage, setRcImage] = useState('no image')
    const [selectedCarCategory, setSelectedCarCategory] = useState('all');
    const [selectedTransmission, setSelectedTransmission] = useState('all');
    const [selectedFuel, setselectedFuel] = useState('all');
    const [uploadError, setUploadError] = useState()



    const [refrsh, setRefresh] = useState(false)

    const [name, setName] = useState('');
    const [index, setIndex] = useState(0);
    const inputRef = useRef(null);

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
            ///////////////////////da oru image eroroe adichal dipslay akkan ede atuthulka
            return;
        } else {
            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            formDataObject.image1 = imageOne;
            formDataObject.image2 = imageTwo;
            formDataObject.image3 = imageThree;
            formDataObject.image4 = imageFour;
            formDataObject.Rc = rcimage;
            formDataObject.carId = carEdit._id
            formDataObject.dropPoint = items;
            const response = await editCar(formDataObject)
            if (response.data.success) {
                toast.success(response.data.message)
                setEditTrue(false)
                setCars(true)
                refrsh ? setRefresh(false) : setRefresh(true)

            } else {
                toast.error(response.data.message)
            }
        }

    };

    const editForm = async (id) => {
        const val = carList.find((value) => {
            return value._id === id
        })
        setCarEdit(val)
        setImageOne(val.imageOne)
        setImageTwo(val.imageTwo)
        setImageThree(val.imageThree)
        setImageFour(val.imageFour)
        setRcImage(val.Rc)
        setEditTrue(true)
        setCars(false)
    }

    const handleView = async (id) => {
        await partnerCarDetail(id).then((res) => {
            if (res.data.success) {
                setCarView([res.data.data])
                setViewCar(true)
            } else {
                toast.error(res.data.message)
            }
        })
    }

    const lastItemIndex = currentPage * itemsPerPage;
    const firstIndex = lastItemIndex - itemsPerPage;
    const thisPageItems = carList.slice(firstIndex, lastItemIndex);

    const pages = [];
    for (let i = 1; i <= Math.ceil(carList.length / itemsPerPage); i++) {
        pages.push(i);
    }


    const search = async (e) => {
        setSearchCar(e.target.value)
        await findcars()
    }

    const findcars = async (e) => {

        const response = await partnerCars()

        setCars(true)
        const initialCars = response.data.data;
        setCarList(initialCars)

        const trimmedSearchTerm = searchCar.trim()

        if (trimmedSearchTerm.length !== 0) {
            const regex = new RegExp(trimmedSearchTerm, 'i');
            const filteredData = initialCars.filter((item) => regex.test(item.carMake));
            setCarList(filteredData);
        } else {
            setCarList(initialCars);
        }
    };


    const backButton = () => {
        console.log('helloooooooooo');
        setEditTrue(false)
        setCars(true)
    }


    useEffect(() => {
        const data = async () => {
            await partnerCars().then((res) => {
                setCarList(res.data.data)
                setCars(true)
            })
        }
        data()
        console.log(carList, "nnnnnnnnn")
    }, [refrsh])

    return (

        < div >

            {editTrue &&
                < div className=" w-full h-screen flex flex-col justify-center items-center">
                    <div className='w-full flex justify-end  '>
                        <button onClick={backButton} className='w-24 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>back</button>
                    </div>
                    <div className="w-full h-10 text-center text-2xl font-bold">
                        <h1>EDIT CAR</h1>
                    </div>
                    < form onSubmit={handleSubmit} className="flex w-2/3 h-full border shadow-lg" >
                        <div className="w-1/2 h-full p-3">

                            <div className="w-full  ">
                                <h1>owner name</h1>
                                <input className='w-full h-9 p-3 border rounded' defaultValue={carEdit.ownerName} name=' ownerName' type="text" />
                            </div>
                            <div className="w-full  ">
                                <h1>owner  email</h1>
                                <input className='w-full h-9 p-3 border rounded ' defaultValue={carEdit.ownerEmail} name='ownerEmail' type="text" />
                            </div>
                            <div className="flex w-full ">
                                <div className="w-1/2 p-2">
                                    <h1>car make</h1>
                                    <input className='w-full h-9 p-3 border rounded' defaultValue={carEdit.carMake} name='carMake' type="text" />
                                </div>
                                <div className="w-1/2 p-2">
                                    <h1>model</h1>
                                    <input className='w-full h-9 p-3 border rounded' defaultValue={carEdit.model} name='carModel' type="text" />
                                </div>

                            </div>
                            <div className="flex w-full ">
                                <div className="w-1/2 p-2">
                                    <h1>car year</h1>
                                    <input className='w-full h-9 p-3 border rounded' defaultValue={carEdit.carYear} name='carYear' type="number" />
                                </div>
                                <div className="w-1/2 p-2">
                                    <h1>car License plate</h1>
                                    <input className='w-full h-9 p-3 border rounded' defaultValue={carEdit.carLicenseNumber} name='carLicensePlate' type="text" />
                                </div>

                            </div>
                            <div className="flex flex-col gap-1 w-full ">
                                <h1>features</h1>
                                <input className='w-full h-9 p-3 border rounded' defaultValue={carEdit.features[0]} name='featureOne' type="text" />
                                <input className='w-full h-9 p-3 border rounded' defaultValue={carEdit.features[1]} name='featureTwo' type="text" />
                            </div>
                            <div className="w-full ">

                                <h1>discription</h1>
                                <textarea className='w-full p-3 border rounded  ' defaultValue={carEdit.discription} name='discription' type="textArea" />
                            </div>
                            <div className="w-full  ">
                                <h1>phone number</h1>
                                <input className='w-full h-9  p-3 border rounded' defaultValue={carEdit.phone} name='phone' type="number" />
                            </div>
                            <div className="w-full ">
                                <h1>price</h1>
                                <input className='w-full h-9  p-3 border rounded ' defaultValue={carEdit.price} name='price' type=" number" />
                            </div>
                            <div className="w-full flex justify-center items-center my-2">
                                <button type="submit" className="w-2/3 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit car</button>
                            </div>
                        </div>
                        <div className="w-1/2 h-full p-3 ">

                            <div className="w-full my-2 ">
                                <h1>transmission</h1>
                                <select onChange={(e) => {
                                    setSelectedTransmission(e.target.value)
                                }}

                                    className='w-full h-10 border text-black rounded' defaultValue={carEdit.transmission} name='transmission' id="">
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
                                    className='w-full h-10 border text-black rounded' defaultValue={carEdit.fuelType} name="fuelType" id="">
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
                                    name="carCategory" className=' w-full h-10 border text-black rounded' defaultValue={carEdit.carCategory} >
                                    <option value='all'> all</option>
                                    <option value='Racing' > Racing</option>
                                    <option value='advanture'> advanture</option>
                                    <option value='normal' > normal </option>

                                </select>
                            </div>

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
                                    src={rcimage ? rcimage : carEdit.Rc}
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
                                        src={imageOne ? imageOne : carEdit.carImage1}
                                        className='w-full h-full' />
                                </div>
                                <div className='w-full md:w-1/2 h-1/2 flex justify-center border'>
                                    <img
                                        alt="example"
                                        src={imageTwo ? imageTwo : carEdit.carImage2}

                                        className='w-full h-full' />
                                </div>
                                <div className='w-full md:w-1/2 h-1/2 flex justify-center border'>
                                    <img
                                        alt="example"
                                        src={imageThree ? imageThree : carEdit.carImage3}
                                        className='w-full h-full'
                                    />
                                </div>
                                <div className='w-full md:w-1/2 h-1/2 flex justify-center '>
                                    <img
                                        alt="example"

                                        src={imageFour ? imageFour : carEdit.carImage4}
                                        className='w-full h-full'

                                    />
                                </div>
                            </div>
                        </div >
                    </form >
                </div >
            }

            {
                viewCar ?

                    < div className=' w-full  h-full  ' >
                        {carView.map((value, index) => (
                            <div className="flex  h-[50%]">
                                <div className="bg-white ml-3 rounded-lg h-full w-full shadow dark:bg-gray-700 overflow-y-scroll no-scrollbar " >

                                    <div className='flex w-full  '>
                                        <h3 className=" flex justify-end w-[55%] text-lg  font-semibold text-gray-900 dark:text-white underline " >
                                            CAR DETAILS
                                        </h3 >
                                        <button
                                            type="button"
                                            onClick={() => setViewCar(false)}
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            data-modal-toggle="crud-modal"
                                        >
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg >
                                            <span className="sr-only" > Close modal</span >
                                        </button >
                                    </div >

                                    < form className="p-4 md:p-5 " >
                                        <div className="grid gap-4  grid-cols-2" >
                                            <div className="col-span-2" >
                                                <label for="name" className="block mb-2 text-sm font-medium  dark:text-white" > Owner Name :  {value.ownerName}</label >

                                            </div >
                                            <div className="col-span-2 sm:col-span-1" >
                                                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Owner Email : {value.ownerEmail}</label >

                                            </div >
                                            <div className="col-span-2 sm:col-span-1" >
                                                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Car make : {value.carMake}</label >

                                            </div >
                                            <div className="col-span-2 sm:col-span-1" >
                                                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Car Model : {value.model}</label >

                                            </div >
                                            <div className="col-span-2 sm:col-span-1" >
                                                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Car Year : {value.carYear}</label >

                                            </div >
                                            <div className="col-span-2 sm:col-span-1" >
                                                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Car Lisense Number : {value.carLicenseNumber}</label >

                                            </div >
                                            <div className="col-span-2 sm:col-span-1" >
                                                <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Transmission : {value.transmission}</label >

                                            </div >
                                            <div className="col-span-2 sm:col-span-1" >
                                                <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Fuel Type : {value.fuelType}</label >

                                            </div >
                                            <div className="col-span-2 sm:col-span-1" >
                                                <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Car Category : {value.carCategory}</label >

                                            </div >
                                            <div className="col-span-2 sm:col-span-1" >
                                                <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Phone : {value.phone}</label >

                                            </div >
                                            <div className="col-span-2 sm:col-span-1" >
                                                <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Features 1 : {value.features[0]}</label >

                                            </div >
                                            <div className="col-span-2 sm:col-span-1" >
                                                <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Features 2 : {value.features[1]}</label >

                                            </div >

                                            <div className="col-span-2" >
                                                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Product Description : {value.discription}</label >
                                            </div >
                                            <div className="col-span-2" >
                                                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white underline" > Car Image</label >
                                            </div >
                                            <div className='flex flex-wrap w-full h-full border'>

                                                <div className='w-full md:w-1/2 h-1/2 flex justify-center border'>
                                                    <img
                                                        alt="example"
                                                        src={value.carImage1 ? value.carImage1 : img}
                                                        className='w-30 h-30'
                                                    />
                                                </div>
                                                <div className='w-full md:w-1/2 h-1/2 flex justify-center border'>
                                                    <img
                                                        alt="example"
                                                        src={value.carImage2 ? value.carImage2 : img}
                                                        className='w-30 h-30'
                                                    />
                                                </div>
                                                <div className='w-full md:w-1/2 h-1/2 flex justify-center border'>
                                                    <img
                                                        alt="example"
                                                        src={value.carImage3 ? value.carImage3 : img}
                                                        className='w-30 h-30'
                                                    />
                                                </div>
                                                <div className='w-full md:w-1/2 h-1/2 flex justify-center '>
                                                    <img
                                                        alt="example"
                                                        src={value.carImage4 ? value.carImage4 : img}
                                                        className='w-30 h-30'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-2 " >
                                                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white underline" > RC</label >
                                                <div className='w-full md:w-1/2 h-dull   '>

                                                    <img
                                                        alt="example"
                                                        src={value.Rc ? value.Rc : img}
                                                        className='w-30 h-30'
                                                    />
                                                </div>
                                            </div >
                                        </div >
                                    </form >
                                </div >
                            </div >
                        ))
                        }
                        {

                        }
                    </div >
                    : < div >

                        {cars ?
                            <div>

                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <div className="flex items-center  justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                                        <label htmlFor="table-search" className="sr-only ">
                                            Search
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        strokeWidth="2"
                                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                id="table-search-users"
                                                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Search for users"
                                                onChange={search}
                                            />
                                        </div>
                                    </div>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-100 dark:text-gray-100">
                                        <thead className="text-xs text-gray-100 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>

                                                <th scope="col" className="px-6 py-3">
                                                    image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Car Make
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Car Year
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    view
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Edit
                                                </th>
                                            </tr>
                                        </thead>
                                        {thisPageItems.map((value, index) => (

                                            < tbody key={index} >
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="w-4 p-4">
                                                        <img src={value.carImage1 ? value.carImage1 : img} className='border'
                                                            alt="" />
                                                    </td>
                                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        {/*<img className="w-10 h-10 rounded-full" src={img} alt="Jese image" />*/}
                                                        <div className="ps-3">
                                                            <div className="text-base font-semibold">{value.carMake} </div>
                                                            <div className="font-normal text-gray-100"> </div>
                                                        </div>
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {/*{value.phone}*/}
                                                        {value.carYear}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className={`h-2.5 w-2.5 rounded-full ${value.status ? ' bg-green-500 me-2' : 'bg-red-500 me-2'}`}></div>{value.status ? ' Active' : 'Deactive'}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <a onClick={() => { handleView(value._id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">view</a>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => { editForm(value._id) }} className={`font-medium  hover:bg-gray-400 bg-black w-20 h-10 rounded-sm ${value.status ? 'dark:text-red-500 font-bold' : 'dark:text-green-500 font-bold'} hover:underline`}>{value.status ? 'Edit' : 'Edit'}</button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        ))
                                        }
                                    </table>
                                </div>
                                <div className='flex justify-center'>
                                    {
                                        pages.slice(
                                            Math.max(currentPage - 2, 0),
                                            Math.min(currentPage + 1, pages.length)
                                        )
                                            .map((page, index) => (
                                                <button
                                                    onClick={() => setCurrentPage(page)}
                                                    key={index}
                                                    className={`font-extrabold p-2 ${currentPage === page
                                                        ? "text-4xl text-sky-300"
                                                        : "text-xl text-green-600"
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))
                                    }
                                </div>


                            </div>
                            : ''
                        }
                    </div >
            }


        </div >

    )
}

export default PartnerCarList