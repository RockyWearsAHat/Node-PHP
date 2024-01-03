//#region ROUTING
import express from "express";
const app = express();

const root = process.cwd();

app.use("/", express.static(root + "/scripts"));
app.use("/", express.static(root + "/pages"));
app.use("/", express.static(root + "/php"));
app.use("/", express.static(root + "/components"));
app.use("/", express.static(root + "/css"));
app.use("/", express.static(root + "/public"));

//#region ROUTING TO DIFFERENT LOCATIONS
app.get("/", (req, res) => {
  res.sendFile("home.html", { root: "pages" });
});

app.get("/contact", (req, res) => {
  res.sendFile("/contact.html", { root: "pages" });
});

app.get("/products/product-not-found", (req, res) => {
  res.sendFile("/product404.html", { root: "pages" });
});

app.get("/products/:productName", (req, res) => {
  res.sendFile("/product.html", { root: "pages" });
});

app.get("/reviews/:productName", (req, res) => {
  res.sendFile("/productReviews.html", { root: "pages" });
});

app.get(
  "/products",
  (req, res, next) => {
    console.log("navigating to products page");
    next();
  },
  (req, res) => {
    res.sendFile("/catalogue.html", { root: "pages" });
  },
);
//#endregion

//#region CREATE SERVER ON PORT 3000
app.listen(3000, () => {
  console.log("Server Running on http://localhost:3000");
});
//#endregion
//#endregion

//////${$(grep '^PHP_SERVER_URL' .env)#*=} to get localhost:2000 but bad substitution when running it in package.json, why?
