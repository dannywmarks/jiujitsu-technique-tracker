const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross-origin requests
app.use(cors());
require("dotenv").config();
//connect to mongodb
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("database connected");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
