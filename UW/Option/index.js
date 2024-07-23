function Option({ children, onClick, value }) {
    return <div onClick={() => onClick(value)} className='option'>{children}</div>
}