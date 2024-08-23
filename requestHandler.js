//node js가 제공하는 모듈 file sync
const fs = require("fs");
//file 읽기
const main_view = fs.readFileSync("./main.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html", "utf-8");
//mariadb 모듈 부르기
const mariadb = require("./database/connect/mariadb");
//라우터가 루트를 지정한 후 분배해서 각 경로를 알려주면
//뭐 해야할지 알려주는 애(요청을 받은 것을 처리)
function main(response) {
  console.log("main");
  //sql을 던질 수 있음, 함수도 던짐 인자로 결과값을 담을 rows랑 err던짐
  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  //   response.write("Main page");
  response.write(main_view);

  response.end();
}
// function login(response) {
//   console.log("login");
//   response.writeHead(200, { "Content-Type": "text/html" });
//   response.write("Login page");
//   response.end();
// }
// function junseong(response) {
//   console.log("hwangjunseong");
//   response.writeHead(200, { "Content-Type": "text/html" });
//   response.write("hwangjunseong page");
//   response.end();
// }
function redRacket(response) {
  //이미지를 읽어와라
  fs.readFile("./img/redRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });

    response.write(data);

    response.end();
  });
}
function blueRacket(response) {
  //이미지를 읽어와라
  fs.readFile("./img/blueRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });

    response.write(data);

    response.end();
  });
}
function blackRacket(response) {
  //이미지를 읽어와라
  fs.readFile("./img/blackRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function order(response, productId) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    "INSERT INTO orderlist VALUES(" +
      productId +
      " , '" +
      new Date().toLocaleString() +
      "');",
    function (err, rows) {
      console.log(rows);
    }
  );

  response.write("order-page");

  response.end();
}
function orderlist(response) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query("SELECT * FROM orderlist", function (err, rows) {
    response.write(orderlist_view);
    // console.log(orderlist_view);
    rows.forEach((row) => {
      //   console.log(row.product_id);
      //   console.log(row.order_date);
      //   orderlist_view += `
      //         <tr>
      //             <td> +${row.product_id}</td>
      //             <td> +${row.order_date}</td>
      //         </tr>
      //     `;
      response.write(
        "<tr>" +
          "<td>" +
          row.product_id +
          "</td>" +
          "<td>" +
          row.order_date +
          "</td>" +
          "</tr>"
      );
    });
    response.write("</table>");

    response.end();
  });
}
let handle = {}; //key: value 쌍으로 이루어진 상자

handle["/"] = main;
// handle["/login"] = login; // /login으로 가는 경로는 login함수가함
// handle["/favicon.ico"] = main;
// handle["/junseong"] = junseong;
//router가 productId 줌
handle["/order"] = order;
handle["/orderlist"] = orderlist;
// 이미지 경로
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;
