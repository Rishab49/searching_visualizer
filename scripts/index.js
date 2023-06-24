let numbersContainer = document.querySelector(".numbers_container");
let linearButton = document.querySelector(".linear_button");
let randomButton = document.querySelector(".randomize_button");
let searchElement = document.querySelector(".search_number");
let notificationElement = document.querySelector(".notification");
let array = [];
let mainInterval;
function randomizeNumbers() {
  [...numbersContainer.children].forEach((e) =>
    numbersContainer.removeChild(e)
  );

  array = [];
  for (let i = 0; i < 25; i++) {
    let number = document.createElement("div");
    number.setAttribute("class", "number");
    let num = Math.floor(Math.random() * 100);
    number.innerText = num;
    number.dataset.value = num;
    array.push(num);
    numbersContainer.appendChild(number);
  }
}

function linearSearch() {
  let currentIndex = 0;
  let value = Number(searchElement.value);
  mainInterval = setInterval(() => {
    console.log(currentIndex, value);
    [...numbersContainer.children].forEach((_, index) => {
      makeInactive(index);
    });
    makeActive(currentIndex);
    let currentValue = Number(
      numbersContainer.children[currentIndex].dataset.value
    );

    value == currentValue
      ? ((notificationElement.innerHTML = "Number found!"),
        notificationElement.classList.add("notify"),
        notificationElement.classList.add("found"),
        setTimeout(() => {
          notificationElement.classList.remove("notify");
          notificationElement.classList.remove("found");
        }, 1500),
        clearInterval(mainInterval))
      : currentIndex == numbersContainer.children.length - 1
      ? ((notificationElement.innerText = "Number not found!"),
        notificationElement.classList.add("notify"),
        notificationElement.classList.add("not_found"),
        setTimeout(() => {
          notificationElement.classList.remove("notify");
          notificationElement.classList.remove("not_found");
        }, 1500),
        clearInterval(mainInterval))
      : currentIndex++;
  }, 100);
}

function makeActive(index) {
  numbersContainer.children[index].style.backgroundColor = "white";
  numbersContainer.children[index].style.color = "black";
}
function makeInactive(index) {
  numbersContainer.children[index].style.backgroundColor = "transparent";
  numbersContainer.children[index].style.color = "white";
}

randomButton.addEventListener("click", randomizeNumbers);
linearButton.addEventListener("click", linearSearch);
