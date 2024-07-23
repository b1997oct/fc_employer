import { ArrowDown } from "@/UW/Icons";

export default function CollapeArrow({ open, size }) {
    return <button className={`icon-btn ${open ? 'rotate-180' : ''} duration-500`}>
        <ArrowDown size={size} />
    </button>

}
