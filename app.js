let tg = window.Telegram.WebApp;

tg.expand();

let btn = document.getElementById("playBtn");
btn.addEventListener("click", function ()
{
    window.location.href = "https://tboydrug.github.io/game";
});

Telegram.WebApp.onEvent("playClick", function () {

    let clickEvent = new Event("click");

    btn.dispatchEvent(clickEvent);

    tg.sendData({ buttonClicked: "playBtn" });
});
