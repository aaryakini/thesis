/***************************************************************************************
    Title: JavaScript - How to make multiple divs draggable and movable across the website
    Author: user6439507
    Date: June 4, 2019
    Availability: https://stackoverflow.com/questions/51409650/javascript-how-to-make-multiple-divs-draggable-and-movable-across-the-website
***************************************************************************************/

var draggableElements = document.getElementsByClassName("draggable");
console.log("draggable elements = " + draggableElements.length); //checking that array exists and is populated

for(var i = 0; i < draggableElements.length; i++){
    dragElement(draggableElements[i]);
}

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // element.addEventListener('touchstart', dragMouseDown);
    // element.addEventListener('touchmove', dragMouseDown);
    element.onmousedown = dragMouseDown;
    element.addEventListener('touchmove', function(e) {
        // grab the location of touch
        var touchLocation = e.targetTouches[0];
        
        // assign box new coordinates based on the touch.
        element.style.left = touchLocation.pageX + 'px';
        element.style.top = touchLocation.pageY + 'px';
    })

    function dragMouseDown(e) {
        // e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener('touchend', function(e) {
            // current box position.
            var x = parseInt(element.style.left);
            var y = parseInt(element.style.top);
        })
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        // e = e || window.event;
        e.preventDefault(); //this makes things break on mobile for some reason
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
/***************************************************************************************/