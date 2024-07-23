'use client'

import { Call, Email, Whatsapp } from "@/UW/Icons"
import ObjVal from "@/lib/Obj"
import ServerFunction from "@/server"
import moment from "moment"
import Link from "next/link"
import { useEffect, useState } from "react"
import StatusChange from "../StatusChange"
import Button from "@/UW/Button"
import Notes from "./Notes"
import ViewJob from "./ViewJob"
import ViewUser from "./ViewUser"
import Describe from "./Describe"
import onAssign from "@/UW/JS/onAssign"
import Applications from "./Applications"
import useStatuses from "@/app/status/Hook"
import Tggr from "@/UW/JS/Trigger"
import AppStatus from "./AppStatus"


let statuses = ['Applied', 'Viewed', 'Shortlisted', 'Interview', 'Selected', 'Rejected']
let colors = ['text-blue-400', 'text-yellow-400', 'text-yellow-400', 'text-orange-400', 'text-green-400', 'text-red-600']
export default function ApplicationReview({ id, job: jobId }) {

    const [data, setData] = useState({}),
        [error, setError] = useState(),
        [loading, setLoading] = useState(),
        application = ServerFunction('application', { setError, setLoading, onResponse: setData })

    useEffect(() => {
        if (id != 'xplore') {
            application(id)
        }
    }, [id])

    let { user, job = jobId, describe, status, note, updatedAt, createdAt, _id } = data

    return (
        <div className="p">
            <AppStatus status={status} describe={describe} id={_id} />
            <h4>Application</h4>
            {id == 'xplore' ?
                <h1>{id}</h1>
                :
                <div className="gap grid md:grid-cols-2">
                    <div>
                        <div className="border mb border-pc shadow rounded-xl bg p">
                            <div className="df jcsb">
                                Applied : {moment(createdAt).format('DD/MM/YY')}
                                <div>Updated : {moment(updatedAt).fromNow()}</div>
                            </div>
                            <div className="bold">How do you justify this Job</div>
                            <div className="mb-2">{describe}</div>
                            <Describe
                                note={note}
                                app={id}
                                onRes={res => setData(onAssign(res))} />
                        </div>
                    </div>
                    <div className="border mb border-pc shadow rounded-xl bg p">
                        <Notes app={id} />
                    </div>
                </div>}
            <div className="grid gap md:grid-cols-2">
                <div>
                    <ViewJob jobId={job} />
                    <Applications job={job} user={user} />
                </div>
                {id != 'xplore' && <ViewUser userId={user} />}
            </div>
        </div>
    )
}
