'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-register');


var isProduction = process.env.NODE_ENV === 'production';
var isDeveloping = !isProduction;

var app = (0, _express2.default)();
var router = (0, _express.Router)();

// Webpack developer
if (isDeveloping) {
  var compiler = (0, _webpack2.default)(_webpack4.default);
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: _webpack4.default.output.publicPath,
    noInfo: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

//  RESTful API
var publicPath = _path2.default.resolve(_path2.default.join(__dirname, 'public'));
app.use(_bodyParser2.default.json({ type: 'application/json' }));
app.use(_express2.default.static(publicPath));

var port = isProduction ? process.env.PORT || 80 : 3000;

// this is necessary to handle URL correctly since client uses Browser History
app.get('*', function (req, res) {
  res.sendFile(_path2.default.resolve(__dirname, '', '../index.html'));
});

app.listen(port, function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Server running on port ' + port);
});
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(isProduction, 'isProduction', 'src/app.js');

  __REACT_HOT_LOADER__.register(isDeveloping, 'isDeveloping', 'src/app.js');

  __REACT_HOT_LOADER__.register(app, 'app', 'src/app.js');

  __REACT_HOT_LOADER__.register(router, 'router', 'src/app.js');

  __REACT_HOT_LOADER__.register(publicPath, 'publicPath', 'src/app.js');

  __REACT_HOT_LOADER__.register(port, 'port', 'src/app.js');
})();

;