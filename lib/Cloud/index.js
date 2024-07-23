const { v2 } = require("cloudinary")
const CLOUD_NAME = process.env.CLOUD_NAME
const CLOUD_KEY = process.env.CLOUD_KEY
const CLOUD_SECRET = process.env.CLOUD_SECRET

v2.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET
})

const Cloud = v2.uploader

module.exports = Cloud
