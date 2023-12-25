import React, { useEffect, useState } from 'react'
import { carDatas, carDetails, ListOrUnlist } from '../../../apiConfig/axiosConfig/axiosAdminConfig'
import img from '../../../assets/car1.avif'
import Dashboad from '../../partner/partnerHome'
import toast from 'react-hot-toast'

function CarList() {
    const [viewCar, setViewCar] = useState(false)
    const [carList, setCarList] = useState([])
    const [carView, setCarView] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [searchCar, setSearchCar] = useState('')


    const lastItemIndex = currentPage * itemsPerPage;
    const firstIndex = lastItemIndex - itemsPerPage;
    const thisPageItems = carList.slice(firstIndex, lastItemIndex);

    const pages = [];
    for (let i = 1; i <= Math.ceil(carList.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const handleView = async (id) => {
        await carDetails(id).then((res) => {
            if (res.data.success) {
                console.log(res.data.data, "jjjjjjjjjj");
                setCarView([res.data.data])
                setViewCar(true)
            } else {
                toast.error(res.data.message)
            }
        })
    }

    const carListHandle = async (id) => {
        console.log("thheeeeeeeeeeee", id);
        await ListOrUnlist(id).then((res) => {
            setCarList(res.data.data)
        })
    }


    const search = async (e) => {
        console.log('this is setsearch car ')
        setSearchCar(e.target.value)
        await findcars()
    }

    const findcars = async (e) => {
        console.log(searchCar, "this is search car data ");

        const response = await carDatas()
        const initialCars = response.data.data;
        setCarList(initialCars)
        console.log(initialCars.length, 'this is car data');

        const trimmedSearchTerm = searchCar.trim()

        if (trimmedSearchTerm.length !== 0) {
            const regex = new RegExp(trimmedSearchTerm, 'i');
            const filteredData = initialCars.filter((item) => regex.test(item.carMake));
            setCarList(filteredData);
        } else {
            setCarList(initialCars);
        }
    };

    useEffect(() => {
        const data = async () => {
            await carDatas().then((res) => {
                setCarList(res.data.data)
            })
        }
        data()
        console.log(carView, "nnnnnnnnn")
    }, [])

    return (

        < div >
            {
                viewCar ?

                    <div className=' w-full  h-full  '>
                        {
                            carView.map((value, index) => (
                                <div className="flex  h-[50%]  " >

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

                    </div >

                    : < div >
                        {carList ?

                            < div >
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
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
                                                onChange={search}
                                                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Search for users"
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
                                                    Action
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    view
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
                                                        <button onClick={() => {
                                                            carListHandle(value._id)
                                                        }} className={`font-medium  hover:bg-gray-400 bg-gray-100 w-20 h-10 rounded-2xl ${value.status ? 'dark:text-red-500 font-bold' : 'dark:text-green-500 font-bold'} hover:underline`}>{value.status ? 'Unlist' : 'list'}</button>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <a onClick={() => { handleView(value._id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">view</a>
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

export default CarList