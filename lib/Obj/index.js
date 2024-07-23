
export default function ObjVal(obj) {

    if (Array.isArray(obj)) {
        return obj[0] || {}
    }

    return obj || {}
}
