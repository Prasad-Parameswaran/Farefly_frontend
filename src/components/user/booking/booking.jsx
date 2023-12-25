import { useState, useEffect } from "react";
import UserNav from "../navbar/navbar";
import Footer from "../footer/footer";
import { useLocation, useNavigate } from "react-router-dom";
import { bookingCarDeatils, finalbooking } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";


export default function BikeBooking() {
    const location = useLocation();
    const [bookingData, setBookingData] = useState(location.state)
    const [grossAmount, setGrossAmount] = useState(Number)
    const [bookingCar, setBookingCar] = useState([])
    const [dayCount, setDayCount] = useState(Number)
    const [cgst, setCgst] = useState(Number)
    const [sgst, setSgst] = useState(Number)
    const [totalAmount, setTotalAmount] = useState()
    const [selectedMethod, setSelectedMethod] = useState("");
    const [checkOut, setCheckOut] = useState(false)

    const navigate = useNavigate()

    const dateCount = async (carprize) => {
        const dropDate = new Date(bookingData.dropDate);
        const pickUpDate = new Date(bookingData.pickUpDate);
        dropDate.setHours(0, 0, 0, 0);
        pickUpDate.setHours(0, 0, 0, 0);

        const timeDifference = dropDate - pickUpDate;
        console.log(timeDifference, 'this is time difference');

        const count = Math.round(timeDifference / (1000 * 60 * 60 * 24)) + 1;
        setDayCount(count)
        console.log(count, 'count day')

        const amount = count * carprize.price;
        const cgstAmount = Math.floor(amount * (5 / 100))
        const sgstAmount = Math.floor(amount * (10 / 100))
        const totalMoney = amount + cgstAmount + sgstAmount
        setTotalAmount(totalMoney)
        setGrossAmount(amount);
        setCgst(cgstAmount);
        setSgst(sgstAmount);

        //toast.success(response.data.message)
    }

    const datas = {
        bookingData: bookingData,
        dayCount: dayCount,
        cgst: cgst,
        sgst: sgst,
        totalAmount: totalAmount,
        PaymentMethod: selectedMethod
    }
    const providebooking = async () => {
        try {
            const response = await finalbooking(datas)
            if (response.data.wallet) {
                toast.success("Booking Started");
                navigate("/BookingSuccessfull");
            } else if (response.data.notamount) {
                toast.error(response.data.notamount);
            } else if (response.data.messages) {
                toast.error(response.data.messages); // Display license error message
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const handleMethodSelect = (method) => {
        if (method == 'wallet') {
            setCheckOut(false)
        }
        setSelectedMethod(method);


    };


    const singleCar = async () => {
        await bookingCarDeatils(bookingData.carId).then((response) => {
            if (response.data.success) {
                console.log(response.data.data, 'this is i,..........')
                setBookingCar([response.data.data])
                dateCount(response.data.data)
            } else {
                console.log('2nd ethi code pottipoyi')
                toast.error(response.data.data.message)
            }
        })
    }

    function renderUpiPayment() {
        console.log('hello this is online payment ..............')
        return (
            <div className="flex justify-center">
                {/* <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Pay with PayPal</button> */}

                <PayPalScriptProvider options={{ "client-id": "Ab6K-WViVZviqKgbf9P0n7Pa9gjagaWrL-jNqOnCaUcbVLGRepbrQxo1MNx5qs5KSo_rnEj59xe3Tes1" }}>
                    <PayPalButtons
                        style={{
                            color: "blue",
                            shape: "pill",
                            label: "pay",
                            height: 40,
                        }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: datas.totalAmount,
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={async (data, actions) => {
                            //console.log("onApprove data:", data);
                            console.log("onApprove actions:", actions);

                            try {
                                const res = await actions.order.capture();
                                const response = await finalbooking(datas)
                                if (response.data.success) {
                                    navigate("/BookingSuccessfull")
                                    toast.success('Booking successful');
                                } else {
                                    toast.error('something went wrong...');
                                }
                            } catch (error) {
                                console.error("Capture error:", error);

                                // Handle capture error, e.g., show an error message
                                toast.error('Error capturing payment');
                            }
                        }}
                    />
                </PayPalScriptProvider>


            </div>
        );
    }



    useEffect(() => {
        singleCar()
    }, [])

    return (
        <div >
            < div className="sticky top-0 z-50" >
                <UserNav />
            </div >
            {!bookingCar.length == 0 &&
                < div className="mt-8 md:mt-2 h-auto lg:h-[700px] flex flex-col lg:flex-row justify-center items-center">
                    <div className="w-full lg:w-[50rem] mt-10 lg:mt-0 h-full lg:ml-14 lg:h-[31rem]  mb-3 lg:mb-0 lg:mr-3 flex flex-col items-center lg:items-center pt-5 custom-shadow">
                        <h2 className="text-3xl font-bold mb-4 text-center md:text-center">
                            Booking Summary
                        </h2>

                        <div className="w-full mt-3 lg:mt-0  lg:w-[45rem] h-auto lg:h-96  mb-3 lg:mb-0 lg:mr-3 flex flex-col lg:flex-row">
                            {/*{bikesdata.map((value, index) => (*/}
                            <>
                                <div

                                    className="w-full lg:w-[40%] md:h-[130%] lg:h-[100%] flex flex-col justify-center items-center shadow-xl bg-lime-200 rounded-lg"
                                >
                                    <h1 className="text-2xl font-bold mb-4">
                                        {bookingCar[0].carMake}
                                    </h1>
                                    <img
                                        src={bookingCar[0].carImage1}

                                        className="w-64 h-40 rounded-lg mb-3 hover:scale-125 transform-gpu transition-transform duration-500 ease-in-out"
                                        alt=""
                                    />
                                    <div className="mt-5 text-2xl flex justify-center text-center  font-mono text-green-800 h-10 w-[50%] bg-white rounded-3xl">
                                        <span >{bookingCar[0]?.price}₹/Day</span>

                                    </div>
                                </div>

                                <div className="w-full lg:w-[60%] md:h-[130%] lg:h-[100%] py-6 shadow-xl bg-lime-100 rounded-lg">
                                    <div className="flex flex-col justify-between pl-2 pr-5">
                                        <p className="text-lg font-medium flex flex-row justify-between">
                                            <span>{bookingData.pickUpDate}</span>
                                            <span>{bookingData.dropDate}</span>
                                        </p>

                                        {/*<p className="text-lg font-medium flex flex-row justify-between">
                                            <span>10:00 am</span>
                                            <span>12:9 pm</span>
                                        </p>*/}

                                        <p className="text-lg font-medium flex flex-row justify-between">
                                            <span className="pt-2">Pick up point</span>
                                            <span>-{bookingData.district ? bookingData.district : ''}</span>
                                            {/*<select name="" id="" className="w-52 h-10 rounded-md bg-slate-300 ">
                                            <option className="text-lg font-medium">Select</option>
                                            <option className="text-lg font-medium">palakkad
                                            </option>
                                        </select>*/}
                                        </p>

                                        <p className="text-lg font-medium flex flex-row justify-between mt-2">
                                            <span className="pt-1">Drop up point</span>
                                            {/*<select name="" id="" className="w-52 h-10 rounded-md bg-slate-300  ">
                                            <option className="text-lg font-medium">Select</option>
                                            <option className="text-lg font-medium">kalpatta
                                            </option>
                                        </select>*/}
                                            <span>-{bookingData.district ? bookingData.district : ''}</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between pt-1">
                                            <span>Total Days</span>
                                            <span>{dayCount} Days</span>
                                        </p>

                                        {/*<p className="text-lg font-medium flex flex-row justify-between pt-1">
                                        <span>Number of Helmet (?)</span>
                                        <select className="w-12 h-6 font-bold rounded-md bg-slate-300">
                                            <option className="font-bold">1</option>
                                            <option>2</option>
                                        </select>
                                    </p>*/}
                                        <p className="text-lg font-medium flex flex-row justify-between">
                                            <span>Owner Name</span>
                                            <span>{bookingCar[0].ownerName}</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between">
                                            <span>Plate Number</span>
                                            <span>{bookingCar[0].carLicenseNumber}</span>
                                        </p>

                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span>FuelType </span>
                                            <span>{bookingCar[0].fuelType}</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span>Category </span>
                                            <span>{bookingCar[0].carCategory}</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span>Transmission </span>
                                            <span>{bookingCar[0].transmission}</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between ">
                                            <span>carYear </span>
                                            <span>{bookingCar[0].carYear}</span>
                                        </p>
                                        <p className="text-lg font-medium flex flex-row justify-between">
                                            <span>Km limit (?)</span>
                                            <span>120/km</span>
                                        </p>
                                    </div>
                                </div>
                            </>
                            {/*))}*/}
                        </div>
                    </div>

                    {/* Additional Section */}
                    <div className="w-full md:w-96 md:h-80 custom-shadow bg-lime-100 flex-col lg:mb-44 justify-between md:ml-4 pb-16 ">
                        <div>
                            <p className="font-bold text-2xl text-center">Checkout</p>
                            <div className="flex justify-between mt-6 pl-4 pr-4">
                                <p className="font-medium text-lg">Gross Amount</p>
                                <p>{grossAmount}</p>
                            </div>

                            <div className="flex justify-between pl-4 pr-4 mt-1">
                                <p className="font-medium text-lg ">CGST (5%)</p>
                                <p>₹:{cgst}</p>
                            </div>
                            <div className="flex justify-between pl-4 pr-4 mt-1">
                                <p className="font-medium text-lg">SGST (10%)</p>
                                <p className="flex">₹:{sgst}</p>
                            </div>
                            <div className="flex justify-between pl-4 pr-4 mt-1">
                                <p className="font-medium text-lg">Discount Amount</p>
                                <p>₹:0</p>
                            </div>
                            {/*<div className="flex justify-between pl-4 pr-4 mt-1">
                            <p className="font-medium text-lg">Wallet Amount</p>
                            <p>₹:0</p>
                        </div>*/}
                            <div className="flex  pl-4 pr-4 mt-5 w-80 h-16 bg-lime-400 rounded-lg ml-8  justify-between items-center ">
                                <input className='w-[15rem] ml-2 text-black placeholder:text-black p-1 rounded-md bg-slate-300 h-10  ' type="text" name="code" placeholder='Enter Coupon Code' />
                                <button className="font-bold ml-3 mb-1 text-black">Apply</button>
                            </div>
                        </div>
                        <div></div>
                        <div className="flex flex-col items-center mt-6 md:mt-8 w-full md:w-96  lg:h-56 pt-1 custom-shadow bg-lime-200">
                            <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>

                            <div className="flex flex-col items-center space-y-4">
                                <label className="payment-label font-bold">
                                    <input
                                        type="radio"
                                        value="wallet"
                                        checked={selectedMethod === "wallet"}
                                        onChange={() => handleMethodSelect("wallet")}
                                    />
                                    Wallet
                                </label>

                                <label className="payment-label font-bold">
                                    <input
                                        type="radio"
                                        value="online"
                                        checked={selectedMethod === "online"}
                                        onChange={() => handleMethodSelect("online")}
                                    />
                                    Online
                                </label>
                            </div>
                            <div className="mt-4">
                                <p className="text-lg font-bold">
                                    Total Amount: <span className="text-green-800">₹:{totalAmount}</span>
                                </p>
                            </div>

                            {selectedMethod == 'online' ?

                                <button
                                    className="bg-green-800 text-white px-4 py-2 mt-4 rounded-md"

                                    onClick={() => {
                                        setCheckOut(true);
                                    }}
                                >make payment </button>

                                :
                                < button
                                    className="bg-green-800 text-white px-4 py-2 mt-4 rounded-md"
                                    // onClick={handlePayment}
                                    // disabled={!selectedMethod}
                                    //onClick={bookingsdata}
                                    onClick={providebooking}  >
                                    Make Payment
                                </button>
                            }

                        </div>
                        {checkOut && renderUpiPayment()}


                    </div>

                </div>
            }
            <div className="mt-1">
                <Footer />
            </div>
        </div >
    );
}

