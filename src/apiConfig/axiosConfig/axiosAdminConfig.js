// data.js
import { adminAxiosIntercepter } from '../intercepter';
const url = "admin"
const admin = adminAxiosIntercepter(url);


const adminLogin = async (data) => {

    try {
        console.log(admin, "jjjjjjjjjjjjjjjjjjj");
        const response = await admin.post('/adminLogin', { data })
        return response
    } catch (error) {
        console.log(error.message);
    }

}


const userList = async () => {
    console.log("ivide ethi...");
    try {
        const response = await admin.get('/userList')
        return response
    } catch (error) {
        console.log(error.message);
    }

}

const partnerList = async () => {
    try {
        const response = await admin.get('/partnerList')
        return response
    } catch (error) {
        console.log(error.message)
    }

}
const userStatus = async (id) => {
    try {
        console.log(id, "id is there..");
        const response = await admin.get(`/userStatus?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }

}
const partnerStatus = async (id) => {
    try {
        console.log(id, "id is there..");
        const response = await admin.get(`/partnerStatus?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }

}
const partnerAuthAccept = async (id) => {
    try {
        console.log(id, "id is there..");
        const response = await admin.get(`/PartnerVarifyAccept?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }

}
const partnerAuthCancel = async (id) => {
    try {
        console.log(id, "id is there..hoiiiiiiiiiii");
        const response = await admin.get(`/PartnerVarifyCancel?id=${id}`)
        console.log(response, 'jjjjjjjjkalakki .....');
        return response
    } catch (error) {
        console.log(error.message)
    }

}
const partnerView = async (id) => {
    try {
        const response = await admin.get(`/partnerView?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }

}
const carDatas = async () => {
    try {
        const response = await admin.get(`/carDatas`)
        return response
    } catch (error) {
        console.log(error.message)
    }

}

const carDetails = async (id) => {
    try {
        const response = await admin.get(`/carDetails?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }
}


const ListOrUnlist = async (id) => {
    try {
        const response = await admin.get(`/ListOrUnlist?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message)
    }

}
export {
    userList,
    partnerList,
    userStatus,
    partnerStatus,
    adminLogin,
    partnerAuthAccept,
    partnerAuthCancel,
    partnerView,
    carDatas,
    carDetails,
    ListOrUnlist
};