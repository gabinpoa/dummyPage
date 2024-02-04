function main() {
  const myURLParams = new URL(window.location.toString()).searchParams;
  const code = myURLParams.get("code");
  const h1 = document.createElement("h1");
  const app = document.getElementById("app");

  if (code === null) {
    h1.innerText = "could not get the code parameter";
    appendToApp(h1);
  } else {
    h1.innerText = "Your code is: " + code;
    appendToApp(h1);
    document
      .getElementById("requestbutton")
      .addEventListener("click", async (event) => {
        event.preventDefault();

        try {
          const responseBody = await sendRequest(code);
          const { access_token, user_id } = responseBody;

          app.innerHTML = "";

          const tokenElement = document.createElement("h2");
          tokenElement.innerText = "Token " + access_token;

          const idElement = document.createElement("h2");
          idElement.innerText = "User ID " + user_id;

          app.append([tokenElement, idElement]);
        } catch (err) {
          const errorElement = document.createElement("h2");
          errorElement.innerText = "Some error ocurred \n" + err;

          errorElement.innerText = console.error(err);
          appendToApp(errorElement);
        }
      });
  }
}

async function sendRequest(authCode) {
  const body = new URLSearchParams({
    client_id: document.getElementById("client_id").value,
    client_secret: document.getElementById("client_secret").value,
    grant_type: "authorization_code",
    redirect_uri: "https://gabinpoa.github.io/dummyPage/static/index.html",
    code: authCode,
  });
  return await (
    await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      body,
    })
  ).json();
}

function appendToApp(element) {
  document.getElementById("app").appendChild(element);
}

main();
