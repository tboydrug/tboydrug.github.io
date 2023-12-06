let tg = window.Telegram.WebApp;

tg.expand();

let btn1 = document.getElementById("backBtn1");
let btn2 = document.getElementById("backBtn2");

let choiceBtn1 = document.getElementById("choiceBtn1");
let choiceBtn2 = document.getElementById("choiceBtn2");
let choiceBtn3 = document.getElementById("choiceBtn3");

let hp = localStorage.getItem("count");

console.log(hp);

btn1.addEventListener("click", function () {

    history.go(-3);
    hp = 0;
    localStorage.setItem("count", hp);
});

btn2.addEventListener("click", function () {

    if (hp > 0) {

        window.location.reload();
    }
});

choiceBtn1.addEventListener("click", function () {

    ShowPanel(0);
});

choiceBtn2.addEventListener("click", function () {

    ShowPanel(1);
});

choiceBtn3.addEventListener("click", function () {

    ShowPanel(0);
})


function ShowPanel(result) {

    choiceBtn1.style.pointerEvents = 'none';
    choiceBtn2.style.pointerEvents = 'none';
    choiceBtn3.style.pointerEvents = 'none';

    let popupPanel = document.querySelector('.popup-panel');

    if (result == 1) {

        document.getElementById("result-text").innerText = "Вы ответили верно!";
        document.getElementById("info-text").innerText = "На ваш аккаунт зачислено 5000 суи и 50 баллов!";

        document.getElementById("backBtn2").setAttribute("style", "display: none;");
    }
    else {

        hp--;
        localStorage.setItem("count", hp);

        if (hp > 0) {

            document.getElementById("result-text").innerText = "Вы ответили неверно!";
            document.getElementById("info-text").innerText = "Попыток осталось :";
            document.getElementById("count").innerText = hp;

            document.getElementById("backBtn1").setAttribute("style", "display: none;");
        }
        else {

            document.getElementById("result-text").innerText = "Вы ответили неверно!";
            document.getElementById("info-text").innerText = "У вас закончились попытки";

            document.getElementById("backBtn2").setAttribute("style", "display: none;");
        }
    }
    setTimeout(() => {
        // Çàäàåì êîíå÷íîå ñîñòîÿíèå äëÿ àíèìàöèè
        popupPanel.style.bottom = '0';
    }, 0);
}

Telegram.WebApp.onEvent("btnClick", function () {

    let clickEvent = new Event("click");

    btn1.dispatchEvent(clickEvent);
    btn2.dispatchEvent(clickEvent);
    //trueBtn.dispatchEvent(clickEvent);
    //falseBtn.dispatchEvent(clickEvent);

    tg.sendData({ buttonClicked: "btn1" });
    tg.sendData({ buttonClicked: "btn2" });
    //tg.sendData({ buttonClicked: "trueBtn" });
    //tg.sendData({ buttonClicked: "falseBtn" });
});
