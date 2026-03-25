import { useState, useEffect } from "react";
import UserNav from "../navbar/navbar";
import Footer from "../footer/footer";
import { useLocation, useNavigate } from "react-router-dom";
import { bookingCarDeatils, finalbooking, Applycoupon, DatesAvailable } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

export default function Booking() {
    const location = useLocation();
    const [bookingData, setBookingData] = useState({})
    const [grossAmount, setGrossAmount] = useState(0)
    const [bookingCar, setBookingCar] = useState([])
    const [dayCount, setDayCount] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [cgst, setCgst] = useState(0)
    const [sgst, setSgst] = useState(0)
    const [totalAmount, setTotalAmount] = useState()
    const [selectedMethod, setSelectedMethod] = useState("");
    const [checkOut, setCheckOut] = useState(false)
    const [localAreaName, setLocalAreaName] = useState('')
    const [onlineSelect, setOnlineSelect] = useState(true)

    const navigate = useNavigate()
    const searchParams1 = new URLSearchParams(location.search)

    const pickUpDate = searchParams1.get("pickUpDate")
    const dropDate = searchParams1.get("dropDate")
    const carId = searchParams1.get("carId")
    const district = searchParams1.get("district")
    const value = { pickUpDate, dropDate, carId, district }

    const dateCount = async (carprize) => {
        const dropDate = new Date(value.dropDate);
        const pickUpDate = new Date(value.pickUpDate);
        dropDate.setHours(0, 0, 0, 0);
        pickUpDate.setHours(0, 0, 0, 0);

        const timeDifference = dropDate - pickUpDate;
        const count = Math.round(timeDifference / (1000 * 60 * 60 * 24)) + 1;
        setDayCount(count)

        const amount = count * carprize.price;
        const cgstAmount = Math.floor(amount * (5 / 100))
        const sgstAmount = Math.floor(amount * (10 / 100))
        const totalMoney = amount + cgstAmount + sgstAmount
        setTotalAmount(totalMoney)
        setGrossAmount(amount);
        setCgst(cgstAmount);
        setSgst(sgstAmount);
    }

    const datas = {
        bookingData, dayCount, cgst, sgst, totalAmount, PaymentMethod: selectedMethod, discountAmount: discount,
    }

    const providebooking = async () => {
        try {
            datas.localArea = localAreaName
            const res = await DatesAvailable(datas)
            if (!res.data.success) {
                toast.error(res.data.message)
            } else {
                const response = await finalbooking(datas)
                if (response.data.wallet) {
                    toast.success("Booking Started");
                    navigate("/BookingSuccessfull");
                } else if (response.data.notamount) {
                    toast.error(response.data.notamount);
                } else if (response.data.messages) {
                    toast.error(response.data.messages);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleMethodSelect = async (method) => {
        if (method === 'wallet') setCheckOut(false)
        setSelectedMethod(method)
    }

    const CouponApply = async () => {
        const coponData = document.getElementById('coupon').value
        if(!coponData) return toast.error("Enter a coupon code")
        const data = { code: coponData, amonut: totalAmount }
        const response = await Applycoupon(data)
        if (response.data.success) {
            const total = totalAmount - response.data.amount
            setTotalAmount(total)
            setDiscount(response.data.amount)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    const singleCar = async () => {
        await bookingCarDeatils(value.carId).then((response) => {
            if (response.data.success) {
                setBookingCar([response.data.data])
                setLocalAreaName(response.data.data.owner.localArea)
                dateCount(response.data.data)
            } else {
                toast.error(response.data.data.message)
            }
        })
    }

    function renderUpiPayment() {
        const AvailableOrnot = async () => {
            if (selectedMethod === 'online') {
                const res = await DatesAvailable(datas)
                if (!res.data.success) {
                    toast.error(res.data.message)
                    setOnlineSelect(false)
                }
            }
        }
        AvailableOrnot()
        return (
            <div className="flex justify-center w-full mt-4">
                {onlineSelect &&
                    <PayPalScriptProvider options={{ "client-id": "Ab6K-WViVZviqKgbf9P0n7Pa9gjagaWrL-jNqOnCaUcbVLGRepbrQxo1MNx5qs5KSo_rnEj59xe3Tes1" }}>
                        <div className="w-full bg-white p-2 rounded-xl">
                            <PayPalButtons
                                style={{ color: "blue", shape: "pill", label: "pay", height: 40 }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({ purchase_units: [{ amount: { value: datas.totalAmount } }] });
                                }}
                                onApprove={async (data, actions) => {
                                    try {
                                        const res = await DatesAvailable(datas)
                                        if (!res.data.success) {
                                            toast.error(res.data.message)
                                        } else {
                                            await actions.order.capture();
                                            const response = await finalbooking(datas)
                                            if (response.data.success) {
                                                navigate("/BookingSuccessfull")
                                                toast.success('Booking successful');
                                            } else {
                                                toast.error('something went wrong...');
                                            }
                                        }
                                    } catch (error) { toast.error('Error capturing payment'); }
                                }}
                            />
                        </div>
                    </PayPalScriptProvider>
                }
            </div>
        );
    }

    useEffect(() => {
        const list = async () => {
            try {
                setBookingData(value)
                await singleCar()
            } catch (error) {
                toast.error("Error fetching car details");
            }
        }
        list();
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen font-sans text-gray-100 flex flex-col pt-16">
            <div className="sticky top-0 z-50">
                <UserNav />
            </div>

            {bookingCar.length > 0 && (
                <div className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row justify-center gap-8 items-start">
                    
                    {/* Booking Details Glass Card */}
                    <div className="w-full lg:w-3/5 xl:w-[800px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-3xl p-6 md:p-8 flex flex-col mt-4">
                        <div className="flex items-center mb-6">
                            <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold mr-3 border border-teal-500/30">1</span>
                            <h2 className="text-2xl font-bold text-white tracking-wide">Booking Summary</h2>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Car Image Summary */}
                            <div className="w-full md:w-[40%] flex flex-col items-center bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
                                <h1 className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 text-center">
                                    {bookingCar[0].carMake}
                                </h1>
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                                    <img src={bookingCar[0].carImage1} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" alt="Car" />
                                </div>
                                <div className="text-xl flex justify-center items-center font-bold text-teal-400 py-2 px-6 bg-gray-900 rounded-full border border-teal-500/30">
                                    <span>₹{bookingCar[0]?.price} / Day</span>
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="w-full md:w-[60%] bg-gray-800/30 rounded-2xl p-5 border border-gray-700/50 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm md:text-base border-b border-gray-700/50 pb-2">
                                        <span className="text-gray-400 font-medium">Dates</span>
                                        <span className="text-white font-semibold">{bookingData.pickUpDate} → {bookingData.dropDate}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm md:text-base border-b border-gray-700/50 pb-2">
                                        <span className="text-gray-400 font-medium">Location</span>
                                        <span className="text-white font-semibold text-right">{bookingData.district || ''}, {bookingCar[0]?.owner.localArea || ''}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm md:text-base border-b border-gray-700/50 pb-2">
                                        <span className="text-gray-400 font-medium">Duration</span>
                                        <span className="text-teal-400 font-bold">{dayCount} Days</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm md:text-base border-b border-gray-700/50 pb-2">
                                        <span className="text-gray-400 font-medium">Host Name</span>
                                        <span className="text-white font-semibold">{bookingCar[0].ownerName}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm md:text-base border-b border-gray-700/50 pb-2">
                                        <span className="text-gray-400 font-medium">License / Category</span>
                                        <span className="text-white font-semibold">{bookingCar[0].carLicenseNumber} • {bookingCar[0].carCategory}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm md:text-base pb-1">
                                        <span className="text-gray-400 font-medium">Specs</span>
                                        <span className="text-white font-semibold">{bookingCar[0].fuelType} • {bookingCar[0].transmission} • {bookingCar[0].carYear}</span>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                                    <p className="text-sm text-teal-300 font-medium">Includes 120km daily limit. Extra km charges apply.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Section */}
                    <div className="w-full lg:w-2/5 xl:w-[450px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-3xl flex flex-col mt-4 overflow-hidden">
                        
                        <div className="p-6 md:p-8">
                            <div className="flex items-center mb-6">
                                <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold mr-3 border border-teal-500/30">2</span>
                                <h2 className="text-2xl font-bold text-white tracking-wide">Checkout</h2>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-300">
                                    <p className="font-medium">Gross Amount</p>
                                    <p className="font-semibold text-white">₹{grossAmount}</p>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <p>CGST (5%)</p>
                                    <p>₹{cgst}</p>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <p>SGST (10%)</p>
                                    <p>₹{sgst}</p>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-emerald-400 text-sm font-medium">
                                        <p>Discount</p>
                                        <p>-₹{discount}</p>
                                    </div>
                                )}
                            </div>

                            {/* Coupon Input */}
                            <div className="flex gap-2 mb-8 bg-gray-800/50 p-2 rounded-xl border border-gray-700/50">
                                <input 
                                    className='w-full bg-transparent border-none text-white focus:ring-0 px-3 placeholder-gray-500 outline-none' 
                                    id='coupon' 
                                    type="text" 
                                    placeholder='Have a coupon code?' 
                                />
                                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-sm" onClick={CouponApply}>
                                    Apply
                                </button>
                            </div>

                            <div className="border-t border-gray-700/50 pt-6 mb-8">
                                <div className="flex justify-between items-end mb-6">
                                    <h3 className="text-lg font-medium text-gray-300">Total Payable</h3>
                                    <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">₹{totalAmount}</span>
                                </div>
                                
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Payment Method</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all ${selectedMethod === 'wallet' ? 'bg-teal-500/10 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-500'}`}>
                                        <input type="radio" value="wallet" className="hidden" checked={selectedMethod === "wallet"} onChange={() => handleMethodSelect("wallet")} />
                                        <svg className={`w-6 h-6 mb-2 ${selectedMethod === 'wallet' ? 'text-teal-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                        <span className={`font-semibold ${selectedMethod === 'wallet' ? 'text-teal-400' : 'text-gray-300'}`}>Wallet</span>
                                    </label>
                                    
                                    <label className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all ${selectedMethod === 'online' ? 'bg-teal-500/10 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-500'}`}>
                                        <input type="radio" value="online" className="hidden" checked={selectedMethod === "online"} onChange={() => handleMethodSelect("online")} />
                                        <svg className={`w-6 h-6 mb-2 ${selectedMethod === 'online' ? 'text-teal-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                        <span className={`font-semibold ${selectedMethod === 'online' ? 'text-teal-400' : 'text-gray-300'}`}>Online / UPI</span>
                                    </label>
                                </div>
                            </div>

                            {selectedMethod === 'online' ? (
                                !checkOut ? (
                                    <button className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-lg rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)] transform hover:-translate-y-1 transition-all duration-300" onClick={() => setCheckOut(true)}>
                                        Proceed to Pay
                                    </button>
                                ) : renderUpiPayment()
                            ) : (
                                <button className={`w-full py-4 text-white font-bold text-lg rounded-xl transition-all duration-300 ${!selectedMethod ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)] transform hover:-translate-y-1'}`} onClick={providebooking} disabled={!selectedMethod}>
                                    Confirm Wallet Payment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
