import { generateResponse } from "../config/openRouter"

import { masterPrompt } from "../service/webisiteBuild.prompt"

export const generateWebsite=async (req,res) => {
    console.log("0")
    try {
        const {prompt}=req.body
            console.log("1")

        if(!prompt){
            return res.status(400).json({message:"prompt is required"})
        }
        console.log("2")

        // const user=req.user
        const user=await User.findById(req.user._id)
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        console.log("3")

        // console.log("user: ", user)
        if(user.credits<50){
            return res.status(400).json(
            {message:"you have not enough credits to generate a website"}
        )
        }
        console.log("4")



        const finalPrompt=masterPrompt.replace("USER_PROMPT",prompt)
        let raw="";
        // raw = await generateResponse(finalPrompt)
        let parsed=null
        for (let i = 0; i < 2 && !parsed; i++) {
            raw=await generateResponse(finalPrompt)
            parsed=await extractJson(raw)

            if(!parsed){
                raw=await generateResponse(finalPrompt + "\n\nRETURN ONLY RAW JSON.")
                parsed=await extractJson(raw)
            }
            console.log("5")
            // console.log("raw: ",raw)
            // console.log("parsed: ",parsed)
        }
        console.log("6")

        if(!parsed.code){
            console.log("ai returned invalid response",raw)
            return res.status(400).json({message:"ai returned invalid response"})
        }
        console.log("7")

        const website=await Website.create({
            user:user._id,
            title:prompt.slice(0,60),
            latestCode:parsed.code,
            conversation:[
                {
                    role:"ai",
                    content:parsed.message
                },
                {
                    role:"user",
                    content:prompt
                }
            ]
        })

        console.log("8")

        user.credits=user.credits-50;
        await user.save()
        console.log("9 -> Successfully Execute")
        return res.status(201).json({
            websiteId:website._id,
            remainingCredits:user.credits
        })

    } catch (error) {
        return res.status(500).json({message:`generate website error ${error}`})

    }
}
