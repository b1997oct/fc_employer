import { Close } from "@/Components/Icons";

export default function CloseButton({ onClick, value, disabled }) {
    return (
        <div className='df jce'>
            <button className='icon-btn' disabled={disabled} onClick={() => onClick && onClick(value)}>
                <Close size={32} />
            </button>
        </div>
    )
}
