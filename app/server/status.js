import Status from "@/schema/Status"
import permissions from "./permissions"

async function status(id, body) {
    await permissions('settings', 3)
    let data
    if (id == 'new') {
        data = await new Status(body).save()
    } else {
        data = await Status.findOneAndUpdate({ _id: id }, body, { new: true })
    }
    return data
}

async function statusSearch(type) {
    await permissions('settings', 1)
    let data = await Status.find({ type }).sort({ sort: 1 })
    return data
}

async function statusAll(type) {
    let { role } = await permissions('settings', 1)
    let data = await Status.find({ type, [role]: true }).sort({ sort: 1 })
    return data
}

export default { status, statusSearch, statusAll }