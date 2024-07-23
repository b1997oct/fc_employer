import React from 'react'
import Switch from '..'
import { PUT } from '@upgradableweb/client'

export default function RemoteSwitch({ checked, url, body, onResponse }) {

    function onChange() {
        PUT(url, body, { onResponse })
    }

    return <Switch checked={checked} onChange={onChange} />

}
