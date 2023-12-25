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
        console.log("hhhhhhhhhhhhhh")
        const response = await partner.get('/profileDetails');
        return response;
    } catch (error) {
        console.log('error occurred', error)
    }
}
const editPartnerProfile = async (data) => {
    try {
        console.log("hhhhhhhhhhhhhh", data)
        const response = await partner.post('/editPartnerProfile', { data });
        console.log(response, "jjjjjjjj");
        return response
    } catch (error) {
        console.log('error occurred', error)
    }
}


export {
    partnerLogin,
    addCarImg,
    partnerCars,
    partnerCarDetail,
    profileDetails,
    editPartnerProfile,
    editCar,
    editPartnerCar
};