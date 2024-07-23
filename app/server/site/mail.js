import serverPagination from "@/UW/Pagination/serverPagination"
import { DataAndTotal } from "@/lib/db"
import toSelect from "@/lib/toSelect"
import Mail from "@/schema/Site/Mail"
import permissions from "../permissions"
import Template from "@/schema/Site/Template"
import Event from "@/schema/Site/Event"
import { error } from ".."

async function mail(id, body, del) {
    let { user } = await permissions('settings', 2)
    let data
    if (del) {
        data = await Template.countDocuments({ from: del })
        if (data) {
            error('this email is active for some events')
        }
        data = await Mail.findByIdAndDelete(del)
    } else if (id == 'new') {
        data = await new Mail(body).save()
    } else {
        data = await Mail.findByIdAndUpdate(id, body, { new: true }).select(toSelect(body))
    }
    return data
}

async function mailSearch({ search, ...pagination }) {
    pagination = serverPagination(pagination)
    let match = {}
    if (search) {
        search = new RegExp(search, 'i')
        match = { $or: [{ email: search }, { host: search }] }
    }
    let data = await Mail.aggregate([
        { $match: match },
        {
            $lookup: {
                from: 'templates',
                localField: '_id',
                foreignField: 'from',
                as: 'events'
            } 
        },
        {
            $addFields: {
                events: { $size: '$events'}
            }
        },
        ...DataAndTotal(pagination)
    ])
    return data[0]
}

// TEMPLATE

async function template(id, body, del) {
    let { user } = await permissions('settings', 2)
    let data
    if (del) {
        data = await Template.findByIdAndDelete(del)
    } else if (id == 'new') {
        data = await new Template(body).save()
    } else {
        data = await Template.findByIdAndUpdate(id, body, { new: true }).select(toSelect(body))
    }
    return data
}

async function templateSearch({ ...pagination }) {
    pagination = serverPagination(pagination)
    let data = await Template.aggregate([
        {
            $lookup: {
                from: 'events',
                localField: 'event',
                foreignField: '_id',
                as: 'uid'
            }
        },
        { $unwind: '$uid' },
        {
            $addFields: {
                uid: '$uid.uid'
            }
        },
        {
            $lookup: {
                from: 'mails',
                localField: 'from',
                foreignField: '_id',
                as: 'email'
            }
        },
        { $unwind: '$email' },
        {
            $addFields: {
                email: '$email.email'
            }
        },
        ...DataAndTotal(pagination)
    ])
    return data[0]
}

async function event(id, body, del) {
    let { user } = await permissions('settings', 2)
    let data
    if (del) {
        data = await Event.findByIdAndDelete(del)
    } else if (id == 'new') {
        data = await new Event(body).save()
    } else {
        data = await Event.findByIdAndUpdate(id, body, { new: true }).select(toSelect(body))
    }
    return data
}

async function eventSearch({ ...pagination }) {
    pagination = serverPagination(pagination)
    let data = await Event.aggregate(DataAndTotal(pagination))
    return data[0]
}

export default { mail, mailSearch, template, templateSearch, event, eventSearch }