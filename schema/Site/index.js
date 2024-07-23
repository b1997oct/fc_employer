const { Schema, model, models } = require("mongoose")

const schema = new Schema({
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
        required: [true, '/password is required/'],
        minlength: [4, '/password min 4 required/'],
        maxlength: [16, '/password max is 16/']
    }
}, { timestamps: true, versionKey: false })

module.exports = models.Site || model('Site', schema);
