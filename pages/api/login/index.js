import dbConnect from "@/lib/db"
import { createToken } from "@/lib/token"
import Company from "@/schema/Company"
import Employer from "@/schema/Company/Employer"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
  try {
    await dbConnect()
    let data
    const { uid, password } = req.body
    data = await Company.findOne({ uid, password })
    if (!data) {
      return res.status(404).json({ message: 'user not found with this uid and password' })
    } else if (data.status) {
      return res.status(400).message({ message: `your account is ${data.status} please contact helpline` })
    }
    const { cookie } = await createToken({ name: '_tok', payload: { uid: data._id.toString() }, expireInDays: 30 })
    res.setHeader('Set-Cookie', cookie)
    return res.status(200).json({ message: 'verified successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}