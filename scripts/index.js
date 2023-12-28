const res = await fetch(`http://localhost:2000/index.php`);
const json = await res.text();

document.querySelector("h1").innerHTML = json;
console.log("hello");
