import React, { useId } from 'react'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    accept: string
}

export default function FileButton({ onChange, accept='image/*', ...props }: Props) {

    const id = useId()

    function handleChange(e) {
        onChange(e.target.files[0])
    }

    return (
        <>
            <input id={id} type='file' onChange={handleChange} hidden accept={accept} />
            <label htmlFor={id} {...props} />
        </>
    )
}
