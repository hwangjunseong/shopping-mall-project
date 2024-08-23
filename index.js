//우리가 만든 server, router 모듈
let server = require("./server");
let router = require("./router");
let requestHandler = require("./requestHandler");
//mariadb 모듈 부르기
const mariadb = require("./database/connect/mariadb");
mariadb.connect();
//서버 구동
server.start(router.route, requestHandler.handle);
