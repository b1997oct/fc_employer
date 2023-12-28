import Modal from "@/Components/Modal";
import LabelValue from '@/Components/LabelValue'

export default function ApprovedModal({ open, onClose }) {
    if (!open) {
        return
    }
    const { name, email, mobile, uid, password } = open
    return (
        <Modal
            open={true}
            onClose={onClose}
            className='zoomIn'
        >
            <h2 className="bold my">{name}</h2>
            <LabelValue
                label='Email'
                value={email}
            />
            <LabelValue
                label='Mobile'
                value={'+91 ' + mobile}
            />
            <div className="df fww gap">
                <LabelValue
                    label='Uid'
                    value={uid}
                />
                <LabelValue
                    label='Password'
                    value={password}
                />
            </div>
        </Modal>)

}
