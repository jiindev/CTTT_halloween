var tbody = document.querySelector('#table tbody');
let dataset = [];
let stopFlag = false;
let openSqr = 0;
let code = {
    open: -1,
    qst: -2,
    flag: -3,
    flagmine: -4,
    qstmine: -5,
    mine: 1,
    normal: 0
}
let hor, ver, mine;

//게임방법 모달로 나오기
let howtoModal = document.querySelector('.howto_modal');
let modal = document.querySelector('.modal');
let modal_back = document.querySelector('.modal_back');

document.querySelector('.howto').addEventListener('click', function () {
    howtoModal.classList.remove('bounceOutUp');
    howtoModal.classList.add('bounceInDown');
    howtoModal.classList.add('show');
    modal_back.classList.remove('fadeOut');
    modal_back.classList.add('fadeIn');
    modal_back.style.display = 'block';
});
document.querySelector('.close_btn').addEventListener('click', function () {
    howtoModal.classList.remove('bounceInDown');
    howtoModal.classList.add('bounceOutUp');
    modal_back.classList.remove('fadeIn');
    modal_back.classList.add('fadeOut');
    setTimeout(function () {
        modal_back.style.display = 'none';
        howtoModal.classList.remove('show');
    }, 1000)
});

//1라운드 시작
let stage = 1;
showModal(stage);

//각 스테이지마다 나오는 모달창 애니메이션
function showModal(stage) {
    document.querySelector('.modal_back').style.display = 'block';
    modal.children[stage - 1].classList.add('show');
    modal.children[stage - 1].classList.add('show');
    modal.classList.remove('bounceOutUp');
    modal.classList.add('bounceInDown');
    modal_back.classList.remove('fadeOut');
    modal_back.classList.add('fadeIn');
    if (stage === 4) {
        minesweeperClear();
        document.querySelector('.go_btn').style.backgroundImage = "url(../common/img/ghostHomeButton.png)";
        document.querySelector('.go_btn').innerHTML = '';
    }
    document.querySelector('.go_btn').addEventListener('click', function () {
        if (stage === 4) {
            location.href = '../index.html';
        }
        setting();
        modal.classList.remove('bounceInDown');
        modal.classList.add('bounceOutUp');
        modal_back.classList.remove('fadeIn');
        modal_back.classList.add('fadeOut');
        setTimeout(function () {
            modal_back.style.display = 'none';
            modal.children[stage - 1].classList.remove('show');
        }, 1000)
    })
}

//최초 클리어 시 스낵바 & 키 셋팅
function minesweeperClear() {
    let minesweeper_clear = getCookie('minesweeper');
    if (!minesweeper_clear) {
        setCookie('minesweeper', 'true', 365);
        document.querySelector('#snackbar').innerHTML = '이야깃거리 <bold>[유령 피해다니기]</bold>가 생겼습니다!';
        var snackbar = document.getElementById("snackbar");
        snackbar.className = "show";
        setTimeout(function () {
            snackbar.className = snackbar.className.replace("show", "");
        }, 3000);
    }
}

