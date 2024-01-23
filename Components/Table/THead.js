
export default function THead({ fields }) {
    return (
        <thead className="thead">
            <tr>
                {fields.map((dat, i) => {

                    if (typeof dat === 'string') {
                        return <th key={i} className='py'>{dat}</th>
                    }
                    const { label, ...props } = dat
                    return <th key={i} style={props} className='py'>{label}</th>
                })}
            </tr>
        </thead>
    )
}
