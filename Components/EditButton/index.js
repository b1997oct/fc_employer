import { DriveFileRenameOutline } from "../Icons";

export default function EditButton({ value, onClick }) {
    return (
        <button
            onClick={() => onClick(value)}
            className='icon-btn'>
            <DriveFileRenameOutline />
        </button>
    )
}

