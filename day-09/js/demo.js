'use strict';

// use querySelector and css selectors to get the none.css href
// log it
let none = document.querySelector('[href*=css/none.css');
console.log(none);



//select h1 and modify it's font-size
let h1 = document.querySelector('h1');
h1.addEventListener('click', function(){
    h1.style.fontSize = "5em";
});

//add event listener to the button to track x and y of clicks
//log them
//log the target
let button = document.querySelector('button');
button.addEventListener('click', function(e) {
    let message = "You clicked " 
    + e.offsetX + " and " 
    + e.offsetY;

    let clickedElement = e.target;

    console.log(message);
    console.log(clickedElement);
})

//key press event listener
document.addEventListener('keydown', function(event){
    if(event.key === 'ArrowUp'){
        console.log("Going up!");
        document.querySelector('h2').style.fontSize = "5em";
    } else if(event.key === 'ArrowUp'){
        console.log("Going up!")
        document.querySelector('h2').style.fontSize = "1em";
    }
});



//get all style sheet links, log them, then add even listeners to each


let listItems = document.querySelectorAll(".styles li");
console.log(listItems);
for(var i in Object.keys(listItems)) {
    comsole.log(listItems[i].id);
    doSomething()
}



// track state of clicks
