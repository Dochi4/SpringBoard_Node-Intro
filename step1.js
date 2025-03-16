const fs = require('fs');


function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err)
            process.exit(1)
        }
        console.log("Data:", data)

    })
}

const filePath = process.argv[2];

if (filePath) {
    cat(filePath)
} else {
    console.log("ERROR:", err)
    process.exit(1)
}