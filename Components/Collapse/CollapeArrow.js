import { ArrowDown } from "../Icons";

export default function CollapeArrow({ open }) {
    return <button className='icon-btn'
        style={{ transform: open ? 'rotate(180deg)' : '', transition: 'all 500ms' }}>
        <ArrowDown size={30} />
    </button>

}
