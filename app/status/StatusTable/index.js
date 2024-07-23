'use client'
import { useEffect, useState } from 'react'
import Button from '@/UW/Button'
import Tggr from '@/UW/JS/Trigger'
import onUpdate from '@/UW/JS/Array/onUpdate'
import ServerFunction from '@/server'
import ManageStatus from '../ManageStatus'
import StatusLayout from '..'
import Table from '@/UW/Table'
import THead from '@/UW/Table/THead'
import Th from '@/UW/Table/Th'
import Adaptor from '@/UW/Adaptor'
import EditButton from '@/UW/Button/EditButton'
import NoDataFound from '@/UW/NoDataFound'

let ths = [
    {
        child: 'Sort Order',
        name: 'sort'
    },
    {
        child: 'Name',
        name: 'name'
    },
    {
        child: 'Color',
        name: 'color'
    },
    {
        child: 'Team',
        name: 'team'
    },
    {
        child: 'Recruiter',
        name: 'recruiter'
    },
    {
        child: 'User',
        name: 'user'
    },
    {
        child: 'Edit'
    }
]
export default function StatusTable({ type, active }) {

    let [data, setData] = useState([]),
        [error, setError] = useState(),
        [loading, setLoading] = useState(),
        [open, setOpen] = useState(),
        id = open?._id || 'new',
        Ths = Adaptor(ths),
        Rows = Adaptor(data),
        statusSearch = ServerFunction('statusSearch', { setError, setLoading, onResponse: setData })

    useEffect(() => {
        statusSearch(type)
    }, [])

    function onClose(res) {
        if (res) {
            onUpdate(setData, res, id)
        }
        setOpen()
    }

    function TWrapper({ name, child }) {
        return <Th name={name}>{child}</Th>
    }

    function Wrapper(d) {
        let { name, color, user, team, recruiter, sort } = d
        return <tr onClick={Tggr(setOpen, d)}>
            <td>{sort || 0}</td>
            <td>{name}</td>
            <td><div style={{ background: color }} className='w-6 aspect-square rounded-full' /></td>
            <td>{Check(team)}</td>
            <td>{Check(recruiter)}</td>
            <td>{Check(user)}</td>
            <td><EditButton /></td>
        </tr>
    }
    return (
        <StatusLayout active={active}>
            <ManageStatus open={open} onClose={onClose} id={id} type={type} />
            <div className='df jce mb'>
                <Button onClick={Tggr(setOpen, {})}>+ Add</Button>
            </div>
            <Table col={7} loading={loading}>
                <THead>
                    {Ths(TWrapper)}
                </THead>
                {Rows(Wrapper)}
            </Table>
            {!loading && !data.length &&
                <NoDataFound>
                    <Button variant='outlined' onClick={Tggr(setOpen, {})}>+ Add New</Button>
                </NoDataFound>}
        </StatusLayout>
    )
}


function Check(checked) {
    return <input type='checkbox' readOnly checked={Boolean(checked)} />
}