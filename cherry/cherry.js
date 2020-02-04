let page = 1;
let minesweeper_clear = getCookie('minesweeper');
let card_clear = getCookie('card');
let fortune_clear = getCookie('fortune');
let ending = getCookie('ending');


// minesweeper_clear = true;
// card_clear = true;
// fortune_clear = true;

setCookie('name', '??', 365);
alert(getCookie('name'));

function cookieCheck() {
    //아이콘 opacity 변경
    if (minesweeper_clear) {
        document.querySelector('.page-1 .mine').classList.add('clear');
        document.querySelector('.page-2 .mine').classList.add('clear');
    }
    if (card_clear) {
        document.querySelector('.page-1 .card').classList.add('clear');
        document.querySelector('.page-2 .card').classList.add('clear');
    }
    if (fortune_clear) {
        document.querySelector('.page-1 .fortune').classList.add('clear');
        document.querySelector('.page-2 .fortune').classList.add('clear');
    }

    //다음페이지로 넘어가기 여부 체크
    if (ending) {
        document.querySelector('.page-1').style.display = 'none';
        document.querySelector('.page-4').style.display = 'block';
        document.querySelector('.page-4 .narration').innerHTML = '';
        document.querySelector('.page-4 .mini_logo').style.display = 'none';
    } else if (minesweeper_clear && card_clear && fortune_clear) {
        let firstBtn = document.querySelector('.page-1 button');
        firstBtn.className = firstBtn.className.replace("qst_btn", "next_btn");
        document.querySelector('.page-1 .narration').innerHTML = '체리케이크야, 너에게 들려줄 <b>이야기</b>가 있어.';
    } else {
        document.querySelector('.qst_btn').addEventListener('click', function () {
            let snackbar = document.getElementById("snackbar");
            snackbar.className = "show";
            snackbar.innerHTML = '체리케이크 몬스터에게 들려줄 <b>이야깃거리</b>를 모아오자';
            setTimeout(function () {
                snackbar.className = snackbar.className.replace("show", "");
            }, 3000);
        });
    }
}

//다음페이지 넘기기
function nextPage() {
    document.querySelector('.page-' + page).classList.remove('bounceInDown', 'bounceInRight');
    document.querySelector('.page-' + page).classList.add('bounceOutLeft');
    page++;
    setTimeout(function () {
        window.scrollTo(0, 0);
        document.querySelector('.page-' + (page - 1)).style.display = 'none';
        document.querySelector('.page-' + page).style.display = 'block';
    }, 500);
    if (page === 4) {
        setCookie('ending', 'true', 365);
    }
}

//음악재생
let audio = new Audio('./space_navigator.mp3');
document.querySelector('.sound').addEventListener('click', function () {
    if(document.querySelector('.sound').classList.contains('on')){
        audio.pause();
        this.classList.remove('on');
    }else{
        audio.play();
        this.classList.add('on');
    }
});



cookieCheck();

//다음버튼 전체에 이벤트 심음
let buttons = document.querySelectorAll('.next_btn');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        nextPage();
    });
}