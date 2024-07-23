import LabelValue from '@/UW/LabelValue'

export default function LVArray(arr) {
    return arr.map(d => <LabelValue key={d.label} {...d} />)
}
