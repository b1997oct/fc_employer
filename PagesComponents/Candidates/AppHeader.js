import { Add, Check, Search } from "@/Components/Icons"
import { Params } from "@upgradableweb/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AllStatuses from "./AllStatuses"
import JobSelect from "../Job/JobSelect"


const initial = {
    status: ['shortlisted'],
    start_date: '',
    end_date: '',
    job: ''
}


const today = new Date().toISOString().split('T')[0];

export default function AppHeader({ resetPagination }) {

    const [py, setPy] = useState(initial)

    const r = useRouter()

    useEffect(() => {
        let obj = { ...initial, ...r.query }
        if (!Array.isArray(obj.status)) {
            obj.status = obj.status.split('-')
        }
        setPy(obj)
    }, [r.query])



    const onChange = (e) => {
        let { name, value } = e.target
        setPy({ ...py, [name]: value })
    }

    function handleSearch() {
        let { status } = py
        if (!status.length) return
        status = status.join('-')
        const url = '?' + Params({ ...py, status })
        r.push(url)
        resetPagination()
    }

    function reset() {
        resetPagination()
        r.push('?status=shortlisted')
    }



    return (
        <div className="bg p border">
            <AllStatuses
                status={py.status}
                setChange={setPy}
            />
            <div className="df md-aib sm-fdc gap my-4">
                <div className="sm-fdc df gap f-1">
                    <div className="df aic">
                        <label>From Date</label>
                        <input
                            type="date"
                            className="px-2 py-1 ml f-1"
                            name="start_date"
                            onChange={onChange}
                            value={py.start_date}
                            max={today}
                        />
                    </div>
                    <div className="df aic">
                        <label>To Date</label>
                        <input
                            type="date"
                            className="px-2 py-1 ml f-1"
                            max={today}
                            name='end_date'
                            onChange={onChange}
                            value={py.end_date}
                        />
                    </div>
                </div>

                <div className="sm-fdc df aic gap mt f-1">
                    <JobSelect
                        placeholder='Filter by Job'
                        onChange={onChange}
                        name='job'
                        value={py.job}
                    />
                    <button className="btn sm-w-full" onClick={reset}>Clear</button>
                    <button onClick={handleSearch} className="sm-w-full primary-btn"><Search /> Search</button>
                </div>
            </div>
        </div>
    )
}

