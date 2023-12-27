import { Schema, model, models } from "mongoose";

const schema = new Schema({


}, { timestamps: true, versionKey: false })



export default models.Company || model('Company', schema);
