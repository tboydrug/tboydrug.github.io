let tg = window.Telegram.WebApp;

tg.expand();

let playButton = document.getElementById("playBtn");
let backButton = document.getElementById("backBtn");

playButton.addEventListener("click", function ()
{
    window.location.href = "file:///C:/Users/malum/Desktop/webapp/game.html";
});

backButton.addEventListener("click", function () {
    window.close();
})

Telegram.WebApp.onEvent("backClickBtn", function () {
    let clickEvent = new Event("click");

    backButton.dispatchEvent(clickEvent);

    tg.sendData({ buttonClicked: "backBtn" });
})

Telegram.WebApp.onEvent("playClickBtn", function () {

    let clickEvent = new Event("click");

    playButton.dispatchEvent(clickEvent);

    tg.sendData({ buttonClicked: "playBtn" });
});
