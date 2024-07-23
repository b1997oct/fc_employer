const Keyword = require("@/schema/Keyword");

async function keywordSearch({ keyword, type }) {
    type = type.toLowerCase()
    keyword = new RegExp(keyword, 'i')
    let data = await Keyword.find({ type, keyword }).limit(24)
    return data
}

async function keyword({ keyword, type }) {
    type = type.toLowerCase()
    let val = new RegExp(keyword, 'i')
    let data = await Keyword.findOne({ keyword: val, type })
    if (!data) {
        data = new Keyword({ type, keyword })
    }
    data.rank++
    await data.save()
    return data
}

export default { keywordSearch, keyword }