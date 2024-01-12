import { useEffect, useState, useRef } from "react"
//import Dashboard from "../Dashboard/Admindashb";
import { Sales } from "../../../apiConfig/axiosConfig/axiosAdminConfig";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";



export default function AdminSales() {
    const pdfRef = useRef();

    const [sales, Setsales] = useState([])
    const [total, setTotal] = useState([])
    const [bookid, setId] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)

    const handleClick = (index) => {
        setPage(index + 1)
    }
    const salesreport = async () => {
        const response = await Sales(page)
        if (response.data.success) {
            Setsales(response.data.bookingdata)
            setTotal(response.data.total)
            setId(response.data.IDs)
            setPage(response.data.page)
            setTotalPages(response.data.totalPages)
        }
    }
    useEffect(() => {
        //Dispatch(isbookinpagefalse())
        salesreport()
    }, [page])


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

            <div className="w-[80%] " ref={pdfRef}>
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
                        <h1 className="text-center font-bold text-lg"> Total Sales</h1>
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
                                                Partner
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
                                        {sales.length >= 0 &&
                                            sales.map((sales, index) => {
                                                return (
                                                    <tr key={sales._id}>

                                                        <td className="px-6 py-4 text-sm text-left font-medium text-gray-800 whitespace-nowrap">
                                                            {index + 1}

                                                        </td>

                                                        <td key={index} className="px-6 py-4 text-sm font-bold text-gray-800 text-left whitespace-nowrap">
                                                            {bookid[index]}

                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                                                            {sales.partner.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                                                            {sales.user.firstName}  {sales.user.lname}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                                                            {sales.pickUpDate}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                                                            {sales.dropDate}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">

                                                            ₹:{sales.TotalAmount}
                                                        </td>

                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                            <div className='max-w-[1600px] bg-gray-100 flex justify-center mt-3'>
                                {totalPages > 0 &&
                                    [...Array(totalPages)].map((val, index) => (
                                        <button
                                            className={`${page === index + 1 ? ' bg-black' : 'bg-black'} py-2 px-4 rounded-md m-1 text-white ${page === index + 1 ? 'font-bold' : 'font-normal'} focus:outline-none focus:ring focus:ring-offset-2`}
                                            key={index}
                                            onClick={() => handleClick(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}