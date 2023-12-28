import useBody from '../Hooks/useBody'
import styles from './styles.module.css'


const getDirectionStyle = (dir, open) => {
    switch (dir) {

        case 'right':
            return {
                top: 0,
                right: 0,
                transform: `translate3d(100%, 0, 0)`,
                height: '100vh',
            }
        case 'bottom':
            return {
                left: 0,
                right: 0,
                bottom: 0,
                transform: 'translate3d(0, 100%, 0)',
                width: '100%',
            }
        case 'top':
            return {
                left: 0,
                right: 0,
                top: 0,
                transform: 'translate3d(0, -100%, 0)',
                width: '100%',
            }

        default:
            return {
                top: 0,
                left: 0,
                transform: `translate3d(-100%, 0, 0)`,
                height: '100vh',
            }
    }
}


export default function Drawer({ open, onClose, duration = 300, direction, children, }) {

    useBody(open)

    const drawer = {
        zIndex: 500,
        transitionDuration: `${duration}ms`,
        ...getDirectionStyle(direction),
    }

    drawer.transform = open ? 'translate3d(0,0,0)' : drawer.transform;


    return (
        <div className={`${styles.container} ${open ? styles.df : styles.hide}`}>
            <div style={drawer} className={`${styles.drawer}`}>
                {children}
            </div>
            <div
                role='button'
                className={styles.backdrop}
                style={{
                    zIndex: 400,
                    backgroundColor: '#0008',
                }}
                onClick={onClose}
            />
        </div>
    )
}
