const { v2 } = require("cloudinary")

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

const Cloud = v2.uploader

module.exports = Cloud
