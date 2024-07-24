'use client'
import dynamic from 'next/dynamic';
import React, { useId, useState } from 'react'
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { loading: 'Loading...', ssr: false })



const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 0] }],
        [{ bold: true }, { list: 'bullet' }, { list: 'ordered' }],
        ['link'],
    ],
    clipboard: {
        matchVisual: false,
    }   
}

const formats = ['header', 'size', 'bold', 'list', 'bullet', 'link']

export default function Editor({ value = '', name, onChange, errorText, touched, placeholder, className, label }) {

    let id = useId(),
        [b, setB] = useState(false),
        err = (b || touched) && Boolean(errorText),
        handle = val => {
            onChange?.({ target: { name, value: val } })
        }

    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <ReactQuill
                value={value}
                modules={modules}
                onChange={handle}
                className='editor mt-1'
                onBlur={() => setB(true)}
                formats={formats}
                placeholder={placeholder}
            />
            {err && <div className="ce">{errorText}</div>}
        </div>
    )
}

