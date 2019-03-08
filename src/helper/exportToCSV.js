import { isNotEmpty } from "./helper";

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

export default function exportToCSV(arrayOfObjects, fileName = 'Export') {
    if (!arrayOfObjects.length) {
        alert('Keine Einträge vorhanden, die exportiert werden könnten.');
        return;
    };

    const csvRows = [];
    const keys = ['id', 'matrikelnummer', 'firstName', 'lastName', 'prefix', 'birthDate', 'birthPlace', 'birthCountry', 'street', 'streetNumber', 'addressExtra', 'postal', 'city', 'country', 'mailPrimary', 'mailSecondary', 'phoneNumber', 'mobileNumber'];

    // header
    csvRows.push(arrayToCSVRow(keys));

    // body
    arrayOfObjects.forEach(item => {
        const nextRow = keys.map(key => isNotEmpty(item[key]) ? item[key] : '');
        csvRows.push(arrayToCSVRow(nextRow));
    }); 

    downloadCSV(csvRows.join('\n'), fileName);
}