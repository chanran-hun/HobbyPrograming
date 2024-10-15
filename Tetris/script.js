const board = document.getElementById('game-board');

for (let i = 0; i < 200; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
}

const blocks = [
    //길쭉한거
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    //네모난거
    [
        [1, 1],
        [1, 1]
    ],
    //ㅗ모양
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    //L자 모양
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    //뒤집어진 L자모양
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    //지그재그 모양
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    //반대 지그재그 모양
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ]
];            

// 블록을 랜덤으로 선택하는 함수
function getRandomBlock() {
    const randomIndex = Math.floor(Math.random() * blocks.length);
    return blocks[randomIndex];
}        

// 블록을 보드에 그리는 함수
function drawTetromino(block, positionX, positionY) {
    for (let y = 0; y < block.length; y++) {
        for (let x = 0; x < block[y].length; x++) {
            if (block[y][x] === 1) {
                const index = (positionY + y) * 10 + (positionX + x);
                const cells = document.querySelectorAll('.cell');
                cells[index].classList.add('filled');
            }
        }
    }
}        

drawTetromino(getRandomBlock(), 0, 0);       