import Input from '@/Components/Input'
import Editor, { htmlToJSON } from '@/Components/Editor'
import Layout from '@/Layout'
import { useTheme } from '@/Layout/Theme'
import { useState } from 'react'
import File, { FileButton } from '@/PagesComponents/Profile/File'
import Image from 'next/image'
import { ReactSortable } from 'react-sortablejs'

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
        label: "Company Head Quater Address",
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
    const [image, setImage] = useState(null)
    const [banner, setBanner] = useState([])

    const { width } = useTheme()

    function onChange(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    function submit() {
        console.log(data);

    }

    return (
        <Layout>
            <h2 className='tac bold mt'>Manage Your Company Page</h2>
            <div style={{ flexDirection: width ? 'row' : 'column', margin: '4% 0' }} className='df jcsa gap'>
                <div style={{ padding: '5%' }} className='bg df fdc gap rounded-sm shadow-sm'>
                    <label>Company Logo</label>
                    <File
                        image={image}
                        onChange={setImage}
                        label='Upload Logo'
                    />

                    {fields.map((dat, i) => (
                        <Input
                            key={i}
                            label={dat.label}
                            name={dat.name}
                            placeholder={dat.pl}
                            onChange={onChange}
                            value={data[dat.name]}
                        />
                    ))}

                </div>

                <div className='bg p rounded-sm shadow-sm w-full' style={{ maxWidth: 478 }}>

                    <div className='df jcc fdc aic gap'>

                        <label>Company Image Gallery</label>
                        <ReactSortable
                            list={banner}
                            setList={setBanner}
                            className='df fww gap jcc aic'
                            >
                            {banner.length && banner.map((value, i) => (
                                <img
                                    key={i}
                                    src={URL.createObjectURL(value)}
                                    style={{ objectFit: 'cover', maxWidth: 180, maxHeight: 100 }}
                                    alt='company banners'
                                    className='rounded-sm w-full'
                                />
                            ))}
                        </ReactSortable>
                        <div className='mt w-full'>
                            <FileButton
                                label='Upload'
                                onChange={(file) => {
                                    if (file) {
                                        setBanner([...banner, file])
                                    }
                                }}
                            />
                        </div>

                    </div>
                    <div className='mt'>
                        <h4 className='bold'>About Company</h4>
                        <Editor
                            value={data.about}
                            onChange={(val) => {
                                setData({ ...data, ['about']: val })
                            }}
                            placeholder='About company'
                        />
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: '6%' }} className='p df jce'>
                <button onClick={submit}
                    disabled={!Object.keys(data).length}
                    style={{ maxWidth: 400 }}
                    className='btn p-btn w-full p'>UPDATE</button>
            </div>

        </Layout>
    )
}
