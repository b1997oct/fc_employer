
export default function CleanBody(body) {
    let { _id, createdAt, updatedAt, ...others } = body

    return others
}
