var dog;
var database
var stock
var dogimage1, dogimage2, milkimage
function preload() {
  dogimage1 = loadImage("dogImg.png")
dogimage2 = loadImage("dogImg1.png")
milkimage = loadImage("Milk.png")
}
function setup(){
    createCanvas(800,800);
    database=firebase.database()
    dog = createSprite(350,350,10,10);
    dog.addImage(dogimage1)
    dog.scale= 0.5

    var totalfood=database.ref('food/count')
    totalfood.on("value",readfood)
    
}

function draw(){
    background("darkred");
    display()
    if(keyDown(UP_ARROW)){
     food(1) 
     dog.addImage(dogimage2)  
    }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogimage1)
  }
    text("remainingfood "+stock,200,100)
    if(stock<0)
    {
      food(-50)
    }
    drawSprites();
}

function readfood(data){
 stock=data.val ()  
}
function food(a)
{
   database.ref('food') .update({
     'count' :stock-a 
   })
}
function display(){
 var i,x=20
 for(i=1;i<=stock;i=i+1) 
 {
  image  (milkimage,x,150,20,20)
  x=x+20
 }
}