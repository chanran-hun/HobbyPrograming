// script.js

// 캔버스 설정
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 50; // 타일 크기
const gridSize = 10; // 10x10 그리드

// 맵 데이터 (0: 바닥, 1: 벽, 2: 목표 지점)
let mapGrid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => (Math.random() < 0.2 ? 1 : 0)) // 20% 확률로 벽 생성
);

// 목표 지점 설정
const goal = {
    x: (gridSize - 1) * tileSize,
    y: (gridSize - 1) * tileSize,
    color: 'gold'
};
mapGrid[gridSize - 1][gridSize - 1] = 2; // 목표 지점 표시

// 플레이어 설정
let player = {
    x: 0,
    y: 0,
    size: tileSize,
    color: 'blue'
};

// 몬스터 설정 (랜덤 위치)
let monster = {
    x: Math.floor(Math.random() * gridSize) * tileSize,
    y: Math.floor(Math.random() * gridSize) * tileSize,
    size: tileSize,
    color: 'red'
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
    if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize && mapGrid[gridY][gridX] !== 1) {
        player.x = newX;
        player.y = newY;
    }
    
    // 목표 도달 체크
    if (player.x === goal.x && player.y === goal.y) {
        alert('🎉 목표 지점 도착! 게임 클리어!');
        location.reload(); // 게임 재시작
    }
    
    drawGame();
});

// A* 알고리즘을 사용한 몬스터 이동
function findPath(start, end) {
    let openSet = [start];
    let cameFrom = {};
    let gScore = {};
    let fScore = {};
    
    gScore[start] = 0;
    fScore[start] = heuristic(start, end);
    
    while (openSet.length > 0) {
        openSet.sort((a, b) => fScore[a] - fScore[b]);
        let current = openSet.shift();
        
        if (current === end) {
            return reconstructPath(cameFrom, current);
        }
        
        for (let [dx, dy] of [[1,0], [-1,0], [0,1], [0,-1]]) {
            let neighbor = [current[0] + dx, current[1] + dy];
            
            if (
                neighbor[0] >= 0 && neighbor[0] < gridSize &&
                neighbor[1] >= 0 && neighbor[1] < gridSize &&
                mapGrid[neighbor[1]][neighbor[0]] !== 1
            ) {
                let tentativeGScore = gScore[current] + 1;
                
                if (!(neighbor in gScore) || tentativeGScore < gScore[neighbor]) {
                    cameFrom[neighbor] = current;
                    gScore[neighbor] = tentativeGScore;
                    fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end);
                    
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
    }
    return [];
}

function heuristic(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function reconstructPath(cameFrom, current) {
    let path = [];
    while (cameFrom[current]) {
        path.unshift(current);
        current = cameFrom[current];
    }
    return path;
}

function moveMonster() {
    let monsterGridPos = [monster.x / tileSize, monster.y / tileSize];
    let playerGridPos = [player.x / tileSize, player.y / tileSize];
    let path = findPath(monsterGridPos, playerGridPos);
    
    if (path.length > 0) {
        monster.x = path[0][0] * tileSize;
        monster.y = path[0][1] * tileSize;
    }
    
    if (monster.x === player.x && monster.y === player.y) {
        alert('💀 몬스터에게 잡혔다! 게임 오버!');
        location.reload();
    }
    
    drawGame();
}

setInterval(moveMonster, 500);

// 게임 화면 그리기
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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

    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x, goal.y, tileSize, tileSize);

    ctx.fillStyle = monster.color;
    ctx.fillRect(monster.x, monster.y, monster.size, monster.size);

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

document.addEventListener("DOMContentLoaded", () => {
    canvas.width = tileSize * gridSize;
    canvas.height = tileSize * gridSize;
    drawGame();
});
