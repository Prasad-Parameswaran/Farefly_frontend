
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
        const bookigViewDetails = bookingCars.find((value) => value._id == id)
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
            } else {
                toast.error('No bookings available')
            }
        }
        value()
    }, [])

    return (
        <div className="bg-gray-900 min-h-screen font-sans text-gray-100 flex flex-col pt-16">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className='flex-grow container mx-auto px-4 py-8 max-w-7xl relative'>
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none"></div>

                {cars && (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative z-10">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-gray-700/50 mb-6 gap-4">
                            <div className='flex items-center gap-4'>
                                <div className='bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 w-16 h-16 rounded-2xl flex items-center justify-center text-teal-400'>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-wide">My Bookings</h2>
                                    <span className="text-sm text-gray-400">View and manage your rentals</span>
                                </div>
                            </div>
                            <div>
                                <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-2 px-6 border border-gray-600 rounded-xl transition-colors tracking-wide flex items-center" onClick={() => navigate('/profile')}>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                    Back to Profile
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
                            <table className="min-w-full leading-normal text-left">
                                <thead>
                                    <tr>
                                        {['Car Model', 'Dates', 'Method', 'Status', 'Actions'].map((header, idx) => (
                                            <th key={idx} className="px-5 py-4 bg-gray-800/80 border-b border-gray-700/50 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookingCars ? bookingCars.map((value, index) => (
                                        <tr key={index} className="hover:bg-gray-800/40 transition-colors">
                                            <td className="px-5 py-4 border-b border-gray-700/50 text-sm">
                                                <div className="flex items-center">
                                                    <div className="w-14 h-10 rounded-lg overflow-hidden border border-gray-700">
                                                        <img className="w-full h-full object-cover" src={value.car.carImage1} alt="car" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-white font-bold text-base">{value.car.carMake}</p>
                                                        <p className="text-gray-400 text-xs">{value.car.model}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 border-b border-gray-700/50 text-sm">
                                                <p className="text-gray-300 font-medium">{value.pickUpDate}</p>
                                                <p className="text-gray-500 text-xs mt-1">to {value.dropDate}</p>
                                            </td>
                                            <td className="px-5 py-4 border-b border-gray-700/50 text-sm">
                                                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${value.paymentMethod === 'wallet' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
                                                    {value.paymentMethod}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 border-b border-gray-700/50 text-sm">
                                                <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${value.status === 'Cancel' ? 'bg-red-500/10 text-red-400 border-red-500/30' : value.status === 'Completed' ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'}`}>
                                                    {value.status === 'Cancel' ? <span className='mr-1'>✕</span> : value.status === 'Completed' ? <span className='mr-1'>✓</span> : <span className='mr-1'>⏳</span>}
                                                    {value.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 border-b border-gray-700/50 text-sm">
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => handleView(value._id)} className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">Details</button>
                                                    
                                                    {value.status !== 'Cancel' && (
                                                        <button onClick={() => bookingCancel(value._id)} className="text-red-400 hover:text-red-300 font-semibold transition-colors">Cancel</button>
                                                    )}
                                                    
                                                    <div className="relative">
                                                        <button onClick={() => hahdleChat(value._id, value.partner)} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                                            Chat
                                                        </button>
                                                        {chatList && chatList.some(data => data.PartnerMessage === true && value._id === data.bookingId) && (
                                                            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-gray-900">New</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="5" className="px-5 py-8 text-center text-gray-500">No bookings found</td></tr>
                                    )}
                                </tbody>
                            </table>
                            
                            <div className="px-5 py-4 bg-gray-800/50 border-t border-gray-700/50 flex items-center justify-end">
                                <div className="inline-flex gap-2">
                                    <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold py-2 px-4 rounded-lg border border-gray-600 transition-colors">Prev</button>
                                    <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold py-2 px-4 rounded-lg border border-gray-600 transition-colors">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {chat && (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] min-h-[600px] flex flex-col">
                        <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gray-800/50">
                            <h3 className="text-lg font-bold text-white flex items-center">
                                <svg className="w-5 h-5 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
                                Host Chat
                            </h3>
                            <button className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors flex items-center" onClick={handleChatBackButton}>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Back
                            </button>
                        </div>
                        <div className="flex-grow p-4">
                            <Chat partnerChat={partnerChat} bookingIdUser={bookingId} />
                        </div>
                    </div>
                )}

                {view && bookingView.map((value, index) => (
                    <div key={index} className="bg-gray-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col xl:flex-row relative">
                        <button className="absolute top-4 right-4 z-20 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-gray-600" onClick={handleBack}>✕</button>

                        <div className="w-full xl:w-2/5 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900 z-10 hidden xl:block"></div>
                            <img src={value.car.carImage1} className="w-full h-64 xl:h-full object-cover" alt="Car" />
                            <div className="absolute bottom-6 left-6 z-20 hidden xl:block">
                                <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">{value.car.carMake}</h1>
                                <div className="text-xl font-bold text-teal-400 py-1.5 px-4 bg-gray-900/80 backdrop-blur-md rounded-full border border-teal-500/30 inline-block">
                                    {value.car.price}₹/Day
                                </div>
                            </div>
                        </div>

                        <div className="w-full xl:w-3/5 p-8 lg:p-12 relative z-10 bg-gray-900">
                            <div className="xl:hidden mb-8">
                                <h1 className="text-3xl font-extrabold text-white mb-2">{value.car.carMake}</h1>
                                <div className="text-lg font-bold text-teal-400 py-1 px-4 bg-gray-800 rounded-full border border-teal-500/30 inline-block">
                                    {value.car.price}₹/Day
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-6 uppercase tracking-wider">Booking Receipt</h2>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-800">
                                    <div><p className="text-gray-500 text-sm">Pick up</p><p className="text-gray-200 font-semibold">{value.pickUpDate}</p><p className="text-gray-400 text-sm mt-1">{value.pickUpPlace}, {value.partner?.localArea}</p></div>
                                    <div><p className="text-gray-500 text-sm">Drop off</p><p className="text-gray-200 font-semibold">{value.dropDate}</p><p className="text-gray-400 text-sm mt-1">{value.dropPlace}, {value.partner?.localArea}</p></div>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-b border-gray-800">
                                    <div><p className="text-gray-500 text-xs uppercase text-center w-full block">License</p><p className="text-gray-300 font-medium text-center">{value.car.carLicenseNumber}</p></div>
                                    <div><p className="text-gray-500 text-xs uppercase text-center w-full block">Fuel</p><p className="text-gray-300 font-medium text-center">{value.car.fuelType}</p></div>
                                    <div><p className="text-gray-500 text-xs uppercase text-center w-full block">Trans</p><p className="text-gray-300 font-medium text-center">{value.car.transmission}</p></div>
                                    <div><p className="text-gray-500 text-xs uppercase text-center w-full block">Year</p><p className="text-gray-300 font-medium text-center">{value.car.carYear}</p></div>
                                </div>
                                
                                <div className="pt-4 space-y-3">
                                    <div className="flex justify-between text-gray-400"><p>Base Amount</p><p>₹{value.TotalAmount - value.Cgst - value.Sgst}</p></div>
                                    <div className="flex justify-between text-gray-400 text-sm"><p>CGST (5%)</p><p>₹{value.Cgst}</p></div>
                                    <div className="flex justify-between text-gray-400 text-sm"><p>SGST (10%)</p><p>₹{value.Sgst}</p></div>
                                    <div className="pt-4 mt-2 border-t border-gray-800 flex justify-between items-end">
                                        <h3 className="text-lg text-gray-300 font-medium">Grand Total</h3>
                                        <p className="text-3xl font-bold text-teal-400">₹{value.TotalAmount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <Footer />
        </div>
    )
}

export default OrderList
