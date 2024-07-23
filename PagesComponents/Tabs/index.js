import Tggr from "@/UW/JS/Trigger"
import Tab from "@/UW/Tab"

export default function Tabs({ value, tabs, onChange }) {

    return <div className="border-b pt df gap mb">
        {tabs.map(d => {
            return <Tab active={d == value} key={d} onClick={Tggr(onChange, d)}>{d}</Tab>
        })}
    </div>
}