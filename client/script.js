const { response } = require("express")

const url = "http://localhost:3000/users"
fetch(url)
.then((response) => { 
    console.log(response);
    return response.json();
})
.then((jsonData) => console.log(jsonData));

