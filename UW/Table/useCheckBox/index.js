import TableCheckBox from "@/UW/Table/TableCheckBox"
import { useState } from "react"

export default function useCheckBox(data) {

    const [selected, setSelected] = useState([]),

        len = selected.length,
        all = data.length && data.length == len,
        allChecked = e => {
            let { checked } = e.target
            setSelected(() => checked ? data.map(d => d._id) : [])
        }, onChange = e => {
            let { value, checked } = e.target
            setSelected(prev => checked ? [...prev, value] : prev.filter(d => d !== value))
        },
        TableCheckAll = () => <TableCheckBox th checked={all} onChange={allChecked} >{len? len: null}</TableCheckBox>,
        TableCheck = ({ value }) => <TableCheckBox value={value} checked={selected.includes(value)} onChange={onChange} />


    return { selected, TableCheckAll, TableCheck }

}
