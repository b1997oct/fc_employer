const { Schema, model, models } = require("mongoose")

let perm = name => ({
    type: Number,
    default: 0,
    max: [3, `/${name} max 10/`]
})

const schema = new Schema({
    name: {
        type: String,
        minlength: [10, '/mobile min 1/'],
        required: [true, '/mobile is required/'],
        maxlength: [10, '/mobile max 10/'],
        trim: true
    },
    password: {
        type: String,
        maxlength: [16, '/mobile max 10/']
    },
    mobile: {
        type: String,
        minlength: [10, '/mobile min 1/'],
        required: [true, '/mobile is required/'],
        maxlength: [10, '/mobile max 10/'],
        trim: true
    },
    email: {
        type: String,
        minlength: [5, '/email min 5/'],
        required: [true, '/email is required/'],
        trim: true,
        maxlength: [100, '/email max 100/'],
    },
    job: perm('job'),
    company: perm('company'),
    recruiter: perm('recruiter'),
    application: perm('application'),
    user: perm('user'),
    settings: perm('settings'),
    team: perm('team')
}, { timestamps: true, versionKey: false })

module.exports = models.Team || model('Team', schema);
