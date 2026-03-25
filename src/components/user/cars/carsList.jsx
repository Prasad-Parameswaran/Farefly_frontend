import React, { useEffect, useState, useCallback } from 'react'
import Navbar from '../../../components/user/navbar/navbar'
import Footer from '../../../components/user/footer/footer'
import { carList, findDistrictCar, findLocalAreaCar, findHomeSearch, carListPost } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import toast from 'react-hot-toast'
import _debounce from 'lodash/debounce';
import { useLocation, useNavigate } from 'react-router-dom'
import Map from '../../../components/user/map/map3'


function CarsList() {
    const [cars, setCars] = useState([])
    const [viewCar, setViewCar] = useState('')
    const navigate = useNavigate()

    const [district, setDitstrict] = useState([])
    const [localArea, setLocalArea] = useState([])
    const [carLocalArea, setCarLocalArea] = useState()
    const [districtSelect, setDitstrictSelect] = useState(false)
    const [districtVal, setDistrictVal] = useState('')
    const [loder, setLoder] = useState('')
    const [formDataObj, setFormDataObj] = useState({})
    const [searchCar, setSearchCar] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [defaultDistrict, setDefaultDistrict] = useState('')
    const [skelton, setSkelton] = useState(false)
    const location = useLocation()

    const searchParams1 = new URLSearchParams(location.search)

    const pickUpDate = searchParams1.get("pickUpDate")
    const dropDate = searchParams1.get("dropDate")
    const districtName = searchParams1.get("district")
    const data = {
        pickUpDate: pickUpDate,
        dropDate: dropDate,
        district: districtName,
    }

    const findcars = async () => {
        data.districtChanges = districtVal
        const response = await carListPost(data);
        const initialCars = response.data.carList;
        setDitstrict(response.data.district);
        setLocalArea(response.data.localArea);
        setCars(initialCars);

        const trimmedSearchTerm = searchCar.trim()

        if (trimmedSearchTerm.length !== 0) {
            const regex = new RegExp(trimmedSearchTerm, 'i');
            const filteredData = initialCars.filter((item) => regex.test(item.carMake));
            setCars(filteredData);
        } else {
            setCars(initialCars);
        }
    };

    const search = (e) => {
        setSearchCar(e.target.value);
    }

    useEffect(() => {
        const timeDelay = setTimeout(() => {
            findcars()
        }, 1000);
        return () => clearTimeout(timeDelay)

    }, [searchCar])

    const findDistrict = async (value) => {
        const val = {
            pickUpDate: start,
            dropDate: end,
            district: value
        }
        setDistrictVal(value)
        const response = await findDistrictCar(val)
        if (response.data.car) {
            setCars(response.data.car)
            setLocalArea(response.data.localArea)
            setDitstrictSelect(true)
            setDistrictVal(value)
        } else {
            toast.error('something went wrong ')
        }

    }

    const find = async (value) => {
        setStart(value.pickUpDate)
        setEnd(value.dropDate)
        setDefaultDistrict(value.district)
        setDistrictVal(value.district)
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

    const dateObject = new Date(data.pickUpDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    const dateObjec = new Date(data.dropDate);
    const option = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDat = dateObjec.toLocaleDateString('en-US', option);


    const endDate = new Date(data.dropDate);
    const startingDate = new Date(data.pickUpDate)
    const timeDifference = endDate.getTime() - startingDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));



    const dateFilter = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
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
                setFormDataObj(formDataObject)
                const response = await findHomeSearch(formDataObject)
                if (response.data.data) {
                    setCars(response.data.data)
                    setLocalArea(response.data.localArea)
                    setDitstrict(response.data.district)
                } else {
                    toast.error('something went wrong ')
                }
            }


        }
    }

    const findLocalArea = async (val) => {
        if (val == 'Choose localArea') {
            return
        }
        setCarLocalArea(val)
        setSkelton(true)
        const value = {
            localArea: val,
            pickUpDate: start,
            dropDate: end

        }
        const response = await findLocalAreaCar(value)
        setTimeout(() => {
            if (response.data.car) {
                setCars(response.data.car)
                setLocalArea(response.data.localArea)
                setDitstrictSelect(true)
                setSkelton(false)

            } else {
                toast.error('something went wrong ')
            }
        }, 500);


    }

    const booking = async (id) => {
        const start = document.getElementById('pickUpDate').value
        const end = document.getElementById('dropDate').value
        if (start == '') {
            toast.error('!Please select Start Date')
        } else if (end == '') {
            toast.error('!Please select End Date')

        } else if (districtVal == '') {
            toast.error('!Please select District ')

        } else {
            navigate(`/booking?pickUpDate=${start}&&dropDate=${end}&&carId=${id}&&district=${districtVal}`)
        }
    }

    useEffect(() => {
        const list = async () => {
            setTimeout(() => {
                find(data)
                setLoder('')
            }, 1050);

        }
        list()

    }, [])

    const Skelton = () => {
        return (
            <div role="status" className="w-full flex p-5 border border-white/10 rounded-2xl bg-gray-800/30 animate-pulse my-6">
                <div className="flex items-center justify-center w-[300px] h-[200px] bg-gray-700/50 rounded-xl">
                    <svg className="w-12 h-12 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
                <div className="w-full pl-6 pt-2">
                    <div className="h-4 bg-gray-600 rounded-full w-48 mb-6"></div>
                    <div className="h-3 bg-gray-600 rounded-full w-32 mb-4"></div>
                    <div className="mt-12 h-10 bg-gray-600 rounded-lg w-32 ml-auto"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-900 min-h-screen font-sans text-gray-100 flex flex-col pt-16">
            <div className='sticky top-0 z-50'>
                <Navbar />
            </div>

            {/* Filter Bar */}
            <div className='sticky top-[72px] z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 shadow-lg px-4 py-4'>
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <form onSubmit={dateFilter} className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                            <div className="flex items-center bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2 hover:border-teal-500/50 transition-colors">
                                <label htmlFor="pickUpDate" className="text-gray-400 text-sm font-semibold mr-3">START</label>
                                <input
                                    type="date"
                                    id="pickUpDate"
                                    defaultValue={start}
                                    name='pickUpDate'
                                    min={new Date().toISOString().split("T")[0]}
                                    className="bg-transparent text-white focus:outline-none focus:ring-0 text-sm"
                                />
                            </div>
                            <div className="flex items-center bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2 hover:border-teal-500/50 transition-colors">
                                <label htmlFor="dropDate" className="text-gray-400 text-sm font-semibold mr-3">END</label>
                                <input
                                    type="date"
                                    id="dropDate"
                                    name='dropDate'
                                    defaultValue={end}
                                    min={new Date().toISOString().split("T")[0]}
                                    className="bg-transparent text-white focus:outline-none focus:ring-0 text-sm"
                                />
                            </div>
                            <button type="submit" className="text-white px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-teal-500 hover:to-emerald-500 transition-all duration-300 font-bold tracking-wide rounded-xl shadow-md">
                                Filter
                            </button>
                        </form>

                        <div className="flex items-center w-full md:w-auto mt-2 md:mt-0 relative">
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input
                                type="text"
                                id="search"
                                placeholder="Search car make..."
                                onChange={search}
                                className="w-full md:w-64 pl-12 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row gap-8 py-8 px-4'>
                {/* Sidebar */}
                <div className='w-full lg:w-1/3 space-y-8'>
                    <div className='bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'>
                        <h2 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-4 flex items-center'>
                            <svg className="w-5 h-5 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            Location
                        </h2>
                        <div className="rounded-xl overflow-hidden border border-gray-700/50 h-[250px] relative">
                            {carLocalArea ? carLocalArea && districtVal &&
                                <Map local={carLocalArea} district={districtVal} />
                                : districtVal ?
                                <Map local={carLocalArea} district={districtVal} />
                                : <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-500">No Location Selected</div>
                            }
                        </div>
                    </div>

                    <div className='bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-center'>
                        <h2 className='text-xl font-bold text-white mb-6 uppercase tracking-wider text-sm'>Filter Cars By Region</h2>
                        <div className='space-y-6'>
                            <select id="small" onChange={(e) => findDistrict(e.target.value)} className="w-full p-3 bg-gray-900/50 border border-gray-700/50 text-gray-300 text-sm rounded-xl focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:outline-none transition-all cursor-pointer">
                                <option>{districtVal || "Select District"}</option>
                                {district && district.map((value, index) => (
                                    value !== districtVal && <option key={index} value={value}>{value}</option>
                                ))}
                            </select>

                            <select id="default" onChange={(e) => findLocalArea(e.target.value)} className="w-full p-3 bg-gray-900/50 border border-gray-700/50 text-gray-300 text-sm rounded-xl focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:outline-none transition-all cursor-pointer">
                                <option value="Choose localArea">{districtSelect ? `Choose Area` : '--- Select District First ---'}</option>
                                {districtSelect && localArea.map((value, index) => (
                                    <option key={index} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className='w-full lg:w-2/3 relative'>
                    {/* Fullscreen Image Overlay */}
                    {viewCar && (
                        <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm' onClick={() => setViewCar('')}>
                            <div className="relative max-w-4xl w-full px-4">
                                <button className="absolute -top-12 right-4 text-white hover:text-teal-400 font-bold text-xl cursor-pointer">✕ Close</button>
                                <img src={viewCar} alt="Car View" className='w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20' />
                            </div>
                        </div>
                    )}

                    <div className='space-y-6'>
                        {loder && (
                            <div className='w-full flex justify-center py-20'>
                                <img src={loder} alt="Loading..." className='w-24' />
                            </div>
                        )}

                        {cars.length > 0 ? cars.map((value, index) => (
                            value.status && (
                                <div key={index} className='bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_0_rgba(20,184,166,0.15)] transform hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-6 group'>
                                    <div className='w-full sm:w-[35%] h-56 sm:h-auto rounded-2xl overflow-hidden cursor-pointer relative' onClick={() => setViewCar(value.carImage1)}>
                                        <div className="absolute inset-0 bg-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                            <span className="bg-gray-900/80 text-white font-semibold px-4 py-2 rounded-full cursor-pointer border border-white/20">Expand Image</span>
                                        </div>
                                        <img src={value.carImage1 || null} alt={value.carMake} className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700' />
                                    </div>

                                    <div className='w-full sm:w-[65%] flex flex-col justify-between py-2'>
                                        <div className='flex justify-between items-start'>
                                            <div>
                                                <h1 className='font-extrabold text-3xl text-white mb-2'>{value.carMake}</h1>
                                                <div className='flex flex-wrap gap-2 mb-4'>
                                                    <span className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-sm text-gray-300 font-medium">{value.fuelType}</span>
                                                    <span className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-sm text-gray-300 font-medium">{value.transmission}</span>
                                                    <span className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-sm text-gray-300 font-medium">Year: {value.carYear}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <h1 className='font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400'>₹{value.price}</h1>
                                                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mt-1">Per Day</p>
                                            </div>
                                        </div>

                                        <div className='mt-6 border-t border-gray-700/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4'>
                                            <p className="text-gray-400 text-sm flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                For 2640 kms without fuel
                                            </p>
                                            <button type="button" onClick={() => booking(value._id)} className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold tracking-wider rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transform hover:-translate-y-1 transition-all duration-300">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )) : (
                            <div>
                                <Skelton />
                                <Skelton />
                                <Skelton />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default CarsList