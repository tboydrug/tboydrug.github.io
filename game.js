let tg = window.Telegram.WebApp;

tg.expand();

let nextBtn = document.getElementById("nextBtn");
let btn1 = document.getElementById("backBtn1");
let btn2 = document.getElementById("backBtn2");

btn1.addEventListener("click", function () {

    history.go(-1);
    hp = 0;
    localStorage.setItem("count", hp);
});

btn2.addEventListener("click", function () {

    if (hp > 0) {

        window.location.reload();
    }
});

btn2.addEventListener("click", function () {

    window.location.href = "https://tboydrug.github.io/question1.html";
});


Telegram.WebApp.onEvent("btnClick", function () {

    let clickEvent = new Event("click");

    //nextBtn.dispatchEvent(clickEvent);
    btn1.dispatchEvent(clickEvent);
    btn2.dispatchEvent(clickEvent);

    //tg.sendData({ buttonClicked: "nextBtn" });
    tg.sendData({ buttonClicked: "btn1" });
    tg.sendData({ buttonClicked: "btn2" });
});
