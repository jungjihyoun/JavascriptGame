
let tbody = document.querySelector('#table tbody'); //table의 tbody에
var dataset = [];
var finish = false;
var opened = 0;
var codetable = {
    opened: -1,
    question: -2,
    flag: -3,  //지뢰 아니지만 사용자가 깃발
    fMine: -4,
    qMine: -5,  //깃발지뢰
    mine: 1, //지뢰
    nomal:0,
};

//실행 버튼을 누르면 시작
document.querySelector('#exec').addEventListener('click',function ()
{
    //내부 먼저 초기화
    tbody.innerHTML =  '';
    let hor = document.querySelector('#hor').value;
    let ver = document.querySelector('#ver').value;
    let mine = document.querySelector('#mine').value;

    //###############지뢰 심기 _ 지뢰 위치 뽑기###################
    var arr  = Array(hor * ver)
        .fill()
        .map(function(num,index){
            return index;
            //0부터 99까지 뽑게 한다
        });
    //배열에서 값을 랜덤하게 뽑아서 셔플에 넣는다
    //셔플에서 앞에서 20개를 뽑아서 지뢰 심기!
    //20번만 섞으면 되니까 그 것도 최적화 해보자
    let suffle = [];
    while(arr.length > 80){
        var result = arr.splice(Math.floor(Math.random()*arr.length),1)[0];
        suffle.push(result);
    }
    console.log(suffle);


    //################## 테이블 만들기 ######################
    //dataset 은 데이터
    //tbody td tr은 화면 !  항상 둘을 잘 일치시키자
    for (var i = 0 ; i < ver ; i += 1){
        var arr = [];
        dataset.push(arr);
        var tr = document.createElement('tr');
        for(var j = 0 ; j < hor; j +=1){
            arr.push(codetable.nomal);
            var td = document.createElement('td');
            //td를 만드는 순간에 eventlistener 추가
            td.addEventListener('contextmenu',function (e) {
                e.preventDefault();
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var row = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var col = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                if (dataset[col][row] === codetable.opened) { // 이미 연 row은 오른쪽 눌러도 효과 없게
                    return;
                }
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
                    e.currentTarget.textContent = '!';
                    //????????왜 classList를 쓰는지 모르겠음??????????
                    e.currentTarget.classList.add('flag');
                    if (dataset[col][row] === codetable.mine){
                        dataset[col][row] = codetable.qMine;
                    }else{
                        dataset[col][row] = codetable.flag;
                    }

                }else if (e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if( dataset[col][row] = codetable.fMine ){
                        dataset[col][row] = codetable.qMine;
                    }else{
                        dataset[col][row] = codetable.question;
                    }
                } else if (e.currentTarget.textContent === '?') {
                    e.currentTarget.classList.remove('question');
                    if( dataset[col][row] === codetable.qMine){
                        dataset[col][row] = codetable.mine;
                    }else{
                        e.currentTarget.textContent = '';
                        dataset[col][row] = codetable.normal;
                    }
                }
            });
            td.addEventListener('contextmenu',function(e){
                if(finish){   //중단플래그
                    return;
                }
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var row = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var col = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                //##############???정말 이해가 안가는 부분???###########
                if([codetable.opened,codetable.flag,codetable.fMine,codetable.qMine,codetable.qMine,codetable.question].includes(( dataset[col][row]))){
                    return;
                }

                // 클릭했을때
                e.currentTarget.classList.add('opened');
                opened += 1;
                if (dataset[col][row] === codetable.mine) { // 지뢰 클릭
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result').textContent = '실패 ㅠㅠ';
                    finish = true;
                } else { // 지뢰가 아닌 경우 around 지뢰 개수
                    var around = [
                        dataset[col][row-1], dataset[col][row+1],
                    ];
                    if (dataset[col-1]) {
                        around = around.concat([dataset[col-1][row-1], dataset[col-1][row], dataset[col-1][row+1]]);
                    }
                    if (dataset[col+1]) {
                        around = around.concat([dataset[col+1][row-1], dataset[col+1][row], dataset[col+1][row+1]]);
                    }
                    var aroundMine = around.filter(function(v) {
                        return [codetable.mine, codetable.fMine, codetable.qMine].includes(v);
                    }).length;
                    // 거짓인 값: false, '', 0, null, undefined, NaN
                    e.currentTarget.textContent = aroundMine || '';
                    dataset[col][row] = codetable.opend;
                    if (aroundMine === 0) {
                        console.log('around을 엽니다');
                        var aroundrow = [];
                        if (tbody.children[col-1]) {
                            aroundrow = aroundrow.concat([
                                tbody.children[col - 1].children[row - 1],
                                tbody.children[col - 1].children[row],
                                tbody.children[col - 1].children[row + 1],
                            ]);
                        }
                        aroundrow = aroundrow.concat([
                            tbody.children[col].children[row - 1],
                            tbody.children[col].children[row + 1],
                        ]);

                        if (tbody.children[col+1]) {
                            aroundrow = aroundrow.concat([
                                tbody.children[col + 1].children[row - 1],
                                tbody.children[col + 1].children[row],
                                tbody.children[col + 1].children[row + 1],
                            ]);
                        }
                        aroundrow.filter(function (v) {
                            return !!v;
                        }).forEach(function(next) {
                            var parentTr = next.parentNode;
                            var parentTbody = next.parentNode.parentNode;
                            var nextrow = Array.prototype.indexOf.call(parentTr.children, next);
                            var nextcol = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                            if (dataset[nextcol][nextrow] !== codetable.next) {
                                next.click();
                            }
                        });
                    }
                }
                console.log(openedrow, hor * ver - mine);
                if (openedrow === hor * ver - mine) {
                    finish = true;
                    document.querySelector('#result').textContent = '승리';
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

//    ######### 지뢰 심기 ##############
    for ( var k = 0 ; k < suffle.length; k++){
        var col = Math.floor(suffle[k]/ver); //col
        var row = suffle[k] % ver;  //row
        console.dir(tbody);
        console.log(col);
        tbody.children[col].children[row].textContent = 'X';
        dataset[row][col] = 'X';
    }
    console.log(dataset);
});

//오른쪽 마우스 클릭했을 때 깃발 만들기
