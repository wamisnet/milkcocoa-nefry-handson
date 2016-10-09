function toggelClass(){
    $bulb.classList.toggle("light_up");
}

function removeClass(){
    if(flag === 0)return;
    $bulb.style.background = '#bbb';
    $bulb.style.boxShadow = '';
    $bulb.classList.remove("light_up");
}

function addClass(color){
    $bulb.style.background = color;
    $bulb.style.boxShadow = `0 -10px 100px ${color}`;
    $bulb.classList.add("light_up");
}

let $light = document.querySelector('#light');
let $bulb = document.querySelector('.bulb');
$light.addEventListener("click", toggelClass, false);

/**
 * step2で以下を追加 + step4で変更
 */
//Milkcocoaのドット絵 https://mlkcca.com/sample.html との接続
//ドット絵側のアプリ&データストア
let milkcocoa = new MilkCocoa(`dogi9jz8c16.mlkcca.com`);
const dot_ds = milkcocoa.dataStore('dots');
//Nefry側のアプリ&データストア
let milkcocoa2 = new MilkCocoa(`readidztqm2w.mlkcca.com`);
const nefry_ds = milkcocoa2.dataStore('nefry');

let flag = 0,color=0;
let position=0;
dot_ds.on('push',(pushed) => {
    //ドット絵から送られてくるカラーコードをRGBに変換
    color = pushed.value.color;
    red = parseInt(color.substr(1,2), 16);
    green = parseInt(color.substr(3,2), 16);
    blue = parseInt(color.substr(5,2), 16);
console.log("position");
    position = pushed.value.index;
    flag = 1;
    for(var i=0;i<16;i++){
        if(position<56){
        if(position<16){
            if(i!=0&&i%2){
                position=15-position;
            }
            position=15-position;
            position+=16*i;
            addClass(color);
            console.log(position);
                //ドット絵から受け取ったデータをNefryに流す
            nefry_ds.push({r:red,g:green,b:blue,ps:position},(err,pushed) => {
                console.log(pushed);
            });
            console.log(position);
            break;
        }
        break;
        }
        if(position=>56){
            position-=56;
        }
    }
});

setInterval(()=>{
    removeClass();
    flag = 0;
},1000);
