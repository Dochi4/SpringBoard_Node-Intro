const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err)
            process.exit(1)
        }
        console.log("Data:", data)

    })
}


async function webCat(url) {
    try {
        await axios.get(url).then(function (response) {
            this.markDownData = response.data
            console.log(this.markDownData)
        });
    } catch (e) {
        console.log(`Error Fetching: ${url}`)
        console.log("Error:", e.message)
    }
}

function isURL(str) {
    return str.startsWith("http://") || str.startsWith("https://")
}

const filePath = process.argv[2];

if (isURL(filePath)) {
    webCat(filePath)
} else {
    cat(filePath)
}



