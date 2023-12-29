import { useTheme } from "@/Layout/Theme"
import { useState } from "react"
import { Banner, Logo } from "./ProfileFiles"
import Input from "@/Components/Input"

const inData = [
    {
        label: 'Company Name',
        name: 'company_name',
        pl: 'Enter Company Name'
    },
    {
        label: 'Company main address',
        name: 'address',
        pl: 'Enter address'
    },
]

export default function ProfileHeader() {
    const [logo, setLogo] = useState(null)
    const [banner, setBanner] = useState(null)
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({
        company_name: 'Your organization name',
        address: 'company address'
    })
    const { width } = useTheme()


    function onChange(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    return (
        <div className="bg">
            {/* <Banner
                image={banner}
                height={width ? 260 : 100}
                open={open}
                onChange={setBanner}
            /> */}
            <div style={{ margin: width ? '0 10%' : '0' }} className={`${open ? '' : 'df'} mt gap py p`}>
                <Logo
                    open={open}
                    image={logo}
                    onChange={setLogo}
                />
                {open ?
                    <div>
                        {inData.map((dat, i) => (
                            <Input
                                key={i}
                                name={dat.name}
                                value={data[dat.name]}
                                placeholder={dat.pl}
                                label={dat.label}
                                className="mt"
                                onChange={onChange}
                            />
                        ))}
                    </div>
                    : <div>
                        <h1 style={{ fontSize: width ? 32 : 20 }}>{data.company_name}</h1>
                        {data.address}
                    </div>}
            </div>

            <div className='df jce gap mx py'>
                <button onClick={() => setOpen(true)} className='filled-btn success-bg'>
                    {open ? 'Save' : 'Edit'}
                </button>
                {open && <button onClick={() => setOpen(false)} className='text-btn'>Cancel</button>}
            </div>
        </div>
    )
}

