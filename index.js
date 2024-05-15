const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Initialize
let number;
let nameButton = [
  "Tính Lương",
  "Tính Trung Bình",
  "Quy Đổi Tiền",
  "Tính Chu Vi, Diện Tích",
  "Tính Tổng",
];

// DOM elements
const tabs = $$(".tab-item");
const panes = $$(".pane-item");
const line = $(".tab-line");
const submitBtn = $(".sumbit");
const result = $(".tab-result");

function start() {
  //Xử lí Tabs khi click
  handleTab();
  //Xử lí Input
  handleResult();
}

start();

function handleTab() {
  tabs.forEach((tab, index) => {
    //Lấy ra pane tương ứng với tab
    let pane = panes[index];

    //Khi click vào tab
    tab.onclick = function () {
      //Xóa class active cũ và thêm active mới.
      $(".tab-item.active").classList.remove("active");
      $(".pane-item.active").classList.remove("active");
      this.classList.add("active");
      pane.classList.add("active");

      //Thay đổi text cho submit button tương ứng với index của tab khi click
      submitBtn.textContent = nameButton[index];

      // Xóa kết quả cũ khi click.
      result.textContent = "";

      //Set line cho tab
      setLine(tab);
    };
  });
}

function setLine(tab) {
  line.setAttribute(
    "style",
    `left: ${tab.offsetLeft}px; 
        width: ${tab.offsetWidth}px;`
  );
}

function handleResult() {
  submitBtn.onclick = function () {
    // initialize cho bt1
    const salaryDate = $("#salary-date").value * 1;
    const date = $("#date").value * 1;

    // initialize cho bt2
    const number1 = $("#number-1").value * 1;
    const number2 = $("#number-2").value * 1;
    const number3 = $("#number-3").value * 1;
    const number4 = $("#number-4").value * 1;
    const number5 = $("#number-5").value * 1;

    // initialize cho bt3
    const currency = $("#currency").value * 1;

    // initialize cho bt4
    const rectangleLenght = $("#rectangle-lenght").value * 1;
    const rectangleWidth = $("#rectangle-width").value * 1;

    // initialize cho bt5
    const sumofNumber = $("#sum-number").value * 1;

    if (panes[0] === $(".pane-item.active")) {
      //Tính lương theo ngày công
      sumSalary(salaryDate, date);
    } else if (panes[1] === $(".pane-item.active")) {
      //Tính trung bình
      average([number1, number2, number3, number4, number5]);
    } else if (panes[2] === $(".pane-item.active")) {
      //Chuyển đổi tiền
      changeCurrency(currency);
    } else if (panes[3] === $(".pane-item.active")) {
      //Tính chu vi, diện tích
      rectangleArea(rectangleLenght, rectangleWidth);
    } else if (panes[4] === $(".pane-item.active")) {
      //Tính tổng 2 ký số
      sumNumber(sumofNumber);
    }
  };
}

function sumSalary(salaryDate, date) {
  number = salaryDate * date;
  result.innerHTML = `Tiền lương: ${number}`;
}

function average(numbers) {
  number = numbers.reduce((acc, number) => acc + number);
  number = number / numbers.length;
  result.innerHTML = `Trung bình: ${number}`;
}

function changeCurrency(currency) {
  number = currency * 23000;
  number = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  result.innerHTML = `Giá chuyển đổi: ${number}`;
}

function rectangleArea(rectangleLenght, rectangleWidth) {
  let perimeter;
  let area;
  perimeter = (rectangleLenght + rectangleWidth) * 2;
  area = rectangleLenght * rectangleWidth;
  result.innerHTML = `Diện tích: ${area}, chu vi: ${perimeter}`;
}

function sumNumber(sumNumber) {
  let prefixNumber = Math.floor(sumNumber / 10);
  let postfixNumber = sumNumber % 10;
  number = prefixNumber + postfixNumber;
  result.innerHTML = `Tổng 2 ký số là: ${number}`;
}
