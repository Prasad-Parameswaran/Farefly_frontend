import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
//import './home.css';
import image from '../../../assets/Homepage.jpg';
import car from '../../../assets/car1.avif'
import Footer from '../footer/footer';
import { carList } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
//import Map from '../../user/map/map'
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
        slidesToShow: 3, // Set the number of items to show in a row
        slidesToScroll: 1,
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
        const val = [];
        const formData = new FormData(e.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        let count = 0;

        for (let key in formDataObject) {
            if (formDataObject.hasOwnProperty(key)) {
                if (key === 'district' && formDataObject[key] === '') {
                    toast.error("Please select District");
                    count++;
                    break;
                } else if (key === 'pickUpDate' && formDataObject[key] === '') {
                    toast.error("Please select Start Date");
                    count++;
                    break;
                } else if (key === 'dropDate' && formDataObject[key] === '') {
                    toast.error("Please add End Date");
                    count++;
                    break;
                }
            }
        }

        // Additional date validation
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
        <>
            <>

                <div >
                    <div className='sticky top-0 z-50   '>
                        <Navbar />
                    </div >

                    <div className='relative h-full overflow-hidden'>
                        <div className='absolute inset-0  '>
                            <img src={image} height={300} className='w-full h-full object-cover' alt="" />
                        </div>
                        <div className='relative flex flex-col justify-start w-full h-4/6 object-cover items-center bg-gray-900 bg-opacity-75 p-4'>
                            <div className='container mx-auto max box-border overflow-auto'>
                                <div className='md:flex md:justify-between min-h-full'>
                                    <div className='md:w-full md:ml-4'>
                                        <h1 className='text-white font-extrabold text-4xl mt-10 md:mt-28 mb-6 md:mb-0'>
                                            Rent A Car From Best Car Rental-Farefly
                                        </h1>
                                        <p className='text-white opacity-90'>
                                            IndusGo is one of the most trusted car rental services as Indus Motors,
                                            the top Maruti dealership in India, promotes it. The rent-a-car service
                                            provider offers an outstanding model and a wide variety of vehicle options
                                            at the most competitive rates. At IndusGo, we allow you to enjoy
                                            flexibility with respect to start and endpoints. You can book cars on an
                                            hourly, daily, weekly, monthly basis. Moreover, we provide door-step
                                            delivery, believe in complete transparency, and adhere strictly to business ethics.
                                        </p>
                                    </div>
                                    <div class="w-full max-w-md mt[10rem] md:mt-0 mx-auto ">
                                        <form onSubmit={submitdata} class="relative bg-gradient-to-br from-green-600 to-lime-500  shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center">
                                            <h2 class="text-2xl font-bold mb-4 text-white">Find the right car now!</h2>
                                            <div class="mb-4 w-full">
                                                <label class="block text-white text-sm font-bold mb-2" for="location">
                                                    District
                                                </label>
                                                <select onChange={(e) => { findDistrict(e.target.value) }} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='district' id="location">
                                                    <option>Select District</option>
                                                    {district &&
                                                        district.map((value, index) => (
                                                            <option value={value} > {value}</option>
                                                        ))}
                                                </select>
                                            </div>
                                            <div class="mb-4 w-full">
                                                <label class="block text-white text-sm font-bold mb-2" for="start-date">
                                                    Start Date
                                                </label>
                                                <input name='pickUpDate' class="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="start-date"
                                                    type="date" min={new Date().toISOString().split("T")[0]}
                                                />
                                            </div>
                                            <div class="mb-4 w-full">
                                                <label class="block text-white text-sm font-bold mb-2" for="end-date">
                                                    End Date
                                                </label>
                                                <input name='dropDate' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="end-date"
                                                    type="date" min={new Date().toISOString().split("T")[0]}
                                                />
                                            </div>
                                            <div class="w-full flex justify-center">
                                                <button type='submit' class="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  >
                                                    Find Car
                                                </button>
                                            </div>
                                        </form>
                                        <p class="text-center text-gray-500 text-xs">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div >

                    <div className=' flex w-full '>
                        <div className=' pl-16 pr-16 w-[100%] h-[600px] '>
                            <Slider {...settings} >
                                {carListData ?
                                    carListData.map((value, index) => (
                                        < div className=" my-20 ml-3 mt-12 w-[25%] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <a href="#">
                                                <img className=" w-96 h-60 rounded-lg " src={value.carImage1} alt=" product image" />
                                            </a>
                                            <div className="px-5 pb-6 ">
                                                <a href="#">
                                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{value.discription}</h5>
                                                </a>
                                                <div className="flex items-center mt-2.5 mb-5">
                                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                                        <a href="#">
                                                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Car Make : {value.carMake}</h5>
                                                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Car Year : {value.carYear}</h5>
                                                        </a>
                                                    </div>
                                                    {/*<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>*/}
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                    : ''
                                }
                            </Slider>
                        </div >

                    </div >
                    {/*<div className='w-full h-80'>
                        <Map />
                    </div>*/}
                </div >



            </>
            <Footer />
        </>
    );
}

export default Home;
