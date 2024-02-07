import { ResetMail } from "@/lib/Email/ResetMail"
import dbConnect from "@/lib/db"
import { refreshToken, verifyToken } from "@/lib/token"
import Company from "@/schema/Company"
import { hash } from "bcrypt"

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function route(req, res) {
  const { method } = req
  try {
    await dbConnect()
    let data
    let { email, password, subject, html } = req.body
    if (method === "POST") {
      data = await Company.findOne({ email: { $regex: new RegExp(email.trim(), 'i') } }).select('email')
      if (!data) {
        return res.status(400).json({ message: 'user not found with this email and password' })
      }
      const { token } = await refreshToken({ payload: { uid: data._id }, expireInMin: 15 })
      const url = req.headers.origin + '/account/reset?token=' + token
      await ResetMail({ email, url, html, subject })

    } else if (method === 'PUT') {
      const { uid } = await verifyToken(req.body.token)
      if (!password) {
        return res.status(200).json({})
      }
      password = await hash(password, 10)
      await Company.findByIdAndUpdate(uid, { password })
      data = { message: 'password reseted successfully' }
    }
    return res.status(200).json({ data })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}