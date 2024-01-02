import Input from '@/Components/Input'
import Editor, { htmlToJSON } from '@/Components/Editor'
import Layout from '@/Layout'
import { useTheme } from '@/Layout/Theme'
import { useMemo, useState } from 'react'
import { Logo, UploadButton } from '@/PagesComponents/Profile/ProfileFiles'
import { ReactSortable } from 'react-sortablejs'
import ProfileHeader from '@/PagesComponents/Profile/ProfileHeader'
import Gallery from '@/PagesComponents/Profile/Gallery'
import { POST, PUT } from '@upgradableweb/client'
import useTableFetch from '@/Components/Hooks/useTableFetch'
import useDataFetch from '@/Components/Hooks/useDataFetch'

const fields = [
    {
        label: "Company Name",
        name: "company_name",
        pl: "Enter company name"
    },
    {
        type: "autocomplete",
        label: "Select Industry",
        name: "industry",
        pl: "Select industry type"
    },
    {
        type: "autocomplete",
        label: "Comapny Functinal Area",
        name: "department",
        pl: "Select Functional Area"
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
    // {
    //     label: "Company Email",
    //     name: "email",
    //     pl: "Eg:company@mail.com"
    // },
    {
        label: "Company Website link",
        name: "website",
        pl: "https://www.firstcareer.co"
    },
]


export default function Page() {

    const [data, setData] = useState({})
    const [py, setPy] = useState({})
    const [banner, setBanner] = useState(null)
    const [logo, setLogo] = useState(null)
    const [loading, setLoading] = useState(false)

    const { width } = useTheme()

    function onResponse(res) {
        if (!res.data) {
            setPy({ id: 'new' })
        } else {
            setPy(res.data)
        }
    }

    useDataFetch('/api/org','',{ onResponse })

    function onChange(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }


    async function submit() {

        let res, newData = { ...data, id: py.id }
        setLoading(true)
        try {
            if (py.id === 'new' || Object.entries(data).length) {
                res = await PUT('/api/org', newData)
            }
            let newFileds = {}
            if (logo) {
                const formData = new FormData()
                formData.append('image', logo)
                if (py.company_logo?.secure_url) {
                    formData.append('id', py.company_logo.public_id)
                }
                res = await PUT('/api/image', formData)
                newFileds = { company_logo: res.data }
            }
            if (Object.entries(newFileds).length) {
                res = await PUT('/api/org', newFileds)
            }
            setPy(res.data)
            setData({})
            if (logo) {
                setLogo(null)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    const ValueGetter = (name) => typeof data[name] === 'string' ? data[name] : py[name] || ''

    const disabled = loading || !Object.keys(data).length && !logo && !banner

    return (
        <Layout>

            <div style={{ margin: '4% 0' }} className={`df jcsa gap ${width ? '' : 'fdc'}`}>

                <div style={{ padding: '5%' }} className='bg df fdc gap rounded-sm shadow-sm'>
                    {!disabled && data.id === 'new' && <p className='ce'>Please save the details</p>}
                    <Logo
                        open={true}
                        image={logo}
                        onChange={setLogo}
                        url={py.company_logo?.secure_url}
                    />
                    {fields.map((dat, i) => (
                        <Input
                            key={i}
                            label={dat.label}
                            name={dat.name}
                            placeholder={dat.pl}
                            onChange={onChange}
                            value={ValueGetter(dat.name)}
                        />
                    ))}

                </div>

                <div className='bg p rounded-sm shadow-sm w-full' style={{ maxWidth: 478 }}>
                    <Gallery
                        images={banner}
                        setImages={setBanner}
                    />
                    <div>
                        <h3 className='bold my'>About Company</h3>
                        <Editor
                            value={ValueGetter('about_us')}
                            onChange={(val) => {
                                setData({ ...data, ['about_us']: val })
                            }}
                            placeholder='About company'
                        />
                    </div>
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
