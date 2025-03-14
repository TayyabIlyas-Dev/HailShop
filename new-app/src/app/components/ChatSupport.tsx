
import { useState } from "react";
import { motion } from "framer-motion";


export default function ChatSupport() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<{ user: string; ai: string }[]>([]);

    const sendMessage = async () => {
        if (!message.trim()) return;
        setLoading(true);


        const res = await fetch("/api/chatSupport", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        // const data = await res.json();
        // setResponse(data.reply);
        const data = await res.json();
        setHistory([...history, { user: message, ai: data.reply }]);
        setMessage("");
        setLoading(false);

    };


    return (
        <>
            {/* <div className="flex items-center fixed bottom-14 right-5 min-h-[60px]    justify-center backdrop-blur-none text-white px-7">
            <div className="sm:w-full w-[230px] max-w-md bg-black/20 p-6 rounded-2xl  shadow-xl">
                <h2 className="text-xl font-bold text-center mb-4">Chat with AI💬 </h2>
                <div className="mb-4 max-h-60 overflow-y-auto border-2 border-black/5 rounded-2xl backdrop-blur-3xl custom-scrollbar2">
                    {history.map((chat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-2 last:mb-0  p-3 rounded-xl  bg-black"
                        >
                            <div className="text-red-600 text-base font-bold">You :

                                <p className="text-white/90 font-semibold text-sm pl-3">{chat.user}</p>
                                <p className="bg-gray-600 h-[1px] my-2">

                                </p>
                            </div>
                            <div className="text-red-600 text-base  font-bold">AI :
                                
                            <p className="text-white/90 text-sm  font-semibold pl-3">{chat.ai}</p>
                                 </div> 
                        </motion.div>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask something..."
                        className="flex-1 p-3 rounded-lg hover:bg-black text-black hover:text-white border-2 border-gray-800 focus:outline-none focus:border-gray-700"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="p-3 bg-black text-white rounded-xl hover:bg-white hover:text-black border-2 border-black/80 transition disabled:opacity-50"
                    >
                        {loading ? "..." : "Send"}
                    </button>
                </div>

                {response && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 p-4 custom-scrollbar2 bg-gray-800 rounded-xl shadow-md hover:shadow-lg h-[120px] overflow-hidden overflow-y-scroll"
                    >

                        {response}
                    </motion.div>
                )}
            </div>
        </div> */}
            <div className="flex items-center fixed bottom-12 right-2 sm:bottom-14 sm:right-5 min-h-[60px] justify-center text-white px-2 sm:px-7">
                <div className="w-full max-w-[240px] sm:max-w-sm backdrop-blur-2xl sm:p-6 p-3 rounded-2xl shadow-xl">
                    <h2 className="text-xl font-bold text-gray-700 text-center mb-4">Chat with HAIL💬</h2>
                    <div className="mb-4  max-h-60 overflow-y-auto border-2 border-black/5 rounded-2xl backdrop-blur-3xl custom-scrollbar2">
                        {history.map((chat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mb-2 last:mb-0 p-3 rounded-xl bg-black"
                            >
                                <div className="text-red-600 text-base font-bold">
                                    You:
                                    <p className="text-white/90 font-semibold text-sm pl-3">{chat.user}</p>
                                    <p className="bg-gray-600 h-[1px] my-2"></p>
                                </div>
                                <div className="text-red-600 text-base font-bold">
                                    HAIL:
                                    <p className="text-white/90 text-sm font-semibold pl-3">{chat.ai}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Input Field */}
                    <div className="flex items-center sm:gap-2 gap-1">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Enter key press support
                            placeholder="Ask something..."
                            className="w-full p-3 rounded-lg hover:bg-black text-black hover:text-white border-2 border-gray-800 focus:outline-none focus:border-gray-700"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className=" p-3 bg-black text-white rounded-xl text-sm hover:text-base hover:bg-white hover:text-black border-2 border-black/80 transition disabled:opacity-50"
                        >
                            {loading ? "..." : "Send"}
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
}
