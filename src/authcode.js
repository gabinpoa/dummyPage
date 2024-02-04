function main() {
  const myURLParams = new URL(window.location.toString()).searchParams;
  const code = myURLParams.get("code");
  const h1 = document.createElement("h1");

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

        const responseBody = await sendRequest(code);
        const { access_token, user_id } = responseBody;

        document.getElementById("app").innerHTML = "";

        if (access_token && user_id) {
          const tokenElement = document.createElement("h2");
          tokenElement.innerText = "Token " + access_token;

          const idElement = document.createElement("h2");
          idElement.innerText = "User ID " + user_id;

          document.getElementById("app").append([tokenElement, idElement]);
        } else if (responseBody.error_type) {
          const errorTypeElement = document.createElement("h3");
          errorTypeElement.innerText = responseBody.error_type;

          const errorElement = document.createElement("h2");
          errorElement.innerText =
            responseBody.code + " " + responseBody.error_message;

          document
            .getElementById("app")
            .append([errorTypeElement, errorElement]);
        } else {
          console.error("nothing worked");
        }
      });
  }
}

async function sendRequest(code) {
  const body = {
    client_id: document.getElementById("client_id").value,
    client_secret: document.getElementById("client_secret").value,
    grant_type: "authorization_code",
    redirect_uri: "https://gabinpoa.github.io/dummyPage/static/index.html",
    code,
  };
  return await (
    await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  ).json();
}

function appendToApp(element) {
  document.getElementById("app").appendChild(element);
}

main();
