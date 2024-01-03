import Input from '../Input'
import Select, { StaticSelect } from '../Select'

export default function FormElement({ value, onChange, label, type, name, options, placeholder, active, error, errorText }) {

    if (type === 'select') {
        return (
            <Select
                name={name}
                value={value}
                onChange={onChange}
                label={label}
                active={active}
                error={error}
                errorText={errorText}
                options={options}
                placeholder={placeholder}
           />
           
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
