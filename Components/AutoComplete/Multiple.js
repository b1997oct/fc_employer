import { useMemo, useState } from "react"
import Select, { Option } from "../Select"
import usePredictionFetch from "../Hooks/usePredictionFetch";
import { PUT } from "@upgradableweb/client";
import { MultiChips } from "../Chip";


export default function AutoCompleteMultiple({ name, onChange, value = [], type, updateUrl, url, label, errorText, active, placeholder }) {

    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    function onAdd(val) {
        const f = value.filter(d => d !== val)
        f.push(val)
        onChange({ target: { name, value: f } })
        setText('')
        setOpen(false)
    }
    const onDelete = (index) => {
        const f = value.filter((_, i) => i !== index)
        onChange({ target: { name, value: f } })
    }

    function saveFn(keyword) {
        if (updateUrl) {
            const onResponse = (res) => onAdd(res.data.keyword)
            const onError = (err) => alert(err.message)
            PUT(updateUrl, { keyword, type }, { onResponse, onError })
        } else {
            onAdd(keyword)
        }
    }
    const onRes = (res) => {
        const f = res.map(d => d.keyword)
        setData(f)
    }

    usePredictionFetch(url, { keyword: text, type }, { setData: onRes }, [text])

    const options = useMemo(() => {
        if (!data.length) {
            return <Option onClick={saveFn} value={text}>{`Add new "${text}"`}</Option>
        } else {
            return data.map((d, i) => {
                let cn = value.some(dat => dat.startsWith(d)) ? 'menu-selected' : '';
                return <Option className={cn} key={i} value={d} onClick={onAdd}>{d}</Option>
            })
        }
    }, [data, value])



    const multiple = useMemo(() => <MultiChips data={value} onDelete={onDelete} />, [value])


    return (
        <Select
            setOpen={setOpen}
            open={open}
            options={options}
            value={text}
            onChange={(e) => setText(e.target.value)}
            name={name}
            label={label}
            active={active}
            errorText={errorText}
            placeholder={placeholder}
            multiple={multiple}
            onKeyDown={(e) => e.code === 'Enter' && onAdd(text)}
        />)
}