const splitProductNameFromURL = () => {
  const urlParts = window.location.href.split("/");

  let productNameParts = urlParts[urlParts.length - 1].split("_");

  productNameParts.forEach((snippet, i) => {
    productNameParts[i] = snippet[0].toUpperCase() + snippet.substring(1);
  });

  const rtn = productNameParts.join(" ").trim();
  return rtn;
};

const productName = splitProductNameFromURL();
// console.log(productName);
document.title += " " + productName;

const res = await fetch(
  `http://localhost:2000/getReviews.php?productName=${productName.replaceAll(
    " ",
    "%20",
  )}`,
);

const json = JSON.parse(await res.json());

// console.log(await res.text());
// process.abort();

// console.log(json);

const reviewsContainer = document.getElementById("reviewCardContainer");

let id = 0;
json.reviews.forEach((val) => {
  reviewsContainer.innerHTML += `<div import="/reviewCard/reviewCard.html" name=${val.user.replaceAll(
    " ",
    "%20",
  )} rating=${val.rating} key=${id}></div>`;
  id++;
});

import importHTML from "/importHTML.js";

await importHTML();

const reviewsWrapper = document.getElementById("reviewCardContainer");

const reviews = reviewsWrapper.childNodes;

for (let i = 0; i < reviews.length; i++) {
  //Set stars
  const ratingTotal = Number(document.getElementById(`rating${i}`).innerHTML);
  for (let s = 0; s < 5; s++) {
    if (ratingTotal - s >= 1)
      document.getElementById(`starContainer${i}`).innerHTML +=
        `<ion-icon name="star"></ion-icon>`;
    else if (ratingTotal - s >= 0.5)
      document.getElementById(`starContainer${i}`).innerHTML +=
        `<ion-icon name="star-half"></ion-icon>`;
    else
      document.getElementById(`starContainer${i}`).innerHTML +=
        `<ion-icon name="star-outline"></ion-icon>`;
  }

  if (json.reviews[i].verified) {
    document.getElementById(`verified${i}`).innerHTML =
      `<ion-icon name="checkmark-done-circle"></ion-icon>`;
    document
      .getElementById(`verified${i}`)
      .setAttribute("data-verified-purchase", "true");
  }

  console.log(reviews[i], json.reviews[i]);
}
