import { useId } from "react"

export default function File({ image, label, onChange, style }) {

    return (
        <div style={{ width: 100, height: 100, ...style }} className="relative">
            {image ?
                <img className="image" src={URL.createObjectURL(image)} alt="logo" />
                :
                <FileButton label={label} onChange={onChange} />
            }
            {image &&
                <button className="icon-btn absolute"
                    style={{ right: -32, bottom: 0 }}
                    onClick={() => {
                        onChange(null)
                    }}>R</button>}
        </div>
    )
}

export function FileButton({ label, onChange }) {
    const id = useId()
    return (
        <button
            onClick={() => {
                document.getElementById(id).click()
            }}
            className='btn w-full h-full'>
            {label}
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