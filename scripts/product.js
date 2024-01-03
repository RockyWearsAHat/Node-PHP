let url = window.location.href;
const urlExtension = url.split("/").pop();

const urlParts = urlExtension.split("_");
url = urlParts.map((val) => {
  return val.substring(0, 1).toUpperCase() + val.substring(1);
});

let title = "";
url.forEach((val) => {
  title += `${val} `;
});

document.title = title;

const res = await fetch(
  `http://localhost:2000/fetchProduct.php?product=${title
    .trim()
    .replaceAll(" ", "%20")}`,
);

const dbObj = await res.json();

if (dbObj) {
  if (dbObj.error) {
    window.location.href = "/products/product-not-found";
  } else {
    const productNameHeader = document.getElementById("productName");
    productNameHeader.innerHTML = dbObj.name;

    const productPriceHeader = document.getElementById("productPrice");
    productPriceHeader.innerHTML = `$${dbObj.price.toFixed(2)}`;

    const productDescription = document.getElementById("productDescription");
    productDescription.innerHTML = dbObj.description;

    const scrollerWrap = document.getElementById("productImageScroller");

    let i = 0;
    dbObj.images.forEach((val) => {
      if (i == 0)
        scrollerWrap.innerHTML += `<li data-active="true"><img src="${val}" alt="img${i}" /></li>`;
      else
        scrollerWrap.innerHTML += `<li><img src="${val}" alt="img${i}" /></li>`;
      i++;
    });
  }
}

const res2 = await fetch(
  `http://localhost:2000/getReviews.php?productId=${dbObj.id}`,
);

const res2Json = JSON.parse(await res2.json());
// console.log(res2Json);

const reviewAverageWrap = document.getElementById("reviewAverage");
reviewAverageWrap.innerHTML = res2Json.reviewAvg.toFixed(1);

for (let i = 0; i < res2Json.reviewAvg; i++) {
  const starWrapper = document.getElementById("starWrap");

  // console.log(res2Json.reviewAvg - i);
  if (res2Json.reviewAvg - i >= 0.75) {
    starWrapper.children[i].setAttribute("name", "star");
  } else if (res2Json.reviewAvg - i >= 0.25) {
    starWrapper.children[i].setAttribute("name", "star-half");
  }
}

const numberOfReviewsWrap = document.getElementById("numberOfReviews");
numberOfReviewsWrap.innerHTML = res2Json.reviews.length;

//some fuckin spaghetti code for the product image scroller with no way to modify related timings at the same time
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("backBtn");

nextBtn.addEventListener("click", () => showNextImage());
prevBtn.addEventListener("click", () => showPrevImage());

const showNextImage = () => {
  let imageSliderWrapper = document.getElementById("productImageScroller");
  let images = imageSliderWrapper.getElementsByTagName("li");

  let currentShownIndex = 0;
  for (let i = 0; i < images.length; i++) {
    if (images[i].getAttribute("data-active")) {
      currentShownIndex = i;
    }
  }

  if (currentShownIndex + 1 >= images.length) {
    images[currentShownIndex].removeAttribute("data-active");
    images[0].setAttribute("data-active", "true");

    images[currentShownIndex].animate(
      [{ transform: "translateX(0%)" }, { transform: "translateX(-100%)" }],
      { duration: 200, easing: "ease-in-out" },
    );
    images[currentShownIndex].animate([{ opacity: "1" }, { opacity: "0" }], {
      duration: 100,
      easing: "ease-in-out",
    });

    images[0].animate(
      [{ transform: "translateX(100%)" }, { transform: "translateX(0%)" }],
      { duration: 200, easing: "ease-in-out" },
    );
    images[0].animate([{ opacity: "0" }, { opacity: "1" }], {
      duration: 350,
      easing: "ease-in-out",
    });
  } else {
    images[currentShownIndex].removeAttribute("data-active");
    images[currentShownIndex + 1].setAttribute("data-active", "true");

    images[currentShownIndex].animate(
      [{ transform: "translateX(0%)" }, { transform: "translateX(-100%)" }],
      { duration: 200, easing: "ease-in-out" },
    );
    images[currentShownIndex].animate([{ opacity: "1" }, { opacity: "0" }], {
      duration: 100,
      easing: "ease-in-out",
    });

    images[currentShownIndex + 1].animate(
      [{ transform: "translateX(100%)" }, { transform: "translateX(0%)" }],
      { duration: 200, easing: "ease-in-out" },
    );
    images[currentShownIndex + 1].animate(
      [{ opacity: "0" }, { opacity: "1" }],
      {
        duration: 350,
        easing: "ease-in-out",
      },
    );
  }
};

const showPrevImage = () => {
  let imageSliderWrapper = document.getElementById("productImageScroller");
  let images = imageSliderWrapper.getElementsByTagName("li");

  let currentShownIndex = 0;
  for (let i = 0; i < images.length; i++) {
    if (images[i].getAttribute("data-active")) {
      currentShownIndex = i;
    }
  }

  if (currentShownIndex - 1 < 0) {
    images[currentShownIndex].removeAttribute("data-active");
    images[images.length - 1].setAttribute("data-active", "true");

    //Animate image going out
    images[currentShownIndex].animate(
      [{ transform: "translateX(0%)" }, { transform: "translateX(100%)" }],
      { duration: 200, easing: "ease-in-out" },
    );
    images[currentShownIndex].animate([{ opacity: "1" }, { opacity: "0" }], {
      duration: 100,
      easing: "ease-in-out",
    });

    //Animate image coming in, from last element of array
    images[images.length - 1].animate(
      [{ transform: "translateX(-100%)" }, { transform: "translateX(0%)" }],
      { duration: 200, easing: "ease-in-out" },
    );
    images[images.length - 1].animate([{ opacity: "0" }, { opacity: "1" }], {
      duration: 350,
      easing: "ease-in-out",
    });
  } else {
    images[currentShownIndex].removeAttribute("data-active");
    images[currentShownIndex - 1].setAttribute("data-active", "true");

    //Animate immage going out
    images[currentShownIndex].animate(
      [{ transform: "translateX(0%)" }, { transform: "translateX(100%)" }],
      { duration: 200, easing: "ease-in-out" },
    );
    images[currentShownIndex].animate([{ opacity: "1" }, { opacity: "0" }], {
      duration: 100,
      easing: "ease-in-out",
    });

    //Animate image coming in, from any position unless currentShownIndex is 0
    images[currentShownIndex - 1].animate(
      [{ transform: "translateX(-100%)" }, { transform: "translateX(0%)" }],
      { duration: 200, easing: "ease-in-out" },
    );
    images[currentShownIndex - 1].animate(
      [{ opacity: "0" }, { opacity: "1" }],
      {
        duration: 350,
        easing: "ease-in-out",
      },
    );
  }
};
