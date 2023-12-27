export default function Validator({ min, max, value = '', type }) {
    let required = 'this is required field'
    value = value.toString()
    const length = value.length

    if (min && !length) {
        return required
    } else if (min && length < min) {
        return `this field requires min chars ${length}/${min}`
    } else if (max && length > max) {
        return `this field exceeds max chars ${length}/${max}`
    } else if (type == 'email') {
        if (!value.includes('@') || !value.includes('.')) return `please enter a valid email`
    } else if (type == 'mobile') {
        if (length > 10) return `please enter a valid mobile number`
    }
}
