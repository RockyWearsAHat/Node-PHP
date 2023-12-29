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
