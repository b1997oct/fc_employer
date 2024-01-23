import { Add, Check, Search } from "@/Components/Icons"
import { Params } from "@upgradableweb/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AllStatuses from "./AllStatuses"


const initial = {
    status: ['applied'],
    start_date: '',
    end_date: '',
}


const today = new Date().toISOString().split('T')[0];

export default function AppHeader({ resetPagination }) {

    const [py, setPy] = useState(initial)
    const r = useRouter()

    useEffect(() => {
        let obj = { ...py, ...r.query }
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
        let { status, start_date, end_date } = py
        if (!status.length) return
        status = status.join('-')
        const url = '?' + Params({ status, start_date, end_date })
        r.push(url)
        resetPagination()
    }

    function reset() {
        resetPagination()
        r.push('?status=applied')
    }

   

    return (
        <div className="bg p">
            <AllStatuses
                status={py.status}
                setChange={setPy}
            />
            <div className="df sm-fdc gap my-4">
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

                <div className="sm-fdc df aic gap mt">
                    <button className="btn w-full"
                        onClick={reset}>Clear</button>
                    <button onClick={handleSearch} className="w-full px-4 py-2 df aic jcc rounded-sm bold hover active border primary-bg"><Search /> Search</button>
                </div>
            </div>
        </div>
    )
}

