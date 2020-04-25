const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const redis = require('redis');

const app = express();
const port = process.env.PORT || "8000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const client = redis.createClient();

client.on('connect', function() {
  console.log('connected');
});

app.get("/", (req, res) => {
  res.status(200).send("Yo! NDS is ready for service");
});

app.get("/data/:itemId", (req, res) => {
  const { itemId } = req.params;

  console.log(`Received ItemId ${itemId}`);

  client.get(itemId, (err, reply) => {
    console.log(`For ItemId ${itemId} got ${reply}`);

    const returnData = {
      itemId: itemId,
      itemData: reply
    };

    res.status(200).send(returnData);
  });
});

app.post("/data", (req, res) => {
  const { itemId, itemData } = req.body;

  console.log(`Received ItemId ${itemId} ItemData ${itemData}`);

  client.set(itemId, itemData);

  const returnData = {
    status: "success",
    message: "Data stored successfully"
  };

  res.status(201).send(returnData);
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
