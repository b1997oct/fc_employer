const exp = [...Array.from({ length: 11 }).map((_, d) => `${d + 1} Month${d ? 's' : ''}`), ...Array.from({ length: 30 }).map((_, d) => `${d + 1} Year${d ? 's' : ''}`)]

export const convertExperience = (value) => {
    let i
    if (typeof value === 'number') {
        i = value
        i = (i <= 12 ? i : (i - 12) / 12 + 12) - 1
        return exp[i]
    } else if (value) {
        i = exp.indexOf(value) + 1
        return i <= 12 ? i : (i - 12) * 12 + 12
    }

}