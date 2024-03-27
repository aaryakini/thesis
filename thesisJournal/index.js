var blocks = document.getElementsByClassName("block");

for (i=0; i<blocks.length; i++){
    var time = Math.floor(Math.random() * (6 - 2 + 1) + 2);
    blocks[i].style.setProperty('--animation-time', time +'s');
    console.log (i + " = " + time);
}