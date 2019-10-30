let halloween= new Date("2019/10/31 00:00:00");

if(Date.now()>=halloween){
    document.querySelector('.talking').innerHTML='이건..체리 케이크 몬스터가 보낸 초대장이잖아?<br>한자한자 열심히 쓰길래 누구에게 보내나 했더니 너구나?<br>아래 유령을 누르면 마리의 할로윈 파티에 입장할 수 있어.<br>어서 들어와서 놀자!';
    document.querySelector('.go_btn').style.display='block';
    document.querySelector('.go_btn').addEventListener('click',function(){
        location.href='http://cartoontattoo.cafe24.com/halloween';
    })
}