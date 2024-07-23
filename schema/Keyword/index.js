const { Schema, model, models } = require("mongoose")

const schema = new Schema({
    keyword: {
        type: String,
        maxlength: [150, '/keyword maxlength 150/']
    },
    type: {
        type: String,
        maxlength: [150, '/name maxlength 150/']
    },
    rank: {
        type: Number,
        default: 0
    }
}, { versionKey: false })

module.exports = models.Keyword || model('Keyword', schema);
