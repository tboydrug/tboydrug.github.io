let tg = window.Telegram.WebApp;

tg.expand();

let playButton = document.getElementById("playBtn");
playButton.addEventListener("click", function ()
{
    window.location.href = "file:///C:/Users/malum/Desktop/webapp/game.html";
});

Telegram.WebApp.onEvent("playClickBtn", function () {

    let clickEvent = new Event("click");

    playButton.dispatchEvent(clickEvent);

    tg.sendData({ buttonClicked: "playBtn" });
});
