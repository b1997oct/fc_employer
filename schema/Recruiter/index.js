import { Schema, model, models } from "mongoose"

let perm = name => ({
    type: Number,
    max: [3, `/${name} max 10/`]
})

const schema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        required: [true, '/firm is required/'],
    },
    isAdmin: Boolean,
    name: {
        type: String,
        required: [true, '/name is required/'],
        minlength: [1, '/name min 1 required/'],
        maxlength: [50, '/name max is 50/']
    },
    email: {
        type: String,
        required: [true, '/email is required/'],
        minlength: [3, '/email min 3 required/'],
        maxlength: [50, '/email max is 50/']
    },
    mobile: {
        type: String,
        required: [true, '/mobile is required/'],
        minlength: [10, '/mobile min 10 required/'],
        maxlength: [15, '/mobile max is 15/']
    },
    password: {
        type: String,
        // minlength: [4, '/password min 4 required/'],
        // maxlength: [16, '/password max is 16/']
    },
    job: perm('job'),
    profile: perm('companyProfile'),
    recruiter: perm('recruiter'),
    application: perm('application'),
}, { timestamps: true, versionKey: false })

export default models.Recruiter || model('Recruiter', schema);
