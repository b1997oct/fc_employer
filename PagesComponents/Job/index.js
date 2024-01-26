import BottomDrawer from "@/Components/Drawer/BottomDrawer"
import useDataFetch from "@/Components/Hooks/useDataFetch"
import LabelValue from "@/Components/LabelValue"
import moment from "moment"
import { useState } from "react"

export default function Job({ job_role, caption, salary, id }) {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useDataFetch(open && !data && '/api/job', { id }, { setLoading, setData })

    const {
        updatedAt,
        experience,
        company_logo,
        company_name,
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
            <div className="nowrap a pointer bold" onClick={() => setOpen(true)}>{job_role}</div>
            <div className="df gap-2 caption">
                {caption}
            </div>
            <div>{salary}</div>
            <BottomDrawer open={open} onClose={setOpen}>
                <h3>{job_role}</h3>
                <div className="df gap-2">
                    {company_logo &&
                        <img
                            src={company_logo}
                            style={{ width: 30, height: 30 }}
                        />}
                    <div>
                        <div className="caption cs">{company_name}</div>
                        {moment(updatedAt).fromNow() + ' '}
                        {data &&
                            <b className={publish ? 'cs' : 'ce'}>
                                {publish ? 'Active' : 'InActive'}
                            </b>}
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
                                    label='Experience'
                                    value={experience}
                                />
                                <LabelValue
                                    label='Salary'
                                    value={salary || data.salary}
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
                                    label='Last Date To Apply'
                                    value={lost_date}
                                />
                            </div>
                        </div>
                        <br />
                        <b>Required Skills</b>
                        <div className='df fww gap-2 mt'>
                            {skills.map((d, i) => (
                                <div key={i}>
                                    <button className='filled-chip-p chip'>{d}</button>
                                </div>
                            ))}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: jd }} />
                    </div>
                }
            </BottomDrawer>
        </div>
    )
}
