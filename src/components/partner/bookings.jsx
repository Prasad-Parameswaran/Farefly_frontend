import React, { useEffect, useState } from 'react'
//import { userList, userStatus } from '../../apiConfig/axiosConfig/axiosAdminConfig'
import Swal from 'sweetalert2';

import { bookings, statusHandle, PartnerCancelBooking } from '../../apiConfig/axiosConfig/axiosPartnerConfig'
import { toast } from 'react-hot-toast'
import PartnerChat from './partnerChat'


function Bookings() {
    const [booking, setBooking] = useState([])
    const [viewBookings, setViewBookings] = useState(true)
    const [view, setView] = useState(false)
    const [bookingView, setBookingView] = useState([])
    const [userId, setUserId] = useState()
    const [bookingId, setBookingId] = useState()
    const [chat, setChat] = useState(false)


    const handleView = (id) => {
        setView(true)
        setViewBookings(false)
        const bookigViewDetails = booking.find((value) => {
            return value._id == id
        })
        setBookingView([bookigViewDetails])
    }

    const handleBack = () => {
        setView(false)
        setViewBookings(true)
    }
    const handleChatBackButton = () => {
        setChat(false)
        setViewBookings(true)
    }

    const hahdleChat = (book, user) => {
        setUserId(user)
        setChat(true)
        setBookingId(book)
        setViewBookings(false)
    }

    const handleStatus = async (id, status) => {
        try {

            if (status != 'change') {
                const data = {
                    id: id,
                    status: status
                }
                await statusHandle(data).then((res) => {
                    setBooking(res.data.bookingDetails)
                })
            }

        } catch (error) {

        }


    }
    const bookingCancel = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            try {
                const response = await PartnerCancelBooking(id);

                if (response.data.success) {
                    setBooking(response.data.bookingData);
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error('An error occurred while canceling the booking.');
            }
        }
    };



    useEffect(() => {
        const data = async () => {
            await bookings().then((res) => {
                setBooking(res.data.bookingDetails)
            })
        }
        data()
    }, [])

    return (
        <div>
            {viewBookings ?
                <div>
                    < div >
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
                                        //onChange={search}
                                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Search for users"
                                    />
                                </div>
                            </div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-100 dark:text-gray-100">
                                <thead className="text-xs text-gray-100 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            {/*<div class="flex items-center">
                                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                  <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                              </div>*/}
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Booking Person
                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            phone
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Payment Method
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Booking Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            total Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            view
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            cancel
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            chat
                                        </th>
                                    </tr>
                                </thead>
                                {

                                    booking.map((value, index) =>
                                    (
                                        <tbody >

                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                <td className="w-4 p-4">

                                                </td>
                                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                    <img className="w-10 h-10 rounded-full" src={value.user.userImage} alt="Jese image" />
                                                    <div className="ps-3">
                                                        {/*<div className="text-base font-semibold">firstName</div>*/}
                                                        <div className="font-normal text-gray-100">{value.user.firstName}</div>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4">
                                                    {value.user.phone}
                                                </td>

                                                <td class="px-6 py-4">
                                                    <button onClick={() => {
                                                        //userblock(value._id)
                                                    }} className={`font-medium dark:text-green-500 hover:underline`}>{value.paymentMethod}</button>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <span
                                                        className="relative inline-block px-3 py-1 font-semibold  leading-tight" >
                                                        <span aria-hidden
                                                            className={`absolute inset-0 ${value.status == 'Cancel' ? 'bg-red-300' : 'bg-green-200'} opacity-50 rounded-full`}></span>
                                                        <span className="relative" > {value.status}</span >


                                                    </span >
                                                    {value.status == 'Cancel' &&
                                                        <span className=''>❌</span>
                                                    }
                                                    {value.status == 'Completed' &&
                                                        <span className='text-lime-400'>  ✔</span>

                                                    }
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className=' rounded-full bg-red-500' ></div>{value.TotalAmount}₹
                                                    </div>
                                                </td>

                                                <td class="px-6 py-4">
                                                    {/*<label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>*/}
                                                    <select id="status" onClick={(e) => { handleStatus(value._id, e.target.value) }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >

                                                        < option selected> change</option >
                                                        <option value="Booked">Booked</option>
                                                        <option value="Running">Running</option>
                                                        <option value="Completed">Completed</option>

                                                        {/*<option value="cancel">cancel</option>*/}
                                                        {/*<option value="FR">France</option>
                                                            <option value="DE">Germany</option>*/}
                                                    </select>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { handleView(value._id) }} > View</a>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <span
                                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" >
                                                        <button class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={() => { bookingCancel(value._id) }} >
                                                            Cancel
                                                        </button>
                                                    </span >
                                                </td>
                                                <td class="px-6 py-4">
                                                    <span
                                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" >
                                                        <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded" onClick={() => { hahdleChat(value._id, value.user) }}  >
                                                            chat
                                                        </button>
                                                    </span >
                                                </td>
                                            </tr>

                                        </tbody>
                                    ))
                                }
                            </table>
                        </div>
                        <div className='flex justify-center'>
                            {/*{
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
                                }*/}
                        </div>
                    </div>

                </div >
                : null
            }
            {chat &&
                <>
                    <div className="w-full flex justify-end pr-48 ml-52 space-x-8" >
                        <button className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded justify-end" onClick={handleChatBackButton}>Back </button >
                        {/*<button className="bg-lime-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" > Create</button >*/}
                    </div >
                    <PartnerChat UserId={userId} bookingId={bookingId} />

                </>
            }

            {
                view &&

                <div className="w-full pl-72 lg:w-[50rem] mt-10 lg:mt-0 h-full lg:ml-14 lg:h-[31rem]  mb-3 lg:mb-0 lg:mr-3 flex flex-col  items-center lg:items-center pt-5 custom-shadow ">
                    {/*<h2 className="text-3xl font-bold mb-4 text-center md:text-center bg-gray-300 rounded p-2">
                        Booking Car Details
                    </h2>*/}
                    <div className="w-full flex justify-end ml-52 space-x-8" >
                        <button className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded justify-end" onClick={handleBack}  > Back </button >
                        {/*<button className="bg-lime-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" > Create</button >*/}
                    </div >

                    <div className="w-full mt-3 lg:mt-0  lg:w-[45rem] h-auto lg:h-[100%]  mb-3 lg:mb-0 lg:mr-3 flex justify-end flex-col lg:flex-row  border border-lime-100" >
                        {bookingView.map((value, index) => (
                            <>
                                <div

                                    className="w-full lg:w-[40%] md:h-[130%] lg:h-[100%] flex flex-col justify-center items-center shadow-xl bg-gray-50 rounded-lg"
                                >
                                    <h1 className="text-2xl font-bold mb-4">
                                        {value.car.carMake}
                                    </h1>
                                    <img
                                        src={value.car.carImage1}

                                        className="w-64 h-40 rounded-lg mb-3 hover:scale-125 transform-gpu transition-transform duration-500 ease-in-out"
                                        alt=""
                                    />
                                    <div className="mt-5 text-2xl flex justify-center text-center  font-mono text-gray-800 h-10 w-[50%] bg-white rounded-3xl">
                                        <span >{value.car.price}₹/Day</span>

                                    </div>
                                </div>

                                <div className="w-full lg:w-[60%] md:h-[130%] lg:h-[100%] py-6 shadow-xl bg-white rounded-lg">
                                    <div className="flex flex-col justify-between pl-2 pr-5">
                                        <p className="text-lg font-medium flex flex-row justify-between">
                                            <span>{value.pickUpDate}</span>
                                            <span>{value.dropDate}</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between">
                                            <span className="pt-2">Pick up point</span>
                                            <span>{value.dropPlace},{value.partner?.localArea}</span>
                                        </p>

                                        <p className="text-lg font-medium flex flex-row justify-between mt-2">
                                            <span className="pt-1">Drop up point</span>
                                            <span>{value.pickUpPlace},{value.partner?.localArea}</span>
                                        </p>
                                        {/*<p className="text-lg font-medium flex flex-row justify-between pt-1">
                                                <span>Total Days</span>
                                                <span>{dayCount} Days</span>
                                            </p>*/}
                                        {/*<p className="text-lg font-medium flex flex-row justify-between">
                                                <span>Owner Name</span>
                                                <span>{bookingCar[0].ownerName}</span>
                                            </p>*/}
                                        <p className="text-lg font-medium flex flex-row justify-between">
                                            <span>Plate Number</span>
                                            <span>{value.car.carLicenseNumber}</span>
                                        </p>

                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span>FuelType </span>
                                            <span>{value.car.fuelType}</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span>Category </span>
                                            <span>{value.car.carCategory}</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span>Transmission </span>
                                            <span>{value.car.transmission}</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span>carYear </span>
                                            <span>{value.car.carYear}</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span>cgst </span>
                                            <span>{value.Cgst}₹</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span>sgst </span>
                                            <span>{value.Sgst}₹</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between">
                                            <span>_______________________________________________________</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span>Total Amount </span>
                                            <span>{value.TotalAmount}₹</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span></span>
                                            <span>______</span>
                                        </p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            }


        </div >
    )
}

export default Bookings





//const [currentPage, setCurrentPage] = useState(1);
//const [itemsPerPage, setItemsPerPage] = useState(6);
//const [searchUser, setSearchUser] = useState('')
//const lastItemIndex = currentPage * itemsPerPage;
//const firstIndex = lastItemIndex - itemsPerPage;
//const thisPageItems = users.slice(firstIndex, lastItemIndex);

//const pages = [];
//for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
//    pages.push(i);
//}

//const search = async (e) => {
//    setSearchUser(e.target.value)
//    await findcars()
//}

//const findcars = async (e) => {
//    console.log(searchUser, "this is search car data ");

//    const response = await userList()
//    const initialCars = response.data.data;
//    setUsers(initialCars)
//    console.log(initialCars.length, 'this is car data');

//    const trimmedSearchTerm = searchUser.trim()

//    if (trimmedSearchTerm.length !== 0) {
//        const regex = new RegExp(trimmedSearchTerm, 'i');
//        const filteredData = initialCars.filter((item) => regex.test(item.firstName));
//        setUsers(filteredData);
//    } else {
//        setUsers(initialCars);
//    }
//};


//const userblock = async (id) => {
//    await userStatus(id).then((res) => {
//        console.log(res.data.data, "k");
//        setUsers(res.data.data)
//    })
//}