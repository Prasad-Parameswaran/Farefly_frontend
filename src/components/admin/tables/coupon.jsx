import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, DatePicker } from 'antd';
import { Card, Typography } from "@material-tailwind/react";
import { couponSubmit, allCouponDetails, BlockOrUnblock } from '../../../apiConfig/axiosConfig/axiosAdminConfig'
import toast from 'react-hot-toast';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid Amount!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const TABLE_HEAD = ["Coupon Name", "Coupon Code", "Event", "MaxBookingAmount", 'discountamount', 'Status', 'Experirydate', 'Action'];

const TABLE_ROWS = [
    {
        name: "John Michael",
        job: "Manager",
        date: "23/04/18",
    },
    {
        name: "Alexa Liras",
        job: "Developer",
        date: "23/04/18",
    },
    {
        name: "Laurent Perrier",
        job: "Executive",
        date: "19/09/17",
    },
    {
        name: "Michael Levi",
        job: "Developer",
        date: "24/12/08",
    },
    {
        name: "Richard Gran",
        job: "Manager",
        date: "04/10/21",
    },
];

const Coupon = () => {


    const [table, setTable] = useState(true);
    const [coupons, setCoupons] = useState([])

    const onFinish = async (values) => {
        const response = await couponSubmit(values)
        if (response.data.success) {
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    const CouponBlock = async (id) => {
        try {
            console.log(id, 'hkkhkjhk')
            const blockOrUnblock = await BlockOrUnblock(id)

            if (blockOrUnblock.data.success) {
                setCoupons(blockOrUnblock.data.data)
                toast.success(blockOrUnblock.data.message)
            } else {
                toast.error(blockOrUnblock.data.message)
            }
        } catch (error) {
            toast.error('something went wrong..')
        }
    }


    useEffect(() => {
        const allCoupon = async () => {
            const coupon = await allCouponDetails()
            //console.log(coupon.data.bookingData, 'hhkjhkhkhkhkhkhkhkhkh')
            setCoupons(coupon.data.bookingData)
        }
        allCoupon()

    }, [])


    return (
        <div>
            {table ?
                <>

                    <div className=' w-32 h-10'>
                        <button class="bg-blue-950 hover:bg-sky-700 rounded-lg p-1 border text-white" onClick={() => { setTable(false) }}>
                            ADD COUPON
                        </button>
                    </div>

                    <Card className="h-full w-full overflow-y-scroll no-scrollbar ">
                        <table className="w-half min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((value, index) => (
                                    <tr key={index} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {value.couponName}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {value.couponCode}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {value.event}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {value.maxBookingAmount}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {value.discountamount}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className={`font-normal  ${value.status ? 'bg-green-500' : 'bg-red-500'} rounded-3xl text-center`}>
                                                {value.status ? 'Active' : 'Deactive'}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {value.experirydate}
                                            </Typography>
                                        </td>
                                        <td class="px-6 py-4">
                                            <button onClick={() => {
                                                CouponBlock(value._id)
                                            }} className={`font-medium ${value.status ? 'dark:bg-red-500' : 'dark:bg-green-500 '} hover:underline text-white rounded w-20 p-1`}>{value.status ? 'block' : 'unblock'}</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </>
                :
                <>
                    <div className=' w-full h-10 flex justify-center pl-80'>
                        <button class="bg-blue-950 hover:bg-sky-700 rounded-lg p-1 border w-16 h-10 text-white" onClick={() => { setTable(true) }}>
                            Back
                        </button>
                    </div>
                    < div className='w-full flex justify-center items-center pt-10 '>

                        <Form
                            {...layout}
                            name="nest-messages"
                            onFinish={onFinish}
                            className='border border-blue-950 w-96 h-auto p-8 bg-white '
                            validateMessages={validateMessages}
                        >
                            <div className='flex justify-center pb-6 underline '>
                                <h1 className='font-bold text-2xl'>ADD COUPON</h1>
                            </div>
                            <Form.Item
                                name={['user', 'couponName']}
                                label="Coupon Name"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name={['user', 'Code']} label="Coupon Code">
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={['user', 'expiryDate']}
                                label="Expiry Date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select the expiry date!',
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                name={['user', 'max']}
                                label="Max Amount"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        max: 1000,
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                name={['user', 'discount']}
                                label="Discount"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        max: 1000,
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>

                            <Form.Item name={['user', 'Event']} label="Event">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    ...layout.wrapperCol,
                                    offset: 8,
                                }}
                            >
                                <Button type="primary" className='bg-blue-900' htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </>
            }

        </div >

    );
};

export default Coupon;
