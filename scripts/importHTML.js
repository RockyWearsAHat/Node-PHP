let allElements = document.getElementsByTagName("*");
for (let i = 0; i < allElements.length; i++) {
  let bodyHTML = "";
  let element = allElements[i];
  let file = element.getAttribute("import");
  if (file) {
    let res = await fetch(file);

    let body = await res.text();

    body.split("\n").forEach((val) => {
      if (val.indexOf("script") > -1) {
        let firstSplit = val.split("src=");
        let secondSplit = firstSplit[1].split("></script>");
        let src = secondSplit[0].substring(1, secondSplit[0].length - 1);

        let script = document.createElement("script");
        script.type = "module";
        script.src = src;
        // element.appendChild(script);
        element.appendChild(script);
        if (script.complete) document.write = document._write;
        else
          script.addEventListener("load", function () {
            // Goes to the end of the run queue so that the script
            // is guaranteed to run before this code
            setTimeout(function () {
              document.write = document._write;
            }, 0);
          });
      } else {
        // console.log(val);
        if (val.trim() != "") {
          bodyHTML += val;
        }
      }
    });
    const bodyEle = new DOMParser().parseFromString(
      bodyHTML.trim(),
      "text/html",
    );
    let headNodes = [];
    let bodyNodes = [];
    bodyEle.head.childNodes.forEach((val) => headNodes.push(val));
    bodyEle.body.childNodes.forEach((val) => bodyNodes.push(val));
    element.replaceWith(...headNodes, ...bodyNodes, ...element.childNodes);
  }
}
