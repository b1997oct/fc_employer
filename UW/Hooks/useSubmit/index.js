import { PUT } from "@upgradableweb/client"
import useErrors from "../useErrors"
import { useState } from "react"
import FormField from "@/UW/FormField"

export default function useSubmit(fields, { url, body, onResponse }, py) {

    let { data, inputParse, isFocus, setData, values } = useErrors(fields, py),
        [loading, setLoading] = useState(),
        [error, setError] = useState(),
        active = typeof loading == 'boolean',
        inputs = arr => arr.map(d => <FormField key={d.name} active={active} {...inputParse(d)} />)

    function submit() {

        if (isFocus()) {
            setLoading(false)
            return
        }
        let onRes = res => {
            onResponse && onResponse(res)
            setData({})
            setLoading()
        }

        let py = { ...data }
        if (body) {
            Object.assign(py, body)
        }

        PUT(url, py, { setLoading, onResponse: onRes, setError })
    }

    return { submit, inputs, error, setData, values, inputParse, loading, setError, setLoading }
}
