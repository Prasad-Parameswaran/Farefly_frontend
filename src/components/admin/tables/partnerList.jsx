import React, { useEffect, useState } from 'react'
import { partnerList, partnerStatus, partnerView } from '../../../apiConfig/axiosConfig/axiosAdminConfig'
import im from '../../../assets/car1.avif'
import toast from 'react-hot-toast'

//import img from '../../../assets/car1.avif'

function PartnerList() {
    const [partner, setPartner] = useState([])
    const [viewPartner, setViewPartner] = useState(false)
    const [view, setView] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [searchPartner, setSearchPartner] = useState('')




    const lastItemIndex = currentPage * itemsPerPage;
    const firstIndex = lastItemIndex - itemsPerPage;
    const thisPageItems = partner.slice(firstIndex, lastItemIndex);

    const pages = [];
    for (let i = 1; i <= Math.ceil(partner.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const partnerBlock = async (id) => {
        await partnerStatus(id).then((res) => {
            console.log(res.data.data, "kkkkkkk");
            setPartner(res.data.data)
        })
    }

    const handleView = async (id) => {
        await partnerView(id).then((res) => {
            if (res.data.success) {
                setView(res.data.data)
                setViewPartner(true)
            } else {
                toast.error(res.data.message)
            }
        })
    }

    const search = async (e) => {
        setSearchPartner(e.target.value)
        await findcars()
    }

    const findcars = async (e) => {
        console.log(searchPartner, "this is search car data ");

        const response = await partnerList()
        const initialCars = response.data.data;
        setPartner(initialCars)
        console.log(initialCars.length, 'this is car data');

        const trimmedSearchTerm = searchPartner.trim()

        if (trimmedSearchTerm.length !== 0) {
            const regex = new RegExp(trimmedSearchTerm, 'i');
            const filteredData = initialCars.filter((item) => regex.test(item.name));
            setPartner(filteredData);
        } else {
            setPartner(initialCars);
        }
    };


    useEffect(() => {
        const data = async () => {
            await partnerList().then((res) => {
                console.log('data here...........');
                setPartner(res.data.data)
            })
        }
        data()
    }, [])
    return (
        <div>
            {viewPartner ?
                <div className=' w-full  h-full  ' >
                    <div className="flex  h-[50%]  " >
                        {view.map((value, index) => (
                            <div className="bg-white ml-3 rounded-lg h-full w-full shadow dark:bg-gray-700 overflow-y-scroll no-scrollbar " >

                                <div className='flex w-full  '>
                                    <h3 className=" flex justify-end w-[55%] text-lg  font-semibold text-gray-900 dark:text-white underline " >
                                        PARTNER DETAILS
                                    </h3 >
                                    <button
                                        type="button"
                                        onClick={() => { setViewPartner(false) }}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-toggle="crud-modal"
                                    >
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg >
                                        <span className="sr-only" > Close modal</span >
                                    </button >
                                </div >

                                <form className="p-4 md:p-5 " >

                                    < div className="grid gap-4  grid-cols-2" >
                                        <div className="col-span-2" >
                                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Name : {value.name}</label >
                                        </div >
                                        <div className="col-span-2 sm:col-span-1" >
                                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Email :  {value.email}</label >

                                        </div >
                                        <div className="col-span-2 sm:col-span-1" >
                                            <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Phone : {value.phone}</label >

                                        </div >
                                        <div className="col-span-2 sm:col-span-1" >
                                            <label for="district" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > District : {value.district}</label >

                                        </div >
                                        <div className="col-span-2 sm:col-span-1" >
                                            <label for="localArea" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >LocalArea : {value.localArea}</label >
                                            <label for="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Age : {value.age}</label >

                                        </div >
                                    </div >
                                </form >
                                <div className='flex w-[700px]  text-white'>
                                    <div className='w-full  h-full flex justify-center  flex-col m-1'>
                                        Aadhaar
                                        <img
                                            alt="example"

                                            src={value.aadhaar ? value.aadhaar : im}
                                            className='w-72 h-72'
                                        />
                                    </div>


                                    <div className='w-full  h-full flex justify-center  flex-col m-1'>
                                        PanCard:
                                        <img
                                            alt="example"
                                            src={value.panCard ? value.panCard : im}
                                            className='w-72 h-72'

                                        />
                                    </div>
                                </div>

                            </div >
                        ))
                        }
                    </div >

                </div > :
                < div >

                    <div >
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
                                        onChange={search}
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
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Phone
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

                                {partner ?


                                    thisPageItems.map((value, index) => (

                                        value.partnerVarify ?
                                            < tbody key={index}>

                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                    <td className="w-4 p-4">

                                                    </td>
                                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        {/*<img className="w-10 h-10 rounded-full" src={img} alt="Jese image" />*/}
                                                        <div className="ps-3">
                                                            <div className="text-base font-semibold">{value.name}</div>
                                                            <div className="font-normal text-gray-100">{value.email}</div>
                                                        </div>
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {value.phone}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className={`h-2.5 w-2.5 rounded-full ${value.blockStatus ? ' bg-green-500 me-2' : 'bg-red-500 me-2'}`}></div> {value.blockStatus ? ' Active' : 'Deactive'}
                                                        </div>
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <a href="#" onClick={() => {
                                                            partnerBlock(value._id)
                                                        }} className={`font-medium ${value.blockStatus ? 'dark:text-red-500' : 'dark:text-green-500'} hover:underline`} >{value.blockStatus ? 'block' : 'unblock'}</a>
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <a onClick={() => { handleView(value._id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                                    </td>
                                                </tr>

                                            </tbody>
                                            : null

                                    ))

                                    : ''}
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

                </div >
            }




        </div >
    )
}

export default PartnerList