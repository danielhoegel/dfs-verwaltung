const moment = require('moment-timezone');

function getId(idString) {
    return isNaN(idString) ? idString : parseInt(idString, 10);
}

function time() {
    return moment().tz('Europe/Berlin').format('YYYY-MM-DDTHH:mm:ss.SSS');
}

module.exports = {
    getId,
    time
};
