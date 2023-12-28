
export default function THead({ fields }) {
    return (
        <thead className="thead">
            <tr>
                {fields.map((dat, i) => {

                    if (typeof dat === 'string') {
                        return <td key={i} className='py'>{dat}</td>
                    }
                    const { label, ...props } = dat
                    return <td key={i} style={props} className='py'>{label}</td>
                })}
            </tr>
        </thead>
    )
}
