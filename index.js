const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userdetail = require("./models/signup");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://user123:wusNLwsnlxfTdkjE@cluster0.o5axeq0.mongodb.net/login?retryWrites=true&w=majority",
  {
    
    useNewUrlParser: true,
    useUnifiedTopology: true
    
  }
);

app.get("/api/retrieve/", (req, res) => {
  const {email,password} = req.query;
  userdetail.find({email:email, password: password }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});
app.post("/api/insert", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const mobile = req.body.mobile;
  console.log(name, email, password, address, mobile);
  const signup = new userdetail({
    name: name,
    email: email,
    password: password,
    address: address,
    mobile: mobile
  });
  try {
    await signup.save();
    res.send("Your Registration Was Successfull");
  } catch (error) {
    console.log(error);
  }
});
app.listen(3001, () => {
  console.log("running on port 3001");
});
