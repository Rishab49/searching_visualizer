function randomizeNumbers() {
  [...numbersContainer.children].forEach((e) =>
    numbersContainer.removeChild(e)
  );

  let length =
    Number(arrayLengthElement.value) > 0
      ? Number(arrayLengthElement.value)
      : 100;
  numbersContainer.style.gridTemplateColumns = `repeat(${Math.floor(
    Math.sqrt(length)
  )}, 25px)`;
  array = [];
  console.log(length);
  for (let i = 0; i < length; i++) {
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
      ? (notifySuccess(), clearInterval(mainInterval))
      : currentIndex == numbersContainer.children.length - 1
      ? (notifyFailure(), clearInterval(mainInterval))
      : currentIndex++;
  }, 100);
}

async function binarySearch() {
  notifyInfo("Sorting the array");
  await bubbleSort();
  notifyInfo("Sorting completed!");

  let left = 0;
  let right = array.length - 1;
  let value = Number(searchElement.value);
  mainInterval = setInterval(async () => {
    [...numbersContainer.children].forEach((_, index) => {
      index >= left && index <= right ? makeActive(index) : makeInactive(index);
    });

    if (left < right) {
      let mid = Math.floor(left + (right - left) / 2);

      makeActive(mid);

      if (array[mid] == value) {
        clearInterval(mainInterval);
        notifySuccess();
        markResultElement(mid);
      }

      if (array[mid] < value) {
        left = mid + 1;
      }
      if (array[mid] > value) {
        right = mid - 1;
      }
    } else {
      notifyFailure();
      clearInterval(mainInterval);
    }
  }, 1000);
}

async function wait(seconds) {
  return new Promise((res) => {
    setTimeout(() => res("done"), seconds);
  });
}

function bubbleSort() {
  return new Promise((res) => {
    let i = 0,
      j = 0,
      swapped = false;
    mainInterval = setInterval(() => {
      if (i < array.length - 1) {
        if (j < array.length - i - 1) {
          if (array[j] > array[j + 1]) {
            swap(j, j + 1);
            swapped = true;
          }
          j++;
        } else {
          if (!swapped) {
            clearInterval(mainInterval);
            res("done");
          } else {
            swapped = false;
          }
          i++;
          j = 0;
        }
      } else {
        clearInterval(mainInterval);
        res("done");
      }
    }, 1);
  });
}

async function ternarySearch() {
  notifyInfo("Sorting the array");
  await bubbleSort();
  notifyInfo("Sorting completed!");

  let left = 0;
  let right = array.length - 1;
  let value = Number(searchElement.value);
  mainInterval = setInterval(async () => {
    let mid1 = Math.floor(left + (right - left) / 3);
    let mid2 = Math.floor(right - (right - left) / 3);
    [...numbersContainer.children].forEach((_, index) => {
      index >= left && index <= right
        ? index == mid1 || index == mid2
          ? changeColor(index)
          : makeActive(index)
        : makeInactive(index);
    });

    if (right >= left) {
      if (array[mid1] == value) {
        clearInterval(mainInterval);
        notifySuccess();
        markResultElement(mid1);
      }

      if (array[mid2] == value) {
        clearInterval(mainInterval);
        notifySuccess();
        markResultElement(mid2);
      }

      if (value < array[mid1]) {
        right = mid1 - 1;
      } else if (value > array[mid2]) {
        left = mid2 + 1;
      } else {
        left = mid1 + 1;
        right = mid2 + 1;
      }
    } else {
      notifyFailure();
      clearInterval(mainInterval);
    }
  }, 2000);
}

function swap(x, y) {
  [...numbersContainer.children].forEach((e, index) => {
    index == x || index == y ? makeActive(index) : makeInactive(index);
  });

  let temp = array[x];
  array[x] = array[y];
  array[y] = temp;

  let first = numbersContainer.children[x];
  let second = numbersContainer.children[y];

  temp = first.dataset.value;
  first.dataset.value = second.dataset.value;
  first.innerText = second.dataset.value;
  second.dataset.value = temp;
  second.innerText = temp;
}

function changeColor(index) {
  console.log("changing color", index);
  numbersContainer.children[index].style.backgroundColor = "yellow";
  numbersContainer.children[index].style.color = "black";
}

function makeActive(index) {
  // console.log(index);
  numbersContainer.children[index].style.backgroundColor = "white";
  numbersContainer.children[index].style.color = "black";
}
function makeInactive(index) {
  numbersContainer.children[index].style.backgroundColor = "transparent";
  numbersContainer.children[index].style.color = "white";
}

function markResultElement(index) {
  numbersContainer.children[index].style.backgroundColor = "blue";
  numbersContainer.children[index].style.color = "white";
}

function notifySuccess() {
  notificationElement.innerHTML = "Number found!";
  notificationElement.classList.add("notify");
  notificationElement.classList.add("found");
  setTimeout(() => {
    notificationElement.classList.remove("notify");
    notificationElement.classList.remove("found");
  }, 1500);
}

function notifyFailure() {
  notificationElement.innerText = "Number not found!";
  notificationElement.classList.add("notify");
  notificationElement.classList.add("not_found");
  setTimeout(() => {
    notificationElement.classList.remove("notify");
    notificationElement.classList.remove("not_found");
  }, 1500);
}

function notifyInfo(info) {
  notificationElement.innerText = info;
  notificationElement.classList.add("notify");
  notificationElement.classList.add("info");
  setTimeout(() => {
    notificationElement.classList.remove("notify");
    notificationElement.classList.remove("info");
  }, 1500);
}

randomButton.addEventListener("click", randomizeNumbers);
runButton.addEventListener("click", () => {
  let algo = new FormData(formElement).get("algo");
  switch (algo) {
    case "Linear":
      linearSearch();
      break;
    case "Binary":
      binarySearch();
      break;
    case "Ternary":
      ternarySearch();
      break;
  }
});
