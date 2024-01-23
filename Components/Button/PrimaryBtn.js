
export default function PrimaryBtn({ className, onClick, ...props}) {
  return (
    <button  className={`btn rounded px-4 py primary-bg click ${className}`} onClick={onClick} {...props} />
  )
}

