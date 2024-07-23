import FocusByName from "@/UW/JS/FocusByName"
import Validator from "@/UW/JS/Validator"
import onChange from "@/UW/JS/onChange"
import { useState } from "react"

export default function useErrors(fields, py) {

    const [data, setData] = useState({})

    const payload = py ? py : {}

    let errors = {}, values = {}
    for (const dat of fields) {
        const { name, error, validate, type } = dat
        values[name] = typeof data[name] !== 'undefined' ? data[name] : typeof payload[name] !== 'undefined' ? payload[name] : ''
        let f
        if (validate && validate(values)) {
            f = Validator({ value: values[name], type, ...error })
        } else if (validate) {
            f = undefined
        } else {
            f = Validator({ value: values[name], ...error })
        }

        if (f) {
            errors[name] = f
        }
    }
    const isError = Object.keys(errors)[0],
        isFocus = () => {
            if (isError) {
                FocusByName(isError)
                return true
            }
        },
        inputParse = ({ pl, error, ...d }) => {
            const { name, type } = d
            if (type == 'checkbox') {
                d.checked = Boolean(values[name])
            } else {
                d.value = values[name]
            }
            d.errorText = errors[name]
            d.placeholder = pl
            d.onChange = onChange(setData)
            return d
        }

    return { data, setData, errors, isError, values, isFocus, inputParse }
}