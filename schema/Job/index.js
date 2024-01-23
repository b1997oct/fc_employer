const { Schema, models, model } = require("mongoose");

const schema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        required: [true, '/company or org is required/'],
    },
    job_role: {
        type: String,
        required: true,
        maxlength: 200,
        trim: true
    },
    company_name: {
        type: String,
        required: true
    },
    company_logo: {
        type: String,
    },
    education: {
        type: String,
    },
    experience: {
        type: String,
        required: true
    },
    jd: {
        type: String,
        required: true
    },
    job_type: {
        type: String,
        required: true
    },
    total_openings: {
        type: String,
    },
    location: {
        type: String,
    },
    work_mode: {
        type: String,
        required: [true, '/work mode is required/']
    },
    lost_date: {
        type: String,
    },
    salary: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    verified: {
        type: Boolean,
    },
    publish: {
        type: Boolean,
        default: false
    },
    status: {
        type: Number,
        max: 4
    },
    admin_posted: {
        type: Boolean
    },
}, {
    timestamps: true,
    versionKey: false
})


export default models.Job || model('Job', schema);