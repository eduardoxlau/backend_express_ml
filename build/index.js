"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

var app = (0, _express["default"])();
app.use("/api", _routes["default"]);
app.get("/", function (req, res) {
  res.send("hello world");
});
app.listen(3000, function () {
  return console.log("works");
});
//# sourceMappingURL=index.js.map