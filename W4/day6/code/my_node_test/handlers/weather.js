const getWeather = (req,res)=>{
    res.end("sunny or cloudy")
}

// module.exports.getWeather = getWeather
module.exports = {
    getWeather
}