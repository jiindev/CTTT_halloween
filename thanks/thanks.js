for(let prop in surpporters){
    let name = document.createElement('li');
    name.innerHTML=surpporters[prop]['name'];
    name.classList.add('col-4');
    name.addEventListener('click',function(){
        showModal(prop);
    })
    document.querySelector('.supporters').appendChild(name);
}

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