/**
 * JSON SERVER
 * https://github.com/typicode/json-server
 */

const jsonServer = require('json-server');

var server = jsonServer.create();
var router = jsonServer.router(require('./router.js')());
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`);
});
