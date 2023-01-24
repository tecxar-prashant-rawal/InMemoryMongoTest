import express from "express";
import connect from "./database/connect.js";
import userModel from "./model/user.model.js";
const app = express();

//middleware to send json
app.use(express.json());

const port = 8080;

//find the name
app.get("/", (req, res) => {
  try {
    userModel
      .find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({ error });
      });
  } catch (error) {
    res.json({ error });
  }
});

//adding name
app.post("/add", (req, res) => {
  try {
    const user = new userModel({
      username: "Prashant Rawal",
    });
    user
      .save()
      .then(() => {
        return res.json({ message: "username made successfully" });
      })
      .catch((err) => {
        return res.json({ message: "error on adding username" });
      });
  } catch (error) {
    res.json({ error: "Cannot add user" });
  }
});

//if connected successfully then only listen to port
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`App is connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("unable to connect to server");
    }
  })
  .catch((err) => {
    console.log(`something went wrong with the database`, err);
  });
