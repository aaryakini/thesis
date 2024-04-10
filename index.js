function showHide(name){
    let blocks = document.getElementsByClassName("block");
    console.log(blocks);

    for (let i = 0; i < blocks.length; i++){
        // console.log(blocks[i].id);
        if (blocks[i].id == name){
            blocks[i].style.display = "block";
            document.getElementById(name + 'Button').style.backgroundColor = "black";
            document.getElementById(name + 'Button').style.color = "whitesmoke";
        } else{
            blocks[i].style.display = "none";
            if(name == "about"){
                document.getElementById('componentsButton').style.backgroundColor = "whitesmoke";
                document.getElementById('componentsButton').style.color = "black";
                document.getElementById('galleryButton').style.backgroundColor = "whitesmoke";
                document.getElementById('galleryButton').style.color = "black";
            }else if(name == "components"){
                document.getElementById('aboutButton').style.backgroundColor = "whitesmoke";
                document.getElementById('aboutButton').style.color = "black";
                document.getElementById('galleryButton').style.backgroundColor = "whitesmoke";
                document.getElementById('galleryButton').style.color = "black";
            }else{
                document.getElementById('aboutButton').style.backgroundColor = "whitesmoke";
                document.getElementById('aboutButton').style.color = "black";
                document.getElementById('componentsButton').style.backgroundColor = "whitesmoke";
                document.getElementById('componentsButton').style.color = "black";
            }
        }
    }
}