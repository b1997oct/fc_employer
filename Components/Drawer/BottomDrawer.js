import Drawer from ".";
import CloseButton from "../Button/CloseButton";

export default function BottomDrawer({ open, onClose, children, cn, className = 'edit-drawer' }) {
    return (
        <Drawer
            value={false}
            open={open}
            direction='bottom'
            className={`bottom-drawer ${cn}`}
            onClose={onClose}>
            <CloseButton disabled={Boolean(!onClose)} onClick={onClose} />
            <div className={className}>
                {children}
            </div>
        </Drawer>
    )
}