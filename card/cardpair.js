let clickFlag = true;
let clickCard = [];
let completeCard = [];
let startTime;
let stage = 1;
let colorList = [];
let card_num = 12;
let color = [];
let colors = [];
let timeScore;
let stopFlag = false;
let seconds = '';

//스테이지별 카드 추가
function staging() {
    colors = ['url("./img/cardStage1a.png")', 'url("./img/cardStage1a.png")', 'url("./img/cardStage1b.png")', 'url("./img/cardStage1b.png")', 'url("./img/cardStage1c.png")', 'url("./img/cardStage1c.png")', 'url("./img/cardStage1d.png")', 'url("./img/cardStage1d.png")', 'url("./img/cardStage1e.png")', 'url("./img/cardStage1e.png")', 'url("./img/cardStage1f.png")', 'url("./img/cardStage1f.png")'];
    if (stage >= 1) {
        card_num = 12;
        seconds = '30초면 할 수 있겠지?';
    }
    if (stage >= 2) {
        colors = colors.concat(['url("./img/cardStage2a.png")', 'url("./img/cardStage2a.png")', 'url("./img/cardStage2b.png")', 'url("./img/cardStage2b.png")', 'url("./img/cardStage2c.png")', 'url("./img/cardStage2c.png")']);
        card_num = 18;
        seconds = '50초면 할 수 있겠지?';
    }
    if (stage >= 3) {
        colors = colors.concat(['url("./img/cardStage3a.png")', 'url("./img/cardStage3a.png")', 'url("./img/cardStage3b.png")', 'url("./img/cardStage3b.png")', 'url("./img/cardStage3c.png")', 'url("./img/cardStage3c.png")']);
        card_num = 24;
        seconds = '70초면 할 수 있겠지?';
    }
}

