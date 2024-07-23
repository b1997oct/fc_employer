import { Close } from "@/UW/Icons"
import { CldImage } from "next-cloudinary"


export default function ImagePriview({ image, onDelete }) {

    const show = typeof image == 'object',
        url = show ? URL.createObjectURL(image) : image

    return (
        <div className="relative">
            <CldImage
                src={url}
                alt='product'
                className='object-contain w-36 h-36'
                width='144'
                height='144'
            />
            {show &&
                <button className="icon-btn absolute -top-4 right-0" onClick={onDelete}>
                    <Close />
                </button>}
        </div>
    )

}
