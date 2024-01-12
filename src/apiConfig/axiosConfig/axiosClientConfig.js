// data.js
import { clientAxiosIntercepter } from '../intercepter';
const url = "user"
const client = clientAxiosIntercepter(url);


const clientLogin = async (data) => {
    const response = await client.post('/login', { data })
    return response
}
const profileData = async () => {
    try {
        const response = await client.get('/profile');
        return response;
    } catch (error) {
        console.log('error occurred', error)
    }
}
const addProfile = async (data) => {
    try {
        const response = await client.post('/addProfile', { data });
        return response
    } catch (error) {
        console.log('error occurred', error)
    }
}
const editProfile = async (data) => {
    try {
        const response = await client.post('/editProfile', { data });
        return response
    } catch (error) {
        console.log('error occurred', error)
    }
}
const partnerSignup = async (data) => {
    const response = await client.post('/Partnersignup', { data })
    return response

}
const carList = async () => {
    const response = await client.get('/carlist')
    return response

}
const carListPost = async (data) => {
    const response = await client.post('/carlistpost', { data })
    return response

}
const forgotPass = async (data) => {
    const response = await client.post('/forgotPass', { data })
    return response

}
const varifyOtp = async (data) => {
    const response = await client.post('/otp', { data })
    return response

}
const newPassword = async (data) => {
    const response = await client.post('/newpassword', { data })
    return response

}
const findHomeSearch = async (data) => {
    const response = await client.post('/findHomeSearch', { data })
    return response

}
const DatesAvailable = async (data) => {
    const response = await client.post('/DatesAvailable', { data })
    return response

}
const findLocalAreaCar = async (data) => {
    const response = await client.post(`/findLocalAreaCar`, { data })
    return response

}
const findDistrictCar = async (id) => {
    const response = await client.post('/findDistrictCar', { id })
    return response

}
const bookingCarDeatils = async (id) => {
    try {
        const response = await client.get(`/bookingCarDeatils?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }
}


const finalbooking = async (data) => {
    try {
        const response = await client.post('/bookings', { data })
        return response

    } catch (error) {
        console.log(error.message)

    }
}

const Bookinghistory = async () => {
    try {
        const response = await client.get('/Bookinghistory')
        return response
    } catch (error) {
        console.log(error.message)
    }
}


const handleCancel = async (id) => {
    try {
        const response = await client.get(`/bookingCancel?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }
}

const CouponList = async () => {
    try {
        const response = await client.get('/CouponList')
        return response
    } catch (error) {
        console.log(error.message)
    }
}

const Applycoupon = async (data) => {
    try {
        const response = await client.post('/applycoupon', { data })
        return response

    } catch (error) {
        console.log(error.message)

    }
}



const googleAuthentication = async (data) => {
    try {
        const response = await client.post('/googleAuthentication', { data })
        return response

    } catch (error) {
        console.log(error.message)

    }
}
const getChat = async (id) => {
    try {
        const response = await client.get(`/getChat?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }
}
const saveChat = async (data) => {
    try {
        const response = await client.post('/saveChat', { data })
        return response

    } catch (error) {
        console.log(error.message)

    }
}

export {
    profileData, partnerSignup, clientLogin, carList, forgotPass, varifyOtp,
    newPassword, findLocalAreaCar, findDistrictCar, addProfile, editProfile, findHomeSearch,
    bookingCarDeatils, finalbooking, Bookinghistory, handleCancel, CouponList, Applycoupon, googleAuthentication, getChat,
    saveChat, DatesAvailable, carListPost

};
