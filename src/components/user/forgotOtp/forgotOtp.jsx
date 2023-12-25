import React, { useEffect, useState } from "react";
import OtpInput from "react18-input-otp";

export default function App() {
    const [code, setCode] = useState("");
    const [arrayVal, setArrayVal] = useState(false)

    const handleChange = (otp) => setCode(otp);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(code);
    }
    useEffect(() => {
        setArrayVal(true)
    }, [arrayVal])
    return (
        <div className="flex items-center   h-screen">
            <form onSubmit={(e) => {
                handleSubmit(e)
            }} className={`w-[30%] h-[45%] bg-white text-white rounded-3xl flex flex-col ${arrayVal ? 'transform translate-x-full transition duration-1000' : null}  `}>
                < div className="flex-grow flex items-center justify-center bg-lime-500 bg-opacity-25  border pl-10 border-lime-500 rounded-3xl">
                    <div className="w-full text-center">
                        <h1 className="m-8 text-blue-950 font-bold">ENTER YOUR OTP</h1>
                        <OtpInput
                            value={code}
                            onChange={handleChange}
                            numInputs={6}
                            separator={<span style={{ width: "8px" }}></span>}
                            isInputNum={true}
                            shouldAutoFocus={true}
                            inputStyle={{
                                border: "1px solid transparent",
                                borderRadius: "8px",
                                width: "54px",
                                height: "54px",
                                fontSize: "12px",
                                color: "#000",
                                fontWeight: "400",
                                caretColor: "blue"
                            }}
                            inputContainerStyle={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        />



                    </div>
                </div>

                <div className="flex items-center justify-center h-[30%] bg-white rounded-3xl">
                    <button type="submit" class="text-gray-900 bg-gradient-to-r from-lime-100 via-lime-300 to-lime-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Verify Otp
                    </button>
                </div>
            </form >
        </div >
    );
}
