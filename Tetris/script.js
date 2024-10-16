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

const boardWidth = 10;
const boardHeight = 20;
var currentBlock = getRandomBlock();    
var currentX = 0;
var currentY = 0;

// 블록을 보드에 그리는 함수
function drawBlock(block, positionX, positionY) {
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

drawBlock(currentBlock,0,0);     

function getLastIndex(){
    var lastIndex = 0;
    for(let i = 0; i < currentBlock.length; i++){
        for(let j = 0; j < currentBlock[i].length; j++){
            if(currentBlock[i][j] === 1){
                lastIndex = i;
                break;
            }
        }
    }
    return lastIndex;
}

function getLastLen(){
    var lastLen = 0;
    for(let i = 0; i < currentBlock.length; i++){
        for(let j = 0; j < currentBlock[i].length; j++){
            if(currentBlock[i][j] === 1){
                if(j > lastLen){
                    lastLen = j;
                }
            }
        }
    }
    return lastLen;
}

function getLeft(){
    var left = 10;
    for(let i = 0; i < currentBlock.length; i++){
        for(let j = 0; j < currentBlock[i].length; j++){
            if(currentBlock[i][j] === 1){
                if(j < left){
                    left = j;
                }
            }
        }
    }
    return left;
}

function isBottom(){
    return getLastIndex() + currentY + 1 >= boardHeight;
}

function isRight(){
    return getLastLen() + currentX + 1 >= boardWidth;
}

function isLeft(){
    return getLeft() + currentX <= 0;
}
// 블록을 랜덤으로 선택하는 함수
function getRandomBlock() {
    const randomIndex = Math.floor(Math.random() * blocks.length);
    return blocks[randomIndex];
}        

function rotateBlock(block){
    const rotatedBlock = block.map((val,index) => block.map(row => row[index]).reverse())
    return rotatedBlock;
}

function removeBlock(block, positionX, positionY){
    for (let y = 0; y < block.length; y++) {
        for (let x = 0; x < block[y].length; x++) {
            if (block[y][x] === 1) {
                const index = (positionY + y) * 10 + (positionX + x);
                const cells = document.querySelectorAll('.cell');
                cells[index].classList.remove('filled');
            }
        }
    }
}

function drawNewBlock(){
    const newBlock = getRandomBlock();
    currentBlock = newBlock;
    currentX = 0;
    currentY = 0;
    drawBlock(newBlock,0,0);
}

function downBlock(){
    if (!isBottom()) {
        removeBlock(currentBlock,currentX,currentY);
        currentY++;
        drawBlock(currentBlock,currentX,currentY);
    } else {
        drawNewBlock();
    }
}

var gamepace = setInterval(downBlock,1000);

document.addEventListener('keydown', function(e){
    //위 방향키 입력 : 90도 회전
    if(e.key === 'ArrowUp'){
        removeBlock(currentBlock,currentX,currentY);
        currentBlock = rotateBlock(currentBlock);
        drawBlock(currentBlock,currentX,currentY);
    }
    //아래 방향키 입력 : 아래로 한칸 내려가기
    if(e.key === 'ArrowDown'){
        downBlock();
    }
    //오른쪽 방향키 입력 : 오른쪽으로 한칸 움직이기
    if(e.key === 'ArrowRight'){
        if (!isRight()) {
            removeBlock(currentBlock,currentX,currentY);
            currentX++;
            drawBlock(currentBlock,currentX,currentY);
        }
    }
    //왼쪽 방향키 입력 : 왼쪽으로 한칸 움직이기
    if(e.key === 'ArrowLeft'){
        if (!isLeft()) {
            removeBlock(currentBlock,currentX,currentY);
            currentX = currentX-1;
            drawBlock(currentBlock,currentX,currentY);
        }
    }
    if(e.key === 'Enter'){
        removeBlock(currentBlock,currentX,currentY);
        currentBlock = getRandomBlock();
        drawBlock(currentBlock,currentX,currentY);
    }
    if(e.key === 'Escape'){
        drawNewBlock();
    }
})