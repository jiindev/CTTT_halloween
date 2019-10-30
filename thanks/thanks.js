//후원자 데이터 불러와서 화면에 뿌리기
for(let prop in surpporters){
    let name = document.createElement('li');
    name.innerHTML=surpporters[prop]['name'];
    name.classList.add('col-4');
    name.addEventListener('click',function(){
        showModal(prop);
    })
    document.querySelector('.supporters').appendChild(name);
}

//이름을 클릭하였을 때 해당 후원자에 대한 정보 모달
function showModal(num) {
    let modal_back = document.querySelector('.modal_back');
    let modal = document.querySelector('.modal');
    document.querySelector('.modal_back').style.display = 'block';
    modal.style.display='block';
    document.querySelector('.name').innerHTML=surpporters[num]['name'];
    if(surpporters[num]['sentence']===0){
        document.querySelector('.talking').innerHTML='(케이크가 당신을 말없이 바라보고 있다.)';
    }else document.querySelector('.talking').innerHTML=surpporters[num]['sentence'];
    document.querySelector('.cake').style.backgroundImage="url('./img/supporterCake/supporterCake"+num+".png')";
    modal.classList.remove('bounceOutUp');
    modal.classList.add('bounceInDown');
    modal_back.classList.remove('fadeOut');
    modal_back.classList.add('fadeIn');
    document.querySelector('.ok_btn').addEventListener('click', function () {
        modal.classList.remove('bounceInDown');
        modal.classList.add('bounceOutUp');
        modal_back.classList.remove('fadeIn');
        modal_back.classList.add('fadeOut');
        setTimeout(function () {
            modal.style.display='none';
            modal_back.style.display = 'none';
        }, 500)
    })
}

//cttt로고 클릭 하였을 때 제작자 모달
document.querySelector('.grey_logo').addEventListener('click',function(){
    let modal_back = document.querySelector('.modal_back');
    let modal = document.querySelector('.modal');
    document.querySelector('.modal_back').style.display = 'block';
    modal.style.display='block';
    document.querySelector('.modal').classList.add('cttt_modal');
    document.querySelector('.name').innerHTML='CARTOON TATTOO'
    document.querySelector('.talking').innerHTML='2019년 할로윈 으시시하고 달콤하게 보내세요~';
    document.querySelector('.cake').style.backgroundImage="none";
    document.querySelector('.maker').innerHTML='ARTWORK BY JISU PARK <br>CODE BY JIIN EUM';
    modal.classList.remove('bounceOutUp');
    modal.classList.add('bounceInDown');
    modal_back.classList.remove('fadeOut');
    modal_back.classList.add('fadeIn');
    document.querySelector('.ok_btn').addEventListener('click', function () {
        modal.classList.remove('bounceInDown');
        modal.classList.add('bounceOutUp');
        modal_back.classList.remove('fadeIn');
        modal_back.classList.add('fadeOut');
        setTimeout(function () {
            document.querySelector('.modal').classList.remove('cttt_modal');
            document.querySelector('.maker').innerHTML='';
            modal.style.display='none';
            modal_back.style.display = 'none';
        }, 500)
    })
})