const { Schema, model, models } = require("mongoose")

const schema = new Schema({
    keyword: {
        type: Schema.ObjectId,
        required: [true, '/keyword is required/']
    },
    rank: {
        type: Number,
        default: 0
    }
}, { versionKey: false })

module.exports = models.Keyword || model('Keyword', schema);
