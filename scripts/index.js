fetch(`http://localhost:2000/index.php`)
  .then((res) => res.text())
  .then((json) => {
    document.querySelector("h1").innerHTML = json;
  });