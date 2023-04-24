customFetch("https://jsonplaceholder.typicode.com/posts", "GET");
customFetch("https://jsonplaceholder.typicode.com/posts", "POST", {name: "POST data"});
customFetch("https://jsonplaceholder.typicode.com/posts/1", "PUSH", {name: "PUSH data"});
customFetch("https://jsonplaceholder.typicode.com/posts/1", "DELETE");
 
function customFetch(url, type, data) {

    if (type === "GET") {
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => {
            if (res.ok) {
                console.log("HTTP request successful");
            } else {
                console.log("HTTP request unsuccessful");
            }
            return res;
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
        
    }

    if (type === "POST" || type == "PUT") {
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ data }),
        })
        .then((res) => {
            if (res.ok) {
                console.log("HTTP request successful");
            } else {
                console.log("HTTP request unsuccessful");
            }
            return res;
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
        
    }

    if (type === "DELETE") {
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => {
            if (res.ok) {
                console.log("HTTP request successful");
            } else {
                console.log("HTTP request unsuccessful");
            }
        })
        .catch((error) => console.log(error));
    }
}

