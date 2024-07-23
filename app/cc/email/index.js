import { error } from "@/app/server";
import Template from "@/schema/Site/Template";
import { createTransport } from "nodemailer";


export default async function sendEmail(to, event, baseEvent) {

    event = new RegExp(`^${event}$`, 'i')

    let [autoMail] = await Template.aggregate([
        {
            $lookup: {
                from: 'events',
                localField: 'event',
                foreignField: '_id',
                as: 'event'
            }
        },
        { $unwind: '$event' },
        { $match: { 'event.uid': event } },
        {
            $lookup: {
                from: 'mails',
                localField: 'from',
                foreignField: '_id',
                as: 'from'
            }
        },
        { $unwind: '$from' }
    ])

    if (!autoMail) {
        error('event not configured')
    }

    let { subject, html, fromTitle } = autoMail,
        { email, password, host } = autoMail.from

    const send = await createTransport({
        host,
        port: 465,
        secure: true,
        auth: {
            user: email,
            pass: password
        }
    }).sendMail({ from: fromTitle, subject, html, to })

    return send
}
