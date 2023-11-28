let tg = window.Telegram.WebApp;

tg.expand();

let btn1 = document.getElementById("backBtn1");
let btn2 = document.getElementById("backBtn2");

btn1.addEventListener("click", function () {
    history.go(-1);
});

btn2.addEventListener("click", function () {
    window.location.reload();
});


Telegram.WebApp.onEvent("btnClick", function () {

    let clickEvent = new Event("click");

    btn1.dispatchEvent(clickEvent);
    btn2.dispatchEvent(clickEvent);

    tg.sendData({ buttonClicked: "btn1" });
    tg.sendData({ buttonClicked: "btn2" });
});
