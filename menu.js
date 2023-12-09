    let tg = window.Telegram.WebApp;

    tg.expand();

    let testBtn = document.getElementById("testBtn");
    let playBtn = document.getElementById("playBtn");

    testBtn.addEventListener("click", function () {

        window.location.href = "https://tboydrug.github.io/tutorial.html";
    });

    playBtn.addEventListener("click", function () {

        window.location.href = "https://tboydrug.github.io/findwords.game.html";
    });

    Telegram.WebApp.onEvent("btnClick", function () {

        let clickEvent = new Event("click");

        testBtn.dispatchEvent(clickEvent);
        tg.sendData({ buttonClicked: "btn1" });

        playBtn.dispatchEvent(clickEvent);
        tg.sendData({ buttonClicked: "btn1" });
    });
