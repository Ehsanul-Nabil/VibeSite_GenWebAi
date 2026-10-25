import mongoose from "mongoose";
import dns from "node:dns";

// Force Node.js to use public DNS servers (Google & Cloudflare)
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function connectToDatabase(){
    mongoose.connection.on('connected', ()=>{
        console.log("Successfully connected to MongoDB.")
    })
    await mongoose.connect(process.env.MONGODB_URI)
}
