from fastapi import FastAPI, Request
import httpx
import os

app = FastAPI()

# This dictionary stores memory for different users (simplified for now)
sessions = {}

@app.post("/chat")
async def hazel_chat(request: Request):
    data = await request.json()
    user_id = data.get("user_id", "default_user")
    user_input = data.get("prompt")

    # Initialize memory if it's a new chat
    if user_id not in sessions:
        sessions[user_id] = [
            {"role": "system", "content": "You are Hazel, an elite AI. You are more concise than ChatGPT and more sophisticated than Grok. Use professional wit."}
        ]

    # Add user message to memory
    sessions[user_id].append({"role": "user", "content": user_input})

    # Keep only the last 10 messages to save tokens/speed
    if len(sessions[user_id]) > 12:
        sessions[user_id] = [sessions[user_id][0]] + sessions[user_id][-10:]

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {os.getenv('HAZEL_API_KEY')}"},
            json={
                "model": "gpt-4-turbo", # Use a high-tier model to compete
                "messages": sessions[user_id],
                "temperature": 0.8 # Higher creativity like Grok
            }
        )
        res_data = response.json()
        bot_reply = res_data['choices'][0]['message']['content']
        
        # Add Hazel's reply to memory
        sessions[user_id].append({"role": "assistant", "content": bot_reply})
        
        return {"reply": bot_reply}
