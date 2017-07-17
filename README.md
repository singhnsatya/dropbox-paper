# dropbox-paper sdk
The Dropbox paper JavaScript SDK is a lightweight, promise based interface to the Dropbox Paper api.

## Why Dropbox Paper sdk
* Easy and simple to use.
* Returns Doc Name along when used doc list sdk method where dropbox api only returns array of doc ids.


## Quickstart
```
$ npm install --save dropbox-paper
```

```javascript
var dropboxpaper = require("dropbox-paper");

// pass your access token
var paper = new dropboxpaper({accessToken: "Your dropbox paper access token"});

```

## New Version Updates and Notes
This new *version* **1.1.0** contains two new method *paper.docPolicySet()* and *paper.archiveDoc()*.<br>
New **update** has been made in **paper.listDocs()** method, now you can also pass cursor in this method.<br>
For more information have a go through.
### To update the package run
```
$ npm update --save dropbox-paper
```


## Available Methods
* [paper.listDocs();](https://github.com/singhnsatya/dropbox-paper/blob/master/README.md#list-docs)
* [paper.deleteDoc();](https://github.com/singhnsatya/dropbox-paper/blob/master/README.md#delete-doc)
* [paper.downloadDoc();](https://github.com/singhnsatya/dropbox-paper/blob/master/README.md#download-doc)
* [paper.docUsersList();](https://github.com/singhnsatya/dropbox-paper/blob/master/README.md#doc-users-list)
* [paper.docUsersAdd();](https://github.com/singhnsatya/dropbox-paper/blob/master/README.md#doc-users-add)
* [paper.docPolicySet();](https://github.com/singhnsatya/dropbox-paper/blob/master/README.md#doc-policy-set)
* [paper.archiveDoc();](https://github.com/singhnsatya/dropbox-paper/blob/master/README.md#archive-doc)

## List Docs
Since update of **1.1.0** this methods also accepts cursor value.<br>
You can either pass limit with or with optional parameters [see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-list) <br>
Or a cursor value to retrieve docs from that cursor.
```javascript
// Example
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
```javascript
// Example
paper.deleteDoc({doc_id: "atdn2KdIIiPYTPbBEjk5a"})
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
```javascript
// Example
// Recommends to specify "filename" to download doc. If filename is not pass default downloads it with name "download".
paper.downloadDoc({doc_id: "y5JzeuQrJBJlNHTfjlk2L", export_format: "markdown", filename: "my doc"})
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
```javascript
// Example
paper.docUsersList({doc_id: "y5JuezQrJBJNhlTfjlk2L"})
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
```javascript
// Example
paper.docUsersAdd({"doc_id":"zYsQe7JGywV77Onbt2UJO","members":[{"member":{".tag":"email","email":"user email"},"permission_level":{".tag":"edit"}}]})
.then(function(result){
console.log(result);
})
.catch(function(error){
console.log(error);
});
```

## Doc Policy Set
Currently only supports public_sharing_policy. Pass doc id on which you want to set policy.
For more information [see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-sharing_policy-set)
```javascript
// Example
paper.docPolicySet({"doc_id":"P6evXjsBzf0l0ZZrbYVlf","sharing_policy":{"public_sharing_policy":{".tag":"people_with_link_can_view_and_comment"}}})
.then(function(result) {
	console.log(result);
}).catch(function(error) {
	console.log(error);
})
```

## Archive Doc
Pass doc id of doc you want to archive.
```javascript
// Example
paper.archiveDoc({doc_id: "y5JzeuLkuBJNhlTfjXr2L"})
.then(function(res) {
	console.log('res--', res);
}).catch(function(err) {
	console.log('caught err', err);
})
```



