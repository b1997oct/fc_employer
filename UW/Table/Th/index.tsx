import { ArrowDown } from '@/UW/Icons'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    onChange: () => void;
    value: object;
    name: string;
}
export default function Th({ className = '', children, onChange, name, value, ...props }: Props) {
    value = value == undefined ? undefined : value[name]

    let isSort = name != undefined && Boolean(onChange)
    function onClick() {
        let val = value == undefined ? 1 : value == 1 ? -1 : undefined
        val = val != undefined && { [name]: val }
        onChange(val)
    }

    return (
        <td onClick={isSort ? onClick : undefined} className={'th ' + className} {...props}>
            <div className='df aic jcsb'>{children} {isSort && <span>{value == 1 ? '↓' : value == -1 ? '↑' : '⇅'}</span>}</div>
        </td>
    )
}
