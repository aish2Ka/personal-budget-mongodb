
const mongoose = require("mongoose");
const budgetModel = require("./moduleData/dataBudget");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/", express.static("public"));

app.get("/items", (req, res) => {
  mongoose.connect("mongodb://127.0.0.1:27017/budgetApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the Database");
    budgetModel.find({})
      .then((data) => {
        res.json(data);
        console.log(data);
        mongoose.connection.close();
      })
      .catch((connectionError) => {
        console.error(connectionError);
      });
  })
  .catch((err) => {
    console.error(err);
  });
});

app.post("/items", (req, res) => {
  mongoose.connect("mongodb://127.0.0.1:27017/budgetApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    const newItem = new budgetModel(req.body);
    budgetModel.create(newItem) 
      .then((data) => {
        res.json(data);
        console.log(data);
        mongoose.connection.close();
      })
      .catch((connectionError) => {
        console.error(connectionError);
        res.status(400).json({error:'server error'});
      });
  })
  .catch((err) => {
    console.error(err);
    res.status(400).json({error:'Internal Server error'})
  });
});

app.listen(port, () => {
  console.log(`API at http://localhost:${port}`);
});
