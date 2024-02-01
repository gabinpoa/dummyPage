function main() {
  const loginButton = document.createElement("button");
  loginButton.addEventListener("click", () => {
    window.location.assign(
      new URL(
        "https://api.instagram.com/oauth/authorize?client_id=396942749405934&redirect_uri=https://gabinpoa.github.io/dummyPage/&scope=user_profile,openid&response_type=code",
      ),
    );
  });
  loginButton.innerText = "Login";
  loginButton.type = "button";

  const app = document.getElementById("app");
  app.appendChild(loginButton);
}
main();
