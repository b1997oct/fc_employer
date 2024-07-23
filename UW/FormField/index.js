import Input from "../Input"
import TextArea from "../Input/TextArea"
import Switch from "../Switch"


export default function FormField({ ftype, ...props }) {

    if (ftype == 'textarea') {
        return <TextArea {...props} />
    } else if (ftype == 'switch') {
        return <Switch {...props} />
    }
    return <Input {...props} />

}
