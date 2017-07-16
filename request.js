var Q = require('q');
var request = require('request');
var fs = require('fs');
var routes = require('./routes.json');

function Request() {
  this.name;
}


Request.prototype.request = function(options, apiMethod) {
  var future = Q.defer();
  request(options, function(err, res, body) {
    if (err) {
      future.reject(err);
    } else if (res.statusCode == 400) {
      return future.reject(body);
    } else if (res.statusCode == 401) {
      return future.reject("Your access token is invalid or expired");
    } else if (res.statusCode == 409) {
      return future.reject(body);
    } else if (res.statusCode >= 200 && res.statusCode < 400) {
      if (apiMethod == routes.downloadDoc) {
        var idh = JSON.parse(options["headers"]["Dropbox-API-Arg"]);
        body = body.split('\n');
        body = body[0] == '' ? {
          'id': idh.doc_id,
          'name': "Untitled"
        } : {
          'id': idh.doc_id,
          'name': body[0].replace('# ', '')
        }
        return future.resolve(body);
      } else {
        try {
          if (typeof(body) === 'string')
            body = JSON.parse(body);
        } catch (e) {
          return future.reject('Corrupt data received from Dropbox Paper server. Please try again.');
        }
        return future.resolve(body);
      }
    }
  });
  return future.promise;
}


Request.prototype.requestDownload = function(options, head) {
  var future = Q.defer();
  this.name = head && head.filename ? head.filename + ".txt" : 'download.txt';
  var that = this;
  var req = request(options)
  req.pipe(fs.createWriteStream(that.name));
  req.on('data', function() {
    // console.log('downloading...');
  })
  req.on('end', function() {
    return future.resolve('Doc Downloaded Successfully.');
  });
  req.on('err', function(err) {
    return future.reject(err);
  })
  return future.promise;
}


module.exports = function() {
  return new Request();
}