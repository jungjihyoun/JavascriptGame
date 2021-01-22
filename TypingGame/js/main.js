// 사용변수
const GAME_TIME = 9;
const  wordInput = document.querySelector('.word-input');
const wordDisplay =  document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');
const url = "https://random-word-api.herokuapp.com/word?number=100";

let words = [];
let timeInterval;
let checkInterval;
let score = 0;
let time = GAME_TIME;
let isplaying = false;


init();
function init(){
    buttonChange('게임로딩중...');
    getWords();
    wordInput.addEventListener('input', checkMatch);
}

//게임 실행
function run(){
    if (isplaying){   //로딩중일때 클릭이벤트 발생하지 않게
        return;
    }
    isplaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown,1000); //남은 시간 줄이기
    checkInterval = setInterval(checkStatus, 50);  //게임 상태를 계속해서 확인
    buttonChange('게임중');
}


function checkStatus(){
    if(!isplaying && time === 0){
        buttonChange("게임시작");
        clearInterval(checkInterval);
    }
}


//단어 불러오기
function getWords() {
    axios.get(url)
        .then((res) => {
        res.data.forEach((word) => {
            if (word.length < 7) {
                words.push(word);
            }
            buttonChange('게임시작');
        })
    }).catch((err) => {
        console.log(err);
    })
}

// 1. 단어 일치 체크 함수
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = "";
        //시간 다 되었으면
        if(!isplaying){
            return
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}


// 2. 남은 시간 함수와 버튼조정

//1초 간격으로 countDown 함수를 실행!
function countDown() {
    time > 0 ? time-- : isplaying = false;
    if(!isplaying){
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}


// 3. 게임 상태에 따라 버튼 텍스트 바꾸기
function buttonChange(text){
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}