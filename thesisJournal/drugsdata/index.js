let template = document.getElementById("template");
let container = document.getElementById("items");

const promise = new Promise((resolve, reject) => {
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'patm2893J6aHB8x3E.651095ae1bced847ff4ebc8fd0dda2d4c56e6001b4b51408a8d2105d76a6ce14'}).base('app7jb8PVrwXfFh0L'); //PAT: my first workspace

    base('drugsDataThesis').select({
        // maxRecords: 3,
        view: "Grid view"
    }).eachPage(async function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            let templateCopy = template.cloneNode(true);
            container.appendChild(templateCopy);
            templateCopy.removeAttribute('id');

            templateCopy.querySelector('img').src = `https://drugsdata.org/${record.get('imgSrc')}`;
            templateCopy.querySelector(".name").append(record.get('name'));
            templateCopy.querySelector(".soldAs").append(record.get('soldAs'));
            templateCopy.querySelector(".expectedContents").append(record.get('expectedContents'));
            templateCopy.querySelector(".activeContents").append(record.get('activeContents'));
            // templateCopy.querySelector(".ratio").append(record.get('ratio'));
            templateCopy.querySelector(".date").append(record.get('date'));
            templateCopy.querySelector(".location").append(record.get('location'));
        });

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

promise
  .then((result) => {
    console.log(result); // "The promise was resolved!"
  })
  .catch((error) => {
    console.log(error); // "The promise was rejected!"
  });