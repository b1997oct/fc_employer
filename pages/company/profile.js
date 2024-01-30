import Input from '@/Components/Input'
import Editor from '@/Components/Editor'
import Layout from '@/Layout'
import { useTheme } from '@/Layout/Theme'
import { useState } from 'react'
import { Logo } from '@/PagesComponents/Profile/ProfileFiles'
import Gallery from '@/PagesComponents/Profile/Gallery'
import { PUT } from '@upgradableweb/client'
import useDataFetch from '@/Components/Hooks/useDataFetch'
import FormElement from '@/Components/FormElement'
import Toast from '@/Components/Toast'
import Validator from '@/Components/Utils/Validator'

const fields = [
    {
        label: "Company name",
        name: "company_name",
        pl: "Enter company name"
    },
    {
        // type: "select",
        label: "Select industry",
        name: "industry",
        pl: "Select industry type"
    },
    {
        // type: "select",
        label: "Comapny functinal area",
        name: "department",
        pl: "Select functional area"
    },
    {
        label: "Company address",
        name: "address",
        pl: "Eg: Banglore , peenya 560001"
    },
    {
        label: "Company location map link",
        name: "map_link",
        pl: "Paste the map link"
    },
    {
        label: "Company website link",
        name: "website",
        pl: "https://www.firstcareer.co"
    },
]

let errors = {}

function setError(name, value) {
    const f = fields.find(d => d.name === name)
    if (!f) return
    const err = Validator({ value, ...f.error })
    const present = errors[name]
    if (err && err !== present) {
        errors = { ...errors, [name]: err }
    } else if (!err && present) {
        delete errors[name]
    }
}


export default function Page() {

    const [data, setData] = useState({})
    const [py, setPy] = useState({})
    const [banner, setBanner] = useState(null)
    const [logo, setLogo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(false)
    const [utils, setUtils] = useState({
        industry_list: [],
        department_list: []
    });

    const { width } = useTheme()

    function onResponse(res) {
        if (!res.data) {
            setPy({ id: 'new' })
        } else {
            setPy(res.data)
        }
    }

    useDataFetch('/api/utils', '', { setData: setUtils })
    useDataFetch('/api/org', '', { onResponse })

    function onChange(e) {
        let { name, value } = e.target
        setError(name, value)
        setData({ ...data, [name]: value })
    }


    async function submit() {
        for (const { name } of fields) {
            setError({ name, value: getValue('name') })
        }
        const notValid = Object.keys(errors)[0]
        if (notValid) {
            !active && setActive(true)
            document.getElementsByName(notValid)[0]?.focus()
            return
        }

        let res, newData = { ...data, id: py.id }
        setLoading(true)
        try {
            if (py.id === 'new' || Object.entries(data).length) {
                res = await PUT('/api/org', newData)
            }
            let newFileds = {}
            if (logo) {
                res = await UploadImg(logo, py.company_logo?.public_id)
                newFileds = { ...newFileds, company_logo: res }
            }
            if (banner) {
                res = await UploadImg(banner, py.banner?.public_id)
                newFileds = { ...newFileds, banner: res }
            }

            if (Object.entries(newFileds).length) {
                res = await PUT('/api/org', newFileds)
            }
            setPy(res.data)
            setData({})
            logo && setLogo(null)
            banner && setBanner(null)
            Toast('details saved successfully')
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    function getValue(name) {
        return typeof data[name] === 'string' ? data[name] : py[name] || ''
    }

    const disabled = loading || !Object.keys(data).length && !logo && !banner

    return (
        <Layout>

            <div style={{ margin: '4% 0' }} className={`df jcsa gap ${width ? '' : 'fdc'}`}>

                <div style={{ padding: '5%', maxWidth: 500 }} className='bg df fdc gap rounded-sm shadow-sm'>
                    {!disabled && data.id === 'new' && <p className='ce'>Please save the details</p>}
                    <Logo
                        open={true}
                        image={logo}
                        onChange={setLogo}
                        url={py.company_logo?.secure_url}
                    />
                    {fields.map((dat, i) => {
                        const { label, name, pl, type } = dat
                        const err = errors[name]
                        // const options = name === 'industry' ? utils.industry_list
                        //     : name === 'department' ? utils.department_list : undefined

                        return (
                            <FormElement
                                key={i}
                                label={label}
                                name={name}
                                placeholder={pl}
                                onChange={onChange}
                                value={getValue(name)}
                                // options={options}
                                type={type}
                                active={active}
                                error={err}
                                errorText={err}
                                // readOnly={Boolean(options)}
                            />)
                    })}

                </div>

                <div className='bg p rounded-sm shadow-sm w-full' style={{ maxWidth: 478 }}>
                    <Gallery
                        image={banner}
                        setImage={setBanner}
                        url={py.banner?.secure_url}
                    />
                    <h3 className='bold my'>About your company</h3>
                    <Editor
                        value={getValue('about_us')}
                        onChange={onChange}
                        placeholder='About company'
                        name='about_us'
                        error={errors.about_us}
                        errorText={errors.about_us}
                        active={active}
                    />
                </div>
            </div>
            <div style={{ marginBottom: '6%' }} className='p df jce'>
                <button
                    onClick={submit}
                    disabled={disabled}
                    style={{ maxWidth: 400 }}
                    className='btn p-btn w-full p'>UPDATE</button>
            </div>

        </Layout>
    )
}


async function UploadImg(img, id) {
    const formData = new FormData()
    formData.append('image', img)
    if (id) {
        formData.append('id', id)
    }

    const { data } = await PUT('/api/image', formData)
    const { secure_url, public_id } = data
    return { public_id, secure_url }
}