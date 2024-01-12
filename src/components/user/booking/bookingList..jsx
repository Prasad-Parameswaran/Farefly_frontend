import { useState, useEffect } from "react";
import { Bookinghistory } from "../../../configure/Userinterceptor";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
//import { CancelBooking } from "../../../configure/Userinterceptor";

export default function BookingView() {
    const [bookingData, setBookingdata] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const navigate = useNavigate();

    const bookingdata = async () => {
        try {
            const response = await Bookinghistory();
            if (response.data.success) {
                setBookingdata(response.data.bookings);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        bookingdata();
    }, [refresh]);

    const cancel = async (id) => {
        try {
            const response = await CancelBooking(id);
            if (response.data.success) {
                refresh == true ? setRefresh(false) : setRefresh(true);
                toast.success("Your Booking is Canceled");
            } else if (response.data.Running) {
                toast.error("Not Cancel Bike is Currently Running")
            } else if (response.data.completed) {
                toast.error("Your Ride Alredy Completed")

            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="container mt-5 pr-10">
                <div className="flex flex-col mt-28">
                    <div className="overflow-x-auto">
                        <div className="p-1.5 w-full inline-block align-middle">
                            <div className="overflow-hidden border rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 ">
                                    <thead className="bg-gray-50 ">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase"
                                            >
                                                NO
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase"
                                            >
                                                Booking ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase"
                                            >
                                                Car Make
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase"
                                            >
                                                Booking Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase"
                                            >
                                                Cancel
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase"
                                            >
                                                View Booking
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {bookingData.length > 0 &&
                                            bookingData.map((user, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 text-sm text-left text-green-700 whitespace-nowrap font-bold">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-green-700 text-left whitespace-nowrap font-bold">
                                                        {user._id}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-green-700 text-left whitespace-nowrap font-bold">
                                                        {user.car_id.Bikename}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-green-700 text-left whitespace-nowrap font-bold">
                                                        {user.status}
                                                    </td>


                                                    <td className="px-6 py-4 text-green-800 text-left whitespace-nowrap">
                                                        {user.status !== "Canceld" ? (
                                                            <button
                                                                type="button"
                                                                className="w-[100px] text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                                onClick={() => {
                                                                    cancel(user._id);
                                                                }}
                                                            >
                                                                Cancel
                                                            </button>
                                                        ) : (
                                                            <span className="text-red-600 font-bold">Booking Canceled</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-left whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                                            onClick={() => navigate("/bookinghistrory", { state: { bike: user } })}
                                                        >
                                                            View
                                                        </button>

                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}