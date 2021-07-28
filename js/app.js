'use strict';
let divImageElement = document.getElementById('images');
let leftImageElement = document.getElementById('leftImage');
let middleImageElement = document.getElementById('middleImage');
let rightImageElement = document.getElementById('rightImage');

let maxClicks = 25;
let attemptsCounter = 0;
let imageViews = 0;




let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

let namesArr = [];

let votesArr = [];

let shownArr = [];

function Product(name, src) {
  this.name = name;
  this.source = src;
  this.votes = 0;
  this.views = 0;



  Product.all.push(this);
  namesArr.push(this.name);

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





let numbers = [];
function renderImages() {
  leftImgIndex = randomIndex();
  middleImgIndex = randomIndex();
  rightImgIndex = randomIndex();
  while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex || numbers.includes(leftImgIndex) || numbers.includes(middleImgIndex) || numbers.includes(rightImgIndex)) {
    leftImgIndex = randomIndex();
    middleImgIndex = randomIndex();
    rightImgIndex = randomIndex();

  }


  leftImageElement.src = Product.all[leftImgIndex].source;
  middleImageElement.src = Product.all[middleImgIndex].source;
  rightImageElement.src = Product.all[rightImgIndex].source;
  numbers = [leftImgIndex, middleImgIndex, rightImgIndex];



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
    updateStorage();
    renderImages();

  } else {

    // The button code is from sebhastian.com

    let btn = document.createElement("button");
    btn.innerHTML = "View results";
    btn.addEventListener("click", function resultFun() {


      let list = document.getElementById('results');
      for (let i = 0; i < Product.all.length; i++) {
        let productList = document.createElement('li');
        list.appendChild(productList);
        productList.textContent = `${Product.all[i].name} has ${Product.all[i].votes} votes and it has been shown ${Product.all[i].views}`
      }
      divImageElement.removeEventListener('click', userClicking);
      divImageElement.removeEventListener('click', resultFun);
      btn.removeEventListener("click", resultFun);


    });
    results.appendChild(btn);

    for (let i = 0; i < Product.all.length; i++) {
      votesArr.push(Product.all[i].votes);
      shownArr.push(Product.all[i].views);

    }

    // updateStorage()
    showChart()




    // let list = document.getElementById('results');
    // for (let i = 0; i < products.length; i++) {
    //     let productList = document.createElement('li');
    //     list.appendChild(productList);
    //     productList.textContent = `${products[i].name} has ${products[i].votes} votes and it has been shown ${products[i].views}`
    // }
    // divImageElement.removeEventListener('click', userClicking);

  }

}







function updateStorage() {


  let stringArr = JSON.stringify(Product.all);
  localStorage.setItem('product', stringArr);

  // let stringArr2 = JSON.stringify(votesArr);
  // localStorage.setItem('votes', stringArr2);

  // let stringArr3 = JSON.stringify(shownArr);
  // localStorage.setItem('views', stringArr3);
  console.log('updateStorage')
}



function productsVotes() {
  let data = localStorage.getItem('product');
  let parsedArr = JSON.parse(data);
  console.log(parsedArr)

  //   let data2 = localStorage.getItem('votes');
  //   let parsedArr2 = JSON.parse(data2);
  // console.log(parsedArr2)

  //   let data3 = localStorage.getItem('views');
  //   let parsedArr3 = JSON.parse(data3);
  // console.log(parsedArr3)




  // if the first time coming to the page, make sure there will be data in the storage and then make it equal to the Prudocts.all

  if (parsedArr !== null) {

    // YOU can either do this But it wont have the prototype methods
    // Product.all = parsedArr;
    // votesArr=parsedArr2;
    // shownArr=parsedArr3;

    // OR YOU DO reinstantiation TO HAVE THE PROTOTYPE AGAIN
    Product.all = [];
    for (let i = 0; i < parsedArr.length; i++) {
      let newProduct = new Product(parsedArr[i].name, parsedArr[i].source);

      newProduct.votes = parsedArr[i].votes;
      newProduct.views = parsedArr[i].views;
      newProduct.cool();
    }

  }


  renderImages();
  console.log('productsVotes')
}






Product.prototype.cool = function () {
  console.log('Cool item');
}








function showChart() {

  const data = {
    labels: namesArr,
    datasets: [{
      label: 'Votes',
      data: votesArr,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    },
    {
      label: 'Shown',
      data: shownArr,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }

    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };


  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

}






productsVotes();
