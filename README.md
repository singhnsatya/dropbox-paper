# dropbox-paper sdk


# Why Dropbox Paper sdk
* Easy and simple to use.
* Returns Doc Name along when made doc list api call where dropbox api only returns array of doc ids.


# How to use
```

var dropboxpaper = require("dropbox-paper");

// pass your access token
var paper = new dropbpaper({accessToken: "Your dropbox paper access token"});

```


# Available Methods
```

***Methods***
paper.listDocs();
paper.deleteDoc();
paper.downloadDoc();
paper.docUsersList();
paper.docUsersAdd();

```


