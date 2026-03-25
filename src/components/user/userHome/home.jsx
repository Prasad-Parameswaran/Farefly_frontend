import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import image from '../../../assets/Homepage.jpg';
import Footer from '../footer/footer';
import { carList } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
    const [district, setDistrict] = useState([])
    const [localArea, setLocalArea] = useState([])
    const [carListData, setCarListData] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const navigate = useNavigate()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } }
        ]
    };

    const findDistrict = (val) => {
        setSelectedDistrict(val)
    }

    useEffect(() => {
        const list = async () => {
            const response = await carList()
            setDistrict(response.data.district)
            setLocalArea(response.data.localArea)
            setCarListData(response.data.cars)
        }
        list()
    }, [])

    const submitdata = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        let count = 0;

        if (!formDataObject.district || formDataObject.district === 'Select District') {
            toast.error("Please select District");
            count++;
        } else if (!formDataObject.pickUpDate) {
            toast.error("Please select Start Date");
            count++;
        } else if (!formDataObject.dropDate) {
            toast.error("Please add End Date");
            count++;
        }

        const startDate = new Date(formDataObject.pickUpDate);
        const endDate = new Date(formDataObject.dropDate);

        if (count === 0 && startDate >= endDate) {
            toast.error("End Date must be later than Start Date");
            count++;
        }

        if (count === 0) {
            navigate(`/cars?pickUpDate=${formDataObject.pickUpDate}&&dropDate=${formDataObject.dropDate}&&district=${formDataObject.district}`);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen font-sans text-gray-100 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className='relative w-full h-[90vh] flex items-center justify-center overflow-hidden mt-16 md:mt-0'>
                <div className='absolute inset-0'>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>
                    <img src={image} className='w-full h-full object-cover object-center transform scale-105' alt="Premium Cars" />
                </div>

                <div className='relative z-20 container mx-auto px-6 h-full flex items-center'>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                        
                        {/* Text Content */}
                        <div className="pt-20 md:pt-0">
                            <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-extrabold text-5xl md:text-6xl drop-shadow-lg mb-6 leading-tight'>
                                Premium Car Rentals
                                <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">At Your Fingertips</span>
                            </h1>
                            <p className='text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-lg'>
                                Experience the ultimate freedom with our top-tier collection of luxury and practical vehicles. Book instantly, drive comfortably, and enjoy a seamless journey.
                            </p>
                        </div>

                        {/* Search Form Glass Card */}
                        <div className="flex justify-center md:justify-end w-full">
                            <div className="w-full max-w-md">
                                <form onSubmit={submitdata} className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-3xl p-8 flex flex-col items-center">
                                    <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">Find Your Ride</h2>
                                    
                                    <div className="mb-5 w-full">
                                        <label className="block text-gray-300 text-sm font-semibold mb-2 ml-1" htmlFor="location">
                                            Location
                                        </label>
                                        <select onChange={(e) => findDistrict(e.target.value)} className="w-full bg-gray-800/60 border border-gray-600 text-gray-200 text-sm rounded-xl focus:ring-teal-500 focus:border-teal-500 block p-3 transition-colors" name='district' id="location">
                                            <option>Select District</option>
                                            {district && district.map((value, index) => (
                                                <option key={index} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className="w-full grid grid-cols-2 gap-4 mb-8">
                                        <div>
                                            <label className="block text-gray-300 text-sm font-semibold mb-2 ml-1" htmlFor="start-date">
                                                Start Date
                                            </label>
                                            <input name='pickUpDate' className="w-full bg-gray-800/60 border border-gray-600 text-gray-200 text-sm rounded-xl focus:ring-teal-500 focus:border-teal-500 block p-3 transition-colors" id="start-date"
                                                type="date" min={new Date().toISOString().split("T")[0]}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm font-semibold mb-2 ml-1" htmlFor="end-date">
                                                End Date
                                            </label>
                                            <input name='dropDate' className="w-full bg-gray-800/60 border border-gray-600 text-gray-200 text-sm rounded-xl focus:ring-teal-500 focus:border-teal-500 block p-3 transition-colors" id="end-date"
                                                type="date" min={new Date().toISOString().split("T")[0]}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <button type='submit' className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-lg rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)] transform hover:-translate-y-1 transition-all duration-300">
                                            Search Cars
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Featured Cars Section */}
            <div className='w-full bg-gray-900 py-20 relative px-4 sm:px-10 lg:px-20'>
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl pointer-events-none"></div>

                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Fleet</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Discover our most popular vehicles, maintained to the highest standards for your driving pleasure.</p>
                </div>

                <div className="container mx-auto">
                    <Slider {...settings} className="px-4">
                        {carListData && carListData.map((value, index) => (
                            <div key={index} className="px-4 py-6">
                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(20,184,166,0.2)] transform hover:-translate-y-2 transition-all duration-300 group">
                                    <div className="relative h-56 overflow-hidden">
                                        <img className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" src={value.carImage1} alt="Car" />
                                        <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700">
                                            <span className="text-teal-400 font-bold text-sm">₹{value.price}/day</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h5 className="text-xl font-bold tracking-tight text-white mb-2">{value.carMake}</h5>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{value.discription}</p>
                                        
                                        <div className="flex items-center justify-between border-t border-gray-700/50 pt-4 mt-2">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Year</span>
                                                <span className="text-gray-300 font-medium">{value.carYear}</span>
                                            </div>
                                            <button className="text-teal-400 hover:text-white font-semibold transition-colors flex items-center group-hover:translate-x-1 duration-300">
                                                View Details <span className="ml-1">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;
