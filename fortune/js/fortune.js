//start 버튼 클릭 시 사라지도록
let start_btn = document.querySelector('.start_btn');
let start_page = document.querySelector('.start_page');
start_btn.onclick = function () {
    start_page.classList.add('animated', 'fadeOut');
    setTimeout(function () {
        start_page.remove();
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

//랜덤으로 포츈결과 가져오기
// let cake = document.querySelector('.cake');
// let quote = document.querySelector('.quote');
// cake.onclick = function () {
//     newQuote();
// }
// let newQuote = function () {
//     let index = Math.floor(Math.random() * quotes.length);
//     quote.innerHTML = quotes[index];
// }
// let quotes = ["좋은 결과", "보통 결과", "나쁜 결과"];