//jshint esversion:6
const express=require("express");
const app=express();
const https=require("https");  //Importing the https module
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true})); //Syntax(Necessary to migrate throught the body of the post request)
app.get("/",function(req,res)  //What the client sees on visting the homepage
{
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res) //Sending a post request to the homepage using html
{
  //  console.log(req.body.fname); //fname: Name of the input (syntacticall for accesing the post request)
   const query=req.body.fname;
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=50ff178f542104c7bfbc92bc4ce08d16&units=metric";
  https.get(url,function(response)
  {
  console.log(response.statuscode);
  response.on("data",function(data)  //When we find some data as the response
   {
    const ans=JSON.parse(data);  //The data obtained would be converted in the form of a js object
    //Here ans is parent to all the objects(root of a tree)
    const temp=ans.main.temp;
    const abc=ans.weather[0].description; //weather is an array of objects(paste the api in browser)
    const icon=ans.weather[0].icon;
    const img_url= "http:openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1>Temp is "+temp+" degree celcius</h1>"); //Note:Htl is directly included in double quotes
    res.write("<p>Weather is "+abc+"</p>");
    //res.write("<img src="+img_url+">");// Passing image
    res.send();//Response send by our server to clients browser
  });
 });
});
app.listen(3000,function()
{
  console.log("Server is running on port 3000");
});
