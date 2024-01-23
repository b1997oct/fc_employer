import { DriveFileRenameOutline } from "../../Icons";

export default function EditButton({ value, onClick, size }) {
    return (
        <button
            onClick={() => {
                onClick && onClick(value)
            }}
            className='icon-btn p'>
            <DriveFileRenameOutline size={size} />
        </button>
    )
}

