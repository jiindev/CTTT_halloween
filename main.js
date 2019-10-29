setInterval(function(){
    document.querySelector('.main_text').classList.remove('fadeIn');
    document.querySelector('.main_text').classList.add('fadeOut');
},2000)

if(getCookie('ending')){
    document.querySelector('.card a').style.backgroundImage="url(./img/mainButtonCardGameEnd.png)";
    document.querySelector('.pumpkin a').style.backgroundImage="url(./img/MainButtonCherryEnd.png)";
    document.querySelector('.pumpkin .text').innerHTML='HAPPY HALLOWEEN!';
}