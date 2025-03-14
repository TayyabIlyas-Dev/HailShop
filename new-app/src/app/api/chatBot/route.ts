import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import axios from 'axios';
import * as cheerio from 'cheerio';

export const maxDuration = 30;

// 🛠️ Yeh function website ka data scrape karega
async function scrapeWebsite(url: string) {
  try {
    const { data } = await axios.get(url); // Website ka HTML fetch karega
    const $ = cheerio.load(data); // HTML ko cheerio se parse karenge
    return $('body').text().trim().slice(0, 2000); // Sirf pehle 2000 characters ka text lenge
  } catch (error) {
    return null; // Agar kuch na mile to null return hoga
  }
}

// 🛠️ AI API Route jo frontend se request lega
export async function POST(req: Request) {
  const { messages } = await req.json();
  const userMessage = messages[messages.length - 1]?.content;

  // 🔍 Pehle website ka data fetch karein
  const siteData = await scrapeWebsite('https://shop.vercel.app');

  // 🛠️ AI ko context dena
  let context = siteData
    ? `Yeh website ka content hai:\n${siteData}\nUser ka sawal: ${userMessage}`
    : `User ka sawal: ${userMessage}`;

  // 🤖 AI se jawab lena
  const result = streamText({
    model: openai('gpt-4o'), // OpenAI model
    messages: [
      { role: 'system', content: 'Tum ek website assistant ho jo shop.vercel.app ka expert hai.' },
      { role: 'user', content: context }
    ],
  });

  return result.toDataStreamResponse();
}


