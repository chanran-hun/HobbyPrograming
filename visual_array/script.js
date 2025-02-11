let array = [];

function generateArray() {
    const container = document.getElementById("array-container");
    container.innerHTML = ""; // 기존 막대 초기화
    array = [];
    
    for (let i = 0; i < 20; i++) {
        let value = Math.floor(Math.random() * 100) + 1; // 1~100 사이 랜덤 값
        array.push(value);
    }
    
    array.forEach(value => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    });
}

async function bubbleSort() {
    const bars = document.getElementsByClassName("bar");
    let len = array.length;
    
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";
            
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            }
            
            await new Promise(resolve => setTimeout(resolve, 100)); // 애니메이션 속도 조절
            
            bars[j].style.backgroundColor = "steelblue";
            bars[j + 1].style.backgroundColor = "steelblue";
        }
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName("bar");
    let len = array.length;
    
    for (let i = 0; i < len - 1; i++) {
        let minIdx = i;
        bars[minIdx].style.backgroundColor = "red";
        
        for (let j = i + 1; j < len; j++) {
            bars[j].style.backgroundColor = "yellow";
            await new Promise(resolve => setTimeout(resolve, 100));
            
            if (array[j] < array[minIdx]) {
                bars[minIdx].style.backgroundColor = "steelblue";
                minIdx = j;
                bars[minIdx].style.backgroundColor = "red";
            } else {
                bars[j].style.backgroundColor = "steelblue";
            }
        }
        
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        bars[i].style.height = `${array[i] * 3}px`;
        bars[minIdx].style.height = `${array[minIdx] * 3}px`;
        bars[minIdx].style.backgroundColor = "steelblue";
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName("bar");
    let len = array.length;
    
    for (let i = 1; i < len; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = "red";
        
        while (j >= 0 && array[j] > key) {
            bars[j + 1].style.height = `${array[j] * 3}px`;
            array[j + 1] = array[j];
            bars[j].style.backgroundColor = "yellow";
            await new Promise(resolve => setTimeout(resolve, 100));
            j--;
        }
        
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[i].style.backgroundColor = "steelblue";
    }
}

window.onload = generateArray; // 페이지 로드 시 기본 배열 생성
