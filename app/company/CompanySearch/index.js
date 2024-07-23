import Autocomplete from '@/UW/Autocomplete'
import Tggr from '@/UW/JS/Trigger'
import onAssign from '@/UW/JS/onAssign'

export default function CompanySearch({ inputClass, setData, ...props }) {

    function Popper({ data, onAction, value }) {

        const handle = ({ _id, company_name }) => {
            setData(onAssign({ company: _id, company_name }))
            onAction()
        },
            handleAdd = () => {
                handle({ _id: 'new', company_name: value })
            }
        if (data.length) {
            return data.map(d => {
                let { company_name, _id } = d
                return <div key={_id} className='option' onClick={Tggr(handle, d)}>{company_name}</div>
            })
        } else if (value) {
            return <div className='px my-2 option'>No Company found {`"${value}"`}</div>
        }
        return <div className='my px text-stone-400'>Search Company</div>

    }

    props.inputClass = inputClass + ' mt-2'

    return <Autocomplete {...props} hintFn='companyHint' Popper={Popper} />
}