

let types = {
    checkbox: true,
    radio: true
}
export default function onChange(setFn) {
    return (e) => {
        let { name, value, checked, type } = e.target
        if (types[type]) {
            value = checked
        }
        setFn(prev => ({ ...prev, [name]: value }))
    }
}
