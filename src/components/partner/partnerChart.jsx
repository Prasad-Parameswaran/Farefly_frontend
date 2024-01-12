import { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts';
import { Chartbooking } from "../../../src/apiConfig/axiosConfig/axiosPartnerConfig";
import { FaUsers } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
export default function PartnerChart() {
    const [data, setData] = useState([])
    const [online, setOnline] = useState(0)
    const [wallet, setWallet] = useState(0)
    const [cancel, setCancel] = useState(0)
    const [booked, setBooked] = useState(0)
    const [completed, setComplte] = useState(0)
    const [running, setRunning] = useState(0)
    const [chartData, setChartData] = useState();
    const [chartbar, setchartbar] = useState()
    const [users, setusers] = useState(0)
    const [Revenue, setRevenue] = useState(0)
    const [totalbooks, settotal] = useState(0)
    const finddata = async () => {
        try {
            const response = await Chartbooking()
            if (response.data.success)
                setData(response.data.findbooking)

            settotal(response.data.complete)
            setusers(response.data.unique)
            setRevenue(response.data.total)

            const booked = response.data.findbooking.filter((books) => {
                return books.status == "Booked"
            })
            const running = response.data.findbooking.filter((running) => {
                return running.status == "Running"
            })
            const cancel = response.data.findbooking.filter((cancel) => {
                return cancel.status == "Cancel"
            })

            const Completed = response.data.findbooking.filter((Completed) => {
                return Completed.status == "Completed"
            })

            const onl = response.data.findbooking.filter((da) => {
                return da.paymentMethod == "online"
            })
            const wal = response.data.findbooking.filter((da) => {
                return da.paymentMethod == "wallet"
            })

            setCancel(cancel.length)
            setBooked(booked.length)
            setComplte(Completed.length)
            setRunning(running.length)
            setOnline(onl.length)
            setWallet(wal.length)
            setChartData({
                series: [onl.length, wal.length],
                options: {
                    chart: {
                        width: 1200,
                        type: 'pie',
                    },
                    labels: ['Online', 'Wallet'],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 800,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                },
            })


            setchartbar({
                series: [booked.length, Completed.length, running.length, cancel.length,],
                options: {
                    chart: {
                        width: 380,
                        type: 'donut',
                    },
                    plotOptions: {
                        pie: {
                            startAngle: -90,
                            endAngle: 270
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    fill: {
                        type: 'gradient',
                    },

                    labels: ['booked', "Completed", "running", 'Canceld'],


                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }],
                },
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        finddata()

    }, [])




    return (
        <div>


            <div className="flex justify-between mt-7 ">
                <div className=" h-32 w-64 bg-white shadow-xl text-xl font-bold pt-3 pl-3 text-center">
                    <div className="mt-7 flex pl-7 items-center ">

                        <FaUsers style={{ fontSize: '3em', color: 'green' }} />
                        <div className="pl-14 text-lg">Total Users
                            <p>{users.length}</p></div>
                    </div>

                </div>
                <div className=" h-32 w-64 bg-white shadow-xl text-xl font-bold pt-3 pl-3 text-center">
                    <div className="mt-7 flex pl-7 items-center ">

                        <FaChartBar style={{ fontSize: '3em', color: 'green' }} />
                        <div className="pl-14 text-lg">Complete Running
                            <p>{totalbooks.length}</p></div>
                    </div>
                </div>

                <div className=" h-32 w-64 bg-white shadow-xl text-xl  font-bold pt-3  text-center">
                    <div className="mt-7 flex pl-7 items-center ">

                        <FaChartBar style={{ fontSize: '3em', color: 'orange' }} />
                        <div className="pl-8 text-lg"> Total Revenue
                            <p className="text-2xl text-sky-700">₹:{Revenue}</p></div>
                    </div>
                </div>

            </div>


            <div className="flex justify-between ml-5 mt-5">




                <div id="chart" className="mt-10">

                    {
                        chartData ? <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={480} /> : null

                    }
                    <p className="text-xl font-medium">Payment Method</p>
                </div>
                <div id="chart" className="mt-12 ml-10">
                    {chartbar ? <ReactApexChart options={chartbar.options} series={chartbar.series} type="donut" width={480} />
                        : null}
                    <p className="text-xl font-medium">Order Status </p>

                </div>
            </div>
        </div>
    )
}