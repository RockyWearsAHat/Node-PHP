import envs from "./scripts/loadEnvs.js";

//#region ROUTING
import express from "express";
const app = express();

const root = process.cwd();
const serverURL = process.env.LOCAL_SERVER_URL;

app.use(express.static(root + "/scripts"));
app.use(express.static(root + "/pages"));
app.use(express.static(root + "/php"));

//#region ROUTING TO DIFFERENT LOCATIONS
app.get("/", (req, res) => {
  res.sendFile("home.html", { root: "pages" });
});

import runPHP from "./scripts/runAndReturnRes.js";
app.get("/test", (req, res) => {
  const go = runPHP("./php/test.php");
  res.status(200).send(go.toString());
});
//#endregion

//#region CREATE SERVER ON PORT 3000
app.listen(process.env.LOCAL_SERVER_PORT, () => {
  console.log("Server Running on http://localhost:3000");
});
//#endregion
//#endregion

//////${$(grep '^PHP_SERVER_URL' .env)#*=} to get localhost:2000 but bad substitution when running it in package.json, why?
