const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const https = require('https');
app.use(express.static("public"));
const port = 3000;
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post('/', (req, res) => {
      var firstName = req.body.firstName;

      var lastName = req.body.lastName;

      var email = req.body.email;


      var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName
            }
          }

        ]
      };
      const jsonData = JSON.stringify(data);
      const url = "https://us8.api.mailchimp.com/3.0/lists/d0365773d0";
      const options = {
        method: "POST",
        auth: "awatar19741:6e8110bcfe196387fd142e9f55d22b47-us8"
      }
      const request = https.request(url, options, (response) => {
          if (response.statusCode === 200) {
            res.sendFile(__dirname + "/failure.html");
            }
            else {
              res.sendFile(__dirname + "/failure.html");
            }


            response.on("data", (data) => {
              console.log(JSON.parse(data));
            })
          })
          request.write(jsonData);
          request.end();

      });
      app.post('/failure', (req,res)=>{
        res.redirect('/');
      })
    app.listen(port, () => {
      console.log("running on 3000")
    });

    // 6e8110bcfe196387fd142e9f55d22b47-us8
    // d0365773d0
