import { Schema, model, models } from "mongoose";

const salary = {
    type: Number,
    trim: true,
    max: [1000000, "/ctc must be less than 1000000/"]
},
    salary_unit = {
        type: String,
        trim: true,
        default: 'month',
        maxlength: [20, "/ctc unit must be less than 20 char/"]
    },
    skills = new Schema({
        skill: {
            type: String,
            trim: true,
            minlength: [3, '/min length 3 char/'],
            maxlength: [50, '/max length 50 validation failed/']
        },
        experience: {
            type: Number,
            max: [10000, '/level validation failed/'],
        },
    }, { _id: false })

function arrayLimit(val) {
    return val && val.length <= 10;
}

const schema = new Schema({
    name: {
        type: String,
        maxlength: [50, '/name max length is 50'],
        required: [true, '/name is required field'],
    },
    email: {
        type: String,
        maxlength: [50, '/email max length is 50'],
    },
    mobile: {
        type: String,
        unique: true,
        required: [true, '/mobile number is required field'],
        maxlength: [10, '/mobile number max length is 10'],
        minlength: [10, '/mobile number min length is 10'],
    },
    password: {
        type: String,
        required: [true, '/password is required field'],
        select: false,
    },
    gender: {
        type: String,
        maxlength: [20, '/gender should be less than 20 characters/'],
    },
    dob: {
        type: String,
        maxlength: [20, '/dob should be less than 20 characters/'],
    },
    marital_status: {
        type: String,
        maxlength: [20, '/marital status should be less than 20 characters/']
    },
    image: {
        type: String
    },
    referral: {
        type: String,
        maxlength: [50, '/referral max length is 50'],
    },
    area: {
        type: String,
        trim: true,
        maxlength: [200, "/area-address line must be less than 50 char"]
    },
    city: {
        type: String,
        trim: true,
        maxlength: [50, "/city must be less than 50 char"]
    },
    state: {
        type: String,
        trim: true,
        maxlength: [50, "/state must be less than 50 char"]
    },
    pin: {
        type: Number,
        maxlength: [6, "/pincode must be less than 6 number"]
    },
    designation: {
        type: [{
            type: String,
            trim: true,
            maxlength: [50, "/designation must be less than 50 char/"]
        }],
        validate: [arrayLimit, '/designation must have at most 10 values/']
    },
    industry: {
        type: String,
        trim: true,
        maxlength: [50, "/industry must be less than 50 char/"]
    },
    functional_area: {
        type: [{
            type: String,
            trim: true,
            maxlength: [50, "/functional_area must be less than 50 char/"]
        }],
        validate: [arrayLimit, '/industry must have at most 10 values/']
    },
    languages: {
        type: [{
            type: String,
            trim: true,
            maxlength: [50, "/languages must be less than 50 char/"]
        }],
        validate: [arrayLimit, '/languages must have at most 10 values/']
    },
    isFresher: {
        type: Boolean,
    },
    notice_period: {
        type: Number,
        max: [365, "/notice period must be less than 365 char/"]
    },
    total_experience: {
        type: Number,
        max: [50, "/total_experience must be less than 50/"]
    },
    cctc: salary,
    cctc_unit: salary_unit,
    ectc: salary,
    ectc_unit: salary_unit,
    working_status: {
        type: String,
        trim: true,
        maxlength: [20, "/expected ctc must be less than 3 char/"]
    },
    skills: [skills],
    resume: {
        type: String
    },
    collage: {
        type: String,
        trim: true,
        maxlength: [50, "/collage must be less than 50 char/"]
    },

    degree: {
        type: String,
        trim: true,
        maxlength: [50, "/degree must be less than 50 char/"]
    },
    combination: {
        type: String,
        trim: true,
        maxlength: [50, "/branch must be less than 50 char/"]
    },
    ed_status: {
        type: String,
        trim: true,
        enum: ["Completed", "Pursuing", "Incomplete"]
    },
    completion_year: {
        type: String,
        max: [9999, "/completion year must be less than 9999 char/"]
    },
    grade: {
        type: Number,
        max: [10, "/grade must be less than 10/"],
    },
}, { timestamps: true, versionKey: false })


export default models.User || model('User', schema);