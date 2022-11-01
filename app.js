//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const str = require('@supercharge/strings')
const mongoose =require('mongoose');
// const blog = require("../blogWebsite/model/data");                                                                                          
mongoose.connect("mongodb://localhost:27017/blogDB ",{useNewUrlParser:true}).then(()=>
console.log("connection successfull"))
.catch((err) => console.log(err) );
const blogSchema = new mongoose.Schema({
  content:{ type:String},
  blogPost:{type:String}
  });
  const DataBlog =  mongoose.model("DataBlog",blogSchema);

// const DataBlog1 = new DataBlog({
//   content:"Titles" ,
//   blogPost:"Posts"
// })

// const blogSchema = new mongoose.Schema({
// content:{ type:String ,required:true},
// blogPost:{type:String,required:true }
// }); 

let posts = [];


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  DataBlog.find({},function(err,savedBlog){
    if(err){
      console.log(err);
    }
    else{
    console.log(savedBlog);
    }
  })
  res.render("home", {
    startingContent:homeStartingContent,
     posts: posts});


});

app.get("/about", function(req, res){
  res.render("about", {aboutContent:aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent:contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req,res){
  const post = {
    cTitle: req.body.postTitle,
     cPost: req.body.postBody,
     limit:str(req.body.postBody).limit(100,"...").get()
   };
   var blogdataTitle =  (req.body.postTitle);
   var blogdataPost =  req.body.postBody;
   let BlogdataTitle =JSON.stringify(blogdataTitle)
   let BlogdataPost =JSON.stringify(blogdataPost)
   const postData = DataBlog({
    content:{BlogdataTitle},
    blogPost:{BlogdataPost}
   });
   
   posts.push(post);

   DataBlog.insertMany({postData},function(err){
    if(err){
      console.log(err);
    }
    else{ 
      console.log("Database Connected");
    }
  });
   postData.save()
   console.log(postData);
  DataBlog.find({},function(err,DataBlogSaved){
    if(err)
    {
      console.log(err);
    }
    else{
         console.log(DataBlogSaved);
    }

  })
  

   res.redirect("/");
   
});



app.get("/posts/:Name", function(req, res){
  const matchTitle = _.lowerCase(req.params.Name);
  posts.forEach(function(e){
    if(_.lowerCase(e.cTitle)===matchTitle){
      res.render("post", {
        cTitle:e.cTitle
        ,cPost:e.cPost});
        console.log(e.cTitle);
        console.log(e.cPost);
    }
  });
});

app.listen(3000, function() {
  console.log("Server started");
});
