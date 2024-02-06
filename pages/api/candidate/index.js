import dbConnect from "@/lib/db"
import User from "@/schema/User"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
    try {

        await dbConnect()
        let data, { id } = req.body
        data = await User.findById(id)
        if(data){
            return res.status(200).json({ data })
        } else {
            throw Error('Something went wrong')
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}