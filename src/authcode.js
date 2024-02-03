function main() {
  const myURLParams = new URL(window.location.toString()).searchParams;
  const code = myURLParams.get("code");
  const appHTML = document.getElementById("app");
  const h1 = document.createElement("h1");
  if (code !== null) {
    h1.innerText = code;
  } else {
    h1.innerText = "could not get the code parameter";
  }
  appHTML.appendChild(h1);
}
main();
