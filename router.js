//route를 호출하는 애는 server
function route(pathname, handle, response, productId) {
  console.log("pathname: " + pathname);
  if (typeof handle[pathname] === "function") {
    //함수처럼 부를수있는 소괄호 붙여줌
    handle[pathname](response, productId);
  } else {
    //function이 아니면
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("page not found");
    response.end();
  }
}
exports.route = route;
