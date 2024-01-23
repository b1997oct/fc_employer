import Input from '../Input'
import { SelectReadOnly } from '../Select'

export default function FormElement({ value, onChange, label, type, name, options, placeholder, active, error, errorText, readOnly }) {

    if (type === 'select') {
        return (
            <SelectReadOnly
                name={name}
                value={value}
                onChange={onChange}
                label={label}
                active={active}
                error={error}
                errorText={errorText}
                options={options}
                placeholder={placeholder}
                readOnly={readOnly}
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
