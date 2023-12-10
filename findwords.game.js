document.addEventListener('DOMContentLoaded', function () {

    let tg = window.Telegram.WebApp;

    tg.expand();

    let btn1 = document.getElementById("backBtn1");

    let timer;

    var userAgent = navigator.userAgent;
    const wordList = document.querySelectorAll('#word-list li');
    const letterGrid = document.getElementById('letter-grid');

    let timerDuration = localStorage.getItem("count");
    let isWinning = localStorage.getItem("win");

    console.log(timerDuration);
    console.log(timerDuration);

    if (isNaN(isWinning) || isWinning == null) {

        isWinning = 0;
        localStorage.setItem("win", isWinning);
    }

    if (isWinning == 0 && timerDuration == 0) {

        localStorage.removeItem("count");
    }

    if (isNaN(timerDuration) || timerDuration == null) {

        timerDuration = 3 * 60 * 1000;
        localStorage.setItem("count", timerDuration);
    }

    function updateTimerDisplay(remainingTime) {
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);

        // Îòîáðàçèì âðåìÿ â ôîðìàòå "ìèíóòû:ñåêóíäû"
        document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function startTimer() {
        let remainingTime = timerDuration;

        
        timer = setInterval(function () {
            // Îáíîâèì îòîáðàæåíèå òàéìåðà
            updateTimerDisplay(remainingTime);

            if (remainingTime > 0) {
                remainingTime -= 1000;
                localStorage.setItem("count", remainingTime);;
            }

            // Åñëè âðåìÿ âûøëî, ïîêàæåì ïàíåëü è î÷èñòèì òàéìåð
            if (remainingTime <= 0) {
                showGameOverPanel();
                stop(timer);
            }
        }, 1000);
        // Îáíîâèì îòîáðàæåíèå òàéìåðà â íà÷àëå
        updateTimerDisplay(remainingTime);
    }

    btn1.addEventListener("click", function () {

        window.location.href = "https://tboydrug.github.io/menu.html";
    });

    Telegram.WebApp.onEvent("btnClick", function () {

        let clickEvent = new Event("click");

        btn1.dispatchEvent(clickEvent);
        tg.sendData({ buttonClicked: "btn1" });
    });

    if (userAgent.match(/Windows/i)) {

        initializeGrid();
    } else {

        initializeGridForMobile();
    }

    function initializeGrid() {



        const letterGridData = [
            ['P', 'A', 'T', 'C', 'O', 'A', 'R', 'E', 'T', 'T'],
            ['R', 'R', 'A', 'C', 'I', 'G', 'W', 'O', 'R', 'E'],
            ['E', 'L', 'B', 'A', 'K', 'E', 'Y', 'S', 'D', 'W'],
            ['S', 'I', 'A', 'R', 'O', 'M', 'D', 'M', 'O', 'K'],
            ['E', 'R', 'M', 'O', 'L', 'A', 'O', 'O', 'S', 'E'],
            ['E', 'V', 'E', 'M', 'E', 'P', 'S', 'K', 'M', 'S'],
            ['F', 'S', 'N', 'A', 'N', 'A', 'E', 'I', 'A', 'M'],
            ['U', 'M', 'T', 'N', 'W', 'R', 'G', 'N', 'L', 'E'],
            ['S', 'O', 'R', 'I', 'I', 'N', 'N', 'R', 'L', 'L'],
            ['E', 'K', 'E', 'C', 'O', 'T', 'I', 'N', 'E', 'L'],
        ];

        let isDragging = false;
        let selectedCells = [];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const cell = createCell(i, j, letterGridData[i][j]);
                letterGrid.appendChild(cell);
            }
        }

        function createCell(row, col, letter) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            const letterElement = document.createElement('div');
            letterElement.className = 'letter';
            letterElement.textContent = letter;

            cell.appendChild(letterElement);

            cell.onmousedown = handleMouseDown;
            cell.ondragstart = function () { return false; };

            return cell;
        }

        function handleMouseDown(event) {

            isDragging = true;
            selectedCells = [event.target];
            event.target.classList.add('selected');

            document.onmousemove = handleMouseMove;
            document.onmouseup = handleMouseUp;
        }

        function handleMouseMove(event) {
            if (isDragging) {
                const cell = getCellFromEvent(event);
                if (cell && !cell.classList.contains('selected') && isNeighbor(cell, selectedCells[selectedCells.length - 1])) {
                    selectedCells.push(cell);
                    cell.classList.add('selected');
                }
            }
        }

        function handleMouseUp() {
            isDragging = false;
            document.onmousemove = null;
            document.onmouseup = null;
            checkWord();
        }

        function checkWord() {

            const selectedLetters = selectedCells.map(cell => cell.textContent).join('');
            let allWordsCorrect = true;

            wordList.forEach(word => {
                if (!word.classList.contains('correct') && selectedLetters === word.textContent) {
                    word.classList.add('correct');
                    selectedCells.forEach(cell => cell.classList.add('correct-cell'));
                }

                if (!word.classList.contains('correct')) {
                    allWordsCorrect = false;
                }
            });
            selectedCells.forEach(cell => cell.classList.remove('selected', 'hovered'));

            if (allWordsCorrect) {

                console.log("Âñå ñëîâà îòãàäàíû!");
                showPopupPanel();
            }
        }

        function isNeighbor(cell1, cell2) {
            const row1 = parseInt(cell1.dataset.row);
            const col1 = parseInt(cell1.dataset.col);
            const row2 = parseInt(cell2.dataset.row);
            const col2 = parseInt(cell2.dataset.col);

            return (Math.abs(row1 - row2) === 1 && col1 === col2) || (row1 === row2 && Math.abs(col1 - col2) === 1);
        }

        function getCellFromEvent(event) {
            const target = event.target;
            if (target.classList.contains('cell')) {
                return target;
            } else if (target.classList.contains('letter')) {
                return target.parentElement;
            }
            return null;
        }
    }

    function initializeGridForMobile() {


        const letterGridData = [
            ['P', 'A', 'T', 'C', 'O', 'A', 'R', 'E', 'T', 'T'],
            ['R', 'R', 'A', 'C', 'I', 'G', 'W', 'O', 'R', 'E'],
            ['E', 'L', 'B', 'A', 'K', 'E', 'Y', 'S', 'D', 'W'],
            ['S', 'I', 'A', 'R', 'O', 'M', 'D', 'M', 'O', 'K'],
            ['E', 'R', 'M', 'O', 'L', 'A', 'O', 'O', 'S', 'E'],
            ['E', 'V', 'E', 'M', 'E', 'P', 'S', 'K', 'M', 'S'],
            ['F', 'S', 'N', 'A', 'N', 'A', 'E', 'I', 'A', 'M'],
            ['U', 'M', 'T', 'N', 'W', 'R', 'G', 'N', 'L', 'E'],
            ['S', 'O', 'R', 'I', 'I', 'N', 'N', 'R', 'L', 'L'],
            ['E', 'K', 'E', 'C', 'O', 'T', 'I', 'N', 'E', 'L'],
        ];

        let isDragging = false;
        let selectedCells = [];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const cell = createCell(i, j, letterGridData[i][j]);
                letterGrid.appendChild(cell);
            }
        }

        function createCell(row, col, letter) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            const letterElement = document.createElement('div');
            letterElement.className = 'letter';
            letterElement.textContent = letter;

            cell.appendChild(letterElement);

            cell.ontouchstart = handleTouchStart;
            cell.ontouchmove = handleTouchMove;
            cell.ontouchend = handleTouchEnd;

            return cell;
        }

        function handleTouchStart(event) {
            isDragging = true;
            selectedCells = [event.target];
            event.target.classList.add('selected');
        }

        function handleTouchMove(event) {
            if (isDragging) {
                const cell = getCellFromEvent(event.touches[0]);
                if (cell && !cell.classList.contains('selected') && isNeighbor(cell, selectedCells[selectedCells.length - 1])) {
                    selectedCells.push(cell);
                    cell.classList.add('selected');
                }
            }
        }

        function handleTouchEnd() {
            isDragging = false;
            checkWord();
        }

        function checkWord() {

            const selectedLetters = selectedCells.map(cell => cell.textContent).join('');
            let allWordsCorrect = true;

            wordList.forEach(word => {
                if (!word.classList.contains('correct') && selectedLetters === word.textContent) {
                    word.classList.add('correct');
                    selectedCells.forEach(cell => cell.classList.add('correct-cell'));
                }

                if (!word.classList.contains('correct')) {
                    allWordsCorrect = false;
                }
            });
            selectedCells.forEach(cell => cell.classList.remove('selected', 'hovered'));

            if (allWordsCorrect) {

                console.log("Âñå ñëîâà îòãàäàíû!");
                showPopupPanel();
            }
        }

        function isNeighbor(cell1, cell2) {
            const row1 = parseInt(cell1.dataset.row);
            const col1 = parseInt(cell1.dataset.col);
            const row2 = parseInt(cell2.dataset.row);
            const col2 = parseInt(cell2.dataset.col);

            return (Math.abs(row1 - row2) === 1 && col1 === col2) || (row1 === row2 && Math.abs(col1 - col2) === 1);
        }

        function getCellFromEvent(event) {
            const target = document.elementFromPoint(event.clientX, event.clientY);
            if (target && target.classList.contains('cell')) {
                return target;
            } else if (target && target.classList.contains('letter')) {
                return target.parentElement;
            }
            return null;
        }
    }

    function showPopupPanel() {

        letterGrid.style.pointerEvents = 'none';

        let popupPanel = document.querySelector('.popup-panel');

        document.getElementById("result-text").innerText = "Вы отгадали все слова!";
        document.getElementById("info-text").innerText = "На ваш аккаунт зачислено 5000 суи и 50 баллов!";

        isWinning = 1;
        localStorage.setItem("win", isWinning);

        setTimeout(() => {

            popupPanel.style.bottom = '0';
        }, 0);
    }

    function showGameOverPanel() {

        letterGrid.style.pointerEvents = 'none';

        let popupPanel = document.querySelector('.popup-panel');

        document.getElementById("result-text").innerText = "Время истекло!";
        document.getElementById("info-text").innerText = "К сожалению вы не успели угадать слова";

        isWinning = 2;
        localStorage.setItem("win", isWinning);

        setTimeout(() => {

            popupPanel.style.bottom = '0';
        }, 0);
    }

    startTimer();
});




