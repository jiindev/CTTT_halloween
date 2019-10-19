

let hor = 4;
let ver = 3;
let colors = ['url("./img/cardStage1a.png")','url("./img/cardStage1a.png")','url("./img/cardStage1b.png")','url("./img/cardStage1b.png")','url("./img/cardStage1c.png")','url("./img/cardStage1c.png")','url("./img/cardStage1d.png")','url("./img/cardStage1d.png")','url("./img/cardStage1e.png")','url("./img/cardStage1e.png")','url("./img/cardStage1f.png")','url("./img/cardStage1f.png")']
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
        cardBack.style.backgroundImage=color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function(c){
            card.addEventListener('click',function(){
                if(clickFlag && !completeCard.includes(c)){
                    card.classList.toggle('flipped');
                    clickCard.push(c);
                    if(clickCard[0]===clickCard[1]){
                        clickCard=[];
                    }
                    if(clickCard.length===2){
                        if(clickCard[0].querySelector('.card-back').style.backgroundImage===clickCard[1].querySelector('.card-back').style.backgroundImage){
                            completeCard.push(clickCard[0]);
                            completeCard.push(clickCard[1]);
                            let firstCard = clickCard[0];
                            let secondCard = clickCard[1];
                            setTimeout(function(){
                                firstCard.style.opacity='.5';
                                secondCard.style.opacity='.5';
                            },800);
                            clickCard=[];
                            if(completeCard.length === 12){
                                let finishTime = new Date();
                                alert('성공!'+(finishTime-startTime)/1000+'초 걸림!');
                                document.querySelector('.cards').innerHTML='';
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
        
        document.querySelector('.cards').appendChild(card);
    }
    document.querySelectorAll('.card').forEach(function(card, index){
        card.style.transform='rotate('+Math.floor(Math.random() * 15)+'deg)';
        setTimeout(function(){
            card.style.opacity=1;
        }, 1000+100*index);
    })
    setTimeout(function(){
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
    },3000);
    
}
shuffle();
cardSetting(hor,ver);
