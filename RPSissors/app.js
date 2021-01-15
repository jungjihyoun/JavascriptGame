let comImg = '0';  //이미지좌표임!!!
//###############객체로 dict 형태로 만들어줌 ################
let RPS = {
    rock: '0',
    sissors: '-142px',
    paper: '-284px',
};
//##############컴퓨터가 선택한게 무엇이지????####################
//##### entries 사용하여 배열로 만든 뒤 뭐 골랐는지 알려줌
function computerChoice(comImg) {
    return Object.entries(RPS).find(function (v) {
        return v[1] === comImg;
    })[0];
}
//############## 가위바위보 섞음 #############
var Interval;

function intervalMaker() {
    //계속 돌아감
    Interval = setInterval( function(){
        if(comImg === RPS.rock){
            comImg = RPS.sissors;
        } else if (comImg === RPS.sissors){
            comImg = RPS.paper;
        } else{
            comImg = RPS.rock;
        }
        //이미지에 따라 좌표가 계속 바뀐다
        document.querySelector('#computer').style.background =
            'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + comImg + ' 0';
    },100);
}
intervalMaker();




var score = {
    sissors: 1,
    rock: 0,
    paper: -1,
};

//클래스 btn 모두 공통된 속성이니 seletAll을 하고 forEach를 사용하여
//반복하여 돌면서 eventlistner 연결하자
document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click',function () {
        clearInterval(Interval); //setInterval을 중지
        //잠깐 멈추고 다시 가위바위보
        setTimeout(function () {
            intervalMaker();
        },1000);
        var userChoice = this.textContent;
        var userScore = score[userChoice];
        var comScore = score[computerChoice(comImg)];
        const scoreGap = userScore - comScore;
        if (scoreGap === 0) {
            alert('Draw!');
        } else if ([-1, 2].includes(scoreGap)) {
            alert('You win!');
        } else {
            alert('You lose!');
        }
    });
});


// let start = 3;
// let interval2 = setInterval(function () {
//     if(start === 0){
//         console.log('Finish');
//         return clearInterval(interval2);
//     }
//     console.log(start);
//     start -= 1 ;
// },1000);