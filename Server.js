const express = require("express");
const app = express();
var cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/image", express.static("./uploads"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname.split(".")[1]);
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  return res.send({
    error: false,
    message: "test",
  });
});

//con to mysql db
const dbCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodejs_api",
});

dbCon.connect();

dbCon.on("error", function (err) {
  console.log("[mysql error]", err);
});

app.get("/All", (req, res) => {
  dbCon.query("SELECT * FROM collection", (error, results, fields) => {
    if (error) {
      console.log(error);
      return;
    }

    let message = "";
    if (results === undefined || results.length == 0) {
      message = "null";
    } else {
      message = "success";
    }

    return res.send({ error: false, data: results, message: message });
  });
});

app.post("/upload", upload.single("File"), (req, res) => {
  dbCon.query(
    "INSERT INTO collection (name, imgPath) VALUES (?, ?)",
    [req.body.Name, req.file.filename],
    (error, results, filds) => {
      if (error) throw error;

      return res.send({ error: false, data: results });
    }
  );
});

app.listen(3000, () => {
  console.log("node app running port 3000");
});

module.exports = app;
