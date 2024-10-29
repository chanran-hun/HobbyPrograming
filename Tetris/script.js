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
const boardState = Array(boardHeight).fill(null).map(() => Array(boardWidth).fill(0));  //[10][20] 배열 현재상태

function updateBoard(value){
    for(let y = 0; y < currentBlock.length; y++){
        for(let x = 0; x < currentBlock[y].length; x++){
            if(currentBlock[y][x] === 1){
                boardState[currentY + y][currentX + x] = value;   
            }
        }
    }
}

function drawBoard(){
    const cells = document.querySelectorAll('.cell');
    for(let y = 0; y < boardHeight; y++){
        for(let x = 0; x < boardWidth; x++){
            const index = y * boardWidth + x;
            if( boardState[y][x] === 1){
                cells[index].classList.add('filled');
            } else {
                cells[index].classList.remove('filled');
            }
        }
    }
}

function isFull(boardY){
    var result = 0;    
    for(let x = 0; x < boardWidth; x++){
        if(boardState[boardY][x] === 1){
            result++;
        }
    }

    if(result === boardWidth){
        return true;
    }

    return false;
        
}

function eraseLine(boardY){
    for(let x = 0; x < boardWidth; x++){
        boardState[boardY][x] = 0;
    }
}

// 블록을 보드에 그리는 함수
function drawBlock() {
    updateBoard(1);
    drawBoard();
}        

function removeBlock(){
    updateBoard(0);
    drawBoard();
}

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

function isCollison(block){
    for(let y = 0; y < block.length; y++){
        for(let x = 0; x < block[y].length; x++){
            if( block[y][x] === 1){
                const boardY = currentY + y;
                const boardX = currentX + x;
                if(boardY >= boardHeight || boardState[boardY][boardX] === 1 || boardX >= boardWidth || boardX < 0){
                    return true;
                }
            }
        }
    }
    return false;
}

function lockBlock(){
    for(let y = 0; y < currentBlock.length; y++){
        for(let x = 0; x < currentBlock[y].length; x++){
            if( currentBlock[y][x] === 1){
                const boardY = currentY + y;
                const boardX = currentX + x;
                boardState[boardY][boardX] = 1;
            }
        }
    }
}

drawBlock();     
var flow = setInterval(downBlock,1000);

// 블록을 랜덤으로 선택하는 함수
function getRandomBlock() {
    const randomIndex = Math.floor(Math.random() * blocks.length);
    return blocks[randomIndex];
}        

function rotateBlock(block){
    const rotatedBlock = block.map((val,index) => block.map(row => row[index]).reverse())
    if(!isCollison(rotatedBlock)){
        return rotatedBlock;
    } else {
        return currentBlock;
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
    removeBlock();
    currentY++;
    if (!isCollison(currentBlock)) {
        drawBlock();
    } else {
        currentY--;
        lockBlock();  

        for(let y = 0; y < boardHeight; y++){
            if(isFull(y)){
                eraseLine(y);
                for(let h = y-1; h >= 0; h--){
                    for(let x = 0; x < boardWidth; x++){
                        if(boardState[h][x] === 1){
                            boardState[h][x] = 0;
                            boardState[h+1][x] = 1;
                        }
                    }
                }
            }
        }

        drawNewBlock();

        
    }
}

document.addEventListener('keydown', function(e){
    //위 방향키 입력 : 90도 회전
    if(e.key === 'ArrowUp'){
        removeBlock();
        currentBlock = rotateBlock(currentBlock);
        drawBlock();
    }
    //아래 방향키 입력 : 아래로 한칸 내려가기
    if(e.key === 'ArrowDown'){
        downBlock();
    }
    //오른쪽 방향키 입력 : 오른쪽으로 한칸 움직이기
    if(e.key === 'ArrowRight'){
        removeBlock();
        currentX++;
        if (!isCollison(currentBlock)) {
            drawBlock();
        } else {
            currentX--;
            drawBlock();
        }
    }
    //왼쪽 방향키 입력 : 왼쪽으로 한칸 움직이기
    if(e.key === 'ArrowLeft'){
        removeBlock();
        currentX--;
        if (!isCollison(currentBlock)) {
            drawBlock();
        } else {
            currentX++;
            drawBlock();
        }
    }
})