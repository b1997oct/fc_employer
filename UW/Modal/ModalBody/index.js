
export default function ModalBody({ className, ...props }) {
    return (
        <div className={'overflow-auto small-scrollbar bg-stone-50 f-1 ' + className} {...props} />
    )
}
