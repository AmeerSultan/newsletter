const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const axios = require('axios');
const https = require("https")

app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
   const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    var data={
        members:[{
          email_address: email,
          status: "subscribed",
          merge_fields:{
            FNAME: firstname,
            LNAME: lastname
          }
        }]
      }
      
    // Converting string data to JSON data
    const jsonData= JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/6dea69287f";
    const options={
      method:"POST",
      auth:"201951173:00f72af6d37b28b74488d6478001d11c-us14"
    }
      
    // On success send users to success, otherwise on failure template 
    const request=https.request(url,options,function(response){
      if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html");
      }
      response.on("data",function(data){
        console.log(JSON.parse(data));
      });
    });
      request.write(jsonData);
      request.end();
    });


app.post("/failure", (req, res)=> {
    res.redirect("/")
} )




app.listen(3000, function () {
    console.log("server is running on port 3000")
})


// API KEYSSSSS
// 00f72af6d37b28b74488d6478001d11c-us14