const { Schema, model, models } = require("mongoose")

let perm = name => ({
    type: Number,
    max: [3, `/${name} max 10/`]
})

const schema = new Schema({
    recruiter: {
        type: Schema.Types.ObjectId,
        required: [true, '/recruiter is required/'],
    },
    company: {
        type: Schema.Types.ObjectId,
        required: [true, '/company is required/'],
    },
    job: perm('job'),
    company: perm('company'),
    recruiter: perm('recruiter'),
    application: perm('application'),
}, { timestamps: true, versionKey: false })

module.exports = models.Permission || model('Permission', schema);
