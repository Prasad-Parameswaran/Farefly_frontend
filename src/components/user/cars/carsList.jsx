import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/user/navbar/navbar'
import Footer from '../../../components/user/footer/footer'
import { carList, findDistrictCar, findLocalAreaCar, findHomeSearch } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import CarFliter from '../../../components/user/manupulateCar/carfilter'
import toast from 'react-hot-toast'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

function CarsList() {
    const [cars, setCars] = useState([])
    const [viewCar, setViewCar] = useState('')
    const navigate = useNavigate()

    const [district, setDitstrict] = useState([])
    const [localArea, setLocalArea] = useState([])
    const [districtSelect, setDitstrictSelect] = useState(false)
    const [districtVal, setDistrictVal] = useState('')
    const [loder, setLoder] = useState('')
    const [formDataObj, setFormDataObj] = useState({})
    const [searchCar, setSearchCar] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [defaultDistrict, setDefaultDistrict] = useState('')
    const location = useLocation()

    const data = location.state
    const search = async (e) => {
        setSearchCar(e.target.value)
        await findcars()
    }

    const findcars = async () => {
        console.log(searchCar, "this is search car data ");

        const response = await carList();
        const initialCars = response.data.carList;
        setDitstrict(response.data.district);
        setLocalArea(response.data.localArea);
        setCars(initialCars);
        console.log(initialCars.length, 'this is car data');

        const trimmedSearchTerm = searchCar.trim()

        if (trimmedSearchTerm.length !== 0) {
            const regex = new RegExp(trimmedSearchTerm, 'i');
            const filteredData = initialCars.filter((item) => regex.test(item.carMake));
            setCars(filteredData);
        } else {
            setCars(initialCars);
        }
    };



    const findDistrict = async (value) => {
        const val = {
            pickUpDate: start,
            dropDate: end,
            district: value
        }
        console.log(val, 'this is district all data....')
        const response = await findDistrictCar(val)
        if (response.data.car) {
            setCars(response.data.car)
            //setLocalArea(response.data.localArea)
            setDitstrictSelect(true)
            setDistrictVal(value)
        } else {
            toast.error('something went wrong ')
        }

    }

    const find = async (value) => {
        console.log(value)
        setStart(value.pickUpDate)
        setEnd(value.dropDate)
        setDefaultDistrict(value.district)
        console.log(value, "kkkkkkkkkkkkkkk")
        const response = await findHomeSearch(value)
        if (response.data.data) {
            setCars(response.data.data)
            setLocalArea(response.data.localArea)
            setDitstrict(response.data.district)
            setDitstrictSelect(true)
        } else {
            toast.error('something went wrong ')
        }

    }
    const dateFilter = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        console.log(formDataObject, 'this is date data ')
        let count = 0
        for (let key in formDataObject) {
            if (formDataObject.hasOwnProperty(key)) {
                if (key == 'district' && formDataObject[key] == '') {
                    toast.error("please select District");
                    count++
                    break
                } else if (key == 'pickUpDate' && formDataObject[key] == '') {
                    toast.error("please select Start Date");
                    count++
                    break
                } else if (key == 'dropDate' && formDataObject[key] == '') {
                    toast.error("please add End Date");
                    count++
                    break
                }
            }
            if (districtVal == '') {
                toast.error("please Select District");
                break;
            } else {
                formDataObject.district = districtVal
                console.log(formDataObject, 'this is my form data')
                setFormDataObj(formDataObject)
                const response = await findHomeSearch(formDataObject)
                if (response.data.data) {
                    setCars(response.data.data)
                    setLocalArea(response.data.localArea)
                    setDitstrict(response.data.district)
                    //setDitstrictSelect(true)
                } else {
                    toast.error('something went wrong ')
                }
            }


        }
    }

    const findLocalArea = async (value) => {
        const response = await findLocalAreaCar(value)

        if (response.data.car) {
            console.log(response.data.car, response.data.localArea, ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;')

            setCars(response.data.car)
            setLocalArea(response.data.localArea)
            setDitstrictSelect(true)
        } else {
            toast.error('something went wrong ')
        }

    }

    const booking = async (id) => {
        console.log('this is my form data object')
        const start = document.getElementById('pickUpDate').value
        const end = document.getElementById('dropDate').value
        if (start == '') {
            toast.error('!Please select Start Date')
        } else if (end == '') {
            toast.error('!Please select End Date')

        } else if (districtVal == '') {
            toast.error('!Please select District ')

        } else {
            const obj = {
                pickUpDate: start,
                dropDate: end,
                carId: id,
                district: districtVal,
            }
            navigate('/booking', { state: obj })
        }


    }


    useEffect(() => {
        const list = async () => {
            setLoder(`https://cdn.dribbble.com/users/851350/screenshots/2778946/media/6d198585898ba9fbd1bc4812cedcff65.gif`)
            setTimeout(() => {
                find(data)
                setLoder('')
            }, 1000);

        }
        list()

    }, [])


    return (
        <div className='h-[30%]'>
            <div className='sticky top-0 z-50'>
                <Navbar />
            </div>
            <div className='sticky top-0 z-50'>
                <div>
                    <div className="bg-lime-600 p-4 text-white">
                        <div className="flex items-center justify-between">
                            {/* Date Filter */}
                            <form onSubmit={dateFilter} className="flex items-center space-x-4">
                                <div className="flex items-center ">
                                    <label htmlFor="dateFilter" className="text-white">
                                        START:
                                    </label>
                                    <input
                                        type="date"
                                        id="pickUpDate"
                                        defaultValue={start}
                                        name='pickUpDate'
                                        //onChange={(e) => onDateFilter(e.target.value)}
                                        min={new Date().toISOString().split(" T")[0]}

                                        className="border p-1 text-black rounded-lg"
                                    />
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label htmlFor="dateFilter" className="text-white">
                                        END:
                                    </label>
                                    <input
                                        type="date"
                                        id="dropDate"
                                        name='dropDate'
                                        defaultValue={end}
                                        //onChange={(e) => onDateFilter(e.target.value)}
                                        className="border p-1 text-black rounded-lg"
                                        min={new Date().toISOString().split(" T")[0]}

                                    />
                                </div>
                                <div className="flex items-center ">
                                    <button type="submit" className=" text-white bg-gradient-to-r from-gray-400 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-600
                                  dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">Find</button>
                                </div>
                            </form>

                            {/* Search */}
                            <div className="flex items-center space-x-4">
                                <label htmlFor="search" className="text-white ">
                                    SEARCH:
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    //value={searchTerm}
                                    onChange={search}
                                    className="border p-1 rounded-lg text-black"
                                />
                                {/*<button className="bg-black px-3 py-1 rounded-xl cursor-pointer ">
                                    Search
                                </button>*/}
                            </div>

                            {/* Category Filter */}
                        </div>
                    </div>
                </div >
                {/*<CarFliter />*/}
            </div >

            <div className='h-screen w-full flex '>
                <div className='w-[30%] h-[300px] p-3 m-6  border shadow-lg shadow-lime-500/50'>
                    <>
                        <div className=' flex flex-col  '>
                            <div className='border border-t-2 p-2'>
                                <h1 className='font-bold text-lg'>Pick up information</h1>
                                <h1>FareFly, Calicut Beach Road, Calicut
                                    Wed, 20 'Dec' '23, 07:15 PM
                                </h1>
                            </div>
                            <div className='border border-t-2 p-2'>
                                <h1 className='font-bold text-lg'>Drop off information</h1>
                                <h1>FareFly, Calicut Beach Road, Calicut
                                    Fri, 28 Dec '23, 08:00 AM
                                </h1>
                            </div>
                        </div>
                        <div>
                            <div className='text-center'>
                                <h1 className='font-bold text-lg'>Total travel duration</h1>
                                <h1>22 Days 0 Hour 0 Min</h1>
                            </div>
                        </div>
                    </>
                    <div className='w-[100%] h-[200px] mt-24  border shadow-lg shadow-gray-500/100 rounded-xl'>
                        <label for="default" class="block mb-2 text-gray-900 dark:text-black font-bold text-lg text-center pt-2 bg-gray-200 ">FILTER CARS</label>
                        <div className='w-full h-full p-5 '>

                            {/*<label for="small" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select District</label>*/}

                            <select id="small" onChange={(e) => { findDistrict(e.target.value) }} class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-black shadow-lime-500/50  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >

                                <option  >choose District</option>
                                {district &&
                                    district.map((value, index) => (
                                        <option value={value}  > {value}</option>
                                    ))}
                            </select>

                            {/*<label for="default" class="block mb - 2 text - sm font - medium text - gray - 900 dark:text-white">Default select</label>*/}
                            <select id="default" onChange={(e) => { findLocalArea(e.target.value) }} class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black shadow-lime-500/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>{districtSelect ? `Choose localArea` : ' ------ ------'}</option>
                                {districtSelect &&
                                    localArea.map((value, index) => (
                                        < option value={value}>{value}</option>
                                    ))
                                }

                            </select>
                        </div>
                    </div>
                </div>
                <div className='w-[70%] h-full '>
                    {
                        viewCar ?
                            <div className=' pt-3 absolute w-[300px] h-[250px] flex justify-center ' onClick={() => { setViewCar('') }}>
                                < img src={viewCar} alt="" className='w-2/3 h-full hover:border-[0.3rem] border' />
                            </div>

                            : ''

                    }

                    <div className='w-[95%] h-[80%] overflow-y-scroll no-scrollbar '>

                        {loder &&
                            < div className='w-[99%] h-[500px] flex justify-center items-center p-3 border  hover:w-[100%]  my-4' >

                                <div className='w-[500px] h-[600px] justify-center border-0'>
                                    <img src={loder} alt="" className='w-2/3 h-full ' />

                                </div>
                            </div>

                        }
                        {cars.length > 0 ? cars.map((value, index) => (
                            value.status ?
                                < div key={index} className='w-[99%] h-[150px] flex p-3 border   shadow-lg shadow-lime-500/50 hover:w-[100%]  my-4' >
                                    <div className='w-[300px] h-full  ' onClick={() => { setViewCar(value.carImage1) }}>
                                        <img src={value.carImage1 ? value.carImage1 : null} alt="" className='w-2/3 h-full hover:border-[0.3rem] border' />

                                    </div>

                                    <div className='w-full h-full  flex justify-between '>
                                        <div className='w-[200px] h-full p-3 '>
                                            <>
                                                <h1 className='font-bold text-2xl'>{value.carMake}</h1>
                                                <h1 className='font-bold '>{value.fuelType},{value.transmission},{value.carYear}</h1>
                                            </>
                                            <div>

                                                <div class="flex items-center pt-3">
                                                    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                </div>

                                            </div>

                                        </div>
                                        <div className='w-[200px] h-full  ' >
                                            <h1 className='font-bold text-2xl'>{value.price}</h1>
                                            <h1>For 2640 kms without fuel</h1>
                                            <button type="button" onClick={() => { booking(value._id) }} className="  mt-7 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300
                                         dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Book Now</button>

                                        </div>
                                    </div>

                                </div>
                                : null

                        ))
                            : ''

                        }



                    </div>
                </div>
            </div>

            <footer>
                <Footer />
            </footer>

        </div >
    )
}

export default CarsList