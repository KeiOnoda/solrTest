const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const fs = require('fs');
app.use(bodyParser.json());
app.use(cors());

const solrManage = require('../models/solrManege.js');
const hiraganaManage = require('../models/hiragakaAPI.js');

/**
 * Solr検索リクエスト
 */
app.post('/api/search', function(req, res) {
  // solr検索リクエスト処理呼び出し
  axios.get(solrManage.createQuery(req.body)).then(function(solrRes){
    res.send({
      result: true,
      url: decodeURI(solrRes.config.url),
      response: solrRes.data.response
    });
  }).catch(function(error){
    //エラー処理
    res.send({
      result: false,
      url: decodeURI(error.config.url),
      response: error.message
    });
  });
});

/**
 * ひらがな化API呼び出しリクエスト
 */
app.post('/api/hiragana', function(req, res ){
  var options = hiraganaManage.options;
  fs.access(req.body.convPath, function (err) {
    if (err) {
      console.log(err);
      res.send({
        result: false
      });
    }
    else {
      options.data.sentence = fs.readFileSync(req.body.convPath, {encoding: "utf-8"}).replace(/\r?\n/g, ',');

      axios(options).then((result) => {
        var filename = hiraganaManage.getFileName(req.body.convPath);
        fs.writeFileSync(filename + "_Conv" + ".txt",  result.data.converted.split(' ').join('').replace(/,/g, '\r\n'));
        res.send({
          result: true
        });
      }).catch((err) => {
        console.log(err);
        res.send({
          result: false
        });
      });
    }
  });
});

/**
 * solr全削除
 */
app.get('/api/solrDelete', function(req, res ){
    axios(solrManage.solrDelOptions).then((result) => {
      console.log(result);
      res.send({
        result: result.status
      });
    }).catch((err) => {
      console.log(err);
      res.send({
        result: err.status
      });
    });
});

/**
 * solrデータ登録
 */
app.post('/api/solrRegist', function(req, res ){
  fs.access(req.body.filePath, function (err) {
    if (err) {
      console.log(err);
      res.send({
        result: 500
      });
    }
    else {
      let options = solrManage.solrRegOptions;
      options.data = fs.readFileSync(req.body.filePath, {encoding: "utf-8"});
      options.headers["charset"] = "utf-8";
      switch (req.body.format){
        case 'JSON':
          options.headers["Content-Type"] = "text/json";
          break;
        case 'XML':
          options.headers["Content-Type"] = "text/xkl";
          break;
        case 'CSV':
          options.headers["Content-Type"] = "text/csv";
          break;  
      }
      axios(options).then((result) => {
        console.log(result);
        res.send({
          result: result.status
        });
      }).catch((err) => {
        console.log(err);
        res.send({
          result: err.status
        });
      });
    }
  });
});

app.listen(process.env.PORT || 3000);