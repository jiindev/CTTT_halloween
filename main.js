//메인 말풍선 나왔다가 들어가도록
setInterval(function () {
    document.querySelector('.main_text').classList.remove('fadeIn');
    document.querySelector('.main_text').classList.add('fadeOut');
}, 2000)

//엔딩 이후 일러스트 변화
if (getCookie('ending')) {
    document.querySelector('.card a').style.backgroundImage = "url(./img/mainButtonCardGameEnd.png)";
    document.querySelector('.pumpkin a').style.backgroundImage = "url(./img/MainButtonCherryEnd.png)";
    document.querySelector('.pumpkin .text').innerHTML = 'HAPPY HALLOWEEN!';
}

//음악재생
let audio = new Audio('./happy_haunts.mp3');
document.querySelector('.sound').addEventListener('click', function () {
    if (document.querySelector('.sound').classList.contains('on')) {
        audio.pause();
        this.classList.remove('on');
        document.querySelector('.mobile_sound').classList.remove('on');
    } else {
        audio.play();
        this.classList.add('on');
        document.querySelector('.mobile_sound').classList.add('on');
    }
});
//모바일 음악재생
document.querySelector('.mobile_sound').addEventListener('click', function () {
    if (this.classList.contains('on')) {
        audio.pause();
        this.classList.remove('on');
        document.querySelector('.sound').classList.remove('on');
    } else {
        audio.play();
        this.classList.add('on');
        document.querySelector('.sound').classList.add('on');
    }
});