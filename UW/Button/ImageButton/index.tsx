import React, { useId } from 'react'
import FileButton from '../FileButton'
import { Camera, DeleteOutlined } from '@/UW/Icons'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    image: File | null;
    url: string;
    loading: boolean;
}

export default function ImageButton({ image, url, onChange, loading, ...props }: Props) {

    url = image ? URL.createObjectURL(image) : url

    const reset = () => onChange(null)

    return (
        <div className='df gap-2 aie'>
            <FileButton onChange={onChange} {...props} >
                <div className='h-32 w-32 relative border-dashed border-4 rounded-lg gap df aic jcc '>
                    {url && <img className='object-cover w-full h-full rounded-lg object-contain' src={url} />}
                    <span className='absolute z-10 text-stone-800'><Camera size='32' /></span>
                </div>
            </FileButton>
            {!loading && image && <button className='icon-btn' onClick={reset}><DeleteOutlined size='24' /></button>}
        </div>
    )
}
