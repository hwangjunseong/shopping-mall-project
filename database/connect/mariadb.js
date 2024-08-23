//설치한 모듈 불러오기
const mariadb = require("mysql");
//mysql이 가지고 있는 모듈 사용
const conn = mariadb.createConnection({
  host: "localhost",
  port: 3306, //docker에 mariadb설치할 떄 적은 port번호
  user: "root",
  password: "root",
  database: "Tennis",
});

module.exports = conn;
