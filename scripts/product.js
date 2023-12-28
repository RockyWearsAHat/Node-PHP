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
