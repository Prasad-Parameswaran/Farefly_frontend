import React, { useEffect, useState } from 'react'
import { userList, userStatus } from '../../../apiConfig/axiosConfig/axiosAdminConfig'
import Swal from 'sweetalert2'


//import img from '../../../assets/car1.avif'

function UserLists() {
    const [users, setUsers] = useState([])
    const [viewUser, setViewUser] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [searchUser, setSearchUser] = useState('')

    const lastItemIndex = currentPage * itemsPerPage;
    const firstIndex = lastItemIndex - itemsPerPage;
    const thisPageItems = users.slice(firstIndex, lastItemIndex);

    const pages = [];
    for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const search = async (e) => {
        setSearchUser(e.target.value)
        await findcars()
    }

    const findcars = async (e) => {

        const response = await userList()
        const initialCars = response.data.data;
        setUsers(initialCars)

        const trimmedSearchTerm = searchUser.trim()

        if (trimmedSearchTerm.length !== 0) {
            const regex = new RegExp(trimmedSearchTerm, 'i');
            const filteredData = initialCars.filter((item) => regex.test(item.firstName));
            setUsers(filteredData);
        } else {
            setUsers(initialCars);
        }
    };


    const userblock = async (id) => {
        // Use SweetAlert to display a confirmation message
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will block the user. Do you want to proceed?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, block it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            try {
                const res = await userStatus(id);
                setUsers(res.data.data);
            } catch (error) {
                console.error('An error occurred:', error.message);
            }
        }
    };
    useEffect(() => {
        const data = async () => {
            await userList().then((res) => {
                setUsers(res.data.data)

            })
        }
        data()
    }, [])

    return (
        <div>

            {/*< div className=' w-full  h-full  ' >
                <div className="flex  h-[50%]  " >
                    <div className="bg-white ml-3 rounded-lg h-full w-full shadow dark:bg-gray-700 overflow-y-scroll no-scrollbar " >

                        <div className='flex w-full  '>
                            <h3 className=" flex justify-end w-[55%] text-lg  font-semibold text-gray-900 dark:text-white underline " >
                                PARTNER DETAILS
                            </h3 >
                            <button
                                type="button"
                                onClick={() => { setViewUser(false) }}
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
                            <div className="grid gap-4  grid-cols-2" >
                                <div className="col-span-2" >
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Name :</label >
                                </div >
                                <div className="col-span-2 sm:col-span-1" >
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Email:</label >

                                </div >
                                <div className="col-span-2 sm:col-span-1" >
                                    <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Phone:</label >

                                </div >
                                <div className="col-span-2 sm:col-span-1" >
                                    <label for="district" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > District:</label >

                                </div >
                                <div className="col-span-2 sm:col-span-1" >
                                    <label for="localArea" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >LocalArea:</label >

                                </div >
                                <div className="col-span-2 sm:col-span-1" >
                                    <label for="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Age:</label >

                                </div >
                                <div className=' flex flex-wrap w-1/2 h-full border'>
                                    <div className="col-span-2 sm:col-span-1" >
                                        <label for="aadhaar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Aadhaar:</label >

                                    </div >
                                    <div className='w-full  h-full flex justify-center border'>
                                        <img
                                            alt="example"
                                            src={im}
                                            className='w-30 h-30'
                                        />
                                    </div>
                                </div>
                                <div className=' flex flex-wrap w-1/2 h-full border'>
                                    <div className="col-span-2 sm:col-span-1" >
                                        <label for="panCard" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > PanCard:</label >
                                    </div >
                                    <div className='w-full  h-full flex justify-center border'>
                                        <img
                                            alt="example"
                                            src={im}
                                            className='w-30 h-30'
                                        />
                                    </div>
                                </div>
                            </div >

                        </form >
                    </div >
                </div >

            </div >*/}


            {
                users ?
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
                                            {/*<th scope="col" className="px-6 py-3">
                                                View
                                            </th>*/}
                                        </tr>
                                    </thead>
                                    {

                                        thisPageItems?.map((value, index) =>
                                        (
                                            <tbody key={index}>

                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                    <td className="w-4 p-4">

                                                    </td>
                                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        {/*<img className="w-10 h-10 rounded-full" src={img} alt="Jese image" />*/}
                                                        <div className="ps-3">
                                                            <div className="text-base font-semibold">{value.firstName}</div>
                                                            <div className="font-normal text-gray-100">{value.email}</div>
                                                        </div>
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {value.phone}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className={`h-2.5 w-2.5 rounded-full ${value.status ? ' bg-green-500 me-2' : 'bg-red-500 me-2'}`}></div>{value.status ? ' Active' : 'Deactive'}
                                                        </div>
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <button onClick={() => {
                                                            userblock(value._id)
                                                        }} className={`font-medium ${value.status ? 'dark:text-red-500' : 'dark:text-green-500'} hover:underline`}>{value.status ? 'block' : 'unblock'}</button>
                                                    </td>
                                                    {/*<td class="px-6 py-4">
                                                        <a onClick={() => setViewUser(true)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                                    </td>*/}
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

                    </div >
                    : null
            }


        </div >
    )
}

export default UserLists
