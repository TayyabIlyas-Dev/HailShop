
// import { useState } from "react";
// import { motion } from "framer-motion";


// export default function ChatSupport() {
//     const [message, setMessage] = useState("");
//     const [response, setResponse] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [history, setHistory] = useState<{ user: string; ai: string }[]>([]);

//     const sendMessage = async () => {
//         if (!message.trim()) return;
//         setLoading(true);


//         const res = await fetch("/api/chatSupport", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ message }),
//         });

//         // const data = await res.json();
//         // setResponse(data.reply);
//         const data = await res.json();
//         setHistory([...history, { user: message, ai: data.reply }]);
//         setMessage("");
//         setLoading(false);

//     };


//     return (
//         <>

//             <div className="flex items-center fixed bottom-12 right-2 sm:bottom-14 sm:right-5 min-h-[60px] justify-center text-white px-2 sm:px-7">
//                 <div className="w-full max-w-[240px] sm:max-w-sm backdrop-blur-2xl sm:p-6 p-3 rounded-2xl shadow-xl">
//                     <h2 className="text-xl font-bold text-gray-700 text-center mb-4">Chat with HAIL💬</h2>
//                     <div className="mb-4  max-h-60 overflow-y-auto border-2 border-black/5 rounded-2xl backdrop-blur-3xl custom-scrollbar2">
//                         {history.map((chat, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="mb-2 last:mb-0 p-3 rounded-xl bg-black"
//                             >
//                                 <div className="text-red-600 text-base font-bold">
//                                     You:
//                                     <p className="text-white/90 font-semibold text-sm pl-3">{chat.user}</p>
//                                     <p className="bg-gray-600 h-[1px] my-2"></p>
//                                 </div>
//                                 <div className="text-red-600 text-base font-bold">
//                                     HAIL:
//                                     <p className="text-white/90 text-sm font-semibold pl-3">{chat.ai}</p>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Input Field */}
//                     <div className="flex items-center sm:gap-2 gap-1">
//                         <input
//                             type="text"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Enter key press support
//                             placeholder="Ask something..."
//                             className="w-full p-3 rounded-lg hover:bg-black text-black hover:text-white border-2 border-gray-800 focus:outline-none focus:border-gray-700"
//                         />

//                         <button
//                             onClick={sendMessage}
//                             disabled={loading}
//                             className=" p-3 bg-black text-white rounded-xl text-sm hover:text-base hover:bg-white hover:text-black border-2 border-black/80 transition disabled:opacity-50"
//                         >
//                             {loading ? "..." : "Send"}
//                         </button>
//                     </div>
//                 </div>
//             </div>


//         </>
//     );
// }




'use client'
import React, { useEffect } from 'react'

const ChatSupport = () => {
  useEffect(() => {
    // Ensure the script logic is added on the client side
    (function (
      w: Window & { chatbotConfig?: [string, string, { apiHost: string }] },
      d,
      s,
      ...args
    ) {
      const div = d.createElement('div');
      div.id = 'aichatbot';
      d.body.appendChild(div);

      w.chatbotConfig = args as [string, string, { apiHost: string }]
      // locate first script tag
      const f = d.getElementsByTagName(s)[0];
      const j = d.createElement(s) as HTMLScriptElement;
      j.defer = true;
      j.type ='module'
      j.src = 'https://aichatbot.sendbird.com/index.js'
      f.parentNode?.insertBefore(j, f);

    })(
      window,
      document,
      'script',
      '31348C2D-338E-446B-A7D5-3906BA2F95A0',
      "Jv3xN5DasrxBmXVLTtUOp",
      {
        apiHost:'https://api-31348C2D-338E-446B-A7D5-3906BA2F95A0.sendbird.com',
      }
    );


    return () => {
      const div = document.getElementById("aichatbot");
      if (div) {
        document.body.removeChild(div);
      }
    };
  }, []);

  return (
    <div>
      Chaticon
    </div>
  )
}

export default ChatSupport
// 1st
// https://hooks.zapier.com/hooks/catch/22076242/2lzrpxp/

// 2nd
// https://hooks.zapier.com/hooks/catch/22076242/2lzr9fl/