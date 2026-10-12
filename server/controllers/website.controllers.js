import { generateResponse } from "../config/openRouter.js"
import { masterPrompt } from "../service/webisiteBuild.prompt.js"
import User from "../models/user.model.js";
import Website from "../models/website.model.js";
import extractJson from "../utils/extractJson.js";
import crypto from "crypto";


export const generateWebsite=async (req,res) => {
    console.log("0")
    try {
        const {prompt}=req.body
            console.log("1 - Request Payload Checked");

        if(!prompt){
            return res.status(400).json({message:"prompt is required"})
        }
    console.log("2 - Valid Prompt Received");

        // const user=req.user
        const user=await User.findById(req.user._id)
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        console.log("3 - User Found");

        // console.log("user: ", user)
        if(user.credits<50){
            return res.status(400).json(
            {message:"you have not enough credits to generate a website"}
        )
        }
        console.log("4 - Credits Validated");



        const finalPrompt=masterPrompt.replace("USER_PROMPT",prompt)
        let raw="";
        // raw = await generateResponse(finalPrompt)
        let parsed=null


        // for (let i = 0; i < 2 && !parsed; i++) {
        //     raw=await generateResponse(finalPrompt)
        //     parsed=await extractJson(raw)

        //     if(!parsed){
        //         raw=await generateResponse(finalPrompt + "\n\nRETURN ONLY RAW JSON.")
        //         parsed=await extractJson(raw)
        //     }
        //     console.log(`5 - Retry Attempt ${i + 1}`);
        //     // console.log("raw: ",raw)
        //     // console.log("parsed: ",parsed)
        // }

        for (let i = 0; i < 2 && !parsed; i++) {
            try {
                raw = await generateResponse(finalPrompt);
                parsed = await extractJson(raw);

                if (!parsed) {
                raw = await generateResponse(finalPrompt + "\n\nRETURN ONLY RAW JSON.");
                parsed = await extractJson(raw);
                }
            } catch (error) {
                console.error(`AI Generation Attempt ${i + 1} Error:`, error);
            }

            console.log(`5 - Retry Attempt ${i + 1}`);
            // console.log("raw: ",raw)
            // console.log("parsed: ",parsed)
            }


        console.log("6 - AI Response Received");

        if(!parsed.code){
            console.log("ai returned invalid response",raw)
            return res.status(400).json({message:"ai returned invalid response"})
        }
        console.log("7 - Code Output Validated");

        // const website=await Website.create({
        //     user:user._id,
        //     title:prompt.slice(0,60),
        //     latestCode:parsed.code,
        //     conversation:[
        //         {
        //             role:"ai",
        //             content:parsed.message
        //         },
        //         {
        //             role:"user",
        //             content:prompt
        //         }
        //     ]
        // })

        let website;
        try {
        const baseSlug = prompt.slice(0, 30).toLowerCase().replace(/[^a-z0-9]/g, "-");
        const uniqueSlug = `${baseSlug}-${crypto.randomBytes(4).toString("hex")}`;
            website = await Website.create({
                user: user._id,
                title: prompt.slice(0, 60),
                slug: uniqueSlug, // FIXED: Provide a unique slug
                latestCode: parsed.code,
                conversation: [
                    {
                        role: "user",
                        content: prompt
                    },
                    {
                        role: "ai",
                        content: parsed.message
                    }
                ]
            });
        } catch (dbError) {
            console.error("Error creating website document in DB:", dbError);
            return res.status(500).json({ 
                message: `Database error: ${dbError.message}` 
            });
        }

        console.log("8 - Website Document Created");

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


export const getWebsiteById=async (req,res) => {
    // console.log("indside the getWebsiteById()")
    console.log(masterPrompt)
    try {
        const website=await Website.findOne({
            _id:req.params.id,
            user:req.user._id
        })

        if(!website){
            return res.status(400).json({message:"website not found"})
        }
        return res.status(200).json(website)
    } catch (error) {
        return res.status(500).json({message:`get website by id error ${error}`})
    }
}

export const changes = async (req, res) => {
    try {
        const { prompt } = req.body
        if (!prompt) {
            return res.status(400).json({ message: "prompt is required" })
        }

        const website = await Website.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if (!website) {
            return res.status(400).json({ message: "website not found" })
        }

        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        if (user.credits < 25) {
            return res.status(400).json({ message: "you have not enough credits to generate a webiste" })
        }

        const updatePrompt = `
                UPDATE THIS HTML WEBSITE.

                CURRENT CODE:
                ${website.latestCode}

                USER REQUEST:
                ${prompt}

                RETURN RAW JSON ONLY:
                {
                "message": "Short confirmation",
                "code": "<UPDATED FULL HTML>"
                }`

        let raw = ""
        let parsed = null
        for (let i = 0; i < 2 && !parsed; i++) {
            raw = await generateResponse(updatePrompt)
            parsed = await extractJson(raw)

            if (!parsed) {
                raw = await generateResponse(updatePrompt + "\n\nRETURN ONLY RAW JSON.")
                parsed = await extractJson(raw)
            }
        }

        if (!parsed?.code) {
            console.log("ai returned invalid response", raw)
            return res.status(400).json({ message: "ai returned invalid response" })
        }

        website.conversation.push(
            { role: "ai", content: parsed.message },
            { role: "user", content: prompt }
        )

        website.latestCode = parsed.code

        await website.save()
        user.credits = user.credits - 25
        await user.save()

        return res.status(200).json({
            message: parsed.message,
            code: parsed.code,
            remainingCredits: user.credits
        })

    } catch (error) {
        return res.status(500).json({ message: `update website error ${error}` })
    }
}


export const getAll = async (req, res) => {
    try {
        const websites = await Website.find({ user: req.user._id })
        return res.status(200).json(websites)
    } catch (error) {
        return res.status(500).json({ message: `update website error ${error}` })
    }
}


// export const generatedemo=async (req,res) => {
//     try {
//         const result= await generateResponse("hello")
//         return res.status(200).json(result)
//     } catch (error) {
//         return res.status(500).json({message:error})
//     }
// }