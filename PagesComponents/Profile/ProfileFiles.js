import { Camera } from "@/Components/Icons"
import { useId } from "react"

export function Logo({ image, onChange, open, url }) {

    const imgUrl = image ? URL.createObjectURL(image) : url || ''

    return (
        <div style={{ width: 75, height: 75 }} className="relative skt rounded-sm">
            {imgUrl && <img
                style={{ width: 75, height: 75 }}
                className="hidden rounded-sm image"
                src={imgUrl}
                alt="logo"
            />}
            {open &&
                <UploadButton
                    className="absolute"
                    style={{ right: -16, bottom: 1, padding: 2, zIndex: 'auto', }}
                    onChange={onChange}>
                    <Camera />
                </UploadButton>}
        </div>
    )
}

export function Banner({ image, height, open, onChange }) {
    const url = image && typeof image === 'object' ? URL.createObjectURL(image) : typeof image === 'string' ? image : ''
    return (
        <div style={{ height }} className='skt rounded-sm relative hidden'>
            {url && <img className="image" alt='banner' src={url} />}
            {open && <UploadButton
                style={{ right: 12, bottom: 12, zIndex: 'auto', fontSize: 18 }}
                className="click absolute"
                onChange={onChange}
            >
                Banner <Camera />
            </UploadButton>}
        </div>
    )
}

export function UploadButton({ onChange, className, children, ...props }) {

    const id = useId()

    return (
        <button
            onClick={() => {
                document.getElementById(id).click()
            }}
            className={`upload-btn ${className}`}
            {...props}>
            {children}
            <input
                id={id}
                onChange={(e) => {
                    onChange(e.target.files[0])
                }}
                type="file"
                accept="image/*"
                hidden
            />
        </button>
    )
}