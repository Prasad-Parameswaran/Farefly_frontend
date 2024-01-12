import React from 'react'
import { GoogleLogout } from 'react-google-login'

const client = '206906884823-mbu9f6qhm15tr239h09epl6ap7g137hb.apps.googleusercontent.com'

function LogOutButton() {
    const onSuccess = (res) => {
        console.log('kkkkkkkkktheeeeeeeeeeeeeeee')
    }
    const onFailure = (res) => {
        console.log('kkkkkkkkktheeeeeeeeeeeeeee44444588962222e')
    }

    return (
        <div className='signOutButton '>
            <GoogleLogout
                clientId={client}
                buttonText='Logout'
                onSuccess={onSuccess}
                onFailure={onFailure}
                className='w-full flex justify-center text-center'
            />
        </div>
    )
}

export default LogOutButton