//지뢰찾기 세팅
function setting() {
    //내부 먼저 초기화
    let clear = false;
    openSqr = 0;
    stopFlag = false;
    tbody.innerHTML = '';
    dataset = [];
    //스테이지 별 난이도 조절
    if (stage === 4) stage = 1;
    document.querySelector('.stg-' + stage).classList.add('on');
    if (stage === 1) {
        hor = 9;
        ver = 9;
        mine = 10;
    } else if (stage === 2) {
        hor = 9;
        ver = 28;
        mine = 30;
    } else if (stage === 3) {
        hor = 9;
        ver = 52;
        mine = 50;
    }

    let flagNum = 0;

    document.querySelector('.face').style.backgroundImage = "url('./img/DDfaceNormal@2x.png')";
    document.querySelector('.mine_num').textContent = mine;
    document.querySelector('.time').textContent = '000';
    //지뢰의 위치 뽑기
    let num_list = Array(hor * ver)
        .fill()
        .map(function (item, index) {
            return index;
        });
    let shuffle = [];
    while (num_list.length > hor * ver - mine) {
        let selected_num = num_list.splice(Math.floor(Math.random() * num_list.length), 1)[0];
        shuffle.push(selected_num);
    }

    //지뢰 테이블 만들기
    document.querySelector('#table').classList.add('stage-' + stage);
    for (let i = 0; i < ver; i++) {
        let arr = [];
        let tr = document.createElement('tr');
        dataset.push(arr);
        for (let j = 0; j < hor; j++) {
            arr.push(code.normal);
            let td = document.createElement('td');

            //우클릭 시 깃발, 물음표 꽂을 수 있도록
            function rightClick(e) {
                document.querySelector('.face').style.backgroundImage = "url('./img/DDfaceNormal@2x.png')";
                e.preventDefault();
                if (stopFlag === true) {
                    return;
                }
                let parentTr = e.currentTarget.parentNode;
                let parentTbody = e.currentTarget.parentNode.parentNode;
                let tdX = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                let tdY = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                if (dataset[tdY][tdX] === code.normal || dataset[tdY][tdX] === code.mine) {
                   //깃발 꽂기
                    e.currentTarget.classList.add('flag');
                    flagNum++;
                    if (dataset[tdY][tdX] === code.mine) {
                        dataset[tdY][tdX] = code.flagmine;
                    } else {
                        dataset[tdY][tdX] = code.flag;
                    }
                } else if (dataset[tdY][tdX] === code.flag || dataset[tdY][tdX] === code.flagmine) {
                    //물음표 꽂기
                    e.currentTarget.classList.add('qst');
                    e.currentTarget.classList.remove('flag');
                    flagNum--;
                    if (dataset[tdY][tdX] === code.flagmine) {
                        dataset[tdY][tdX] = code.qstmine;
                    } else {
                        dataset[tdY][tdX] = code.qst;
                    }
                } else if (dataset[tdY][tdX] === code.qst || dataset[tdY][tdX] === code.qstmine) {
                    //기본 상태
                    e.currentTarget.classList.remove('qst');
                    if (dataset[tdY][tdX] === code.qstmine) {
                        dataset[tdY][tdX] = code.mine;
                    } else {
                        e.currentTarget.textContent = '';
                        dataset[tdY][tdX] = code.normal;
                    }
                }
                //남은 지뢰 갯수 표기
                document.querySelector('.mine_num').textContent = mine - flagNum;
            }
            td.addEventListener('contextmenu', function (e) {
                rightClick(e);
            });
            
            //마우스 클릭 시 일러스트의 표정 변화
            td.addEventListener('mousedown', function (e) {
                let parentTr = e.currentTarget.parentNode;
                let parentTbody = e.currentTarget.parentNode.parentNode;
                let tdX = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                let tdY = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                if (dataset[tdY][tdX] !== code.open) {
                    if (stopFlag === false) {
                        document.querySelector('.face').style.backgroundImage = "url('./img/DDfaceMouseDown@2x.png')";
                    }
                }
            });
            //땅을 마우스로 클릭 시
            td.addEventListener('click', function (e) {
                if (stopFlag === true) {
                    return;
                }
                let parentTr = e.currentTarget.parentNode;
                let parentTbody = e.currentTarget.parentNode.parentNode;
                let tdX = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                let tdY = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                if ([code.open, code.flag, code.flagmine, code.qst, code.qstmine].includes(dataset[tdY][tdX])) {
                    return;
                }
                //클릭 시 주변 지뢰 개수
                e.currentTarget.classList.add('opened');
                //실패
                if (dataset[tdY][tdX] === code.mine) {
                    let restart_button = document.querySelector('.restart');
                    let modal_back = document.querySelector('.modal_back');
                    modal_back.classList.remove('fadeOut');
                    modal_back.classList.add('fadeIn');
                    restart_button.style.display = 'block';
                    modal_back.style.display = 'block';
                    restart_button.addEventListener('click', function () {
                        restart_button.classList.remove('bounceInDown');
                        restart_button.classList.add('bounceOutUp');
                        setting();
                        modal_back.classList.remove('fadeIn');
                        modal_back.classList.add('fadeOut');
                        setTimeout(function () {
                            modal_back.style.display = 'none';
                            restart_button.classList.remove('bounceOutUp');
                            restart_button.classList.add('bounceInDown');
                            restart_button.style.display = 'none';
                        }, 1000)
                        window.scrollTo(0, 0);
                    });
                    stopFlag = true;
                    for (let i = 0; i < dataset.length; i++) {
                        for (let j = 0; j < dataset[i].length; j++) {
                            if (dataset[i][j] === code.mine) {
                                tbody.children[i].children[j].style.backgroundImage = "url('./img/ghost" + stage + "@2x.png')";
                            }
                        }
                    }
                    document.querySelector('.face').style.backgroundImage = "url('./img/DDfaceGameOver@2x.png')";
                    e.currentTarget.style.backgroundImage = "url('./img/ghostSelect" + stage + "@2x.png')";

                } else {
                    document.querySelector('.face').style.backgroundImage = "url('./img/DDfaceNormal@2x.png')";
                    openSqr++;
                    let around = [
                        dataset[tdY][tdX - 1], dataset[tdY][tdX + 1]
                    ];
                    if (dataset[tdY - 1]) {
                        around = around.concat([dataset[tdY - 1][tdX - 1], dataset[tdY - 1][tdX], dataset[tdY - 1][tdX + 1]]);
                    }
                    if (dataset[tdY + 1]) {
                        around = around.concat([dataset[tdY + 1][tdX - 1], dataset[tdY + 1][tdX], dataset[tdY + 1][tdX + 1]]);
                    }
                    let aroundMine = around.filter(function (v) {
                        return [code.mine, code.qstmine, code.flagmine].includes(v);
                    }).length;
                    e.currentTarget.style.backgroundImage = "url('./img/num" + aroundMine + "@2x.png')";
                    dataset[tdY][tdX] = code.open;
                    if (aroundMine === 0) {
                        let aroundSqr = [];
                        if (tbody.children[tdY - 1]) {
                            aroundSqr = aroundSqr.concat([
                                tbody.children[tdY - 1].children[tdX - 1],
                                tbody.children[tdY - 1].children[tdX],
                                tbody.children[tdY - 1].children[tdX + 1]
                            ]);
                        }
                        aroundSqr = aroundSqr.concat([
                            tbody.children[tdY].children[tdX - 1],
                            tbody.children[tdY].children[tdX + 1]
                        ]);
                        if (tbody.children[tdY + 1]) {
                            aroundSqr = aroundSqr.concat([
                                tbody.children[tdY + 1].children[tdX - 1],
                                tbody.children[tdY + 1].children[tdX],
                                tbody.children[tdY + 1].children[tdX + 1]
                            ]);
                        }
                        aroundSqr.filter(function (v) {
                            return !!v;
                        }).forEach(function (next) {
                            let parentTr = next.parentNode;
                            let parentTbody = next.parentNode.parentNode;
                            let nextX = Array.prototype.indexOf.call(parentTr.children, next);
                            let nextY = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                            if (dataset[nextY][nextX] !== code.open) {
                                next.click();
                            }
                        })

                    };
                }
                //스테이지 클리어
                if (openSqr === hor * ver - mine) {
                    stopFlag = true;
                    document.querySelector('.stg-' + stage).classList.remove('on');
                    //한번만 실행되도록
                    if (clear == false) {
                        document.querySelector('#table').classList.remove('stage-' + stage);
                        stage++;
                        clear = true;
                    }
                    clearInterval(timeCount);
                    showModal(stage);
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    //지뢰 심기
    for (let k = 0; k < shuffle.length; k++) {
        let ver_pos = Math.floor(shuffle[k] / hor);
        let hor_pos = shuffle[k] % hor;
        dataset[ver_pos][hor_pos] = code.mine;
    }

    //걸린 시간 측정
    let start_time = new Date();
    console.log(start_time);
    let timeCount = setInterval(function () {
        if (stopFlag === false) {
            let now_time = parseInt((new Date() - start_time) / 1000);
            if (now_time < 10) {
                document.querySelector('.time').textContent = '00' + now_time;
            } else if (now_time < 100) {
                document.querySelector('.time').textContent = '0' + now_time;
            } else {
                document.querySelector('.time').textContent = now_time;
            }
        }
        if (stopFlag === true) {
            clearInterval(timeCount);
        }
    }, 1000);
}


//스크롤하면 상단에 점수, 시간 표기
let scrollPosition = window.scrollY;
let time = document.querySelector('.time');
let mine_num = document.querySelector('.mine_num');
let time_position = time.getBoundingClientRect().bottom + 50;

window.onscroll = function () {
    if (window.pageYOffset > time_position) {
        mine_num.classList.add('animated', 'bounceInDown');
        time.classList.add('animated', 'bounceInDown');
        mine_num.classList.add('scrolled');
        time.classList.add('scrolled');
    } else {
        mine_num.classList.remove('scrolled');
        time.classList.remove('scrolled');
        mine_num.classList.remove('animated', 'bounceInDown');
        time.classList.remove('animated', 'bounceInDown');
    }
}