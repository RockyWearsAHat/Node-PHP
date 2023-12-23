//#region RUN AND RETURN PHP FILES
import child_process from "child_process";
export const runAndReturnRes = (path) => {
  const spawn = child_process.spawnSync;
  var process = spawn("php", [`${path}`]);
  return process.stdout.toString();
};
//#endregion

//#region GET DIRNAME
// const { fileURLToPath } = require("url");
// const { dirname } = require("path");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
//#endregion

//#region ROUTING
import express from "express";
const app = express();
//#region ADD STATIC FILE PATHS
import path from "path";
app.use(express.static(path.join(process.cwd(), "/pages/")));
app.use(express.static(path.join(process.cwd(), "/php/")));
app.use(express.static(path.join(process.cwd(), "/scripts/")));
app.use(express.static(path.join(process.cwd(), "/serve.js")));
//#endregion

//#region CREATE SERVER ON PORT 3000
app.listen(3000, () => {
  console.log("Server Running on http://localhost:3000");
});
//#endregion

//#region ROUTING TO DIFFERENT LOCATIONS
import fs from "fs";
app.get("/balls", (req, res) => {
  let readData = "";
  fs.readFile("./pages/index.html", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    readData += data;
    readData += runAndReturnRes("./php/index.php");
    res.send(readData);
  });
});

app.get("/test", (req, res) => {
  const go = runAndReturnRes("./php/test.php");
  res.send(go);
});
//#endregion

//#endregion
