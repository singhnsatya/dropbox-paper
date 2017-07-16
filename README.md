# dropbox-paper sdk
The Dropbox paper JavaScript SDK is a lightweight, promise based interface to the Dropbox Paper api.

## Why Dropbox Paper sdk
* Easy and simple to use.
* Returns Doc Name along when used doc list sdk method where dropbox api only returns array of doc ids.


## Quickstart
```
$ npm install --save dropbox-paper
```

```

var dropboxpaper = require("dropbox-paper");

// pass your access token
var paper = new dropboxpaper({accessToken: "Your dropbox paper access token"});

```


## Available Methods
* paper.listDocs();
* paper.deleteDoc();
* paper.downloadDoc();
* paper.docUsersList();
* paper.docUsersAdd();

## List Docs
This method accepts limit. The number of Docs you want to retrieve. <br>
For optional parameters list [see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-list)
```
paper.listDocs({limit: 10})
.then(function(result){
console.log(result);
})
.catch(function(error){
console.log(error);
});
```


## Delete Doc
Pass doc id to delete any particular doc. <br>
This method will permanently delete the doc. [see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-permanently_delete)
```
paper.deleteDoc({doc_id: "atdn2KdIIiTyPPbBEjk5a"})
.then(function(result){
console.log(result);
})
.catch(function(error){
console.log(error);
});
```

## Download Doc
Pass doc id and export format. Export format must be "makrdown" or "html".<br>
Downloads doc in current folder. <br>
For more information [see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-download)
```
// Recommends to specify "filename" to download doc. If filename is not pass default downloads it with name "download".
paper.downloadDoc({doc_id: "y5JzeuQrJBJNhlTfjlk2L", export_format: "markdown", filename: "my doc"})
.then(function(result){
console.log(result);
})
.catch(function(error){
console.log(error);
});
```

## Doc Users List
Pass doc id to see users of that doc.<br>
For optional parameters [see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-users-list)
```
paper.docUsersList({doc_id: "y5JzeuQrJBJNhlTfjlk2L"})
.then(function(result){
console.log(result);
})
.catch(function(error){
console.log(error);
});
```

## Doc Users Add
Pass doc id and members to add any user to the doc.<br>
For more information [see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-users-list)
```
paper.docUsersList({"doc_id":"zYsQe7JwyGV77Onbt2UJO","members":[{"member":{".tag":"email","email":"user email"},"permission_level":{".tag":"edit"}}]})
.then(function(result){
console.log(result);
})
.catch(function(error){
console.log(error);
});
```


