
const minErr = (length, min) => `this field requires min ${min}/${length}`
const maxErr = (length, max) => `this field exceeds max ${max}/${length}`
let required = 'this is required field'

export default function Validator({ min, max, value = '', type }) {
    let length

    if (type === 'array') {
        if (Array.isArray(value)) {
            length = value.length
            if (min && !length) {
                return required
            } else if (min && length < min) {
                return minErr(length, min)
            } else if (max && length > max) {
                return maxErr(length, max)
            }
            return undefined
        }
        return min ? required : ''
    }

    value = value.toString()
    length = value.length

    if (min && !length) {
        return required
    } else if (min && length < min) {
        return minErr(length, min)
    } else if (max && length > max) {
        return maxErr(length, max)
    } else if (type == 'email') {
        if (!value.includes('@') || !value.includes('.')) return `please enter a valid email`
    } else if (type == 'mobile') {
        if (length > 10) return `please enter a valid mobile number`
    }
}
