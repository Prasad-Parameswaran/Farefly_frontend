import { partnerAxiosIntercepter } from '../intercepter'
const url = "partner"
const partner = partnerAxiosIntercepter(url);

const partnerLogin = async (data) => {
    const response = await partner.post('/partnerLogin', { data })
    return response
}
const addCarImg = async (data) => {
    const response = await partner.post('/addCarImg', { data })
    return response
}
const editCar = async (data) => {
    const response = await partner.post('/editCar', { data })
    return response
}

const partnerCars = async () => {
    try {
        const response = await partner.get(`/partnerCars`)
        return response
    } catch (error) {
        console.log(error.message)
    }
}
const partnerCarDetail = async (id) => {
    try {
        const response = await partner.get(`/partnerCarDetail?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }
}
const editPartnerCar = async (id) => {
    try {
        const response = await partner.get(`/editPartnerCar?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }
}
const profileDetails = async () => {
    try {
        const response = await partner.get('/profileDetails');
        return response;
    } catch (error) {
        console.log('error occurred', error)
    }
}
const editPartnerProfile = async (data) => {
    try {
        const response = await partner.post('/editPartnerProfile', { data });
        return response
    } catch (error) {
        console.log('error occurred', error)
    }
}

const bookings = async () => {
    try {
        const response = await partner.get('/bookingList');
        return response;
    } catch (error) {
        console.log('error occurred', error)
    }
}

const statusHandle = async (data) => {
    try {
        const response = await partner.post('/statusHandle', { data });
        return response
    } catch (error) {
        console.log('error occurred', error)
    }
}

const PartnerCancelBooking = async (id) => {
    try {
        const response = await partner.get(`/PartnerCancelBooking?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }
}

const getChat = async (id) => {
    try {
        const response = await partner.get(`/getChat?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }
}
const saveChat = async (data) => {
    try {
        const response = await partner.post('/saveChat', { data })
        return response

    } catch (error) {
        console.log(error.message)

    }
}
const Chartbooking = async () => {
    try {
        const response = await partner.get('/chartbooking');
        return response

    } catch (error) {
        console.log(error.message, "error form front");
    }
};
export {
    partnerLogin,
    addCarImg,
    partnerCars,
    partnerCarDetail,
    profileDetails,
    editPartnerProfile,
    editCar,
    editPartnerCar,
    bookings,
    statusHandle,
    PartnerCancelBooking,
    getChat,
    saveChat,
    Chartbooking

};