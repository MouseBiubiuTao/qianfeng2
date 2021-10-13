const request = require("request");

request(
    {
        // url: "https://api.douban.com/v2/movie/top250",
        url: "http://v.juhe.cn/todayOnhistory/queryEvent.php?key=7459d5bf4ba9a4d042932f68990292ed&date=9/18",
        json: true,
    },
    (error, response, body) => {
        console.log(JSON.stringify(body, null, 2));
    }
);
