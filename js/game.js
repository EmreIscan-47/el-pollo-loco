let canvas;
let ctx;
let character = new Character(20);
let enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
]
let world = new World();
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    console.log('My character is', world.character);
    
    /* character.src = "../img/2_character_pepe/2_walk/W-21.png" */
    console.log(enemies);
    
    setTimeout(function ()  {
        ctx.drawImage(character, 70, 160, 50, 150)  
    }, 2000);
   
}