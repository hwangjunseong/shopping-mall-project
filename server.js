//protocol 이름 http
//client와 server가 통신하기 위해 활용하는 약속(protocol)
// node js가 가지고 있는 부품(모듈)
let http = require("http");
// let { URL } = require("url");
let url = require("url");

//node js가 알아서 req . res넣어줌
// function onRequest(req, res) {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.write("hello node.js");
//   res.end();
// }
// //localhost:8888
// http.createServer(onRequest).listen(8888);
//우리가 만든 함수로 서버가 일을 하고 client가 8888로 접속
//클라이언트와 서버가 대화하려면 포트번호인 주파수를 맞춰야함
//was : web application server

//body에 데이터 담음
//head에는 웹 서버의 통신 상태를 담음(httpstatuscode), 응답이 어떤형태인지도 담음

//server.js 모듈화
//우리가 만든 서버를 다른 js파일에서 사용가능하게함

function start(route, handle) {
  function onRequest(req, res) {
    // /뒤에 오는 애를 pathname이라함
    let pathname = url.parse(req.url, true).pathname;
    // 예시 URL: http://localhost:3000/somepath?name=example
    // const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    // console.log("reqUrl" + reqUrl);
    // let pathname = reqUrl.pathname;
    //pathname은 localhost:뒤에오는 경로 말함
    // console.log(pathname);

    let queryData = url.parse(req.url, true).query;
    //productId도 넣어줌
    route(pathname, handle, res, queryData.productId);
    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.write("hello node.js");
    // res.end();
  }
  //localhost:8888
  http.createServer(onRequest).listen(8888);
}
//js에서 만든 함수는 이 server.js에서 만든 파일 안에서만 함수역할함
// module.exports = start;
exports.start = start;
