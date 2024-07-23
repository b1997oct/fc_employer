
export default function toSelect(body, ...fields) {
    let select = Object.keys(body).join(' ') || '_id'
    if (fields.length) {
        fields.forEach(d => select += ' ' + d)
    }
    return select
}
