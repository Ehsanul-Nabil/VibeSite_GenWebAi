const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions"
// const openRouterApiKey=process.env.OPENROUTER_API_KEY
// const model="deepseek/deepseek-chat"

// Recommended free & powerful models:
// 1. "google/gemini-2.0-flash-exp:free" (Fast, highly accurate JSON output)
// 2. "meta-llama/llama-3.3-70b-instruct:free" (Strong 70B parameter reasoning)
const model = "google/gemini-2.0-flash-exp:free"

export const generateResponse=async (prompt) => {
  const res = await fetch(openRouterUrl, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: model,
    messages: [
      {
        role: 'system',
        content: "You are a helpful assistant. You must return ONLY valid raw JSON" ,
      },
      {
        role: 'user',
        content: prompt ,
      },
    ],
    temperature:0.2
  }),
});

if(!res.ok){
    const err=await res.text()
    throw new Error("openRouter err "+err )
}

const data = await  res.json()
return data.choices[0].message.content
}