let tg = window.Telegram.WebApp;

tg.expand();

let playButton = document.getElementById("playBtn");
let backButton = document.getElementById("backBtn");
playButton.addEventListener("click", function () {

    window.location.href = "https://tboydrug.github.io/game";
});

backButton.addEventListener("click", function () {

    window.close();
})


Telegram.WebApp.onEvent("playClickBtn", function () {

    let clickEvent = new Event("click");

    playButton.dispatchEvent(clickEvent);
    backButton.dispatchEvent(clickEvent);

    tg.sendData({ buttonClicked: "playBtn" });
    tg.sendData({ buttonClicked: "backBtn" });
});
