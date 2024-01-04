import { MultiChips } from "@/Components/Chip"
import Select from "@/Components/Select"

const pridict = [
    { id: 0, skill: 'Auto cad' },
    { id: 1, skill: 'Design' },
    { id: 2, skill: 'New Models' },
    { id: 3, skill: 'Solid work' },
    { id: 4, skill: 'AutoCAD' },
    { id: 5, skill: 'Revit' },
    { id: 6, skill: 'Computer-Aided Design (CAD)' },
    { id: 7, skill: 'SketchUp' },
    { id: 8, skill: 'Construction Drawings' },
    { id: 9, skill: 'Construction' },
    { id: 10, skill: 'Architectural Design' },
    { id: 11, skill: 'AutoCAD Architecture' },
    { id: 12, skill: 'Architectural Drawings' },
    { id: 13, skill: 'Architecture' },
    { id: 14, skill: 'Engineering' },
    { id: 15, skill: 'Autodesk Inventor' },
    { id: 16, skill: 'Quality Management.' },
    { id: 17, skill: 'Failure Mode and Effects Analysis (FMEA)' },
    { id: 18, skill: 'Quality Assurance.' },
    { id: 19, skill: 'Production Part Approval Process (PPAP)' },
    { id: 20, skill: 'Advanced Product Quality Planning (APQP)' },
    { id: 21, skill: 'Continuous Improvement.' },
    { id: 22, skill: 'Quality System.' },
    { id: 23, skill: 'Automotive.' },
    { id: 24, skill: 'Accounting' },
    { id: 25, skill: 'Financial Reporting' },
    { id: 26, skill: 'Financial Analysis' },
    { id: 27, skill: 'Account Reconciliation' },
    { id: 28, skill: 'Financial Accounting' },
    { id: 29, skill: 'Microsoft Access' },
    { id: 30, skill: 'General Ledger' },
    { id: 31, skill: 'Accounts Payable' },
    { id: 32, skill: 'Auditing' },
    { id: 33, skill: 'Financial Statements' },
    { id: 34, skill: 'Tax' },
    { id: 35, skill: 'SAP Products' },
    { id: 36, skill: 'Accounts Receivable (AR)' },
    { id: 37, skill: 'Finance' },
    { id: 38, skill: 'GST' },
    { id: 39, skill: 'BRS' },
    { id: 40, skill: 'TDS' },
    { id: 41, skill: 'Balance sheet' },
    { id: 42, skill: 'P&L Account' },
].map(dat => dat.skill)

export default function Skills({ label, skills, pl, setData }) {
    return (
        <Select
            name='skill'
            label={label}
            onChange={(val) => {
                setData(f => ({ ...f, skills: [...skills, val] }))
            }}
            placeholder={pl}
            options={pridict}
            multiple={<MultiChips
                data={skills}
                onDelete={(val) => {
                    setData(prev => ({ ...prev, skills: val }))
                }} />}
        />
    )
}
