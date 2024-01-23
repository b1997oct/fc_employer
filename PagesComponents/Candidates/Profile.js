import BottomDrawer from '@/Components/Drawer/BottomDrawer'
import useDataFetch from '@/Components/Hooks/useDataFetch'
import { Avatar } from '@/Components/Icons'
import LabelValue from '@/Components/LabelValue'
import { useState } from 'react'


export default function Profile({ image, name, mobile, email, id }) {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useDataFetch(open && !data && '/api/candidate/professional', { id }, { setLoading, setData })

    const { emp_details, skills, education, resume } = data || {}
    const { cctc, cctc_unit, ectc, ectc_unit, exp_industry, functional_area, exp_designation } = emp_details || {}
    const { collage, degree, ed_end_date, ed_start_date, ed_status, study_field, university } = education || {}

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
                    />
                    {loading &&
                        <div className='py-2 tac'>
                            Loading...
                        </div>}

                    {data &&
                        <div className='p'>
                            <div className='df sm-fdc gap jcsb'>
                                <div>
                                    <h3>Employment Details</h3>
                                    <LabelValue
                                        label='Experiance Designation'
                                        value={exp_designation}
                                    />

                                    <div className='cp'>{exp_industry} ({functional_area})</div>
                                    <hr />

                                    <LabelValue
                                        label='Current CTC'
                                        value={`${cctc}/${cctc_unit}`}
                                    />
                                    <LabelValue
                                        label='Expected CTC'
                                        value={`${ectc}/${ectc_unit}`}
                                    />
                                </div>
                                <div>
                                    <h3>Education Details</h3>
                                    <LabelValue
                                        label={`${ed_status} Degree`}
                                        value={degree}
                                    />
                                    <LabelValue
                                        label='Field of Study'
                                        value={study_field}
                                    />
                                    <LabelValue
                                        label='Collage'
                                        value={`${collage} - ${university}`}
                                    />
                                    <p>Start : {ed_start_date}</p>
                                    <p>End : {ed_status === 'Completed' ? ed_end_date : ed_status}</p>
                                </div>
                            </div>
                            <br />
                            {Array.isArray(skills) &&
                                <>
                                    <b>Skills</b>
                                    <div className='df fww gap-2 mt'>
                                        {skills.map((d, i) => (
                                            <div key={i}>
                                                <button className='filled-chip-p chip'>{d.skill}</button>
                                            </div>
                                        ))}
                                    </div>
                                </>}
                            <br />
                            {typeof resume === 'object' &&
                                <iframe
                                    style={{ height: '80vh' }}
                                    className='w-full'
                                    src={resume.secure_url} />}
                        </div>}
                </div>
            </BottomDrawer >
        </div >
    )
}

function MainDetail({ image, name, email, mobile, onClick }) {

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
                <div className='bold pointer a' onClick={handleClick}>{name}</div>
                <div className="nowrap">{email}</div>
                <div>+91 {mobile}</div>
            </div>
        </div>)
}