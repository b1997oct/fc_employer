
export default function Checkbox({ className, name, checked, value, onChange, label }) {
    return (
        <div className={`df aic gap-2 ${className}`}>
            <input
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                type="checkbox"
                id='background'
            />
            <label htmlFor="background" className="bold">{label}</label>
        </div>
    )
}
