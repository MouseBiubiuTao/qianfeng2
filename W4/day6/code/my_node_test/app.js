const http = require("http");
const url = require("url");
const { handleLogin, handleRegister } = require("./handlers/user");
const { getWeather } = require("./handlers/weather");
const { handleHome, handleImg } = require("./handlers/file");

http.createServer((req, res) => {
    console.log(req.url);

    if (req.url !== "/favicon.ico") {
        const path = url.parse(req.url).pathname;
        console.log(path);

        switch (path) {
            case "/login":
                // res.end("you wantto login");
                handleLogin(req, res);
                break;

            case "/register":
                // res.end("you want to register");
                handleRegister(req, res);
                break;

            case "/weather":
                // res.end("you want to register");
                getWeather(req, res);
                break;

            case "/home":
                // res.end("you want to register");
                handleHome(req, res);
                break;

            case "/img":
                // res.end("you want to register");
                handleImg(req, res);
                break;

            default:
                res.end("i dont know what the fuck do you want");
                break;
        }
    }
}).listen(3000, () => console.log("server is running on 3000"));
