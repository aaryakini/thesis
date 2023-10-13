let template = document.getElementById("template");
let container = document.getElementById("items");
let i = 0;
let draggies = [];

const promise = new Promise((resolve, reject) => {
    var Airtable = require('airtable');
    var base = new Airtable({apiKey:'pat56tfP2XEHesKmi.26e076d65e5d850669b7535104b874ded3100bbcfac74a895caf6999eb8b4c15'}).base('appjAt0R0NzejkdO3');

    base('sequence').select({
        // maxRecords: 3,
        view: "grid"
    }).eachPage(async function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            console.log(record.get('photo')[0].url);

            let templateCopy = template.cloneNode(true);
            container.appendChild(templateCopy);

            templateCopy.querySelector(".title").append(record.get('name'));
            templateCopy.querySelector('img').src = record.get('photo')[0].url; //i don't remember what the exact airtable object looks like for an attachment, 
                                                                                //but future aarya if you are referencing this code, you did this for a reason, and tested it.
                                                                                //the array reference to the first item is necessary to get the url, so ignore the uncaught TypeError
                                                                                //the code should work without resolving that.
            if (record.get('category') == "desi"){
                templateCopy.querySelector(".image").setAttribute("style", "-webkit-filter: drop-shadow(0px 0px 5px goldenrod);");

            }else if (record.get('category') == "me"){
                templateCopy.querySelector(".image").setAttribute("style", "-webkit-filter: drop-shadow(0px 0px 5px hotpink);");

            }else if (record.get('category') == "kathak"){
                templateCopy.querySelector(".image").setAttribute("style", "-webkit-filter: drop-shadow(0px 0px 5px coral);");

            }else if (record.get('category') == "singapore"){
                templateCopy.querySelector(".image").setAttribute("style", "-webkit-filter: drop-shadow(0px 0px 5px crimson);");

            }else if (record.get('category') == "labor"){
                templateCopy.querySelector(".image").setAttribute("style", "-webkit-filter: drop-shadow(0px 0px 5px blue);");

            }else if (record.get('category') == "nyc"){
                templateCopy.querySelector(".image").setAttribute("style", "-webkit-filter: drop-shadow(0px 0px 5px chartreuse);");

            }else if (record.get('category') == "family"){
                templateCopy.querySelector(".image").setAttribute("style", "-webkit-filter: drop-shadow(0px 0px 5px darkorchid);");

            }else if (record.get('category') == "friends"){
                templateCopy.querySelector(".image").setAttribute("style", "-webkit-filter: drop-shadow(0px 0px 5px teal);");

            }
            let docSource = templateCopy.querySelector("#source");
            let docSourceContainer = templateCopy.querySelector("#sourceContainer");
            let src = record.get('source');
            // console.log(src.length);
            if(src !== "..."){
                docSource.setAttribute("href", record.get('source'));
                docSource.append(src);
            }else if (src === "..."){
                docSourceContainer.append("from my albums");
                docSourceContainer.style.textDecoration = "none";
                docSourceContainer.style.color = "black";
            }

            templateCopy.querySelector(".desc").append(record.get('desc'));
            templateCopy.removeAttribute('id');
            templateCopy.setAttribute('id', record.get('id'));

            let start = record.get('start');
            let end = record.get('end');
            let endLabel = record.get('endLabel');

            // console.log ("start = " + start + ",end = " + end + ", endLabel = " + endLabel);

            draggies.push([templateCopy.getAttribute('id'), start, end, endLabel]);
            // i++;
            // console.log(draggies);


            templateCopy.style.left = getPosX();
            templateCopy.style.top = getPosY();

            templateCopy.classList.add("draggable");

            console.log('Retrieved', record.get('name'), ' dragging now.');
            console.log(templateCopy);
            // dragElement(templateCopy);
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });

    function getPosX(){
    let posX = Math.floor(Math.random() * ((window.innerWidth - 100) - 30) + 30);
    return posX + "px";
    }

    function getPosY(){
        let posY = Math.floor(Math.random() * ((window.innerHeight*2 - 100) - 30) + 30);
        return posY + "px";
    }  
    
    resolve("promise was resolved!");
});


let delay = 6000;

setTimeout(function(){
    console.log(draggies.length);
    for (let i = 0; i < draggies.length-1; i++){
        let startElement = document.getElementById(draggies[i][1]);
        console.log("startElement = " + startElement);
        let endElement = document.getElementById(draggies[i][2]);
        console.log("endElement = " + endElement);
        // let line = new LeaderLine(startElement, endElement, {hide: true});
        let line = new LeaderLine(startElement, endElement);
        // draggies.addEventListener('scroll')
        line.setOptions({
            endLabel: LeaderLine.pathLabel(draggies[i][3],{
                color: '#d9d9d9',
                outlineColor: ''
            }),
            size: 0.5,
            // dropShadow: {color: 'blue', dx: 0, dy: 0},
            color: 'rgba(0,0,0,0.25)',
            startPlug: 'behind',
            endPlug: 'behind'
        });

        draggable = new PlainDraggable(document.getElementById(draggies[i][0]), {
            onMove: function() {
                line.position();}
        });
        draggable.containment = document.body;
    } 
}, delay);


// let timeout = setTimeout(makeLeaderLine(start,end,endLabel), 1000);


// function makeLeaderLine(start, end, endLabel){
//     let draggies = document.getElementsByClassName("draggable");

//     for (let i = 0; i < draggies.length; i++){
//         draggable = new PlainDraggable(draggies[i], {
//             onMove: function() {
//                 line.position();}
//         });
//         draggable.containment = document.body;
//     }

//     let startElement = document.getElementById(start);
//     let endElement = document.getElementById(end);
//     let line = new LeaderLine(startElement, endElement, {hide: true});
//     // draggies.addEventListener('scroll')
//     line.setOptions({
//         endLabel: LeaderLine.pathLabel(endLabel),
//         size: 0.5,
//         // dropShadow: {color: 'blue', dx: 0, dy: 0},
//         color: 'black',
//         startPlug: 'behind',
//         endPlug: 'behind'
//     });
//     startElement.addEventListener('click', function() { line.show(); });
// }


//libraries used are PlainDraggable and LeaderLine by Anseki on GitHub
//https://anseki.github.io/plain-draggable/
//https://anseki.github.io/leader-line///