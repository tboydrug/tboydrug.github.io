let tg = window.Telegram.WebApp;

tg.expand();

let playButton = document.getElementById("playBtn");
playButton.addEventListener("click", function ()
{
    window.location.href = "https://tboydrug.github.io/game.html";
});

Telegram.WebApp.onEvent("playClickBtn", function () {

    let clickEvent = new Event("click");

    playButton.dispatchEvent(clickEvent);

    tg.sendData({ buttonClicked: "playBtn" });
});
