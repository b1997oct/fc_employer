const allStatus = ['applied', 'viewed', 'shortlisted', 'interview', 'selected', 'rejected', 'closed', 'inactive', 'withdrawn']

export default function Status(param) {
    if (typeof param === 'number') {
        return allStatus[param - 1]
    }
    return allStatus.indexOf(param) + 1
}
