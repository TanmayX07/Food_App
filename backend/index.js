const express = require("express");
const app = express();
const port = 5100;
const cors = require("cors");
const initializeDatabase = require("./db");

(async () => {
  try {
    const { data, CatData } = await initializeDatabase();
    global.foodData = data;
    global.foodCategory = CatData;
  } catch (err) {
    console.error("Error initializing database:", err);
    // Handle the error appropriately (e.g., terminate the server)
    process.exit(1);
  }

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization"
    );
    next();
  });

  app.use(express.json());
  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api/auth", require("./Routes/Auth"));

  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });
})();
