
let balls = document.getElementsByClassName("balls");
let ball = document.getElementsByClassName("ball");

// ball[8].innerHTML = 'a'


let arr  = Array(45)
    .fill()
    .map(function(num,index){
    return index + 1;
});

//랜덤 값 생성 후 리스트에 추가
let suffle = [];
while(arr.length > 0){
    var result = arr.splice(Math.floor(Math.random()*arr.length),1)[0];
    suffle.push(result);
}
//보너스는 뒤에서 한 개 뽑아온다
let bonus = suffle[suffle.length-1];
let lucky = suffle.slice(0,6)
    .sort(function (a,b) {
    return a-b;
});
for(let i = 0 ; i < ball.length -1  ; i++ ){
    ball[i].innerHTML = lucky[i];
}
ball[ball.length-1].innerHTML = bonus;


//#########이 부분 다시하기#############
function lottocolor(num) {
    var color;
    if (num.innerHTML <= 10) {
        color = 'red';
    } else if (num.innerHTML <= 20) {
        color = 'orange';
    } else if (num.innerHTML<= 30) {
        color = 'yellow';
    } else if (num.innerHTML <= 40) {
        color = 'blue';
    } else {
        color = 'green';
    }
    num.style.background = color;
    // 결과창.appendChild(공);
}
lottocolor(ball);


//
// for (var i = 0; i < 당첨숫자들.length; i++) {
//     (function 클로저(j) {
//         // var j = i;
//         setTimeout(function () {
//             공색칠하기(당첨숫자들[j], 결과창);
//         }, (j + 1) * 1000);
//     })(i);
// }