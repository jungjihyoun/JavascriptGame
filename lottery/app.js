
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


//########## 실행은 되는데 뭔가 이상함 다시보기!#############
function lottocolor(num) {
    var color;
    if (ball[num].innerText <= 10) {
        color = 'red';
    } else if (ball[num].innerText <= 20) {
        color = 'orange';
    } else if (ball[num].innerText<= 30) {
        color = 'yellow';
    } else if (ball[num].innerText <= 40) {
        color = 'blue';
    } else {
        color = 'green';
    }
    ball[num].style.background = color;
}
// ball[0].style.background = color;

for (var i = 0; i < ball.length; i++) {
    lottocolor(i);
}

