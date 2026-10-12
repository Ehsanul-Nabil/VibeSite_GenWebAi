import { generateResponse } from "../config/openRouter"

import { masterPrompt } from "../service/webisiteBuild.prompt"

export const generateWebsite=async (req,res) => {
    try {
        const {prompt}=req.body
        if(!prompt){
            return res.status(400).json({message:"prompt is required"})
        }
        const user=req.user
        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        const finalPrompt=masterPrompt.replace("USER_PROMPT",prompt)

    } catch (error) {

    }
}