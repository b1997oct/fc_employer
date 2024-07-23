
export default function serverPagination(body) {
    let {
        skip = 0,
        limit = 24,
        sort = { updatedAt: -1 }
    } = body

    if (limit > 24) {
        limit = 24
    }

    return [
        { $sort: sort },
        { $skip: skip },
        { $limit: limit }
    ]
}
