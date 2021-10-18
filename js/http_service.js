function makePromisecall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {          
                if(xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                }
                else if(xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handle 400 client error or 500 server error!");
                }            
        }

        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        }

        xhr.open(methodType, url, async);
        if(data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else 
            xhr.send();
        console.log(methodType + " request sent to server");
    });
}

