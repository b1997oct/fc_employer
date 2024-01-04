
import { POST } from "@upgradableweb/client"
import { refreshToken } from "../token"
const MAIL = 'info@firstcareer.co'
const PASS = 'Aug@2023FCI'
const HOST = 'smtpout.secureserver.net'

export async function ResetMail({ url, email }) {

    const auth = await refreshToken({ expire: 1, payload: { host: HOST, email: MAIL, password: PASS } })

    const res = await POST('https://cc.upgradableweb.com/email_api', {
        to: email,
        from: 'no-reply@firstcareer.co',
        subject: 'Reset Your Password',
        html: `<p>Dear Employer</p>
        <br>
        <p>Forgot your password?</p>
        <p>We received a request to reset the password for your account.</p>
        <p>To reset your password, click on the link below</p>
        <br>
         <a href="${url}" target='_blank'>Reset Password</a> 
         <p>Regards
         <br>
         Team First Career</p>`,
    }, { authorization: auth.token })
    return res
}
