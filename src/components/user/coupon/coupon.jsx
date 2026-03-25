import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import toast from 'react-hot-toast';
import { CouponList } from '../../../apiConfig/axiosConfig/axiosClientConfig';
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Coupon() {
    const [couponL, setCouponL] = useState([]);

    useEffect(() => {
        const coupons = async () => {
            const allCoupons = await CouponList();
            if (allCoupons.data.success) {
                setCouponL(allCoupons.data.data);
            }
        };
        coupons();
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen font-sans text-gray-100 flex flex-col pt-16 relative overflow-hidden">
            <div className='sticky top-0 z-50'>
                <Navbar />
            </div>
            
            {/* Background Ambient Effects */}
            <div className="absolute top-40 left-10 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-40 right-10 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none"></div>

            <div className="flex-grow container mx-auto px-4 py-12 lg:py-20 relative z-10 max-w-7xl">
                
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 tracking-wide mb-4">
                        Exclusive Offers
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Unlock premium deals for your next adventure. Copy these codes and apply them at checkout to save instantly.
                    </p>
                </div>

                {couponL.filter(c => c.status).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-800/20 backdrop-blur-xl border border-gray-700/50 rounded-3xl">
                        <svg className="w-20 h-20 text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
                        <h2 className="text-2xl font-bold text-gray-300 mb-2">No active coupons</h2>
                        <p className="text-gray-500">Check back soon for new amazing offers.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {couponL.map((value, index) => (
                            value.status && (
                                <div key={index} className="relative group perspective">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/50 to-emerald-500/50 rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                                    <div className="relative h-full bg-gray-900 border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 transform group-hover:-translate-y-2 flex flex-col">
                                        
                                        {/* Ticket Top */}
                                        <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/10 p-8 border-b border-dashed border-gray-600/60 flex-grow text-center relative">
                                            {/* Cutouts */}
                                            <div className="absolute bottom-[-16px] left-[-16px] w-8 h-8 bg-gray-900 rounded-full border border-gray-800 z-10 shadow-inner"></div>
                                            <div className="absolute bottom-[-16px] right-[-16px] w-8 h-8 bg-gray-900 rounded-full border border-gray-800 z-10 shadow-inner"></div>
                                            
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-400 mb-6 border border-teal-500/30">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2">{value.couponName}</h3>
                                            <p className="text-teal-400 font-medium tracking-wide uppercase text-sm mb-4">{value.event}</p>
                                        </div>

                                        {/* Ticket Bottom */}
                                        <div className="p-8 bg-gray-800/30 flex flex-col items-center">
                                            <div className="w-full flex items-stretch border border-gray-600 rounded-xl overflow-hidden mb-5 group/copy">
                                                <div className="flex-grow bg-gray-900/50 flex items-center justify-center py-3 px-4 font-mono font-bold text-lg text-emerald-400 tracking-wider">
                                                    {value.couponCode}
                                                </div>
                                                <CopyToClipboard
                                                    text={value.couponCode}
                                                    onCopy={() => toast.success('Coupon copied to clipboard!')}>
                                                    <button className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-5 font-semibold transition-colors border-l border-gray-600 flex items-center justify-center">
                                                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                                        Copy
                                                    </button>
                                                </CopyToClipboard>
                                            </div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                                Valid until: {value.expirydate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
            
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
