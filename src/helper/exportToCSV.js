/**
 * source: https://stackoverflow.com/a/38021207/8936417
 */
function downloadCSV(csvContent, fileName) {
    const encodedURI = encodeURI(csvContent);
    const link = document.createElement('a');

    link.setAttribute('href', 'data:text/csv;charset=UTF-8,%EF%BB%BF' + encodedURI);
    link.setAttribute('download', `${fileName}_${Date.now()}.csv`);
    
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link); 
}

function arrayToCSVRow(dataArray) {
    return dataArray.join(';');
}

function objectToCSVRow(dataObject) {
    return arrayToCSVRow(Object.values(dataObject));
}


export default function exportToCSV(arrayOfObjects, fileName = 'Export') {
    if (!arrayOfObjects.length) return;

    const csvRows = [];

    // header
    csvRows.push(arrayToCSVRow(Object.keys(arrayOfObjects[0])));

    // body
    arrayOfObjects.forEach(item => {
        csvRows.push(objectToCSVRow(item));
    }); 

    downloadCSV(csvRows.join('\n'), fileName);
}