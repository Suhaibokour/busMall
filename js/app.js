'use strict';
let divImageElement = document.getElementById('images');
let leftImageElement = document.getElementById('leftImage');
let middleImageElement = document.getElementById('middleImage');
let rightImageElement = document.getElementById('rightImage');

let maxClicks = 10;
let attemptsCounter = 0;
let imageViews = 0;




let leftImgIndex;
let middleImgIndex;
let rightImgIndex;



function Product(name, src) {
    this.name = name;
    this.source = src;
    this.votes = 0;
    this.views = 0;



    Product.all.push(this);
}

Product.all = [];


new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');


//from class 11 demo.
function randomIndex() {

    return Math.floor(Math.random() * Product.all.length);
}



function renderImages() {
    leftImgIndex = randomIndex();
    middleImgIndex = randomIndex();
    rightImgIndex = randomIndex();
    while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex) {
        leftImgIndex = randomIndex();
        middleImgIndex = randomIndex();
    }


    leftImageElement.src = Product.all[leftImgIndex].source;
    middleImageElement.src = Product.all[middleImgIndex].source;
    rightImageElement.src = Product.all[rightImgIndex].source;


    Product.all[leftImgIndex].views++;
    Product.all[middleImgIndex].views++;
    Product.all[rightImgIndex].views++;
    imageViews++;
}
renderImages();




divImageElement.addEventListener('click', userClicking);
// leftImageElement.addEventListener('click',userClicking);
// middleImageElement.addEventListener('click',userClicking);
// rightImageElement.addEventListener('click',userClicking);



function userClicking(event) {
    attemptsCounter++;


    if (attemptsCounter <= maxClicks) {

        if (event.target.id === 'leftImage') {

            Product.all[leftImgIndex].votes++;
        } else if (event.target.id === 'middleImage') {
            Product.all[middleImgIndex].votes++;
        } else if (event.target.id === 'rightImage') {
            Product.all[rightImgIndex].votes++;
        } else {
            alert("Please click on an image!")
        }

        renderImages();
    } else {

        // The button code is from sebhastian.com

        let btn = document.createElement("button");
        btn.innerHTML = "View results";
        btn.addEventListener("click", function resultFun () {


            let list = document.getElementById('results');
            for (let i = 0; i < Product.all.length; i++) {
                let productList = document.createElement('li');
                list.appendChild(productList);
                productList.textContent = `${Product.all[i].name} has ${Product.all[i].votes} votes and it has been shown ${Product.all[i].views}`
            }
            divImageElement.removeEventListener('click', userClicking);
            

        });
        results.appendChild(btn);

        //btn.removeEventListener("click",resultFun());
        





        // let list = document.getElementById('results');
        // for (let i = 0; i < products.length; i++) {
        //     let productList = document.createElement('li');
        //     list.appendChild(productList);
        //     productList.textContent = `${products[i].name} has ${products[i].votes} votes and it has been shown ${products[i].views}`
        // }
        // divImageElement.removeEventListener('click', userClicking);

    }

}