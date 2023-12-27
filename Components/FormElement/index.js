import Input from '../Input'
import { StaticSelect } from '../Select'

export default function FormElement({ value, onChange, label, type, name, options, placeholder, active, error, errorText }) {

    if (type === 'select') {
        return (
            <StaticSelect
                name={name}
                value={value}
                onChange={onChange}
                label={label}
                active={active}
                error={error}
                errorText={errorText}
            >
                {options.map((d, ind) => <option key={ind} value={d}>{d}</option>)}
            </StaticSelect>
        )
    }

    return (
        <Input
            label={label}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            active={active}
            error={error}
            errorText={errorText}
        />)

}
