const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions"
// const openRouterApiKey=process.env.OPENROUTER_API_KEY
const model="deepseek/deepseek-chat"
// Options for free, powerful OpenRouter models:
// 2. "openrouter/free" (Automatically routes to the best available free model)
// const model ="openrouter/free";
// const model="cohere/north-mini-code:free"

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
    temperature:0.2,
    max_tokens: 4000 // Prevents truncated JSON output
  }),
});

if(!res.ok){
    const err=await res.text()
    throw new Error("openRouter err "+err )
}

const data = await  res.json()
return data.choices[0].message.content
}



// cohere/north-mini-code:free (Optimized for coding & structured outputs)

// poolside/laguna-s-2.1:free (High-capacity agentic coding model)

// nvidia/nemotron-3.5-lightning:free (Fast, low-latency reasoning)

// google/gemma-4-31b-it:free (Instruction-tuned model)