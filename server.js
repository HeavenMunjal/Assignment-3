
/*********************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: ___Heavendeep Kaur Munjal__ Student ID: ___161875216____ Date: ___14 October 2022______
*
*  Online (Cyclic) Link: ________________________________________________________
*
********************************************************************************/ 




var express = require("express");



var path = require("path");
var blogSrv = require("./blog-service.js");

var app = express();
app.use(express.static('main/css')); //to recognize the css files

const multer = require("multer");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

var HTTP_PORT = process.env.PORT || 8080;
cloudinary.config({
  cloud_name: 'h4iz7rtb',
  api_key: '272763845899339',
  api_secret: 'EQwuhn4egWDv8vY21siYQPUf_p0',
  secure: true
});
	const upload = multer(); 


// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
  });


  
  
  app.get("/posts", function(req,res){
    blogSrv.getAllPosts()
                             .then((data) => {
                               console.log ("getAllPosts JSON.");
                               res.json(data);
                             })
                             .catch((err) => {
                               console.log(err);
                               res.json(err);
                             })
  });
  
  app.get("/Published Posts", function(req,res){
    blogSrv.getPublishedPosts()
                             .then((data) => {
                               console.log ("getPublishesPosts JSON.");
                               res.json(data);
                             })
                             .catch((err) => {
                               console.log(err);
                               res.json(err);
                             })
  });
  
  app.get("/categories", function(req,res){
   
   blogSrv.getCategories()
                           .then((data) => {
                               console.log ("getCategories JSON.");
                               res.json(data);
                           })
                           .catch((err) => {
                               console.log(err);
                               res.json(err);
                           })
  });
  
  app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname,"/views/error404.html"));
  })
  

//Call initialize method from blog-service.js

console.log ("Ready for initialize");
blogSrv.initialize()
                    .then(() => {
                          console.log ("initialize.then");
                          app.listen(HTTP_PORT, onHttpStart);  //start the server 
                    })
                    .catch(err => {
                          console.log(err);
                    })
 
                    app.get('/posts/add',(req,res) => {
                      res.sendFile(path.join(__dirname + "/views/addPost.html"));
                  });
                  
                  app.post('/posts/add', (req,res) => {
                      dataservice.addPost(req.body).then(() => {
                          res.redirect("/posts");
                      })
                  });
                  app.post("/posts/add", upload.single("featureImage"), (req,res) => {
                    
                    let streamUpload = (req) => {
                      return new Promise((resolve, reject) => {
                          let stream = cloudinary.uploader.upload_stream(
                              (error, result) => {
                              if (result) {
                                  resolve(result);
                              } else {
                                  reject(error);
                              }
                              }
                          );
                  
                          streamifier.createReadStream(req.file.buffer).pipe(stream);
                      });
                  };
                  
                  async function upload(req) {
                      let result = await streamUpload(req);
                      console.log(result);
                      return result;
                  }
                  
                  upload(req).then((uploaded)=>{
                      req.body.featureImage = uploaded.url;
                  
                      // TODO: Process the req.body and add it as a new Blog Post before redirecting to /posts
                      res.redirect("/posts");
                  });
                  
                  
                });

                app.get("/posts", (req, res) => {
                  if (req.query.status) {
                      dataservice.getPostsByCategory(req.query.category).then((data) => {
                          res.json({data});
                      }).catch((err) => {
                          res.json({message: err});
                      })
                  }
                  else if (req.query.minDateStr) {
                      dataservice.getPostsByMinDate(req.query.minDateStr).then((data) => {
                          res.json({data});
                      }).catch((err) => {
                          res.json({message: err});
                      })
                  }});
                  app.get('/posts/:value', (req,res) => {
                    dataservice.getPostById(req.params.value).then((data) => {
                        res.json({data});
                    }).catch((err) => {
                        res.json({message: err});
                    })
                });