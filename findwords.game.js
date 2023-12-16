document.addEventListener('DOMContentLoaded', function () {

    let tg = window.Telegram.WebApp;

    tg.expand();

    let btn1 = document.getElementById("backBtn1");

    let timer;

    var userAgent = navigator.userAgent;
    const wordList = document.querySelectorAll('#word-list li');
    const letterGrid = document.getElementById('letter-grid');

    let timerDuration = localStorage.getItem("count");

    timerDuration = 3 * 60 * 1000;

    function updateTimerDisplay(remainingTime) {
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);

        document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function startTimer() {
        let remainingTime = timerDuration;


        timer = setInterval(function () {

            updateTimerDisplay(remainingTime);

            if (remainingTime > 0) {
                remainingTime -= 1000;
                localStorage.setItem("count", remainingTime);;
            }


            if (remainingTime <= 0) {
                showGameOverPanel();
                stop(timer);
            }
        }, 1000);

        updateTimerDisplay(remainingTime);
    }

    btn1.addEventListener("click", function () {

        window.location.href = "https://t.me/mytelergamtestBot";
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
            ['P', 'A', 'R', 'L', 'I', 'A', 'M', 'E', 'N', 'T', 'R'],
            ['R', 'R', 'A', 'C', 'I', 'G', 'W', 'O', 'R', 'E', 'E'],
            ['E', 'L', 'B', 'A', 'K', 'E', 'Y', 'S', 'D', 'W', 'S'],
            ['S', 'I', 'A', 'R', 'O', 'M', 'D', 'M', 'O', 'K', 'E'],
            ['E', 'R', 'M', 'O', 'L', 'A', 'O', 'O', 'S', 'E', 'R'],
            ['E', 'V', 'E', 'M', 'E', 'P', 'S', 'K', 'M', 'S', 'V'],
            ['L', 'E', 'N', 'A', 'P', 'A', 'M', 'O', 'R', 'A', 'E'],
            ['U', 'M', 'T', 'N', 'W', 'R', 'G', 'N', 'L', 'E', 'F'],
            ['S', 'O', 'R', 'I', 'I', 'N', 'N', 'R', 'L', 'L', 'U'],
            ['E', 'K', 'E', 'C', 'O', 'T', 'I', 'N', 'E', 'L', 'S'],
            ['S', 'M', 'O', 'K', 'E', 'S', 'M', 'E', 'L', 'L', 'E'],
        ];

        let isDragging = false;
        let selectedCells = [];
        let direction = '';

        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
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
            direction = '';
            event.target.classList.add('selected');

            document.onmousemove = handleMouseMove;
            document.onmouseup = handleMouseUp;
        }

        function handleMouseMove(event) {
            if (isDragging) {
                const cell = getCellFromEvent(event);
                if (cell && !cell.classList.contains('selected')) {
                    if (direction === '' || isSameDirection(cell, selectedCells[selectedCells.length - 1], direction)) {
                        selectedCells.push(cell);
                        cell.classList.add('selected');
                        if (direction === '') {
                            setDirection(cell, selectedCells[selectedCells.length - 2]);
                        }
                    }
                }
            }
        }

        function isSameDirection(cell1, cell2, direction) {
            const row1 = parseInt(cell1.dataset.row);
            const col1 = parseInt(cell1.dataset.col);
            const row2 = parseInt(cell2.dataset.row);
            const col2 = parseInt(cell2.dataset.col);

            switch (direction) {
                case 'up':
                    return row1 === row2 - 1 && col1 === col2;
                case 'down':
                    return row1 === row2 + 1 && col1 === col2;
                case 'left':
                    return row1 === row2 && col1 === col2 - 1;
                case 'right':
                    return row1 === row2 && col1 === col2 + 1;
                default:
                    return false;
            }
        }

        function setDirection(cell, prevCell) {
            const row1 = parseInt(cell.dataset.row);
            const col1 = parseInt(cell.dataset.col);
            const row2 = parseInt(prevCell.dataset.row);
            const col2 = parseInt(prevCell.dataset.col);

            if (row1 === row2 - 1 && col1 === col2) {
                direction = 'up';
            } else if (row1 === row2 + 1 && col1 === col2) {
                direction = 'down';
            } else if (row1 === row2 && col1 === col2 - 1) {
                direction = 'left';
            } else if (row1 === row2 && col1 === col2 + 1) {
                direction = 'right';
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
            ['P', 'A', 'R', 'L', 'I', 'A', 'M', 'E', 'N', 'T', 'R'],
            ['R', 'R', 'A', 'C', 'I', 'G', 'W', 'O', 'R', 'E', 'E'],
            ['E', 'L', 'B', 'A', 'K', 'E', 'Y', 'S', 'D', 'W', 'S'],
            ['S', 'I', 'A', 'R', 'O', 'M', 'D', 'M', 'O', 'K', 'E'],
            ['E', 'R', 'M', 'O', 'L', 'A', 'O', 'O', 'S', 'E', 'R'],
            ['E', 'V', 'E', 'M', 'E', 'P', 'S', 'K', 'M', 'S', 'V'],
            ['L', 'E', 'N', 'A', 'P', 'A', 'M', 'O', 'R', 'A', 'E'],
            ['U', 'M', 'T', 'N', 'W', 'R', 'G', 'N', 'L', 'E', 'F'],
            ['S', 'O', 'R', 'I', 'I', 'N', 'N', 'R', 'L', 'L', 'U'],
            ['E', 'K', 'E', 'C', 'O', 'T', 'I', 'N', 'E', 'L', 'S'],
            ['S', 'M', 'O', 'K', 'E', 'S', 'M', 'E', 'L', 'L', 'E'],
        ];

        let isDragging = false;
        let selectedCells = [];
        let direction = '';

        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
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
            direction = '';
            event.target.classList.add('selected');
        }

        function handleTouchMove(event) {
            if (isDragging) {
                const cell = getCellFromEvent(event.touches[0]);
                if (cell && !cell.classList.contains('selected')) {
                    if (direction === '' || isSameDirection(cell, selectedCells[selectedCells.length - 1], direction)) {
                        selectedCells.push(cell);
                        cell.classList.add('selected');
                        if (direction === '') {
                            setDirection(cell, selectedCells[selectedCells.length - 2]);
                        }
                    }
                }
            }
        }

        function isSameDirection(cell1, cell2, direction) {
            const row1 = parseInt(cell1.dataset.row);
            const col1 = parseInt(cell1.dataset.col);
            const row2 = parseInt(cell2.dataset.row);
            const col2 = parseInt(cell2.dataset.col);

            switch (direction) {
                case 'up':
                    return row1 === row2 - 1 && col1 === col2;
                case 'down':
                    return row1 === row2 + 1 && col1 === col2;
                case 'left':
                    return row1 === row2 && col1 === col2 - 1;
                case 'right':
                    return row1 === row2 && col1 === col2 + 1;
                default:
                    return false;
            }
        }

        function setDirection(cell, prevCell) {
            const row1 = parseInt(cell.dataset.row);
            const col1 = parseInt(cell.dataset.col);
            const row2 = parseInt(prevCell.dataset.row);
            const col2 = parseInt(prevCell.dataset.col);

            if (row1 === row2 - 1 && col1 === col2) {
                direction = 'up';
            } else if (row1 === row2 + 1 && col1 === col2) {
                direction = 'down';
            } else if (row1 === row2 && col1 === col2 - 1) {
                direction = 'left';
            } else if (row1 === row2 && col1 === col2 + 1) {
                direction = 'right';
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

        setTimeout(() => {

            popupPanel.style.bottom = '0';
        }, 0);
    }

    function showGameOverPanel() {

        letterGrid.style.pointerEvents = 'none';

        let popupPanel = document.querySelector('.popup-panel');

        document.getElementById("result-text").innerText = "Время истекло!";
        document.getElementById("info-text").innerText = "К сожалению вы не успели угадать слова";

        setTimeout(() => {

            popupPanel.style.bottom = '0';
        }, 0);
    }

    startTimer();
});



