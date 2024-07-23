import Autocomplete from '@/UW/Autocomplete'
import DeleteChip from '@/UW/Chip/DeleteChip'
import Tggr from '@/UW/JS/Trigger'
import onAssign from '@/UW/JS/onAssign';
import { PUT } from '@upgradableweb/client';
import React from 'react'

export default function AutoCompleteArray({ onChange, value = [], name, multiple, ...props }) {

    value = Array.isArray(value) ? value : []

    const { body } = props,
        onDelete = key => {
            key = value.filter(d => d !== key)
            onChange(onAssign({ [name]: key }))
        }

    function Popper({ data, value: val, onAction }) {

        const handle = ({ keyword, add }) => {

            if (add) {
                PUT('https://api.upgradableweb.com/firstcareer/rank',
                    { keyword: val, ...body },
                    { onResponse: console.log })
                keyword = val
            }
            keyword = value.filter(d => d !== keyword).concat(keyword)
            onChange(onAssign({ [name]: keyword }))
            onAction()
        }
        return data.length ?
            data.map(d => {
                let { keyword, _id } = d
                return <div key={_id} className='option' onClick={Tggr(handle, d)}>{keyword}</div>
            })
            : <div onClick={Tggr(handle, { add: true })} className='my-1 option'>Add {`"${val}"`}</div>

    }

    return (
        <Autocomplete
            {...props}
            Popper={Popper}>
            <div className='df gap fww my'>
                {value.map(d => <DeleteChip key={d} onDelete={Tggr(onDelete, d)}>{d}</DeleteChip>)}
            </div>
        </Autocomplete>
    )
}