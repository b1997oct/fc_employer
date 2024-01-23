import BottomDrawer from "@/Components/Drawer/BottomDrawer"
import useDataFetch from "@/Components/Hooks/useDataFetch"
import LabelValue from "@/Components/LabelValue"
import moment from "moment"
import { useState } from "react"

export default function Job({ job_role, company_logo, company_name, salary, id }) {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useDataFetch(open && !data && '/api/job', { id }, { setLoading, setData })

    const {
        updatedAt,
        experience,
        job_type,
        total_openings,
        location,
        education,
        skills,
        lost_date,
        publish,
        jd
    } = data || {}

    return (
        <div style={{ maxWidth: 300 }}>
            <b className="nowrap a pointer" onClick={() => setOpen(true)}>{job_role}</b>
            <div className="cs df gap-2 caption">
                {company_logo && <img
                    src={company_logo}
                    style={{ width: 30, height: 30 }}
                />}
                {company_name}
            </div>
            <div>{salary}</div>
            <BottomDrawer open={open} onClose={setOpen}>
                <b>{job_role}</b>
                <div className="df gap-2">
                    {company_logo && <img
                        src={company_logo}
                        style={{ width: 30, height: 30 }}
                    />}
                    <div>
                        <div className="caption cs">{company_name} </div>
                        {moment(updatedAt).fromNow() + ' '}
                        {data &&
                            <b className={publish ? 'cs' : 'ce'}>{publish ? 'Active' : 'InActive'}</b>}
                    </div>

                </div>

                {loading &&
                    <div className='py-2 tac'>
                        Loading...
                    </div>}
                {
                    data &&
                    <div>

                        <p>Total openings - {total_openings || 1}</p>
                        <div className='df sm-fdc gap jcsb'>
                            <div className="">
                                <LabelValue
                                    label='Required Experience'
                                    value={experience}
                                />
                                <LabelValue
                                    label='Salary'
                                    value={salary}
                                />
                                <LabelValue
                                    label='Job Type'
                                    value={job_type}
                                />
                                <LabelValue
                                    label='Location'
                                    value={location}
                                />

                            </div>
                            <div>
                                <LabelValue
                                    label='Education'
                                    value={education}
                                />

                                <LabelValue
                                    label='Last Date'
                                    value={lost_date && moment(lost_date).from()}
                                />
                            </div>
                        </div>
                        <br/>
                        <b>Skills</b>
                        <div className='df fww gap-2 '>
                            {Array.isArray(skills) && skills.length ?
                                skills.map((d, i) => (
                                    <div key={i}>
                                        <button className='filled-chip-p chip'>{d}</button>
                                    </div>
                                ))
                                : <div>No Specific skills required</div>}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: jd }} />
                    </div>
                }
            </BottomDrawer>
        </div>
    )
}
