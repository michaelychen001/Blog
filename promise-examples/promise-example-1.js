const fs = require('fs');
const path = require('path');

function getFileContent(fileName, callback) {

    const fullFileName = path.resolve(__dirname, 'promise-example-files', fileName);

    fs.readFile(fullFileName, (err, data) => {
        if (err) {
            console.error(err);
            return
        }
        callback(
            JSON.parse(data.toString())
        )
    })

}

// Method-1
getFileContent('a.json', aData => {
    console.log("aData: ", aData)
    getFileContent(aData.next, bData => {
        console.log("bData: ", bData)
        getFileContent(bData.next, cData => {
            console.log("cData: ", cData)
        })
    })
})