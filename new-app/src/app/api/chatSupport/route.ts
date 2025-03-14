
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  // API key `.env.local` se access karo
  const apiKey = process.env.GOOGLE_AI_SECRET_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not found" }, { status: 500 });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    }
  );

  const data = await response.json();
  return NextResponse.json({
    reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
  });
}



// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { message } = await req.json();

//   // API key `.env.local` se access karo
//   const apiKey = process.env.GOOGLE_AI_SECRET_API_KEY;
//   if (!apiKey) {
//     return NextResponse.json({ error: "API key not found" }, { status: 500 });
//   }

//   // Check if user asked for a joke
//   const isJokeRequested = /joke|funny|laugh/i.test(message);

//   if (!isJokeRequested) {
//     return NextResponse.json({ reply: "I can't assist you" });
//   }

//   const pageContent = "Tell only jokes. If asked anything else, say 'I can't assist you'.";

//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               { text: pageContent }, // Context
//               { text: message }, // User ka input
//             ],
//           },
//         ],
//       }),
//     }
//   );

//   const data = await response.json();
//   return NextResponse.json({
//     reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
//   });
// }
