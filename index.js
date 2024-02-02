function main() {
  const loginLink = document.createElement("a");
  const url = new URL(
    "https://api.instagram.com/oauth/authorize?client_id=396942749405934&redirect_uri=https://gabinpoa.github.io/dummyPage/static/index.html&scope=user_profile&response_type=code",
  );
  loginLink.innerText = "Login";
  loginLink.href = url.toString();

  const app = document.getElementById("app");
  app.appendChild(loginLink);
}
main();
