import Cloud from "@/lib/Cloud";
import dbConnect from "@/lib/db"
import formidable from "formidable";
const FOLDER = `${process.env.FOLDER}`

export const config = {
    api: {
        bodyParser: false,
    }
};


/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
    
    try {
        await dbConnect()
        let data
        const { uid } = req.headers
        if (!uid) {
            throw Error('Not a valid user')
        }
        const form = formidable({ maxFileSize: 4 * 1024 * 1024 });
        const [fields, files] = await form.parse(req)
        const id = Array.isArray(fields.id) ? fields.id[0] : fields.id
        const img = files.image[0]

        if (img) {
            if (!img.mimetype.startsWith('image')) {
                return res.status(400).json({ message: "please upload only image files" })
            }
            let { secure_url } = await Cloud.upload(img.filepath, { folder: FOLDER })
            data = { id: secure_url }
        }

        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}