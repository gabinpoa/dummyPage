function main() {
  const client_id = "396942749405934";
  const redirect_uri = "https://gabinpoa.github.io/dummyPage/static/index.html";
  const scope =
    "user_profile,instagram_basic,pages_read_engagement,pages_show_list";

  const url = new URL(
    `https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code`,
  );

  const loginLink = document.createElement("a");
  loginLink.innerText = "Login";
  loginLink.href = url.toString();

  document.getElementById("app").appendChild(loginLink);
}
main();
