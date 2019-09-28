var http = require('http')
var config = require('../config')

function bindServer(app){

  for(var i in config.serverAPI){
    var item = config.serverAPI[i];

    switch (item['method']){
      case 'get':
        bindGet(app, item);
        break;
      case 'post':
        bindPost(app,item);
        break;
      default:
        bindGet(app, item);
    }
  }

}

function bindGet(app, item){

  app.get(item['devUrl'], function (req, res) {
    //console.log('req.query', req.query);
    var originalUrl = req.originalUrl;
    var urlParams = originalUrl.split('?')[1]

    var post_data = {}
    var contentStr = JSON.stringify(post_data)

    var options = {
      hostname: item['hostname'],
      port: item['port'] || 80,
      path: item['devRequestUrl'] + urlParams,
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(contentStr, 'utf8')
      }
    };
    var request = http.request(options, (reponse) => {
      reponse.setEncoding('utf8');
      reponse.on('data', (chunk) => {
        res.send(chunk)
        res.end();
      });
      reponse.on('end', () => {
        console.log('No more data in response.')
      })
    });

    request.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });
    request.write(contentStr)
    //request.write('{"page":3}');
    request.end();
  });
}


function bindPost(app, item){
  app.post(item['devUrl'], function (req, res) {
    // console.log('req.query', req.query);
    // console.log('req.params', req.params);
    // console.log('req.body', req.body);
    // res.end();

    var post_data = req.body
    var contentStr = JSON.stringify(post_data)

    var options = {
      hostname: item['hostname'],
      port: item['port'] || 80,
      path: item['devRequestUrl'],
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(contentStr, 'utf8')
      }
    };
    var request = http.request(options, (reponse) => {
      reponse.setEncoding('utf8');
      reponse.on('data', (chunk) => {
        res.send(chunk)
        res.end();
      });
      reponse.on('end', () => {
        console.log('No more data in response.')
      })
    });

    request.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });
    request.write(contentStr)
    //request.write('{"page":3}');
    request.end();
  });
}

module.exports = bindServer