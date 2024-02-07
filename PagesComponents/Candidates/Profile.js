import BottomDrawer from '@/Components/Drawer/BottomDrawer'
import useDataFetch from '@/Components/Hooks/useDataFetch'
import { Avatar } from '@/Components/Icons'
import LabelValue from '@/Components/LabelValue'
import { useState } from 'react'
import { convertExperience } from './SelectExperience'
import moment from 'moment'
import useTableFetch from '@/Components/Hooks/useTableFetch'

const emp = [
    {
        label: 'Experiance Designation',
        name: 'exp_designation'
    },
    {
        label: 'Experiance Industry',
        name: 'exp_industry'
    },
    {
        label: 'Functional Area',
        name: 'functional_area'
    },
]

export default function Profile({ image, name, mobile, email, id }) {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useDataFetch(open && '/api/candidate', { id }, { setLoading, setData })

    const { skills, resume, total_experience } = data || {}
    const { cctc, cctc_unit, ectc, ectc_unit, industry, working_status, notice_period } = data || {}
    const { collage, degree, completion_year, ed_status, combination, grade } = data || {}
    const { city, state, pin, area } = data || {}
    const { gender, marital_status, isFresher, dob } = data || {}

    const designation = data && Array.isArray(data.designation) ? data.designation : []
    const functional_area = data && Array.isArray(data.functional_area) ? data.functional_area : []
    const languages = data && Array.isArray(data.languages) ? data.languages : []

    return (
        <div>
            <MainDetail
                email={email}
                image={image}
                mobile={mobile}
                name={name}
                onClick={setOpen}
            />
            <BottomDrawer open={open} onClose={setOpen}>
                <div>
                    <MainDetail
                        email={email}
                        image={image}
                        mobile={mobile}
                        name={name}
                        dob={dob}
                        isFresher={isFresher}
                    />
                    {loading &&
                        <div className='py-2 tac'>
                            Loading...
                        </div>}

                    {data &&
                        <div className='p'>

                            <br />
                            <div className='df sm-fdc gap-4 jcsb'>
                                <div>
                                    <LabelValue
                                        label='Designation'
                                        value={designation}
                                    />
                                    {industry && <div className='cp'>{industry} | {functional_area}</div>}
                                    <LabelValue
                                        label='Total Experience'
                                        value={total_experience && convertExperience(total_experience)}
                                    />
                                    <LabelValue
                                        label='Current CTC'
                                        value={cctc ? <CTC ctc={cctc} unit={cctc_unit} /> : undefined}
                                    />
                                    <LabelValue
                                        label='Expected CTC'
                                        value={ectc ? <CTC ctc={ectc} unit={ectc_unit} /> : undefined}
                                    />
                                    <LabelValue
                                        label='Working Status'
                                        value={working_status}
                                    />
                                    <LabelValue
                                        label='Notice Period'
                                        value={notice_period ? notice_period + ' Days' : ''}
                                    />
                                </div>

                                {degree && <div>
                                    <h3>Education</h3>
                                    <LabelValue
                                        label={`Qualification`}
                                        value={degree}
                                    />
                                    <LabelValue
                                        label='Combination/Trade'
                                        value={combination}
                                    />
                                    <LabelValue
                                        label='Collage Details'
                                        value={collage}
                                    />
                                    <p>{ed_status === 'Completed' ? `${(grade ? grade * 10 + '% | ' : '')} Completion Year ${completion_year}` : ed_status}</p>
                                </div>}
                            </div>
                            <br />
                            {Array.isArray(skills) && skills.length ?
                                <>
                                    <b>Skills</b>
                                    <div className='df fww gap-2 mt'>
                                        {skills.map((d, i) => (
                                            <div key={i}>
                                                <button className='filled-chip-p chip'>{d.skill}</button>
                                            </div>
                                        ))}
                                    </div>
                                </> : null}
                            <br />

                            <LabelValue
                                label='Present Address'
                                value={area ? `${area} | City - ${city} | State - ${state} | ${pin}` : ''}
                            />
                            <br />
                            {resume &&
                                <iframe
                                    style={{ height: '80vh' }}
                                    className='w-full'
                                    src={resume} />}
                            <br />
                            <br />
                            <LabelValue
                                label='Comfortable Languages'
                                value={languages.length ?
                                    <div className='df fww gap-2 mt'>
                                        {languages.map(d => <button key={d} className='filled-chip-p chip'>{d}</button>)}
                                    </div> : ''}
                            />
                            <br />
                            <LabelValue
                                label='Gender'
                                value={gender}
                            />
                            <LabelValue
                                label='Date of Birth'
                                value={dob}
                            />
                            <LabelValue
                                label='Marital Status'
                                value={marital_status}
                            />
                            <br />
                            <br />
                            <WorkExperience
                                isFresher={isFresher}
                                id={id}
                            />
                        </div>}
                </div>
            </BottomDrawer >
        </div >
    )
}

function MainDetail({ image, name, email, mobile, onClick, dob, isFresher }) {

    function handleClick() {
        onClick && onClick(true)
    }
    return (
        <div className="df aic gap-2">
            <div onClick={handleClick} className="preview-img round hidden pointer">
                {image ?
                    <img className="image" src={image} alt='candidate' />
                    : <Avatar size={60} />}
            </div>
            <div>
                <div className='bold pointer a nowrap' onClick={handleClick}>{name}</div>
                <div className='df fww'>
                    <div>+91 {mobile} |</div>
                    <div className="nowrap">{email}</div>
                </div>
                <div>{dob && `Age : ${moment(dob).fromNow(true)}`} {isFresher && <span>| <span className='cs'>Fresher</span></span>}</div>
            </div>
        </div>)
}

function CTC({ ctc, unit }) {
    return <span>{ctc} / <span className='capitalize'>{unit || 'month'}</span></span>
}

function WorkExperience({ isFresher, id }) {

    const [loading, setLoading] = useState()
    const [open, setOpen] = useState()
    const [data, setData] = useState([])

    const onError = (err) => setOpen(err.message)

    const onExp = (res) => setOpen(Boolean(res))
    useDataFetch(!isFresher && '/api/candidate/work-experience', { id, isExperianced: true }, { setData: onExp })
    const l = typeof loading === 'boolean'
    useTableFetch(l && '/api/candidate/work-experience', { id }, { setData, setLoading, onError })

    if (typeof open !== 'boolean') {
        return
    }
    if (!l) {
        return <button onClick={() => setLoading(true)} className='btn w-full'>View Work Experience</button>
    }
    if (loading) {
        return <div className='ce tac'>Loading...</div>
    }
    return (
        <div>
            <b>Work Experience</b>
            <br />
            <div className='ce'>{open}</div>
            <br />
            {data.map((d, i) => {
                const { designation, company, from, to, despcription } = d

                return (
                    <div key={i} className="bg-gray p-2 fadeIn rounded-sm border mb">
                        <h3>{designation}</h3>
                        <div>{company}</div>
                        <p>{from} - {to ? to : 'Current'}</p>
                        <div>{despcription}</div>

                    </div>)
            })}
        </div>
    )
}