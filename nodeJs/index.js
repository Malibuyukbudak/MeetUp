const logger = require("morgan")
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const api = require('./src/routes/index');
const { pageNotFound, serverError } = require("./src/middlewares/server_error");
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config({
  path: ".env",
});
//const  softDelete = require("./src/middlewares/soft_delete");

const uri = process.env.MONGO_URL;
mongoose.connect(uri, { dbName: process.env.MONGO_DB_NAME })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err))

app.use(cors({
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use(logger("dev"));
app.use("/api", api);
//app.use(softDelete)
app.use(pageNotFound);
app.use(serverError)

var PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Listen to port : ${PORT}`);
});