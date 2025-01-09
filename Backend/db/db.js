const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error));
};

module.exports = connectToDb;
