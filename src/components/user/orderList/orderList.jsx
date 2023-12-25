
import React, { useEffect } from 'react'
import Navbar from '../navbar/navbar'
import { useNavigate } from 'react-router-dom'
import { Bookinghistory } from '../../../apiConfig/axiosConfig/axiosClientConfig'


function OrderList() {
    const navigate = useNavigate()

    //const booking = async () => {

    //}
    useEffect(() => {
        const value = async () => {
            const response = await Bookinghistory()
        }
        value()

    }, [])


    return (
        <>
            <div>
                <Navbar />
            </div >
            < div className="bg-white p-8 rounded-md w-full" >
                <div className=" flex items-center justify-between pb-6">
                    <div className='border border-lime-200 bg-lime-100 w-20 h-20 rounded-sm flex flex-col  justify-center text-center'>
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
                <div>
                    <div className="lg-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto  ">
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
                                    </tr >
                                </thead >
                                <tbody>
                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img className="w-full h-full rounded-full"
                                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        Vera Carpenter
                                                    </p>
                                                </div >
                                            </div >
                                        </td >
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                            <p className="text-gray-900 whitespace-no-wrap" > Admin</p >
                                        </td >
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                            <p className="text-gray-900 whitespace-no-wrap" >
                                                Jan 21, 2020
                                            </p >
                                        </td >
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                            <p className="text-gray-900 whitespace-no-wrap" >
                                                43
                                            </p >
                                        </td >
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                            <span
                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" >
                                                <span aria-hidden
                                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative" > Active</span >
                                            </span >
                                        </td >
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                            <span
                                                className="relative inline-block px-3 py-1 font-semibold  leading-tight" >
                                                <a className="relative  cursor-pointer text-blue-600" > View</a >
                                            </span >
                                        </td >
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" >
                                            <span
                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" >
                                                <button class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                                                    Cancel
                                                </button>
                                            </span >
                                        </td >
                                    </tr >
                                </tbody >
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
            </div >
        </>
    )
}

export default OrderList








