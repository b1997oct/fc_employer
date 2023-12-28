import { LeftArrow, RightArrow } from '../Icons'
import Tooltip from '../Tooltip'

export default function TableFooter() {
    return (
        <div className='df aic jce gap p bg my mx-1'>
            <button className='icon-btn'>
                <LeftArrow />
            </button>
            <strong>1</strong>
            <button className='icon-btn'>
                <RightArrow />
            </button>
        </div>
    )
}
