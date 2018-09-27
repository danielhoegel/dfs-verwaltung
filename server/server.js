/**
 * JSON SERVER
 * https://github.com/typicode/json-server
 */

module.exports = () => {
    return {
        studenten: require('./tables/studenten.js'),
        faecher: require('./tables/faecher.js'),
        veranstaltungen: require('./tables/veranstaltungen.js'),
        noten: require('./tables/noten.js'),
        studienkurse: require('./tables/studienkurse.js'),
        studienordnungen: require('./tables/studienordnungen.js'),
    }
}
