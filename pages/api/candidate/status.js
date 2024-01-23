import Status from "@/PagesComponents/Candidates/Status";
import dbConnect from "@/lib/db"
import AppliedJob from "@/schema/Job/AppliedJob";
import Msg from "@/schema/Job/Msg";
import Notify from "@/schema/Job/Notify";


export default async function Viewed(req, res) {

    try {
        await dbConnect();

        let data
       
        const { reason, status, id, hold } = req.body
        if (status < 3) {
            return res.status(400).json({ message: 'this application has been moved to next step' })
        }

        data = await AppliedJob.findById(id)

        if (data.status == 9) {
            return res.status(400).json({ message: 'cont change status bcz this application withdrawed' })
        }
        data.hold = hold
        data.reason = reason
        if (typeof hold === 'boolean') {
            await data.save()
            return res.status(200).json({ data })
        }
        if (status) {
            data.status = status
        }
        await data.save()

        let msg = await Msg.findOne({ type: Status(status) }).select("-description -type")
        if (msg) {
            const link = `/user/job/${data.job}`
            let find = await Notify.findOne({ user: data.user, link, type: 'JOB_STATUS' })
            if (!find) {
                find = new Notify({ user: data.user, link, type: 'JOB_STATUS' })
            }
            find.description = msg._id
            await find.save()
        }

        return res.json({ message: 'Status updated successfully', data })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
