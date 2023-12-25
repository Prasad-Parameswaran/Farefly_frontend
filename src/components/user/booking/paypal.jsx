//import React, { useEffect, useRef } from 'react'

//function Paypal() {
//    const paypal = useRef()
//    useEffect(() => {
//        window.paypal.Buttons({
//            createOrder: (data, actios, err) => {
//                return actios.order.create({
//                    intent: 'CAPTURE',
//                    purchase_units: [
//                        {
//                            description: 'Cool looking table',
//                            amount: {
//                                currency_code: 'CAD',
//                                value: 650.00
//                            }

//                        }
//                    ]
//                })
//            },
//            onApprove: async (data, actions) => {
//                const order = await actions.order.capture();
//                console.log(order)
//            },
//            onError: (err) => {
//                console.log(err)
//            }
//        }).render(paypal.current)
//        console.log('llllllllllllllllllllllllhhooooooooooolooooooooooooolooooooooooooloooooooooooo')
//    }, [])


//    return (
//        <div ref={paypal} ></ div>
//    )
//}

//export default Paypal