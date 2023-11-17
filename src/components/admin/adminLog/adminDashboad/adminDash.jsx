import React, { useRef } from 'react'
import UserList from '../../userList/userList'

function AdminDash() {
    const linkRef = useRef(null);


    const handleclick = () => {
        switch (linkRef.current.name) {
            case 'user':
                return (
                    <div>
                        <UserList />
                    </div>
                )

            case 'Patners':

                break;
            case 'Cars':

                break;
            case 'Booking':

                break;
        }
    }


    return (
        <div className="flex h-screen font-sans bg-gray-100">

            {/* Sidebar */}
            <div className="bg-gray-800 text-white w-16 lg:w-64 p-4 fixed inset-0 lg:relative lg:flex lg:flex-col lg:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold mb-4 lg:mb-6">Admin Dashboard</h1>
                    <ul>
                        <li className="mb-2">
                            <a href="#" className="text-blue-300 hover:text-white p-8 pb-12">Dashboad</a>
                        </li>
                        <li className="mb-2">

                            <a onClick={handleclick} className="text-blue-300 hover:text-white p-8 pb-12" name='user' ref={linkRef}> Users</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="text-blue-300 hover:text-white p-8 pb-12" name='Patners' >Patners</a>
                        </li>
                        <li>
                            <a href="#" className="text-blue-300 hover:text-white p-8 pb-12" name='Cars' >Cars</a>
                        </li>
                        <li>
                            <a href="#" className="text-blue-300 hover:text-white p-8 pb-12" name='Booking'>Booking</a>
                        </li>
                    </ul>
                </div>
                <div className="hidden lg:block">
                    <a href="#" className="text-blue-300 hover:text-white">Logout</a>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden pl-0 ">

                {/* Navigation Bar */}
                <nav className="bg-gray-800 p-4 text-white">
                    <div className="container mx-auto">
                        <h1 className="text-2xl font-semibold">Firefly</h1>
                    </div>
                </nav>

                {/* Content Area */}
                <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
                    <div className="container mx-auto mt-4">
                        <div >
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}


export default AdminDash
