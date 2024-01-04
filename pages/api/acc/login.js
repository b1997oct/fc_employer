import dbConnect from "@/lib/db"
import { createToken } from "@/lib/token"
import Company from "@/schema/Company"
import Employer from "@/schema/Company/Employer"
import { compare } from "bcrypt"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
  try {
    await dbConnect()
    let data
    const { email, password } = req.body
    data = await Company.findOne({ email: { $regex: new RegExp(email.trim(), 'i') } })
    const match = await compare(password, data.password)
    if (!data || !match) {
      return res.status(404).json({ message: 'user not found with this email and password' })
    }
    const { cookie } = await createToken({ name: '_tok', payload: { uid: data._id.toString() }, expireInDays: 30 })
    res.setHeader('Set-Cookie', cookie)
    return res.status(200).json({ message: 'verified successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}