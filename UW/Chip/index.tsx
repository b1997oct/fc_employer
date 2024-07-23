const chipTeme = {
    orange: {
        text: `hover:bg-orange-100 text-orange-500 active:bg-orange-100/50`,
        outlined: "border-2 border-orange-200",
        filled: "bg-orange-100 hover:bg-orange-200/70 active:bg-orange-100 text-orange-500"
    },
    gray: {
        text: "hover:bg-gray-100 text-gray-700 active:bg-gray-100/50",
        outlined: 'border-2 border-gray-200/80',
        filled: 'bg-gray-100 hover:bg-gray-200/70 active:bg-gray-100 text-gray-800'
    },
    green: {
        text: "hover:bg-green-100 text-green-500 active:bg-green-100/50",
        outlined: "border-2 border-green-200/80",
        filled: "bg-green-100 hover:bg-green-200/70 active:bg-green-100 text-green-500"
    },
}

type Color = 'gray' | 'green' | 'orange'

const themed = " rounded-full py-1  px-6  "

export default function Chip(color: Color = 'orange') {
    const chip = chipTeme[color]
    chip.outlined = chip.outlined + themed + chip.text
    chip.filled = chip.filled + themed
    chip.text = chip.text + themed
    return chip
}

