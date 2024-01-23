
export default function serverPagination(body) {

    const {
        skip = 0,
        limit = 24,
        sort_field = 'updatedAt',
        sort = -1
    } = body

    return [
        { $sort: { [sort_field]: sort } },
        { $skip: skip },
        { $limit: limit }
    ]
}
