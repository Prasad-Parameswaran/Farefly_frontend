
import './App.css'
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import { getChat, saveChat } from '../../../apiConfig/axiosConfig/axiosClientConfig'

//const socket = io.connect("http://localhost:4000");
//const socket = io.connect("https://farflybackend.onrender.com");
const socket = io.connect("https://farefly.de-vip.online");


function Chat({ partnerChat, bookingIdUser }) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [chatPerson, setChatPerson] = useState([]);
    const [Userdetails, setUserdetails] = useState({});



    useEffect(() => {
        const chatTrigar = async () => {
            //const socket = io.connect("https://farflybackend.onrender.com");

            socket.on("receiveMessage", async () => {
                await getChat(bookingIdUser).then((res) => {
                    setChatPerson(res.data.findChat[0].chat);
                    setUserdetails(res.data.findChat[0].partnerId);
                });
            });

            //await getChat(bookingIdUser).then((res) => {
            //    setUserdetails(res.data.findChat[0].partnerId);
            //    setChatPerson(res.data.findChat[0].chat);
            //});
        }
        chatTrigar()

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const handleMessage = async () => {
        const test = currentMessage ? currentMessage : '';
        document.getElementById('currentMessage').value = ''

        const chat = {
            user: test,
            partner: '',
        };

        const data = {
            chat: chat,
            partnerId: partnerChat,
            bookingId: bookingIdUser
        }

        await saveChat(data).then((response) => {
            socket.emit("sentMessage");
            const items = response?.data?.orderItems;
        });
    }

    //return (
    //    <div className="container mx-auto">
    //        <div className="min-w-full border rounded lg:grid ">
    //            {/*<div className="border-r border-gray-300 lg:col-span-1">
    //                <div className="mx-3 my-3">
    //                    <div className="relative text-gray-600">
    //                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
    //                            <svg
    //                                fill="none"
    //                                stroke="currentColor"
    //                                stroke-linecap="round"
    //                                stroke-linejoin="round"
    //                                stroke-width="2"
    //                                viewBox="0 0 24 24"
    //                                className="w-6 h-6 text-gray-300"
    //                            >
    //                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    //                            </svg>
    //                        </span>
    //                        <input
    //                            type="search"
    //                            className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
    //                            name="search"
    //                            placeholder="Search"
    //                            required
    //                        />
    //                    </div>
    //                </div>
    //                <ul className="overflow-auto h-[32rem]">
    //                    <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
    //                    <li>
    //                        <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
    //                            <img
    //                                className="object-cover w-10 h-10 rounded-full"
    //                                src={Userdetails?.partnerImage || "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"}
    //                                alt="username"
    //                            />
    //                            <div className="w-full pb-2">
    //                                <div className="flex justify-between">
    //                                    <span className="block ml-2 font-semibold text-gray-600">
    //                                        {Userdetails.name}
    //                                    </span>
    //                                    <span className="block ml-2 text-sm text-gray-600">
    //                                        25 minutes
    //                                    </span>
    //                                </div>
    //                                <span className="block ml-2 text-sm text-gray-600"></span>
    //                            </div>
    //                        </a>
    //                    </li>
    //                </ul>
    //            </div>*/}
    //            <div className="hidden lg:col-span-2 lg:block">
    //                <div className="w-full">
    //                    <div className="relative bg-gray-100 flex items-center p-3 border-b border-gray-300">
    //                        <img
    //                            className="object-cover w-10 h-10 rounded-full"
    //                            src={Userdetails?.partnerImage || "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"}
    //                            alt="username"
    //                        />
    //                        <span className="block ml-2 font-bold text-gray-600">
    //                            {Userdetails.name}
    //                        </span>
    //                        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
    //                    </div>
    //                    <div className="relative w-full p-6 overflow-y-auto h-[29rem]">
    //                        <ul className="space-y-2">
    //                            {chatPerson.map((val, index) => (
    //                                <>
    //                                    {val.user == "" ? (

    //                                        <li key={index} className="flex justify-start">
    //                                            <div className="relative bg-blue-200 max-w-xl px-4 py-2 text-gray-700 rounded shadow">
    //                                                <span className="block">{val.partner}</span>
    //                                            </div>
    //                                        </li>
    //                                    ) : (
    //                                        <li key={index} className="flex justify-end">
    //                                            <div className="relative bg-red-200 max-w-xl px-4 py-2 text-gray-700 rounded shadow">
    //                                                <span className="block">{val.user}</span>
    //                                            </div>
    //                                        </li>
    //                                    )}
    //                                </>
    //                            ))}
    //                        </ul>
    //                    </div>
    //                    <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
    //                        <button className=" border-none">
    //                            <svg
    //                                xmlns="http://www.w3.org/2000/svg"
    //                                className="w-6 h-6 text-gray-500"
    //                                fill="none"
    //                                viewBox="0 0 24 24"
    //                                stroke="currentColor"
    //                            >
    //                                <path
    //                                    stroke-linecap="round"
    //                                    stroke-linejoin="round"
    //                                    stroke-width="2"
    //                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //                                />
    //                            </svg>
    //                        </button>
    //                        <button className="border-none">
    //                            <svg
    //                                xmlns="http://www.w3.org/2000/svg"
    //                                className="w-5 h-5 text-gray-500"
    //                                fill="none"
    //                                viewBox="0 0 24 24"
    //                                stroke="currentColor"
    //                            >
    //                                <path
    //                                    stroke-linecap="round"
    //                                    stroke-linejoin="round"
    //                                    stroke-width="2"
    //                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    //                                />
    //                            </svg>
    //                        </button>
    //                        <input
    //                            type="text"
    //                            placeholder="Enter Message"
    //                            id='currentMessage'
    //                            onChange={(e) => { setCurrentMessage(e.target.value) }}
    //                            className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
    //                            name="message"
    //                            required
    //                        />
    //                        <button className=" border-none"
    //                            onClick={handleMessage} type="submit">
    //                            <svg
    //                                className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
    //                                xmlns="http://www.w3.org/2000/svg"
    //                                viewBox="0 0 20 20"
    //                                fill="currentColor"
    //                            >
    //                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    //                            </svg>
    //                        </button>
    //                    </div>
    //                </div>
    //            </div>
    //        </div>
    //    </div>
    //);
    //}

    return (
        <div class=" flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div class="relative flex items-center space-x-4">
                    <div class="relative">
                        <span class="absolute text-green-500 right-0 bottom-0">
                            <svg width="20" height="20">
                                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                            </svg>
                        </span>
                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
                    </div>
                    <div class="flex flex-col leading-tight">
                        <div class="text-2xl mt-1 flex items-center">
                            <span class="text-gray-700 mr-3">Anderson Vanhron</span>
                        </div>
                        <span class="text-lg text-gray-600">Junior Developer</span>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                    <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                    <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                        <svg fill="#000000" viewBox="0 0 24 24" id="left-arrow-circle" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="secondary" d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Zm0,11.14a1,1,0,0,1-1.5.69L7.38,12.69a.82.82,0,0,1,0-1.38L10.5,9.17a1,1,0,0,1,1.5.69Z" style="fill: #2ca9bc; stroke-width: 2;"></path><path id="primary" d="M17,12H12m-4.63.69,3.13,2.14a1,1,0,0,0,1.5-.69V9.86a1,1,0,0,0-1.5-.69L7.38,11.31A.82.82,0,0,0,7.37,12.69ZM12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Z" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></g></svg>
                    </button>
                </div>
            </div>


            <div id="messages" class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                {chatPerson.map((val, index) => (
                    <>
                        {val.user == "" ? (
                            <div class="chat-message">
                                <div class="flex items-end">
                                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Can be verified on any platform using docker</span></div>
                                    </div>
                                    <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1" />
                                </div>
                            </div>
                        ) : (
                            <div class="chat-message">
                                <div class="flex items-end justify-end">
                                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Your error message says permission denied, npm global installs must be given root privileges.</span></div>
                                    </div>
                                    <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-2" />
                                </div>
                            </div>
                        )}
                    </>
                ))}
                <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div class="relative flex">
                        <span class="absolute inset-y-0 flex items-center">
                            <button type="button" class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                </svg>
                            </button>
                        </span>
                        <input type="text" onChange={(e) => { setCurrentMessage(e.target.value) }} placeholder="Write your message!" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" />
                        <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                </svg>
                            </button>

                            <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </button>
                            <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </button>
                            <button onClick={handleMessage} type="submit" class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                                <span class="font-bold">Send</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

{/*<style>
                .scrollbar-w-2::-webkit-scrollbar {
                    width:'0.25rem';
                height: 0.25rem;
}

                .scrollbar-track-blue-lighter::-webkit-scrollbar-track {
                    --bg - opacity: 1;
                background-color: #f7fafc;
                background-color: rgba(247, 250, 252, var(--bg-opacity));
}

                .scrollbar-thumb-blue::-webkit-scrollbar-thumb {
                    --bg - opacity: 1;
                background-color: #edf2f7;
                background-color: rgba(237, 242, 247, var(--bg-opacity));
}

                .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
                    border - radius: 0.25rem;
}
            </style>

            <script>
                const el = document.getElementById('messages')
                el.scrollTop = el.scrollHeight
            </script>
            )*/}










export default Chat;