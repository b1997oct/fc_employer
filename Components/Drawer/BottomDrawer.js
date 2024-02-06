import Drawer from ".";
import CloseButton from "../Button/CloseButton";

export default function BottomDrawer({ open, onClose, children, cn, className = 'edit-drawer' }) {
    return (
        <Drawer
            value={false}
            open={open}
            direction='right'
            className={`bottom-drawer ${cn}`}
            onClose={onClose}>
            <CloseButton disabled={Boolean(!onClose)} onClick={onClose} />
            <div className={className}>
                <div style={{ maxWidth: 700, margin: 'auto', marginBottom:24 }} className="border p rounded-sm">
                    {children}
                </div>
            </div>
        </Drawer>
    )
}