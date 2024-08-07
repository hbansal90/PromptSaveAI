// We will use Read, PATACH AND DELETE
import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt';
// export const dynamic = 'force-dynamic';
export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt)
            return new Response ("Prompt not found", {status: 404})
        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return new Response(" Failed to fetch all prompts", {
            status: 500
        })
    }
}

export const PATCH = async (request, {params}) =>{
    const {prompt, tag} = await request.json()
    try {
        await connectToDB()
        const exisitingPrompt = await Prompt.findById(params.id)
        if(!exisitingPrompt)
            return new Response("Not existing Prompt Found", {status: 404})
        exisitingPrompt.prompt = prompt
        exisitingPrompt.tag = tag
        await exisitingPrompt.save()

        return new Response(JSON.stringify(exisitingPrompt, {status: 200}))

    } catch (error) {
        console.log(error)
        return new Response(" Failed to update all prompts", {
            status: 500
        })
    }

}

export const DELETE = async(request, {params})=>{
    try {
        await connectToDB()
        await Prompt.findByIdAndDelete(params.id)
        return new Response("Deleted Successfully!", {status: 200})
    } catch (error) {
        console.log(error)
        return new Response ("Failed to delete the requested Prompt", {status: 500})
    }
}