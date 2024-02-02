function main() {
  const myURLParams = new URL(window.location.toString()).searchParams;
  const code = myURLParams.get("code");
  if (code !== null) {
    console.log("has");
    const appHTML = document.getElementById("app");
    const hElement = document.createElement("h1");
    hElement.innerText = code;
    appHTML.appendChild(hElement);
  }
  console.log("it runned");
}
main();
