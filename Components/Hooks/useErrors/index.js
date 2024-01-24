import { useState } from "react"
import Validator from "@/Components/Utils/Validator"

export default function useErrors(fields, py = {}) {

    const [data, setData] = useState({})

    let errors = {}, values = {}
    for (const dat of fields) {
        const { name, error, validator } = dat
        values[name] = typeof data[name] !== 'undefined' ? data[name] : py[name] || ''
        let f
        if (validator && validator(values)) {
            f = Validator({ value: values[name], ...error })
        } else if (validator) {
            f = undefined
        } else {
            f = Validator({ value: values[name], ...error })
        }

        if (f) {
            errors[name] = f
        }
    }
    const isError = Object.keys(errors)[0]
    return { data, setData, errors, isError, values }
}