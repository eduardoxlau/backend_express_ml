"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = _interopRequireDefault(require("axios"));

var Api = /*#__PURE__*/function () {
  function Api() {
    (0, _classCallCheck2["default"])(this, Api);
    (0, _defineProperty2["default"])(this, "url", "http://api.mercadolibre.com");
    (0, _defineProperty2["default"])(this, "categories", []);
    (0, _defineProperty2["default"])(this, "author", {
      name: "Rafael",
      lastname: "sanchez"
    });
  }

  (0, _createClass2["default"])(Api, [{
    key: "items",
    value: function () {
      var _items = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(query) {
        var _yield$axios$get, _yield$axios$get$data, results, filters, items;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].get("".concat(this.url, "/sites/MLA/search?q=").concat(query));

              case 2:
                _yield$axios$get = _context.sent;
                _yield$axios$get$data = _yield$axios$get.data;
                results = _yield$axios$get$data.results;
                filters = _yield$axios$get$data.filters;
                items = this.orderItems(results);
                this.categories = this.getCategory(results, filters);
                return _context.abrupt("return", {
                  author: this.author,
                  categories: this.categories,
                  items: items
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function items(_x) {
        return _items.apply(this, arguments);
      }

      return items;
    }()
  }, {
    key: "item",
    value: function () {
      var _item = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        var _yield$axios$get2, data, _yield$axios$get3, plain_text, item;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _axios["default"].get("".concat(this.url, "/items/").concat(id));

              case 2:
                _yield$axios$get2 = _context2.sent;
                data = _yield$axios$get2.data;
                _context2.next = 6;
                return _axios["default"].get("".concat(this.url, "/items/").concat(id, "/description"));

              case 6:
                _yield$axios$get3 = _context2.sent;
                plain_text = _yield$axios$get3.data.plain_text;
                item = {
                  id: data.id,
                  title: data.title,
                  price: {
                    currency: data.currency_id,
                    amount: data.price,
                    decimals: 0
                  },
                  picture: !data.pictures.length ? data.thumbnail : data.pictures[0].url,
                  condition: data.condition,
                  sold_quantity: data.sold_quantity,
                  free_shipping: data.shipping.free_shipping,
                  description: plain_text
                };
                return _context2.abrupt("return", {
                  author: this.author,
                  categories: this.categories,
                  item: item
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function item(_x2) {
        return _item.apply(this, arguments);
      }

      return item;
    }()
  }, {
    key: "orderItems",
    value: function orderItems(elements) {
      var items = elements.map(function (item) {
        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: 0
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping
        };
      });
      return items;
    }
  }, {
    key: "getCategory",
    value: function getCategory(elements) {
      var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var categoriesMap = {};
      var categoryMostCommon = {
        count: 0,
        id: null
      };
      if (!filters.length) return [];
      elements.forEach(function (item) {
        categoriesMap[item.category_id] = (categoriesMap[item.category_id] || 0) + 1;

        if (categoriesMap[item.category_id] > categoryMostCommon.count) {
          categoryMostCommon = {
            count: categoriesMap[item.category_id],
            id: item.category_id
          };
        }
      });
      var category = filters.filter(function (el) {
        return el.id == "category";
      });

      var _category$find = category.find(function (el) {
        return el.id = categoryMostCommon.id;
      }),
          path_from_root = _category$find.values;

      return path_from_root;
    }
  }]);
  return Api;
}();

var _default = Api;
exports["default"] = _default;
//# sourceMappingURL=index.js.map