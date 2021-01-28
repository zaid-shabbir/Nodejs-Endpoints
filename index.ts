import express from 'express';
import bodyParser  from 'body-parser';
const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use this as request body
// {
// 	"data": "JOHN0000MICHAEL0009994567"
// }

app.post('/api/v1/parse',(req:any, res:any) => {
  let data = req.body.data;

  let firstName = data.substr(0, data.indexOf('0'));
  let lastName = ""
  let clientId = ""
  let iteration = 0

// With the following for loop, I'm able to iterate through the data.
// The if statement handles the firstName data and iterating to add zero digits.

// With the else/if statement I capturing the lastName and iterating to add zero digits
// and the 2nd else statement to capure the clientId.

  for (let index = firstName.length; index < data.length; index++) {
    if(data.charAt(index) == "0" && iteration == 0){
      firstName +=  data.charAt(index)
    }else{
      iteration = 1
      if(data.charAt(index).match(/[a-z]/i) || data.charAt(index) == "0"){
        lastName += data.charAt(index)
      }else{
        clientId += data.charAt(index)
      }
    }
  }

  let response = {
    firstName,
    lastName,
    clientId
  }
  
  res.status(200).send(response);
});


app.post('/api/v2/parse',(req:any, res:any) => {
  let data = req.body.data;

  let firstName = data.substr(0, data.indexOf('0'));
  let lastName = ""
  let clientId = ""

// With the following for loop, I'm able to capture only the characters that are after the first name.
// In the else/if I'm capturing all of the digits that are NOT zeros.

  for (let index = firstName.length; index < data.length; index++) {
    if(data.charAt(index).match(/[a-z]/i)){
      lastName +=  data.charAt(index)
    }else if(data.charAt(index) !== "0" ){
      if(clientId.length == 3){
        clientId += "-"
      }
      clientId += data.charAt(index)
    }
  }

  let response = {
    firstName,
    lastName,
    clientId
  }

  res.status(200).send(response);
});


app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});