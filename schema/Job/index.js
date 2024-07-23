const { Schema, model, models } = require("mongoose")

const schema = new Schema({
    status: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    recruiter: {
        type: Schema.Types.ObjectId,
        required: [true, '/recruiter is required/'],
    },
    company: {
        type: Schema.Types.ObjectId,
        required: [true, '/company is required/'],
    },
    title: {
        type: String,
        required: [true, '/title is required/'],
        minlength: [3, '/title min 3 required/'],
        trim: true,
        maxlength: [150, '/title max is 150/']
    },
    jobType: {
        type: String,
        required: [true, '/jobType is required/'],
        minlength: [5, '/jobType min 5 required/'],
        maxlength: [50, '/jobType max is 50/']
    },
    workMode: {
        type: String,
        required: [true, '/workMode is required/'],
        minlength: [5, '/workMode min 5 required/'],
        maxlength: [50, '/workMode max is 50/']
    },
    workLocation: {
        type: String,
        maxlength: [300, '/workLocation max is 300/'],
    },
    salaryUnit: {
        type: String,
        required: [true, '/salaryUnit is required/'],
        minlength: [1, '/salaryUnit min 1 required/'],
        maxlength: [50, '/salaryUnit max is 50/'],
    },
    minSalary: {
        type: Number,
        required: [true, '/minSalary is required/'],
        min: [1, '/minSalary must be greater 0/'],
        max: [1000000, '/minSalary is 1000000 or less/']
    },
    maxSalary: {
        type: Number,
        max: [1000000, '/maxSalary is 1000000/']
    },
    salary: Number,
    minExp: {
        type: Number,
        required: [true, '/minExp is required/'],
        min: [0, '/minExp is 20 years only/'],
        max: [20, '/minExp is 20 years only/']
    },
    maxExp: {
        type: Number,
        default: 0,
        max: [20, '/maxExp is 20 years only/']
    },
    education: {
        type: String,
        required: [true, '/education is required/'],
        maxlength: [100, '/education max is 100/'],
    },
    stream: {
        type: String,
        maxlength: [100, '/stream max 100/'],
    },
    skills: [String],
    perks: [String],
    totalOpenings: {
        type: Number,
        required: [true, '/jd is required/'],
        min: [1, '/openings min 10 required/'],
        max: [1000, '/oprnings max 1000/'],
    },
    deadline: {
        type: String,
        minlength: [1, '/deadline min 1 required/'],
        maxlength: [50, '/deadline max 50/'],
    },
    lastDate: {
        type: String,
        maxlength: [50, '/lastDate max 50/'],
    },
    jd: {
        type: String,
        required: [true, '/jd is required/'],
        minlength: [10, '/jd min 10 required/'],
        maxlength: [1000, '/jd max 1000/'],
        trim: true
    },
    notes: {
        type: String,
        maxlength: 1000
    },
    active: {
        type: Boolean,
        default: false
    },
}, { timestamps: true, versionKey: false })


module.exports = models.Job || model('Job', schema);
