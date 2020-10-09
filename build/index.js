"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

var app = (0, _express["default"])();
var port = process.env.PORT ? process.env.PORT : 3000;
app.use("/api", _routes["default"]);
app.get("/", function (req, res) {
  res.send("hello world");
});
app.listen(port, function () {
  return console.log("works in port ", port);
});
//# sourceMappingURL=index.js.map