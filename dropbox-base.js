var Q = require('q');
var Request = require('./request');
var api = Request();
var routes = require('./routes.json');

function Base(token) {
  this.api = api;
  this.token = token;
  this.options = {};
  this.endPoint = routes.endpoint;
}

Base.prototype.listDocs = function(data) {
  var future = Q.defer();
  var that = this;
  var finalRes = {};
  that.makeOptions('POST', routes.listDocs, data)
    .then(function(options, api) {
      return that.api.request(options, api);
    })
    .then(function(result) {
      finalRes = result;
      return that.listNames(result.doc_ids, routes.downloadDoc);
    })
    .then(function(res) {
      finalRes.doc_ids = res;
      return future.resolve(finalRes);
    })
    .catch(function(err) {
      return future.reject(err);
    });
  return future.promise;
}

Base.prototype.listNames = function(data) {
  var future = Q.defer();
  var that = this;
  var docNames = [];
  data.forEach(function(item, index) {
    item = {
      "doc_id": item,
      export_format: "markdown"
    };
    that.makeOptions('POST', routes.downloadDoc, item)
      .then(function(options) {
        return that.api.request(options, routes.downloadDoc);
      })
      .then(function(result) {
        docNames.push(result);
        if (docNames.length == data.length) {
          return future.resolve(docNames);
        }
      })
      .catch(function(err) {
        return future.reject(err);
      })
  })
  return future.promise;
}

Base.prototype.docUsersAdd = function(data) {
  var future = Q.defer();
  var that = this;
  that.makeOptions('POST', routes.docUsersAdd, data)
    .then(function(options) {
      return that.api.request(options, routes.docUsersAdd);
    })
    .then(function(result) {
      return future.resolve(result);
    })
    .catch(function(err) {
      return future.reject(err);
    })
  return future.promise;
}

Base.prototype.docUsersList = function(data) {
  var future = Q.defer();
  var that = this;
  that.makeOptions('POST', routes.docUsersList, data)
    .then(function(options) {
      return that.api.request(options, routes.docUsersList)
    })
    .then(function(result) {
      return future.resolve(result);
    })
    .catch(function(err) {
      return future.reject(err);
    })
  return future.promise;
}

Base.prototype.folderUsersList = function(data) {
  var future = Q.defer();
  var that = this;
  that.makeOptions('POST', routes.folderUsersList, data)
    .then(function(options) {
      return that.api.request(options, routes.folderUsersList)
    })
    .then(function(result) {
      return future.resolve(result);
    })
    .catch(function(err) {
      return future.reject(err);
    })
  return future.promise;
}

Base.prototype.deleteDoc = function(data) {
  var future = Q.defer();
  var that = this;
  that.makeOptions('POST', routes.deleteDoc, data)
    .then(function(options) {
      return that.api.request(options, routes.deleteDoc)
    })
    .then(function(result) {
      return future.resolve("Doc Deleted Successfully.");
    })
    .catch(function(err) {
      return future.reject(err);
    })
  return future.promise;
}

Base.prototype.downloadDoc = function(data) {
  var future = Q.defer();
  var that = this;
  var docNames = [];
  that.makeOptions('POST', routes.downloadDoc, data)
    .then(function(options) {
      return that.api.requestDownload(options, data);
    })
    .then(function(result) {
      future.resolve(result);
    })
    .catch(function(err) {
      future.reject(err);
    });
  return future.promise;
}

Base.prototype.makeOptions = function(method, route, body) {
  var future = Q.defer();
  var charsToEncode = /[\u007f-\uffff]/g;

  function http_header_safe_json(v) {
    return JSON.stringify(v).replace(charsToEncode,
      function(c) {
        return '\\u' + ('000' + c.charCodeAt(0).toString(16)).slice(-4);
      }
    );
  }

  var that = this;
  that.options = {
    url: this.endPoint + route,
    method: method,
    headers: {
      'Authorization': 'Bearer ' + that.token.accessToken,
      'Content-Type': 'application/json'
    }
  }
  if (route == routes.listDocs) {
    that.options.json = body;
    future.resolve(that.options, route);
  }
  if (route == routes.downloadDoc) {
    delete that.options.headers["Content-Type"];
    that.options.headers["Dropbox-API-Arg"] = http_header_safe_json({
      "doc_id": body.doc_id,
      "export_format": {
        ".tag": body.export_format
      }
    });
    future.resolve(that.options);
  }
  if (route == routes.docUsersAdd || route == routes.docUsersList || route == routes.folderUsersList || route == routes.deleteDoc) {
    if (body && typeof(body) == "string")
      body = JSON.parse(body);
    that.options.json = body;
    future.resolve(that.options);
  }
  return future.promise;
}

module.exports = Base;