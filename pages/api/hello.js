import dbConnect from "@/lib/db"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
  try {
    await dbConnect()
    let data
    return res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}