const express = require("express");
const server = express(); //this server is deaf
var cors = require("cors");
server.use(express.json());
const { db: destinations } = require("./DB");
const { getRandomId } = require("./HELPERS");

server.use(cors());
//CRUD
//CREATE - POST
server.post("/destinations", (req, res) => {
  //generate unique id
  const _id = getRandomId();

  const { name, location, photo, description } = req.body;
  destinations[_id] = { _id, name, location, photo, description };

  res.status(201).send({ status: "Success" });
});
//READ - GET
server.get("/destinations", (req, res) => {
  res.send(destinations);
});

//UPDATE - PUT
server.put(`/destinations`, (req, res) => {
  const { _id } = req.query;

  if (_id === undefined) {
    return res.status(400).send({ message: "?_id required" });
  }

  if (destinations[_id] === undefined) {
    return res.status(410).send({ message: "No destination with that id" });
  }

  //find object with that id
  const dest = destinations[_id];
  const { name, location, photo, description } = req.body;

  //update
  if (name !== undefined) {
    dest.name = name;
  }

  if (location !== undefined) {
    dest.location = location;
  }
  if (photo !== undefined) {
    dest.photo = photo;
  }
  if (description !== undefined) {
    dest.description = description;
  }
  res.send({ status: "Success" });
});

//DELETE - DELETE
server.delete("/destinations", (req, res) => {
  const { _id } = req.query;
  if (_id === undefined) {
    return res.status(400).send({ message: "?_id required" });
  }

  if (destinations[_id] === undefined) {
    return res.status(410).send({ message: "No destination with that id" });
  }

  //find object with that id
  delete destinations[_id];

  res.status(200).send("Success");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server listening");
});
