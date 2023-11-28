let tg = window.Telegram.WebApp;

tg.expand();

let remainingAttempts = parseInt(getCookie("remainingAttempts")) || 2;
console.log(remainingAttempts);

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

if (window.location.href.includes("index.html")) {

    let playButton = document.getElementById("playBtn");

    playButton.addEventListener("click", function () {

        window.location.href = "https://tboydrug.github.io/game";
    });
}
else if (window.location.href.includes("game.html")) {

    let backButton1 = document.getElementById("backBtn1");
    let backButton2 = document.getElementById("backBtn2");

    backButton1.addEventListener("click", function () {

        remainingAttempts--;
        setCookie("remainingAttempts", remainingAttempts, 14);
        history.go(-1);
    })
    backButton2.addEventListener("click", function () {

        remainingAttempts--;
        setCookie("remainingAttempts", remainingAttempts, 14);
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
