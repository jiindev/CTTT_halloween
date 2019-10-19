

let hor = 4;
let ver = 3;
let colors = ['red','red','orange','orange','green','green','yellow','yellow','white','white','pink','pink']
let colorList = colors.slice();
let color = [];
let clickFlag = true; 
let clickCard = [];
let completeCard = [];
let startTime;

function shuffle(){
    for(let i=0; colorList.length>0; i++){
        color = color.concat(colorList.splice(Math.floor(Math.random()*colorList.length),1));
    }
}

console.log(color);


function cardSetting (hor, ver){
    clickFlag = false;
    for(let i=0; i<hor*ver; i++){
        let card = document.createElement('div');
        card.className='card';
        let cardInner = document.createElement('div');
        cardInner.className="card-inner";
        let cardFront = document.createElement('div');
        cardFront.className="card-front";
        let cardBack = document.createElement('div');
        cardBack.className="card-back";
        cardBack.style.backgroundColor=color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function(c){
            card.addEventListener('click',function(){
                if(clickFlag && !completeCard.includes(c)){
                    card.classList.toggle('flipped');
                    clickCard.push(c);
                    if(clickCard.length===2){
                        if(clickCard[0].querySelector('.card-back').style.backgroundColor===clickCard[1].querySelector('.card-back').style.backgroundColor){
                            completeCard.push(clickCard[0]);
                            completeCard.push(clickCard[1]);
                            clickCard=[];
                            if(completeCard.length === 12){
                                let finishTime = new Date();
                                alert('성공!'+(finishTime-startTime)/1000+'초 걸림!');
                                document.querySelector('#wrapper').innerHTML='';
                                colorList = colors.slice();
                                color = [];
                                completeCard = [];
                                startTime = null;
                                shuffle();
                                cardSetting(hor, ver);
                            }
                        }else{
                            clickFlag=false;
                            setTimeout(function(){
                                clickCard[0].classList.remove('flipped');
                                clickCard[1].classList.remove('flipped');
                                clickFlag = true;
                                clickCard=[];
                            },1000);
                        }
                    }
                }
            })
        })(card);
        
        document.querySelector('#wrapper').appendChild(card);
    }
    document.querySelectorAll('.card').forEach(function(card, index){
        setTimeout(function(){
            card.classList.add('flipped');
        }, 1000+100*index);
    })
    setTimeout(function(){
        document.querySelectorAll('.card').forEach(function(card, index){
            card.classList.remove('flipped');
        })
        clickFlag = true;
        startTime = new Date();
    }, 5000);
}
shuffle();
cardSetting(hor,ver);
