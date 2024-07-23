import Input from '@/UW/Input'
import Select from '@/UW/Input/Select'
import React from 'react'

let fields = [
    {
        label: "Min Experience",
        name: "minExp",
        pl: 'Fresher, 1 to 3 years'
    },
    {
        label: "Max Experience",
        name: "maxExp",
    }
]

export default function Experience({ inputparse }) {
    return (
            
            <div className='df gap'>
                {fields.map(d => <Select key={d.name} {...inputparse(d)} >
                    <option>Select option</option>
                    {Array.from({ length: 15 }).map((d, i) => <option key={i} value={i}>{i ? i + ` Year${i == 1 ? '' : 's'}` : 'Fresher'}</option>)}
                </Select>)}
        </div>
    )
}
