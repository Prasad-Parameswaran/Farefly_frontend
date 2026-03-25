import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { getChat, saveChat } from '../../../apiConfig/axiosConfig/axiosClientConfig'

const socket = io.connect("https://farefly-backend.onrender.com");

function Chat({ partnerChat, bookingIdUser }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [chatPerson, setChatPerson] = useState([]);
    const [Userdetails, setUserdetails] = useState({});
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        const chatTrigar = async () => {
            socket.on("receiveMessage", async () => {
                const res = await getChat(bookingIdUser);
                if(res?.data?.findChat?.length > 0) {
                    setChatPerson(res.data.findChat[0].chat);
                    setUserdetails(res.data.findChat[0].partnerId);
                }
            });

            // Initial fetch
            const res = await getChat(bookingIdUser);
            if(res?.data?.findChat?.length > 0) {
                setChatPerson(res.data.findChat[0].chat);
                setUserdetails(res.data.findChat[0].partnerId);
            }
        }
        chatTrigar()

        return () => {
            socket.off("receiveMessage");
        };
    }, [bookingIdUser]);

    useEffect(() => {
        scrollToBottom();
    }, [chatPerson]);

    const handleMessage = async (e) => {
        e?.preventDefault();
        if(!currentMessage.trim()) return;
        
        const test = currentMessage;
        setCurrentMessage('');

        const chat = { user: test, partner: '' };
        const data = { chat, partnerId: partnerChat, bookingId: bookingIdUser }

        await saveChat(data).then((response) => {
            socket.emit("sentMessage");
        });
    }

    return (
        <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-700/50 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            
            {/* Chat Header */}
            <div className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="relative">
                        <img className="object-cover w-12 h-12 rounded-full border-2 border-teal-500/50 p-0.5" src={Userdetails?.partnerImage || "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"} alt="Host" />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-gray-800 rounded-full"></span>
                    </div>
                    <div className="ml-4">
                        <h3 className="font-bold text-white tracking-wide">{Userdetails?.name || 'Contacting Host...'}</h3>
                        <p className="text-xs text-teal-400 font-medium">Online</p>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-6 overflow-y-auto bg-gray-900/50 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {chatPerson && chatPerson.length > 0 ? chatPerson.map((val, index) => (
                    val.user === "" ? (
                        // Partner Message (Left)
                        <div key={index} className="flex justify-start">
                            <div className="max-w-[75%] relative group">
                                <div className="bg-gray-800 border border-gray-700 text-gray-200 px-5 py-3 rounded-2xl rounded-tl-none shadow-md">
                                    <p className="text-sm md:text-base leading-relaxed">{val.partner}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // User Message (Right)
                        <div key={index} className="flex justify-end">
                            <div className="max-w-[75%] relative group">
                                <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 text-teal-50 px-5 py-3 rounded-2xl rounded-tr-none shadow-md">
                                    <p className="text-sm md:text-base leading-relaxed">{val.user}</p>
                                </div>
                            </div>
                        </div>
                    )
                )) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                        <svg className="w-16 h-16 mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        <p>No messages yet. Send a message to start.</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="bg-gray-800/80 backdrop-blur-md border-t border-gray-700/50 p-4">
                <form onSubmit={handleMessage} className="flex items-center gap-3">
                    <div className="flex-grow relative">
                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full bg-gray-900 border border-gray-700 rounded-full py-3 pl-6 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={!currentMessage.trim()}
                        className={`p-3 rounded-full flex items-center justify-center transition-all ${currentMessage.trim() ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] transform hover:-translate-y-0.5' : 'bg-gray-800 text-gray-600 border border-gray-700 cursor-not-allowed'}`}
                    >
                        <svg className="w-5 h-5 ml-0.5 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;