document.addEventListener('DOMContentLoaded', () => {
    // --- GAME DATA ---
    const gameData = {
        // 1번 방: 교실
        classroom: {
            name: "1번 방: 교실", type: 'items',
            background: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1080&q=80',
            description: "파이썬 동아리 부실. 방 안의 사물을 조사해 단서를 찾아라.",
            keyName: "교무실 열쇠",
            puzzles: [
                { item: { id: 'chalkboard', name: '칠판', top: '35%', left: '50%' }, question: "화면에 'Hello, World!'를 출력하는 파이썬 코드는? (함수만)", answer: "print" },
                { item: { id: 'bookshelf', name: '책장', top: '50%', left: '80%' }, question: "파이썬에서 한 줄 주석을 나타내는 기호는?", answer: "#" },
                { item: { id: 'computer', name: '컴퓨터', top: '70%', left: '25%' }, question: "x = 10, y = 5 일 때, x + y 의 값은?", answer: "15" },
                { item: { id: 'trashcan', name: '쓰레기통', top: '85%', left: '90%' }, question: "문자열 데이터를 저장하는 파이썬의 기본 자료형은?", answer: "str" }
            ]
        },
        // 2번 방: 교무실
        teachers_office: {
            name: "2번 방: 교무실", type: 'items',
            background: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1080&q=80',
            description: "아무도 없는 선생님들의 공간. 커피 향이 희미하게 난다.",
            keyName: "컴퓨터실 열쇠",
            puzzles: [
                { item: { id: 'coffee_pot', name: '커피포트', top: '55%', left: '25%' }, question: "함수를 정의할 때 사용하는 키워드는?", answer: "def" },
                { item: { id: 'printer', name: '프린터', top: '75%', left: '70%' }, question: "함수에서 값을 반환할 때 사용하는 키워드는?", answer: "return" },
                { item: { id: 'calendar', name: '달력', top: '30%', left: '50%' }, question: "다른 파일의 코드를 가져올 때 사용하는 키워드는?", answer: "import" },
                { item: { id: 'file_cabinet', name: '서류함', top: '60%', left: '85%' }, question: "예외 처리를 위해 사용하는 구문은? (try...?)", answer: "except" }
            ]
        },
        // --- [이미지 수정] 3번 방 컴퓨터실 배경 이미지를 요청하신 최종 URL로 변경했습니다. ---
        computer_lab: {
            name: "3번 방: 컴퓨터실", type: 'items',
            background: 'https://i.postimg.cc/bdC7kswN/computer-room.jpg',
            description: "수많은 컴퓨터가 있는 컴퓨터실. 서버에서 이상한 소리가 들린다.",
            keyName: "교장실 열쇠",
            puzzles: [
                { item: { id: 'server', name: '서버 컴퓨터', top: '50%', left: '20%' }, question: "웹에서 데이터를 주고받을 때 사용하는 대표적인 데이터 형식은? (J로 시작)", answer: "json" },
                { item: { id: 'broken_monitor', name: '고장난 모니터', top: '65%', left: '80%' }, question: "코드를 이전 상태로 되돌리거나 버전을 관리하는 시스템은? (G로 시작)", answer: "git" },
                { item: { id: 'lan_cables', name: '랜선 뭉치', top: '80%', left: '50%' }, question: "컴퓨터의 고유한 네트워크 주소는? (두 글자 약어)", answer: "ip" },
                { item: { id: 'keyboard', name: '키보드', top: '70%', left: '60%' }, question: "객체 지향 프로그래밍에서, 객체의 설계도 역할을 하는 것은?", answer: "class" }
            ]
        },
        // 4번 방: 교장실 보스전
        principals_office: {
            name: "4번 방: 교장실", type: 'boss',
            background: 'https://images.unsplash.com/photo-1520092352425-9699925a1b3b?w=1080&q=80',
            description: "교장실에 들어서자, 교장 선생님의 눈이 붉게 빛난다! '파이썬의 진정한 힘을 보여주마!'",
            keyName: "탈출 성공!"
        }
    };
    const bossPuzzles = [
        { question: "리스트에서 특정 값의 인덱스를 찾는 메서드는?", answer: "index" }, { question: "문자열을 모두 대문자로 바꾸는 메서드는?", answer: "upper" },
        { question: "현재 디렉토리의 파일 목록을 보여주는 'os' 모듈의 함수는?", answer: "listdir" }, { question: "튜플 `t = (1, 2)`에 `3`을 추가할 수 있는가? (yes/no)", answer: "no" },
        { question: "논리 연산자가 아닌 것은? (and, or, not, is)", answer: "is" }, { question: "`__init__` 메서드는 언제 호출되는가? (한글로)", answer: "인스턴스생성시" },
        { question: "전역 변수를 함수 내에서 수정하려면 어떤 키워드를 사용해야 하는가?", answer: "global" }, { question: "람다(lambda)는 어떤 함수를 의미하는가? (한 단어로)", answer: "익명" },
        { question: "파이썬에서 '거짓'으로 취급되지 않는 값은? (0, None, [], 1)", answer: "1" }, { question: "코딩의 즐거움을 알려준 파이썬에게 '고마워'를 영어로 입력하시오.", answer: "thanks" }
    ];

    // --- 이하 로직은 이전과 동일하게 작동합니다 ---
    const gameState = { currentRoom: 'classroom', inventory: [], solvedPuzzles: {} };
    let currentPuzzleIndex = null; let bossBattleState = {};

    const messageText = document.getElementById('message-text');
    const inventoryList = document.getElementById('inventory-list');
    const roomBackground = document.getElementById('room-background');
    const navigation = document.getElementById('navigation');
    const itemsContainer = document.getElementById('clickable-items-container');
    const bossTriggerArea = document.getElementById('boss-trigger-area');
    const puzzleModal = document.getElementById('puzzle-modal');
    const bossBattleModal = document.getElementById('boss-battle-modal');

    function showMessage(msg) { messageText.textContent = msg; }
    function updateNavigation() {
        Object.keys(gameData).forEach(roomId => {
            const btn = document.getElementById(`nav-${roomId}`);
            if (btn) btn.style.fontWeight = gameState.currentRoom === roomId ? 'bold' : 'normal';
        });
    }
    function updateInventory() {
        inventoryList.innerHTML = '';
        gameState.inventory.forEach(item => {
            const li = document.createElement('li'); li.textContent = item; inventoryList.appendChild(li);
        });
    }
    function unlockNextRoom() {
        const roomOrder = Object.keys(gameData);
        const currentIndex = roomOrder.indexOf(gameState.currentRoom);
        if (currentIndex < roomOrder.length - 1) {
            const nextRoomId = roomOrder[currentIndex + 1];
            document.getElementById(`nav-${nextRoomId}`).disabled = false;
            showMessage(`이제 '${gameData[nextRoomId].name}'(으)로 갈 수 있습니다.`);
        }
    }
    function checkRoomCompletion() {
        const room = gameData[gameState.currentRoom];
        if (room.type === 'boss') return;
        const solvedCount = gameState.solvedPuzzles[gameState.currentRoom].length;
        if (solvedCount === room.puzzles.length && !gameState.inventory.includes(room.keyName)) {
            gameState.inventory.push(room.keyName);
            showMessage(`대단해요! 방의 모든 문제를 풀고 '${room.keyName}'을(를) 획득했습니다!`);
            updateInventory();
            unlockNextRoom();
        }
    }
    function renderRoom() {
        const room = gameData[gameState.currentRoom];
        roomBackground.style.backgroundImage = `url('${room.background}')`;
        itemsContainer.classList.add('hidden');
        bossTriggerArea.classList.add('hidden');
        itemsContainer.innerHTML = '';
        if (room.type === 'items') {
            room.puzzles.forEach((puzzle, index) => {
                const item = puzzle.item;
                const itemDiv = document.createElement('div');
                itemDiv.className = 'clickable-item';
                if (gameState.solvedPuzzles[gameState.currentRoom].includes(index)) {
                    itemDiv.classList.add('solved');
                } else {
                    itemDiv.addEventListener('click', () => showPuzzle(index));
                }
                itemDiv.id = item.id;
                itemDiv.textContent = item.name;
                itemDiv.style.top = item.top;
                itemDiv.style.left = item.left;
                itemsContainer.appendChild(itemDiv);
            });
            itemsContainer.classList.remove('hidden');
        } else if (room.type === 'boss') {
            bossTriggerArea.classList.remove('hidden');
        }
        showMessage(room.description);
        updateNavigation();
    }
    function showPuzzle(index) {
        currentPuzzleIndex = index;
        const puzzle = gameData[gameState.currentRoom].puzzles[index];
        document.getElementById('puzzle-question').textContent = puzzle.question;
        document.getElementById('puzzle-answer').value = '';
        puzzleModal.classList.remove('hidden');
        document.getElementById('puzzle-answer').focus();
    }
    function submitPuzzleAnswer() {
        const puzzle = gameData[gameState.currentRoom].puzzles[currentPuzzleIndex];
        const userAnswer = document.getElementById('puzzle-answer').value.trim();
        if (userAnswer && userAnswer.toLowerCase() === puzzle.answer.toLowerCase()) {
            if (!gameState.solvedPuzzles[gameState.currentRoom].includes(currentPuzzleIndex)) {
                gameState.solvedPuzzles[gameState.currentRoom].push(currentPuzzleIndex);
            }
            showMessage("정답입니다!");
            puzzleModal.classList.add('hidden');
            renderRoom();
            checkRoomCompletion();
        } else {
            showMessage("틀렸습니다. 다시 생각해보세요.");
        }
    }
    function updateBossUI() {
        document.getElementById('player-progress').value = bossBattleState.playerScore;
        document.getElementById('player-progress-text').textContent = `${bossBattleState.playerScore}/10`;
        const bossTimeLeft = (bossBattleState.bossTime / 10).toFixed(1);
        document.getElementById('boss-timer-text').textContent = `${bossTimeLeft}초`;
        document.getElementById('boss-progress').value = bossBattleState.bossTime * (100 / 600);
    }
    function displayBossQuestion() {
        document.getElementById('boss-puzzle-question').textContent = bossPuzzles[bossBattleState.currentQuestion].question;
    }
    function handleBossAnswer() {
        const userAnswer = document.getElementById('boss-puzzle-answer').value.trim();
        const correctAnswer = bossPuzzles[bossBattleState.currentQuestion].answer;
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            bossBattleState.playerScore++; bossBattleState.currentQuestion++; updateBossUI();
            if (bossBattleState.playerScore >= bossPuzzles.length) {
                clearInterval(bossBattleState.interval);
                setTimeout(() => { alert("승리! 파이썬 마스터를 이기고 탈출에 성공했다!"); location.reload(); }, 500);
            } else { displayBossQuestion(); }
        } else {
            showMessage("오답! 시간이 더 빨리 흐른다!"); bossBattleState.bossTime -= 50; updateBossUI();
        }
        document.getElementById('boss-puzzle-answer').value = ''; document.getElementById('boss-puzzle-answer').focus();
    }
    function startBossBattle() {
        bossBattleState = { playerScore: 0, bossTime: 600, currentQuestion: 0, interval: null };
        bossBattleModal.classList.remove('hidden'); updateBossUI(); displayBossQuestion();
        document.getElementById('boss-puzzle-answer').focus();
        bossBattleState.interval = setInterval(() => {
            bossBattleState.bossTime--; updateBossUI();
            if (bossBattleState.bossTime <= 0) {
                clearInterval(bossBattleState.interval);
                alert("타임 오버! 보스의 승리다... 처음부터 다시 도전해라!"); location.reload();
            }
        }, 100);
    }
    function activateAdminMode() {
        const password = prompt("ADMIN 암호를 입력하세요:");
        if (password === "won0708won") {
            alert("ADMIN 모드가 활성화되었습니다. 모든 방이 열립니다.");
            Object.keys(gameData).forEach(roomId => { document.getElementById(`nav-${roomId}`).disabled = false; });
            showMessage("ADMIN 모드: 모든 방을 자유롭게 이동할 수 있습니다.");
        } else if (password !== null) { alert("암호가 틀렸습니다."); }
    }
    function init() {
        Object.keys(gameData).forEach(roomId => {
            gameState.solvedPuzzles[roomId] = [];
            const navButton = document.createElement('button');
            navButton.id = `nav-${roomId}`;
            navButton.textContent = gameData[roomId].name.split(':')[0];
            navButton.disabled = true;
            navButton.addEventListener('click', () => { gameState.currentRoom = roomId; renderRoom(); });
            navigation.appendChild(navButton);
        });
        document.getElementById('nav-classroom').disabled = false;
        
        document.getElementById('admin-button').addEventListener('click', activateAdminMode);
        document.getElementById('puzzle-submit').addEventListener('click', submitPuzzleAnswer);
        document.getElementById('puzzle-close').addEventListener('click', () => puzzleModal.classList.add('hidden'));
        document.getElementById('start-boss-battle').addEventListener('click', startBossBattle);
        document.getElementById('boss-puzzle-submit').addEventListener('click', handleBossAnswer);
        document.getElementById('boss-puzzle-answer').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') handleBossAnswer();
        });

        renderRoom();
        showMessage("파이썬 동아리 방에서 깨어났다. 문제를 풀어 학교를 탈출하자!");
    }
    init();
});