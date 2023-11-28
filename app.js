let tg = window.Telegram.WebApp;

tg.expand();

let playButton = document.getElementById("playBtn");

if (window.location.href.includes("index.html")) {

    playButton.addEventListener("click", function () {

        window.location.href = "https://tboydrug.github.io/game.html";
        console.log("play button");
    });
}

Telegram.WebApp.onEvent("clickBtn", function () {

    let clickEvent = new Event("click");

    playButton.dispatchEvent(clickEvent);
    tg.sendData({ buttonClicked: "playBtn" });
});
