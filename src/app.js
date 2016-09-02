require('babel-register')
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config';

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

let app = express();
let router = Router();

// Webpack developer
if (isDeveloping) {
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  RESTful API
const publicPath = path.resolve(path.join(__dirname, '../public'));
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.static(publicPath));

const port = isProduction ? (process.env.PORT || 80) : 3000;

// this is necessary to handle URL correctly since client uses Browser History
app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, '', '../index.html'))
});

app.listen(port, function (err, result) {
  if(err){
    console.log(err);
  }
  console.log('Server running on port ' + port);
});
