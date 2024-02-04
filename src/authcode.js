function main() {
  const code = getURLParam("code");
  const h1 = document.createElement("h1");
  const app = document.getElementById("app");

  if (code === null) {
    app.innerHTML = "";
    h1.innerText = "could not get the code parameter";
    return app.appendChild(h1);
  }
  h1.innerText = "Your code is: " + code;
  app.appendChild(h1);
  addEventListenerById("requestbutton", "click", async () => {
    const elements = await getTokenOrErrorElements(code);
    app.innerHTML = "";
    app.append(elements);
  });
}

function getURLParam(param) {
  const myURLParams = new URL(window.location.toString()).searchParams;
  return myURLParams.get(param);
}

function addEventListenerById(id, event, callback) {
  document.getElementById(id).addEventListener(event, (e) => {
    e.preventDefault();
    callback();
  });
}

async function getTokenOrErrorElements(code) {
  const response = await getTokenOrError(code);
  if (!response.error) {
    const errorEl = document.createElement("h2");
    errorEl.innerText = response.error.toString();
    return [errorEl];
  }

  const tokenEl = document.createElement("h2");
  tokenEl.innerText = `Token ${access_token}`;

  const idEl = document.createElement("h2");
  idEl.innerText = `User ID ${user_id}`;

  return [tokenEl, idEl];
}

async function getTokenOrError(code) {
  try {
    const { access_token, user_id } = await sendRequest(code);
    return {
      access_token,
      user_id,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

async function sendRequest(code) {
  const body = new URLSearchParams({
    client_id: document.getElementById("client_id").value,
    client_secret: document.getElementById("client_secret").value,
    grant_type: "authorization_code",
    redirect_uri: "https://gabinpoa.github.io/dummyPage/static/index.html",
    code,
  });
  return await (
    await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      body,
    })
  ).json();
}

main();
