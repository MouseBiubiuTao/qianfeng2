const fs = require("fs");

module.exports = {
    handleHome(req, res) {
        fs.readFile("./files/home.html", "utf-8", (err, data) => {
            if (err) {
                res.end(err.toString());
            } else {
                res.end(data);
            }
        });
    },
    handleImg(req, res) {
        fs.readFile("./files/pet.jpg", "binary", (err, imgData) => {
            if (err) {
                res.end(err.toString());
            } else {
                res.end(imgData, "binary");
            }
        });
    },
};
