const display = document.getElementById("display");

// Allowed keys
const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "%", ".", "Enter", "Backspace"];

const buttonsContainer = document.querySelector(".buttons");

// button order
const buttons = [
    "C", "←", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", "00", ".", "="
];
buttons.forEach(button => {
    const btnElement = document.createElement("button");
    btnElement.innerText = button;
    btnElement.classList.add("btn");

    if (button === "=") btnElement.classList.add("equal");
    else if (["+", "-", "×", "÷", "%"].includes(button)) btnElement.classList.add("operator");
    else if (button === "C") btnElement.classList.add("clear");
    else if (button === "←") btnElement.classList.add("backspace");

    if (button === "0" || button === "00") btnElement.classList.add("zero");

    btnElement.addEventListener("click", () => handleButtonClick(button));
    buttonsContainer.appendChild(btnElement);
});
function handleButtonClick(value) {
    if (value === "C") {
        display.value = "0";
    } else if (value === "←") {
        display.value = display.value.slice(0, -1) || "0";
    } else if (value === "=") {
        calculateResult();
    } else if (value === "×") {
        display.value += "*";
    } else if (value === "÷") {
        display.value += "/";
    } else if (value === "%") {
        display.value += "%";
    } else {
        if (display.value === "0") {
            display.value = value;
        } else {
            display.value += value;
        }
    }
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

  
    if (allowedKeys.includes(key)) {
        if (key === "Enter") {
            calculateResult();
        } else if (key === "Backspace") {
            display.value = display.value.slice(0, -1) || "0";
        } else {
            if (display.value === "0") {
                display.value = key;
            } else {
                display.value += key;
            }
        }
    } else {
        alert("Only numbers are allowed");
        event.preventDefault();
    }
});
function calculateResult() {
    try {
        display.value = eval(display.value.replace("×", "*").replace("÷", "/"));
    } catch (error) {
        display.value = "Error";
    }
}
