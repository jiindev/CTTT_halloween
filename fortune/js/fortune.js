setTimeout(function () {
    document.querySelector('.fortune_cake').classList.remove('bounceIn', 'delay-2s');
    document.querySelector('.fortune_cake').classList.add('infinite', 'bounce', 'slow');
}, 4000);
let cake_index = 0;

//start 버튼 클릭 시 사라지도록
let start_btn = document.querySelector('.fortune_cake');
let start_page = document.querySelector('.start_page');
let cake_page = document.querySelector('.cake_page');
start_btn.onclick = function () {
    newCake();
    start_page.classList.add('animated', 'fadeOut');
    setTimeout(function () {
        start_page.remove();
        cake_page.style.display = 'block';
        cake_page.classList.add('animated', 'bounceInDown');
    }, 1000);
};




//클릭 시 갈라지는 케이크
let full_cake = document.querySelector('.full_cake');
let cake = document.querySelector('.cake');
let left_cake = document.querySelector('.left_cake');
let right_cake = document.querySelector('.right_cake');
let cherry = document.querySelector('.cherry');
let paper = document.querySelector('.paper');
let cake_cut = false;
let cake_open = false;
let result = document.querySelector('.fortune_result');
let fork = document.querySelector('.fork');
let text3 = document.querySelector('.text3');
let text4 = document.querySelector('.text4');

cake.onclick = function () {
    if (cake_open === true) {
        text4.classList.add('fadeOut','faster');
        text4.classList.remove('bounceIn','delay-1s');
        result.style.display = 'block';
        paper.classList.remove('fadeInUp');
        paper.classList.add('fadeOut');
    } else if (cake_cut === true) {
        text4.style.display='block';
        left_cake.classList.add('opened');
        right_cake.classList.add('opened');
        cherry.style.left = '280px';
        cherry.style.top = '380px';
        paper.classList.add('animated', 'fadeInUp');
        cake_open = true;
        fork.style.display = 'block';
    } else if (cake_cut === false) {
        full_cake.classList.add('animated', 'fadeOut', 'faster');
        cherry.classList.remove('infinite', 'bounce');
        setTimeout(function () {
            cherry.style.left = '250px';
            cherry.style.top = '350px';
            cherry.style.transform = 'rotate(45deg)';
        }, 500);
        text3.classList.add('fadeOut','faster');
        text3.classList.remove('bounceIn','delay-1s');
        newQuote();
        cake_cut = true;
    }


}

//restart
let restart_btn = document.querySelector('.restart');
let cake_visual = document.querySelector('.cake_wrap');
restart_btn.onclick = function () {
    cake_visual.classList.remove('bounceInDown');
    cake_visual.classList.add('bounceOutUp');
    setTimeout(function () {
        newCake();
        cake_cut = false;
        cake_open = false;
        text4.classList.add('delay-1s','bounceIn');
        text4.classList.remove('fadeOut','faster');
        text4.style.display='none';
        result.style.display = 'none';
        fork.style.display = 'none';
        paper.classList.remove('fadeOut', 'animated');
        cherry.style.left = '143px';
        cherry.style.top = '143px';
        cherry.style.transform = 'rotate(0deg)';
        cherry.classList.add('infinite', 'bounce');
        full_cake.classList.remove('animated', 'fadeOut', 'faster');
        left_cake.classList.remove('opened');
        right_cake.classList.remove('opened');
        cake_visual.classList.remove('bounceOutUp');
        cake_visual.classList.add('bounceInDown');
    }, 2000);
};

// //랜덤 결과
let quote = document.querySelector('.quote');
let newQuote = function () {
    let index = Math.floor(Math.random() * quotes.length);
    quote.innerHTML = quotes[index];
}

let quotes = ["오늘 입은 옷은 <br>당신의 1년을 결정하게 됩니다.",
    "웃어보세요 호박처럼! 히히히히! 좋은 일이 생길 것이에요.",
    "두려움을 극복하는 하루를 보낼 거예요.",
    "검은 고양이를 보면 행운이 있을 거예요.",
    "악마가 당신을 유혹할거에요!<br>잘 견뎌내세요.",
    "날씨가 쌀쌀합니다.<br> 감기에 안 걸리게 하세요.",
    "상상하던 것을 현실에서 보게 됩니다.",
    "오늘은 재미없는 일만 일어납니다.",
    "중요한 일이 있다면 도움을 요청해 보세요.",
    "친구의 색다른 점 2가지를 알게 됩니다.",
    "문제가 생기면 직감에 몸을 기대 보세요.",
    "균형을 맞추세요. 잘못하면 비탈길에서 넘어집니다.",
    "편안하면서 불안한 하루가 동시에 진행될 거예요.",
    "징그럽고 끔찍한 것이 당신에게 갈 것입니다!",
    "마법같은 하루를 보낼 거예요.",
    "1년 전 할로윈의 기억이 중요한 실마리가 됩니다.",
    "오늘은 일기를 꼭 쓰세요. <br> 3년 뒤에 유용하게 쓰이게 될 거예요.",
    "따듯한 차를 마시세요. 소름돋는 행운이 생길 것입니다",
    "마음 단단히 먹으세요! 정신없는 하루가 될 거예요.",
    "생각하지 않으면 두려움도 없어요.",
    "안개가 걷힐 때 비로소 <br>진실을 알게 됩니다.",
    "깜짝! 크게 놀라는 일이 일어날 거예요..",
    "오늘은 당신의 날, 모두를 놀래켜 보세요.",
    "조심하세요! 오늘 오싹한 기운에 압도당할 것입니다! .",
    "행운의 음식 : 빨갛고 촉촉하고 부드러운 음식",
    "오늘 당신에게 첫번째로 연락한 사람을 소중히 대하세요.",
    "믿을 수 없는 일이 눈 앞에서 벌어집니다.",
    "[광고]유령이…너무 무서워요…. <br>삽 들 사람을 구합니다… -디디-",
    "[광고]카드게임의 고수를 모집합니다.<br>쇼파로 오세요 -체리체리-"
];

//케이크 모양 랜덤
let newCake = function () {
    let new_cake_index = Math.floor(Math.random() * 3);
    while(cake_index===new_cake_index){
        new_cake_index = Math.floor(Math.random() * 3);
    };
    cake_index=new_cake_index;
    full_cake.style.backgroundImage = "url('./img/fortuneCake" + cake_index + ".png')";
    left_cake.style.backgroundImage = "url('./img/fortuneCake" + cake_index + "Left.png')";
    right_cake.style.backgroundImage = "url('./img/fortuneCake" + cake_index + "Right.png')";
    cherry.style.backgroundImage = "url('./img/fortuneCake" + cake_index + "Cherry.png')";
}