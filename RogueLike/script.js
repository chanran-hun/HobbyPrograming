// script.js

// 캔버스 설정
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 50; // 타일 크기
const gridSize = 10; // 10x10 그리드

// 맵 데이터 (0: 바닥, 1: 벽)
let mapGrid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => (Math.random() < 0.2 ? 1 : 0)) // 20% 확률로 벽 생성
);

// 플레이어 설정
let player = {
    x: 0,
    y: 0,
    size: tileSize,
    color: 'blue'
};

// 키보드 입력 처리
window.addEventListener('keydown', (event) => {
    let newX = player.x;
    let newY = player.y;

    switch (event.key) {
        case 'ArrowUp':
            newY -= tileSize;
            break;
        case 'ArrowDown':
            newY += tileSize;
            break;
        case 'ArrowLeft':
            newX -= tileSize;
            break;
        case 'ArrowRight':
            newX += tileSize;
            break;
    }
    
    // 벽 충돌 검사
    let gridX = newX / tileSize;
    let gridY = newY / tileSize;
    if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize && mapGrid[gridY][gridX] === 0) {
        player.x = newX;
        player.y = newY;
    }
    
    drawGame();
});

// 게임 화면 그리기
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 그리드 및 벽 그리기
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (mapGrid[y][x] === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
            ctx.strokeStyle = '#ddd';
            ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    // 플레이어 그리기
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// 캔버스 크기 설정 및 초기화
document.addEventListener("DOMContentLoaded", () => {
    canvas.width = tileSize * gridSize;
    canvas.height = tileSize * gridSize;
    drawGame();
});
