function request(url, callBack, method = 'get') {
    const baseUrl = 'http://120.76.247.5:2003/api';
    url = baseUrl + url;

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        const {
            data
        } = JSON.parse(xhr.responseText);

        if (typeof callBack === "function") {
            callBack(data)
        }

    }

    xhr.open(method, url, true);

    xhr.send();
}

function ajax(url, method = 'get') {
    const baseUrl = 'http://120.76.247.5:2003/api';
    url = baseUrl + url;

    const promise = new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            const {
                data
            } = JSON.parse(xhr.responseText);
            resolve(data)
        }

        xhr.open(method, url, true);
        xhr.send();
    })

    return promise
}