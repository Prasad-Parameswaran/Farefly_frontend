
import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/navbar'
import { useNavigate } from 'react-router-dom'
import { Bookinghistory, handleCancel } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import toast from 'react-hot-toast'
import Footer from '../footer/footer'
import Chat from '../chat/chat'


function OrderList() {
    const navigate = useNavigate()
    const [bookingCars, setBookingCars] = useState()
    const [view, setView] = useState(false)
    const [cars, setCars] = useState(true)
    const [bookingView, setBookingView] = useState([])
    const [partnerChat, setPartnerChat] = useState('')
    const [bookingId, setBookingId] = useState('')
    const [chat, setChat] = useState(false)
    const [chatList, setChatList] = useState(false)


    const handleView = (id) => {
        setView(true)
        setCars(false)
        const bookigViewDetails = bookingCars.find((value) => {
            return value._id == id
        })
        setBookingView([bookigViewDetails])

    }
    const handleBack = () => {
        setView(false)
        setCars(true)

    }

    const hahdleChat = (bookId, partner) => {
        setPartnerChat(partner)
        setBookingId(bookId)
        setCars(false)
        setChat(true)
    }
    const handleChatBackButton = () => {
        setChat(false)
        setCars(true)
    }


    const bookingCancel = async (id) => {
        const response = await handleCancel(id)
        if (response.data.success) {
            setBookingCars(response.data.bookingData)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }
    useEffect(() => {
        const value = async () => {
            const response = await Bookinghistory()
            if (response.data.success) {
                setBookingCars(response.data.bookingDetails)
                setChatList(response.data.chatData)
                //toast.success('there is your bookings ')
            } else {
                toast.error('no bookings available...........')
            }
        }
        value()

    }, [])


    return (

        <>
            < div >
                <Navbar />
            </div >
            <div className='flex justify-center w-[100%] h-screen'>
                {
                    cars &&
                    < div className="bg-white p-8 rounded-md w-full " >
                        <div className=" flex items-center justify-between pb-6">
                            <div className='border border-lime-100 bg-lime-100 w-20 h-20 rounded-sm flex flex-col  justify-center text-center'>
                                <h2 className="text-gray-600 font-semibold"> BOOKINGs</h2>
                                <span className="text-xs" > All Bookings</span >
                            </div >
                            <div className="flex items-center justify-between" >
                                {/*<div className="flex bg-gray-50 items-center p-2 rounded-md" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor" >
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd" />
                        </svg >
                        <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
                     </div >a*/}
                                <div className="lg:ml-40 ml-10 space-x-8" >
                                    <button className="bg-transparent hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded" onClick={() => { navigate('/profile') }} > Back to Profile</button >
                                    {/*<button className="bg-lime-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" > Create</button >*/}
                                </div >
                            </div >
                        </div >
                        <div className="lg-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto h-[600px] ">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden border border-lime-500">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-lime-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Car Make
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-lime-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Car Model
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-lime-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Starting Date
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-lime-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" >
                                                Ending Date

                                            </th >
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-lime-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" >
                                                Booking Method
                                            </th >
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-lime-100 text-left text-xs font-semibold text-green-600 uppercase tracking-wider" >
                                                Booking Status
                                            </th >
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-lime-100 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider" >
                                                View Details
                                            </th >
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-lime-100 text-left text-xs font-semibold text-red-600 uppercase tracking-wider" >
                                                Cancel
                                            </th >
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-lime-100 text-left text-xs font-semibold text-red-600 uppercase tracking-wider" >
                                                chat
                                            </th >
                                        </tr >
                                    </thead >
                                    {bookingCars ?
                                        bookingCars.map((value, index) => (
                                            //value.status != 'Cancel' &&
                                            < tbody key={index} >
                                                < tr >
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 w-10 h-10">
                                                                <img className="w-full h-full rounded-full"
                                                                    src={value.car.carImage1}
                                                                    alt="" />
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {value.car.carMake}      </p>
                                                            </div >
                                                        </div >
                                                    </td >
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                                        <p className="text-gray-900 whitespace-no-wrap" > {value.car.model}</p >
                                                    </td >
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                                        <p className="text-gray-900 whitespace-no-wrap" >
                                                            {value.pickUpDate}
                                                        </p >
                                                    </td >
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                                        <p className="text-gray-900 whitespace-no-wrap" >
                                                            {value.dropDate}
                                                        </p >
                                                    </td >
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                                        <span
                                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" >
                                                            <span aria-hidden
                                                                className={`absolute inset-0 ${value.paymentMethod == 'wallet' ? 'bg-lime-300' : 'bg-violet-300'} opacity-50 rounded-full`} ></span>
                                                            <span className="relative" > {value.paymentMethod}</span >
                                                        </span >
                                                    </td >
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
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
                                                    </td >
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                                        <span
                                                            className="relative inline-block px-3 py-1 font-semibold  leading-tight" >
                                                            <a className="relative  cursor-pointer text-blue-600" onClick={() => { handleView(value._id) }}> View</a >
                                                        </span >
                                                    </td >
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                                        <span
                                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" >
                                                            <button class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={() => { bookingCancel(value._id) }} >
                                                                Cancel
                                                            </button>
                                                        </span >
                                                    </td >
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm relative">
                                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight ">
                                                            <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded" onClick={() => { hahdleChat(value._id, value.partner) }}>
                                                                chat
                                                            </button>   {
                                                                chatList.some((data) => {
                                                                    return data.PartnerMessage == true && value._id == data.bookingId
                                                                })
                                                                    ?
                                                                    < span className="absolute top-0 right-0 bg-orange-500 text-white px-.5 py-.5 rounded-full p-0.5" >New</span>
                                                                    : null
                                                            }
                                                        </span>
                                                    </td>

                                                </tr >
                                            </tbody >
                                        ))
                                        : ''
                                    }
                                </table >


                                <div
                                    className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          " >
                                    {/*<span className="text-xs xs:text-sm text-gray-900" >
                                    Showing 1 to 4 of 50 Entries
                                </span >*/}
                                    <div className="inline-flex mt-2 xs:mt-0 gap-3" >
                                        <button
                                            className="text-sm text-indigo-50 transition duration-150 hover:bg-lime-900 bg-lime-600 font-semibold py-2 px-4 rounded-l" >
                                            Prev
                                        </button >
                                        <button
                                            className="text-sm text-indigo-50 transition duration-150 hover:bg-lime-900 bg-lime-600 font-semibold py-2 px-4 rounded-r">
                                            Next
                                        </button >
                                    </div >
                                </div >
                            </div >
                        </div >
                    </div >
                }
                {chat &&
                    <>

                        <div className='w-full h-screen'>
                            <Chat partnerChat={partnerChat} bookingIdUser={bookingId} />

                        </div>
                        <div className=" " >
                            <button className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded justify-end" onClick={handleChatBackButton}  > Back </button >
                            {/*<button className="bg-lime-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" > Create</button >*/}
                        </div >

                    </>

                }

                {
                    view &&

                    <div className="w-full lg:w-[50rem] mt-10 lg:mt-0 h-full lg:ml-14 lg:h-[31rem]  mb-3 lg:mb-0 lg:mr-3 flex flex-col  items-center lg:items-center pt-5 custom-shadow ">
                        <h2 className="text-3xl font-bold mb-4 text-center md:text-center bg-gray-300 rounded p-2">
                            Booking Car Details
                        </h2>
                        <div className="w-full flex justify-end mr-24 space-x-8" >
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
                                            <p className="text-lg  flex flex-row justify-between">
                                                <span className="pt-2 font-medium">Pick up point</span>
                                                <span className='font-serif'>{value.dropPlace},{value.partner?.localArea}</span>
                                            </p>

                                            <p className="text-lg  flex flex-row justify-between mt-2">
                                                <span className="pt-1 font-medium">Drop up point</span>
                                                <span className='font-serif'>{value.pickUpPlace},{value.partner?.localArea}</span>
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
            <div>
                <Footer />
            </div>
        </>
    )
}

export default OrderList








