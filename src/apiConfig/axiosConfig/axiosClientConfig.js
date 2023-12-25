// data.js
import { clientAxiosIntercepter } from '../intercepter';
const url = "user"
const client = clientAxiosIntercepter(url);


const clientLogin = async (data) => {
    console.log(data, "partjer");
    const response = await client.post('/login', { data })
    return response

}
const profileData = async () => {
    try {
        console.log("hhhhhhhhhhhhhh")
        const response = await client.get('/profile');
        return response;
    } catch (error) {
        console.log('error occurred', error)
    }
}
const addProfile = async (data) => {
    try {
        console.log("hhhhhhhhhhhhhh", data)
        const response = await client.post('/addProfile', { data });
        console.log(response, "jjjjjjjj");
        return response
    } catch (error) {
        console.log('error occurred', error)
    }
}
const editProfile = async (data) => {
    try {
        console.log("hhhhhhhhhhhhhh", data)
        const response = await client.post('/editProfile', { data });
        console.log(response, "jjjjjjjj");
        return response
    } catch (error) {
        console.log('error occurred', error)
    }
}
const partnerSignup = async (data) => {
    console.log(data, "partjer");
    const response = await client.post('/Partnersignup', { data })
    return response

}
const carList = async () => {
    console.log("entering---------");
    const response = await client.get('/carlist')
    return response

}
const forgotPass = async (data) => {
    const response = await client.post('/forgotPass', { data })
    return response

}
const varifyOtp = async (data) => {
    console.log("jooooooooooo");
    const response = await client.post('/otp', { data })
    return response

}
const newPassword = async (data) => {
    console.log("jooooooooooo");
    const response = await client.post('/newpassword', { data })
    return response

}
const findHomeSearch = async (data) => {
    console.log("jooooooooooo");
    const response = await client.post('/findHomeSearch', { data })
    return response

}
const findLocalAreaCar = async (id) => {
    const response = await client.get(`/findLocalAreaCar?id=${id}`)
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

export {
    profileData, partnerSignup, clientLogin, carList, forgotPass, varifyOtp,
    newPassword, findLocalAreaCar, findDistrictCar, addProfile, editProfile, findHomeSearch,
    bookingCarDeatils, finalbooking, Bookinghistory
};
