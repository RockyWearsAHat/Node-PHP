const url = window.location.href;
if (url != "http://localhost:3000/") {
  const nav = document.getElementById("navbar");
  nav.classList.add("offHomePage");
}

console.log("hello");

const dropdownBtn = document.getElementById("productsDropdownBtn");
const dropdownMenu = document.getElementById("productsDropdown");

const openMenu = (e) => {
  console.log("opening menu!");
  dropdownMenu.classList.add("active");
  dropdownMenu.classList.remove("hidden");
};

dropdownBtn.addEventListener("onmouseover", () => {
  console.log("hello there");
});
dropdownBtn.childNodes[1].addEventListener("mousemove", openMenu);

document.addEventListener("mousemove", (e) => {
  if (
    e.target.id != dropdownBtn.id &&
    !dropdownMenu.contains(e.target) &&
    e.target.id != dropdownBtn.childNodes[1].id
  ) {
    dropdownMenu.classList.add("hidden");
    dropdownMenu.classList.remove("active");
  }
});