//각 스테이지마다 나오는 모달창 애니메이션
function showModal() {
    let modal_back = document.querySelector('.modal_back');
    let modal = document.querySelector('.modal');
    //스테이지별 모달 커스텀
    if (stage === 1) {
        //스테이지 1 시작
        document.querySelector('.talking').innerHTML = '나랑 카드 짝 맞추기 놀이 할거지? <br>똑같은 카드를 찾아 제일 빨리 뒤집는 사람이 <br>카드게임 마스터가 된다!';
        document.querySelector('.illust').style.backgroundImage = "url('./img/cardFrameStart.png')";
    } else if (stage === 2) {
        //스테이지 2 시작
        if (timeScore <= 10 || timeScore === undefined) {
            document.querySelector('.illust').style.backgroundImage = "url('./img/cardFrameStage1clear.png')";
            document.querySelector('.talking').innerHTML = timeScore + '초만에 게임을 다 하다니 성격이 급하구나. <br>내 카드까지 더한다면 더 재미있을거야.';
        } else if (timeScore <= 30) {
            document.querySelector('.illust').style.backgroundImage = "url('./img/cardFrameStage1clear.png')";
            document.querySelector('.talking').innerHTML = timeScore + '초만에 게임을 다 하다니 중타구나. <br>내 카드까지 더한다면 더 재미있을거야.';
        } else {
            document.querySelector('.illust').style.backgroundImage = "url('./img/cardFrameStage1Fail.png')";
            document.querySelector('.talking').innerHTML = timeScore + '초나 걸리다니! <br>좀더 집중해서 다시 해봐~!';
            document.querySelector('.go_btn').style.backgroundImage = "url('../common/img/fortuneAgainButton.png')";
            document.querySelector('.go_btn').innerHTML = '';
            stage = 1;
        }
    } else if (stage === 3) {
        //스테이지 3 시작
        if (timeScore <= 20) {
            document.querySelector('.illust').style.backgroundImage = "url('./img/cardFrameStage2clear.png')";
            document.querySelector('.talking').innerHTML = '이걸 끝내는데 ' + timeScore + '초밖에 걸리지 않았다고? <br>어느새 카드뒤집기 고수가 되었군. <br>나로 말할 것 같으면 카드뒤집기 전문가지, 나도 끼워줘!';
        } else if (timeScore <= 50) {
            document.querySelector('.illust').style.backgroundImage = "url('./img/cardFrameStage2clear.png')";
            document.querySelector('.talking').innerHTML = '이걸 끝내는 데에 ' + timeScore + '초가 걸리다니... <br>그럭저럭 쓸 만한 인재로군.. <br>과연 카드를 더 많이 가져와도 해낼 수 있을까?';
        } else {
            document.querySelector('.illust').style.backgroundImage = "url('./img/cardFrameStage2Fail.png')";
            document.querySelector('.talking').innerHTML = timeScore + '초...하아아암... 이건 승리로 인정할 수 없어.<br>더 빠르게 해봐.';
            document.querySelector('.go_btn').style.backgroundImage = "url('../common/img/fortuneAgainButton.png')";
            document.querySelector('.go_btn').innerHTML = '';
            stage = 2;
        }
    } else if (stage === 4) {
        //스테이지 3 끝마침
        if (timeScore <= 35) {
            document.querySelector('.illust').style.backgroundImage = "url('./img/cardFrameStage3clear.png')";
            document.querySelector('.talking').innerHTML = timeScore + '초만에 짝을 다 맞추다니! 언블리버블! <br>카드맞추기 챔피언이 나타났다!! <br>수군수군.. 수군수군..';
            document.querySelector('.narration').innerHTML = '축하합니다! 당신은 이 파티의 <br><b>카드게임 마스터</b>가 되었습니다.';
            cardClear();
            document.querySelector('.go_btn').style.backgroundImage = "url(../common/img/ghostHomeButton.png)";
            document.querySelector('.go_btn').innerHTML = '';
        } else if (timeScore <= 70) {
            document.querySelector('.illust').style.backgroundImage = "url('./img/cardFrameStage3clear.png')";
            document.querySelector('.talking').innerHTML = timeScore + '초만에 짝을 다 맞추다니! 우리도 그정돈 하겠는데? <br>하지만 널 위해 놀라는 척은 해 주지! <br>우리 클럽에 들어오게 하려고 말이야!';
            document.querySelector('.narration').innerHTML = '축하합니다! 당신은 이 파티의 <br><b>카드게임 클럽</b>에 가입되셨습니다.';
            cardClear();
            document.querySelector('.go_btn').style.backgroundImage = "url(../common/img/ghostHomeButton.png)";
            document.querySelector('.go_btn').innerHTML = '';
        } else {
            document.querySelector('.illust').style.backgroundImage = "url('./img/cardFrameStage3Fail.png')";
            document.querySelector('.talking').innerHTML = timeScore + '초라니..이건 내가 찍어 맞춰도 안 나오는 시간인데..<br>집중의 힘을 실어줄테니 다시 해봐..얍!';
            document.querySelector('.go_btn').style.backgroundImage = "url('../common/img/fortuneAgainButton.png')";
            document.querySelector('.go_btn').innerHTML = '';
            stage = 3;
        }
    }

    //모달 등장
    modal_back.style.display = 'block';
    modal.style.display = 'block';
    modal.classList.remove('bounceOutUp');
    modal.classList.add('bounceInDown');
    modal_back.classList.remove('fadeOut');
    modal_back.classList.add('fadeIn');

    //GO버튼 눌렀을 때 게임 시작되도록
    document.querySelector('.go_btn').addEventListener('click', function () {
       //스테이지 모두 클리어 후 버튼 클릭 시 홈으로 이동
        if (stage === 4 && timeScore <= 70) {
            location.href = '../index.html';
        }
        cardSetting();
        modal.classList.remove('bounceInDown');
        modal.classList.add('bounceOutUp');
        modal_back.classList.remove('fadeIn');
        modal_back.classList.add('fadeOut');
        setTimeout(function () {
            modal_back.style.display = 'none';
            modal.style.display = 'none';
            document.querySelector('.go_btn').style.backgroundImage = "url('../common/img/nextButton@2x.png')";
            document.querySelector('.go_btn').innerHTML = 'GO!';
            document.querySelector('.narration').innerHTML = '';
        }, 1000)
    })
}

//최초 클리어 시 스낵바 & 키 셋팅
function cardClear() {
    let card_clear = getCookie('card');
    if (!card_clear) {
        setCookie('card', 'true', 365);
        document.querySelector('#snackbar').innerHTML = '이야깃거리 [카드 뒤집기 마스터]가 생겼습니다!';
        var snackbar = document.getElementById("snackbar");
        snackbar.className = "show";
        setTimeout(function () {
            snackbar.className = snackbar.className.replace("show", "");
        }, 3000);
    }
}

//카드섞기
function shuffle() {
    for (let i = 0; colorList.length > 0; i++) {
        color = color.concat(colorList.splice(Math.floor(Math.random() * colorList.length), 1));
    }
}



