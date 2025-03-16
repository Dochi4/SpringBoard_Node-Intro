const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err);
            process.exit(1);
        }
        console.log("Data:", data);
    });
}

function catWrite(path, filename) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err);
            process.exit(1);
        }

        fs.writeFile(filename, data, 'utf8', (err) => {
            if (err) {
                console.log(`Couldn't write ${filename}  Error: ENOENT: no such file or directory, open ' ${filename}`);
                process.exit(1);
            }
            console.log(`no output,but ${filename} contains content of ${path}`);
        });
    });
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (e) {
        console.log(`Error Fetching: ${url}`);
        console.log("Error:", e.message);
    }
}

async function webCatWrite(url, filename) {
    try {
        const response = await axios.get(url);
        fs.writeFile(filename, response.data, 'utf8', (err) => {
            if (err) {
                console.log("ERROR:", err);
                process.exit(1);
            }
            console.log(`no output,but ${filename} contains content of ${url}`);
        });
    } catch (e) {
        console.log(`Error Fetching: ${url}`);
        console.log("Error:", e.message);
    }
}

function isURL(str) {
    return str.startsWith("http://") || str.startsWith("https://");
}


const args = process.argv.slice(2);
let outputFile = null;
let input = null;

if (args[0] === "--out") {
    if (args.length < 3) {
        process.exit(1);
    }
    outputFile = args[1];
    input = args[2];
} else {
    input = args[0];
}


if (isURL(input)) {
    if (outputFile) {
        webCatWrite(input, outputFile);
    } else {
        webCat(input);
    }
} else {
    if (outputFile) {
        catWrite(input, outputFile);
    } else {
        cat(input);
    }
}
