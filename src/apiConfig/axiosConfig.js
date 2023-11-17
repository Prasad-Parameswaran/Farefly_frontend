// data.js
import { clientAxiosIntercepter } from './intercepter';
const url = "user"
const client = clientAxiosIntercepter(url);

const profileData = async () => {
    try {
        console.log("hhhhhhhhhhhhhh");
        const response = await client.get('/profile');
        return response;

    } catch (error) {
        console.log('error occurred', error);
    }
}
const partnerSignup = async (data) => {
    console.log(data, "partjer");
    const response = await client.post('/addpartner', { data })
    return response

}

export { profileData, partnerSignup };
