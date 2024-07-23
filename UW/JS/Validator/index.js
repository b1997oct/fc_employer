
const minErr = (length, min) => `This field requires min ${min}/${length}`
const maxErr = (length, max) => `This field exceeds max ${max}/${length}`
let required = 'This is required field'

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

    if (type === 'tel') {
        if (min > value) {
            return `minimum ${min} required`
        } else if (max < value) {
            return `maximum ${max}`
        }
        return
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
