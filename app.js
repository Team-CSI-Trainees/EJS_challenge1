//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const str = require('@supercharge/strings');
const mongoose =require('mongoose');
// const bodyParser = require("body-parser");
const app = require("express");
const port =process.env.PORT || 3000;
// const blog = require("../blogWebsite/model/data");                                                                                          
mongoose.connect("mongodb+srv://root:root@cluster0.kklaiz3.mongodb.net/blogDB ",{useNewUrlParser:true}).then(()=>
console.log("connection successfull"))
.catch((err) => console.log(err) );
var blogContent = ""
const blogSchema = new mongoose.Schema({
  content:String,
  blogPost:String,
  limit:String,
  createdDate :{
    type:Date,
    default:Date.now
  }
  });
  const titleSchema = new mongoose.Schema({
    blogTitle:String
  })
  const Post =  mongoose.model("Post",blogSchema);
  //model to be stored in post 

   const ReadPost =  mongoose.model("ReadPost",titleSchema);



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.use(express.json());


app.set('view engine', 'ejs');

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));


app.get("/", function(req, res){
  Post.find(function(err,posts){
    if(err){
      console.log(err);
    }
    else{

    res.render("home", {
      startingContent:homeStartingContent,
       posts: posts});
    }
  });
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
  blogContent = req.body.postBody;
  const post = new Post({
    content: req.body.postTitle,
     blogPost: req.body.postBody,
     limit:str(req.body.postBody).limit(100,"...").get()
   });
    console.log(Post.findOne({},{content:1}));
   
   const readPost = new ReadPost({
       blogTitle:post.content
   });
       post.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.redirect("/")
    }});
});




app.get("/posts/:Name", function(req, res){
  const displayTitle =req.params.Name;
  const matchTitle = _.lowerCase(req.params.Name);
  
Post.find({}, function(err, result) {
  if (err) throw err;
  result.forEach(element => {
    console.log(element.content);
    if(_.lowerCase(element.content) === matchTitle)
    {res.render("post", {
      title:element.content
      ,bPost:element.blogPost});}
      else res.render ("404");
  });
  }); 
});

app.listen(port, function() {
  console.log("Server started");
});
