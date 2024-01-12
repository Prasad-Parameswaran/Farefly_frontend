import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Chartbooking } from "../../apiConfig/axiosConfig/axiosPartnerConfig";
import toast from "react-hot-toast";
//import { isbookinpagefalse } from "../../../redux/NavbarSlice";
//import { useDispatch } from "react-redux";
//import Dashboard from "../Partnerdashboard/Partnerdash"

export default function PartnerSales() {
    const pdfRef = useRef();
    //const Dispatch = useDispatch()
    const [sales, setSales] = useState([])
    const [total, setTotal] = useState(0)
    const [bookid, setId] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstIndex = lastItemIndex - itemsPerPage;
    const thisPageItems = sales.slice(firstIndex, lastItemIndex);

    const pages = [];
    for (let i = 1; i <= Math.ceil(sales.length / itemsPerPage); i++) {
        pages.push(i);
    }
    const Salesreport = async () => {
        console.log('kkkkkkkkk')
        const response = await Chartbooking()
        if (response.data.success) {
            setSales(response.data.complete)
            console.log(response.data.complete, "response.data.complete");
            setTotal(response.data.total)
            setId(response.data.Ids)


        } else {
            toast.error('something went wrong ')
        }
    }

    useEffect(() => {
        //Dispatch(isbookinpagefalse())
        console.log('jjjjoooooo')
        Salesreport()
    }, [])
    console.log(sales, "salessalessales");
    const downloadPdf = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imagedata = canvas.toDataURL("img/png");
            const pdf = new jsPDF("p", "mm", "a4", true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(
                imagedata,
                "PNG",
                imgX,
                imgY,
                imgWidth * ratio,
                imgHeight * ratio
            );
            pdf.save("invoice.pdf");
        });
    };
    return (
        <div style={{ display: "flex" }} className="w-screen">
            {/*<div style={{ flex: 1 }}>
                <Dashboard />
            </div>*/}

            <div className="w-[80%] " >
                <h1 className="font-extrabold font-serif flex justify-center text-3xl mt-2">
                    Sales Report
                </h1>
                <div className="flex flex-col mt-5">
                    <div className="overflow-x-auto">
                        <div className="flex justify-between">

                            <button
                                className="bg-red-600 hover:bg-green-600 text-white py-2 px-4 rounded text-xl mt-4 ml-3 "
                                onClick={downloadPdf}
                            >
                                Download Pdf
                            </button>
                        </div>
                        <div ref={pdfRef}>


                            <h1 className="text-center font-bold text-lg "> Total Sales</h1>
                            <h1 className="text-green-500 font-bold text-lg">Total Amount: ₹{total}</h1>
                            <div className="p-1.5 w-full inline-block align-middle"  >
                                <div className="overflow-hidden border rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 mt-7 ">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                                                >
                                                    ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                                                >
                                                    Booking ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                                                >
                                                    Bike Number
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                                                >
                                                    User
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                                                >
                                                    pickup Date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                                                >
                                                    Drop date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                                                >
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {thisPageItems.length >= 0 &&
                                                thisPageItems.map((sales, index) => {
                                                    return (
                                                        <tr key={sales._id}>

                                                            <td className="px-6 py-4 text-sm text-left font-medium text-gray-800 whitespace-nowrap">
                                                                {index + 1}

                                                            </td>
                                                            <td className="px-6 py-4 text-sm font-bold text-gray-800 text-left whitespace-nowrap">
                                                                {/*{bookid[index]}*/}456

                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                                                                {sales.car.carLicenseNumber}

                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                                                                {sales.user.firstName}  {sales.user.lastName}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                                                                {sales.pickUpDate}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                                                                {sales.dropDate}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                                                                {sales.TotalAmount
                                                                } ₹
                                                            </td>



                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-center items-center text-center mt-5">
                                    {pages
                                        .slice(
                                            Math.max(currentPage - 2, 0),
                                            Math.min(currentPage + 1, pages.length)
                                        )
                                        .map((page, index) => (
                                            <button
                                                onClick={() => setCurrentPage(page)}
                                                key={index}
                                                className={`font-medium p-2   ${currentPage === page
                                                    ? "text-lg text-sky-300 bg-black rounded-md ml-2 w-10"
                                                    : "text-lg text-sky-300 bg-black rounded-md ml-2 w-10"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}