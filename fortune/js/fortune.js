let fork = document.querySelector('.fork');

// //마우스를 따라다니는 포크
function follwingFork() {
    document.onmousemove = function () {
        let posX = window.event.pageX;
        let posY = window.event.pageY;
        fork.style.left = posX + 20 + "px";
        fork.style.top = posY + 10 + "px";
        if(cake_open===true){
            event.preventDefault();
        }
    }
}

setTimeout(function () {
    document.querySelector('.fortune_cake').classList.remove('bounceIn', 'delay-2s');
    document.querySelector('.fortune_cake').classList.add('infinite', 'bounce', 'slow');
}, 4000);


//start 버튼 클릭 시 사라지도록
let start_btn = document.querySelector('.fortune_cake');
let start_page = document.querySelector('.start_page');
let cake_page = document.querySelector('.cake_page');
start_btn.onclick = function () {
    start_page.classList.add('animated', 'fadeOut');
    setTimeout(function () {
        start_page.remove();
    }, 1000);
    setTimeout(function () {
        cake_page.style.display = 'block';
        cake_page.classList.add('animated', 'bounceInDown');
        
        fork.style.opacity = 1;
        fork.style.display = 'block';
        follwingFork();
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
let result = document.querySelector('.result');

cake.onclick = function () {
    if(cake_open===true){
        result.style.display='block';
        paper.classList.add('animated','fadeOut')
    }else if (cake_cut === true) {
        left_cake.classList.add('opened');
        right_cake.classList.add('opened');
        cherry.style.left = '280px';
        cherry.style.top = '380px';
        paper.style.opacity = 1;
        paper.style.top = '263px';
        cake_open=true;
    }else if (cake_cut === false) {
        full_cake.classList.add('animated', 'fadeOut', 'faster');
        cherry.classList.remove('infinite', 'bounce');
        setTimeout(function () {
            cherry.style.left = '250px';
            cherry.style.top = '350px';
            cherry.style.transform = 'rotate(45deg)';
        }, 500);
        newQuote();
        cake_cut = true;
    }
    // newQuote();
    // cake_dregs.style.display='block';
    // cake_dregs.classList.add('animated','fadeIn','slow');
    // setTimeout(function () {
    //     fork.classList.add('animated','fadeOut','faster');
    // }, 500);
    // setTimeout(function () {
    //     fork.style.display='none';
    // }, 1000);

}

// //랜덤 결과
let quote = document.querySelector('.quote');
let newQuote = function () {
    let index = Math.floor(Math.random() * quotes.length);
    quote.innerHTML = quotes[index];
}
let quotes = ["좋은 결과", "보통 결과", "나쁜 결과"];