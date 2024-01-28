import useDataFetch from '@/Components/Hooks/useDataFetch'
import usePredictionFetch from '@/Components/Hooks/usePredictionFetch'
import Select, { Option } from '@/Components/Select'
import { useState } from 'react'


export default function JobSelect({ value, onChange, name, ...props }) {

    const [data, setData] = useState([])
    const [val, setVal] = useState()
    const [open, setOpen] = useState(false)
    const [text, setText] = useState(undefined)

    if (val && !value) {
        setVal(undefined)
    }

    const onRes = (res) => setVal(res.job_role)

    useDataFetch(value && '/api/job', { id: value, select: '_id job_role' }, { setData: onRes }, [value])

    usePredictionFetch('/api/prediction/job', { job_role: text, select: '_id job_role' }, { setData }, [text])

    function onAdd(dat) {
        setVal(dat.job_role)
        onChange({ target: { name, value: dat._id } })
        onClose(false)
    }

    function onClose(val) {
        if (!val) {
            setText(undefined)
        }
        setOpen(val)
    }

    const inpVal = typeof text !== 'undefined' ? text : val || value || ''


    return (
        <div className='w-full'>
            <Select
                {...props}
                open={open}
                setOpen={onClose}
                onChange={(e) => setText(e.target.value)}
                value={inpVal}
            >
                {data.length ?
                    data.map((d, i) => {
                        let cn = value === d._id ? 'menu-selected' : '';
                        return (
                            <Option
                                className={cn}
                                key={i}
                                value={d}
                                onClick={onAdd}>
                                {d.job_role}
                            </Option>)
                    })
                    : <div className='p-2'>No Result Found</div>}
            </Select>
        </div>
    )
}
