//Name of this file overly descript, but the SVG occasionally has a bug where it won't show until the window is resized,
//This snippet sets the homepage html to the homepage html to "refresh" the content directly, necessary for the homepage SVG to display when navigating between pages with the back buttons and/or links
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const backgroundImg = document.getElementById("landingBackground");
    const content = backgroundImg.innerHTML;
    backgroundImg.style.width = "100vw";
    backgroundImg.style.height = "100vh";
    backgroundImg.innerHTML = content;
  }, 100);
});
