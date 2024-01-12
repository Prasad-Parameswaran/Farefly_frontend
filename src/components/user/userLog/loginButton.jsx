import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { googleAuthentication } from '../../../apiConfig/axiosConfig/axiosClientConfig'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { UserLG } from '../../../redux/slices/userSlice';



const client = '206906884823-mbu9f6qhm15tr239h09epl6ap7g137hb.apps.googleusercontent.com'

function LogInButton() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSuccess = async (res) => {
        if (res) {
            console.log(res)
            const response = await googleAuthentication(res.profileObj)
            if (response.data.success) {
                localStorage.setItem('Token', response.data.partnerToken);
                dispatch(UserLG(response.data.partnerToken))
                toast.success(`${response.data.message}`)
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        }
    }
    const onFailure = (res) => {
        console.log('login failed..!')
        toast.error('login failed..!')

    }
    return (
        <div className='signInButton '>
            <GoogleLogin
                clientId={client}
                buttonText='Login With Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                //cookiePolicy={'single_host_orgin'}
                isSignedIn={false}
                className='w-full flex justify-center text-center'

            />
        </div >
    )
}

export default LogInButton