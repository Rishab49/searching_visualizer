let numbersContainer = document.querySelector(".numbers_container");
let formElement = document.querySelector("form");
let randomButton = document.querySelector(".randomize_button");
let runButton = document.querySelector(".run");
let searchElement = document.querySelector(".search_number");
let arrayLengthElement = document.querySelector(".array_length");
let notificationElement = document.querySelector(".notification");
let descContainer= document.querySelector(".desc_container");
let toggleButton = document.querySelector(".toggle");
let sideBar = document.querySelector(".side_bar");
let isOpen = false;
let array = [];
let mainInterval;
let algo_data = {
  linear: {
    heading: "Linear Search",
    body: "Linear search is a simple searching algorithm that sequentially checks each element in a given list or array until the desired element is found or the end of the list is reached. Starting from the first element, it compares each element with the target value and continues until a match is found or the end is reached. Linear search is easy to implement and works on unsorted or sorted data. However, its time complexity is O(n), where n is the number of elements in the list, since it may need to traverse the entire list in the worst case. The space complexity of linear search is O(1) as it only requires a constant amount of additional memory to store temporary variables.",
    time: "O(n)",
    space: "O(1)",
  },
  binary: {
    heading: "Binary Search",
    body: "Binary search is an efficient searching algorithm commonly used on sorted arrays or lists. It follows a divide-and-conquer approach to find the desired element by repeatedly dividing the search space in half. Starting from the middle element, it compares the target value with the middle element and eliminates the half that cannot contain the target. By iteratively narrowing down the search range, binary search quickly converges to the desired element. The time complexity of binary search is O(log n), where n is the number of elements in the sorted array. This is because with each comparison, the search space is halved, resulting in a logarithmic growth rate. The space complexity of binary search is O(1) as it only requires a constant amount of additional memory to store temporary variables.",
    time: "O(log n)",
    space: "O(1)",
  },
  ternary: {
    heading: "Ternary Search",
    body: "Ternary search is a searching algorithm that operates similarly to binary search but divides the search space into three parts instead of two. It is used on sorted arrays or lists and aims to find the desired element by dividing the search space into three equal parts, rather than halves. Ternary search compares the target value with the two partitioning points and eliminates two-thirds of the search space in each iteration. This process is repeated until the desired element is found or the search space is exhausted. The time complexity of ternary search is O(log3 n), where n is the number of elements in the sorted array. This logarithmic growth rate is slightly slower than binary search due to the additional comparison involved. The space complexity of ternary search is O(1) as it only requires a constant amount of additional memory to store temporary variables.",
    time: "O(log3 n)",
    space: "O(1)",
  },
};
