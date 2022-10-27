//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const homeStartingContent ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const aboutContent = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "lorem ipsum, his interest was piqued by consectetur—a genuine, albeit rare, Latin word. Consulting a Latin dictionary led McCli";

const app =express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    const home = "HOME";
 res.render("home",{
    HOME:home, Content:homeStartingContent
 });  
});
app.get("/about",function(req,res){
res.render("about",{aboutContent:aboutContent})
})
app.get("/contact",function(req,res){
res.render("contact",{contactContent:contactContent})
})

  







app.listen("3000",function(req,res){
  console.log("Server-started");
});