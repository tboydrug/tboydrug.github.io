let tg = window.Telegram.WebApp;

tg.expand();

let nextBtn = document.getElementById("nextBtn");
let btn1 = document.getElementById("backBtn1");
let btn2 = document.getElementById("backBtn2");

let trueBtn = document.getElementById("trueBtn");
let falseBtn = document.getElementById("falseBtn");

let hp = localStorage.getItem("count");

console.log(hp);

nextBtn.addEventListener("click", function () {

    window.location.href = "https://tboydrug.github.io/question2.html";
})
btn1.addEventListener("click", function () {

    history.go(-2);
    hp = 0;
    localStorage.setItem("count", hp);
});

btn2.addEventListener("click", function () {

    if (hp > 0) {

        window.location.reload();
    }
});

trueBtn.addEventListener("click", function () {

    ShowPanel(1);
});

falseBtn.addEventListener("click", function () {

    ShowPanel(0);
});


function ShowPanel(result) {

    trueBtn.style.pointerEvents = 'none';
    falseBtn.style.pointerEvents = 'none';

    let popupPanel = document.querySelector('.popup-panel');

    if (result == 1) {

        document.getElementById("result-text").innerText = "Вы ответили верно!";
        document.getElementById("info-text").innerText = "";

        document.getElementById("backBtn1").setAttribute("style", "display: none;");
        document.getElementById("backBtn2").setAttribute("style", "display: none;");
    }
    else {

        hp--;
        localStorage.setItem("count", hp);

        if (hp > 0) {

            document.getElementById("result-text").innerText = "Вы ответили неверно!";
            document.getElementById("info-text").innerText = "Попыток осталось :";
            document.getElementById("count").innerText = hp;

            document.getElementById("nextBtn").setAttribute("style", "display: none;");
            document.getElementById("backBtn1").setAttribute("style", "display: none;");
        }
        else {

            document.getElementById("result-text").innerText = "Вы ответили неверно!";
            document.getElementById("info-text").innerText = "У вас закончились попытки";

            document.getElementById("nextBtn").setAttribute("style", "display: none;");
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

    //nextBtn.dispatchEvent(clickEvent);
    btn1.dispatchEvent(clickEvent);
    btn2.dispatchEvent(clickEvent);
    //trueBtn.dispatchEvent(clickEvent);
    //falseBtn.dispatchEvent(clickEvent);

    //tg.sendData({ buttonClicked: "nextBtn" });
    tg.sendData({ buttonClicked: "btn1" });
    tg.sendData({ buttonClicked: "btn2" });
    //tg.sendData({ buttonClicked: "trueBtn" });
    //tg.sendData({ buttonClicked: "falseBtn" });
});