function cardSetting() {
    //초기화
    document.querySelector('.cards').style.opacity = 1;
    document.querySelector('.cards').innerHTML = '';
    colorList = colors.slice();
    color = [];
    completeCard = [];
    startTime = null;
    let clear = false;
    clickFlag = false;
    stopFlag = false;
    timeScore = 0;
    staging();
    colorList = colors.slice();
    shuffle();
    document.querySelector('.cards').classList.add('stage-' + stage);
    document.querySelector('.stg-' + stage).classList.add('on');
    //스테이지 갯수대로 카드 만들고, 각 카드마다 이벤트 걸기
    for (let i = 0; i < card_num; i++) {
        let card = document.createElement('div');
        card.className = 'card';
        let cardInner = document.createElement('div');
        cardInner.className = "card-inner";
        let cardFront = document.createElement('div');
        cardFront.className = "card-front";
        let cardBack = document.createElement('div');
        cardBack.className = "card-back";
        cardBack.style.backgroundImage = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function (c) {
            card.addEventListener('click', function () {
                if (clickFlag && !completeCard.includes(c)) {
                    card.classList.toggle('flipped');
                    clickCard.push(c);
                    if (clickCard[0] === clickCard[1]) {
                        clickCard = [];
                    }
                    if (clickCard.length === 2) {
                        if (clickCard[0].querySelector('.card-back').style.backgroundImage === clickCard[1].querySelector('.card-back').style.backgroundImage) {
                            completeCard.push(clickCard[0]);
                            completeCard.push(clickCard[1]);
                            let firstCard = clickCard[0];
                            let secondCard = clickCard[1];
                            setTimeout(function () {
                                firstCard.style.opacity = '.5';
                                secondCard.style.opacity = '.5';
                            }, 800);
                            clickCard = [];
                            if (completeCard.length === card_num) {
                                stopFlag = true;
                                document.querySelector('.time').style.backgroundImage = "url('./img/cardTimerFace.png')";
                                document.querySelector('.time').innerHTML = '';
                                if (clear === false) {
                                    document.querySelector('.cards').classList.remove('stage-' + stage);
                                    document.querySelector('.stg-' + stage).classList.remove('on');
                                    document.querySelector('.cards').style.opacity = 0;
                                    stage++;
                                    clear = true;
                                }
                                showModal();
                            }
                        } else {
                            let timeSmile = Math.floor(Math.random() * 6);
                            if (timeSmile < 3) {
                                document.querySelector('.time_limit').classList.add('fadeIn', 'faster');
                                document.querySelector('.time_limit').classList.remove('fadeOut');
                            }
                            if (timeSmile === 0) {
                                document.querySelector('.time_limit').innerHTML = '풉...';
                            } else if (timeSmile === 1) {
                                document.querySelector('.time_limit').innerHTML = '푸후후..';
                            } else if (timeSmile === 2) {
                                document.querySelector('.time_limit').innerHTML = '푸하하!';
                            }
                            clickFlag = false;
                            setTimeout(function () {
                                clickCard[0].classList.remove('flipped');
                                clickCard[1].classList.remove('flipped');
                                clickFlag = true;
                                clickCard = [];
                                document.querySelector('.time_limit').classList.add('fadeOut');
                                document.querySelector('.time_limit').classList.remove('fadeIn');
                            }, 600);
                        }
                    }
                }
            })
        })(card);
        document.querySelector('.cards').appendChild(card);
    }
    //카드 등장
    document.querySelectorAll('.card').forEach(function (card, index) {
        card.style.transform = 'rotate(' + Math.floor(Math.random() * 15) + 'deg)';
        setTimeout(function () {
            card.style.opacity = 1;
        }, 1000 + 100 * index);
    });

    setTimeout(function () {
        //그릇이 시간제한 알려줌 
        document.querySelector('.time_limit').classList.add('fadeIn');
        document.querySelector('.time_limit').classList.remove('fadeOut', 'faster');
        document.querySelector('.time_limit').style.display = 'block';
        document.querySelector('.time_limit').innerHTML = seconds;
        //카드 순서대로 뒤집어서 보여주기
        document.querySelectorAll('.card').forEach(function (card, index) {
            setTimeout(function () {
                card.classList.add('flipped');
            }, 1000 + 100 * index);
        })
        //카드 전체 뒷장으로 도로 뒤집음
        setTimeout(function () {
            document.querySelector('.time_limit').classList.add('fadeOut');
            document.querySelector('.time_limit').classList.remove('fadeIn');
            document.querySelectorAll('.card').forEach(function (card, index) {
                card.classList.remove('flipped');
            })
            clickFlag = true;
            //걸린 시간 측정
            startTime = new Date();
            document.querySelector('.time').style.backgroundImage = "url('./img/cardTimerFaceOff.png')";
            document.querySelector('.time').innerHTML = '000';
            let timeCount = setInterval(function () {
                if (stopFlag === false) {
                    timeScore = parseInt((new Date() - startTime) / 1000);
                    if (timeScore < 10) {
                        document.querySelector('.time').textContent = '00' + timeScore;
                    } else if (timeScore < 100) {
                        document.querySelector('.time').textContent = '0' + timeScore;
                    } else {
                        document.querySelector('.time').textContent = timeScore;
                    }
                }
                if (stopFlag === true) {
                    clearInterval(timeCount);
                }
            }, 1000);
        }, 5000);
    }, 3000);




}
shuffle();
showModal(stage);