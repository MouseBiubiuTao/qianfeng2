var http = require("http");
var url = require("url");
var router = require("./modules/router");

http.createServer(
    function (request, response) {

        console.log(request.url);
        console.log(url.parse(request.url).pathname);

        if (request.url !== "/favicon.ico") {

            var pathName = url.parse(request.url).pathname.replace(/\//, "");
            console.log("pathName=", pathName);//login home img register

            try {
                router[pathName](request, response);
            } catch (err) {
                router["home"](request, response);
            }
            
        }

    }
).listen(
    8000,
    ()=>console.log("Server running at http://localhost:8000")
);
