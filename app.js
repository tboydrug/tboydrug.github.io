let tg = window.Telegram.WebApp;

tg.expand();

if (window.location.href.includes("index.html")) {

    let playButton = document.getElementById("playBtn");

    playButton.addEventListener("click", function () {

        window.location.href = "file:///C:/Users/malum/Desktop/webapp/game.html";
    });
}
else if (window.location.href.includes("game.html")) {

    let backButton1 = document.getElementById("backBtn1");
    let backButton2 = document.getElementById("backBtn2");

    backButton1.addEventListener("click", function () {

        history.go(-1);
    })
    backButton2.addEventListener("click", function () {

        location.reload();
    })
}

Telegram.WebApp.onEvent("playClickBtn", function () {

    let clickEvent = new Event("click");

    if (window.location.href.includes("index.html")) {

        playButton.dispatchEvent(clickEvent);

        tg.sendData({ buttonClicked: "playBtn" });
    }
    else if (window.location.href.includes("game.html")) {

        backButton1.dispatchEvent(clickEvent);

        tg.sendData({ buttonClicked: "backBtn1" });

        backButton2.dispatchEvent(clickEvent);

        tg.sendData({ buttonClicked: "backBtn2" });
    }
});
