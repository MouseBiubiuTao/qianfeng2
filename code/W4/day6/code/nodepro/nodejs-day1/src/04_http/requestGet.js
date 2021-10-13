const http = require("http");

// http://v.juhe.cn/todayOnhistory/queryEvent.php?key=7459d5bf4ba9a4d042932f68990292ed&date=1/1
var options = {
    hostname: "v.juhe.cn",
    port: 80,
    method: "GET",
    path: "/todayOnhistory/queryEvent.php?key=7459d5bf4ba9a4d042932f68990292ed&date=9/19",
};

var responseData = "";

var request = http.request(options, (response) => {
    // console.log(response)
    // console.log(response.statusCode)
    // console.log(response.headers)

    response.setEncoding("utf8");
    response.on("data", (chunk) => {
        responseData += chunk;
    });
    response.on("end", () => {
        JSON.parse(responseData).result.forEach((item) =>
            console.log(`${item.date}:${item.title}`)
        );
    });
});

request.on("error", (error) => {
    console.log(error);
});
request.end();
