const { Schema, model, models } = require("mongoose")

const schema = new Schema({
    companyName: {
        type: String,
        required: [true, '/companyName is required/'],
        minlength: [3, '/companyName min 3 required/'],
        trim: true,
        maxlength: [150, '/companyName max is 150/']
    },
    industry: {
        type: String,
        required: [true, '/industry is required/'],
        minlength: [5, '/industry min 5 required/'],
        trim: true,
        maxlength: [500, '/industry max is 500/']
    },
    functionalArea: {
        type: String,
        required: [true, '/functionalArea is required/'],
        minlength: [5, '/functionalArea min 5 required/'],
        trim: true,
        maxlength: [500, '/functionalArea max is 500/']
    },
    businessNature: {
        type: String,
        required: [true, '/businessNature is required/'],
        minlength: [3, '/businessNature min 3 required/'],
        trim: true,
        maxlength: [500, '/businessNature max is 500/']
    },
    category: {
        type: String,
        required: [true, '/category is required/'],
        minlength: [3, '/category min 3 required/'],
        trim: true,
        maxlength: [500, '/category max is 500/']
    },
    location: {
        type: String,
        maxlength: [500, '/location max is 500/']
    },
    mapLink: {
        type: String,
        maxlength: [500, '/mapLink max is 500/']
    },
    website: {
        type: String,
        maxlength: [150, '/website max is 500/'],
    },
    address: {
        type: String,
        required: [true, '/address is required/'],
        minlength: [10, '/address min 10 required/'],
        maxlength: [300, '/address max is 300/'],
        trim: true
    },
    about: {
        type: String,
        required: [true, '/about is required/'],
        minlength: [20, '/about min 20 required/'],
        trim: true,
        maxlength: [500, '/about max is 500/'],
    },
    active: Boolean,
    approved: Boolean
}, { timestamps: true, versionKey: false })


module.exports = models.Company || model('Company', schema);

