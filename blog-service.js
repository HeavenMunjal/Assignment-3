const fs = require("fs");

var posts = [];
var categories = [];


module.exports.initialize = function () {

    var promise = new Promise((resolve, reject) => {
       
        try {

            fs.readFile('./data/posts.json', (err, data) => {
                if (err) throw err;

                employees = JSON.parse(data);
                console.log("INITIALIZE - load posts.");
            })

            fs.readFile('./data/categories.json', (err, data) => {
                if (err) throw err;

                categories = JSON.parse(data);
                console.log("INITIALIZE - load categories.");
            })

        } catch (ex) {
                      console.log("INITIALIZE - FAILURE.");
                      reject("INITIALIZE - FAILURE.");
                     }
        console.log("INITIALIZE - SUCCESS.");
        resolve("INITIALIZE - SUCCESS.");
    })

    return promise;
};

module.exports.addPost = (postData) => {
    postData.published==undefined ? postData.published = false : postData.published = true;
    postData.id = posts.length + 1;
    posts.push(postData);

    return new Promise((resolve,reject) => {
        if (posts.length == 0) {
            reject ('no results');
        }
        else {
            resolve(posts);
        }
    })
};



module.exports.getAllPosts = function () {

    var promise = new Promise((resolve, reject) => {
        
       //employees = [];
       if(posts.length === 0) {
        var err = "getAllPosts() does not have any data.";
        reject({message: err});
       }  

    resolve (posts);
    })
    return promise;
};


module.exports.getPublishedPosts = function () {

    var Pposts = [];
    var promise = new Promise((resolve, reject) => {
      
       for (var i=0; i < posts.length; i++){
           if (posts[i].isPpost == true) {
           Pposts.push(posts[i]);
           }
       }

       if(Pposts.length === 0) {
        var err = "getManagers() does not have any data.";
        reject({message: err});
       }  

    resolve (Pposts);
    })
    return promise;
};


module.exports.getCategories = function () {

    var promise = new Promise((resolve, reject) => {
        //departments = []; //to test errors
        if(categories.length === 0) {
         var err = "getCategories() does not have any data.";
         reject({message: err});
        }  
 
     resolve (categories);
     })
     return promise;
};

module.exports.getPostsByCategory = (category) => {
    return new Promise((resolve,reject) => {
        var post_category = posts.filter(post => post.category == category);
        if (post_category.length == 0) {
            reject('no results returned');
        }
        resolve(post_category);
    })
};

module.exports.getPostsByMinDate = (minDateStr) => {
    return new Promise ((resolve,reject) => {
        var post_minStr = posts.filter(post => post.minDateStr == minDateStr);        
        if (post_minStr.length == 0) {if(new Date(somePostObj.postDate) >= new Date(minDateStr)){
            console.log("The postDate value is greater than minDateStr")
        }
        
            reject ('no results returned');
        }
        resolve(post_minStr);
    })
};
exports.getPostById = (id) => {
    return new Promise((resolve,reject) => {
        var post_id = posts.filter(post => post.post_id == id);
        if (post_id.length == 0) {
            reject('no result returned');
        }
        resolve(post_id);
    })
}