//버튼 입력창 폼 결과
var 바디 = document.body;
var 숫자후보;
var 숫자배열;

function 숫자뽑기(){
    숫자후보 = [1,2,3,4,5,6,7,8,9];
    숫자배열 = [];
    for ( var i = 0 ; i < 4 ; i +=1 ){
        //splice는 배열로 뽑히기 때문에 인덱스0 의 자료를 뽑아서 넣는다
        var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        숫자배열.push(뽑은것);
    }
    console.log(숫자배열);
}

//처음
숫자뽑기();
console.log(숫자배열);

var 결과 = document.createElement('h1');
바디.append(결과);
var 폼 = document.createElement('form');
document.body.append(폼);
var 입력창 = document.createElement('input');
폼.append(입력창);
입력창.type = 'text';
입력창.maxLength = 4;

var 버튼 = document.createElement('button');
버튼.textContent = '입력!';
폼.append(버튼);

var 틀린횟수 = 0;
폼.addEventListener('submit',function(event){
    event.preventDefault();
   var 답 = 입력창.value;
   console.log(답);
   if (답 === 숫자배열.join('')){
       결과.textContent = '홈런';
       입력창.value = "";
       입력창.focus();
       숫자뽑기();
       틀린횟수 = 0;
   }else{
       var 답배열 = 답.split('');
       var 스트라이크 = 0;
       var 볼 = 0;
       틀린횟수 += 1;
       if( 틀린횟수 > 5){
           결과.textContent = '실패했습니다' + 숫자배열.join(',');
           입력창.value = '';
           입력창.focus();
           숫자뽑기();
           틀린횟수 = 0;
       }
       //5번 이하로 틀린경우
       else {
           for (var i = 0; i <= 3; i += 1) {
               if (Number(답배열[i]) === 숫자배열[i]) {
                   console.log('같은 자리');
                   스트라이크 += 1;
               } else if (숫자배열.indexOf(Number(답배열[i])) > -1) {
                   console.log('겹치는 숫자 있음');
                   볼 += 1;
               }
           }
           결과.textContent = 스트라이크 + '스트라이크 ' + 볼 + '볼입니다.';
           입력창.value = '';
           입력창.focus();
       }
   }
});

