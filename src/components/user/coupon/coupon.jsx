import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import img from '../../../assets/Firefly.png';
import toast from 'react-hot-toast';
import { CouponList } from '../../../apiConfig/axiosConfig/axiosClientConfig';
import { CopyToClipboard } from "react-copy-to-clipboard";


export default function Coupon() {
    const [couponL, setCouponL] = useState([]);

    const handleCopie = () => {
        toast.success('Coupon code copied!')
    };

    useEffect(() => {
        const coupons = async () => {
            const allCoupons = await CouponList();
            if (allCoupons.data.success) {
                setCouponL(allCoupons.data.data);
            }
        };
        coupons();

    }, []);

    const calculateAbsoluteDivSize = () => {
        return `${couponL.length * 30}px`; // Adjust as needed
    };

    return (
        <div>
            <div className='sticky top-0 z-50   '>
                <Navbar />

            </div>
            <div className="flex items-center h-screen relative ">
                <div className="w-full h-screen absolute">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/001/211/425/non_2x/offer-on-line-background-vector.jpg"
                        className="w-full h-full rounded-lg opacity-25"
                        alt=""
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-4 pr-4 pt-32 pb-32 relative">
                    {couponL.map((value, index) => (
                        value.status &&
                        <div key={index} className="w-full bg-gradient-to-br from-lime-500 to-green-600 text-white text-center py-10 px-20 rounded-lg shadow-md relative">
                            <img src={img} className="w-36 h-14 mx-auto mb-4 rounded-lg" alt="" />
                            <h3 className="text-2xl font-semibold mb-4">{value.couponName} <br />{value.event}</h3>
                            <div className="flex items-center space-x-2 mb-6">
                                <span id="cpnCode" className="border-dashed border text-red-700 px-4 py-2 rounded-l">{value.couponCode}</span>
                                {/*<button id="cpnBtn" className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer" onClick={() => { handleCopie(value.couponCode) }}>Copy</button>*/}
                                <CopyToClipboard
                                    text={value.couponCode}
                                    onCopy={() => toast.success('Coupon code copied!')}>
                                    <span>
                                        <button id="cpnBtn" className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer" >Copy</button>

                                    </span>
                                </CopyToClipboard>
                            </div>
                            <p className="text-sm">{value.expirydate}</p>
                            <div className="w-12 h-12 bg-yellow-100 rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
                        </div>
                    ))
                    }
                </div >
                {/* Dynamically sized absolute div */}
                < div className="w-full h-full absolute" style={{ height: calculateAbsoluteDivSize() }}></div >
            </div >
            <Footer />
        </div >
    );
}
