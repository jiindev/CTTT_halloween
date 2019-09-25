//start 버튼 클릭 시 사라지도록
let start_btn = document.querySelector('.start_btn');
let start_page = document.querySelector('.start_page');
let cake_page = document.querySelector('.cake_page');
start_btn.onclick = function () {
    start_page.classList.add('animated', 'fadeOut');
    setTimeout(function () {
        start_page.remove();
    }, 1000);
    setTimeout(function () {
        cake_page.style.display='block';
        cake_page.classList.add('animated', 'bounceInDown');
    }, 1000);
};

//마우스를 따라다니는 포크
let fork = document.querySelector('.fork');
document.onmousemove=function(){
    let posX = window.event.pageX;
    let posY = window.event.pageY;
    fork.style.left=posX-30+"px";
    fork.style.top=posY-30+"px";

}

//클릭 시 갈라지는 케이크
let cake = document.querySelector('.cake');
let left_cake=document.querySelector('.left_cake');
let cake_open=false;
let cake_dregs=document.querySelector('.cake_dregs');

cake.onclick=function(){
    if(!cake.classList.contains('moved')){
        cake.classList.add('moved');
        newQuote();
        cake_dregs.style.display='block';
        cake_dregs.classList.add('animated','fadeIn','slow');
        setTimeout(function () {
            fork.classList.add('animated','fadeOut','faster');
        }, 500);
        setTimeout(function () {
            fork.style.display='none';
        }, 1000);
    }
}

//랜덤 결과
let quote = document.querySelector('.quote');
let newQuote = function () {
    let index = Math.floor(Math.random() * quotes.length);
    quote.innerHTML = quotes[index];
}
let quotes = ["좋은 결과", "보통 결과", "나쁜 결과"];