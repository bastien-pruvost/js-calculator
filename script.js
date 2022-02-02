const buttons = document.querySelectorAll(".btn");
const displayCalcul = document.querySelector(".displayer__calcul");
const displayResult = document.querySelector(".displayer__result");
let calcul = "";
let calculFromResult = false; //Becomes true when user want to calculate from the previous result.
let originalFontSize = "2.5rem";
let reducedFontSize1 = "2rem";
let reducedFontSize2 = "1.5rem";
let reducedFontSize3 = "1rem";


//Clear actual calculation.
function clearCalcul() {
  calcul = "";
};

//Clear calculation display.
function clearDisplayCalcul() {
  displayCalcul.textContent = "";
};

//Clear result display.
function clearDisplayResult() {
  displayResult.textContent = "";
};

//Check if number is float
function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
};


//Listen for any click from buttons.
buttons.forEach(function (button) {
  button.addEventListener("click", function (e) {

    //if "AC" button is pressed clear actual calculation and all displays.
    if (e.target.classList.contains("btn--clear")) {
      clearDisplayCalcul();
      clearDisplayResult();
      clearCalcul();

      //if a calculation operator button is pressed (-, +, /, *)
    } else if (e.target.classList.contains("btn--op")) {

      //if the user want to calculate from the previous result, put the result in calculation display and clear result.
      if (calculFromResult) {
        displayCalcul.textContent = eval(calcul);
        clearDisplayResult();
      }

      calculFromResult = false;

      //Show operator on calculation display.
      displayCalcul.textContent += " " + e.target.innerText + " ";
      calcul += e.target.name;

      //If equal button is pressed show the symbol in calculation display
    } else if (e.target.classList.contains("btn--equal")) {
      calculFromResult = true;
      displayCalcul.textContent += " " + e.target.innerText + " ";

      //Reset the original font-size
      displayResult.style.fontSize = originalFontSize;

      //If the result is float and has more than 14 digits
      if (isFloat(eval(calcul)) && eval(calcul).toString().length > 14) {
        //Calculate the number of digits before the decimal point
        let lengthWithoutFloat = Math.round(eval(calcul)).toString().length;
        //Determines to how many digits after the decimal the number is rounded
        let afterCommaLength = 13 - lengthWithoutFloat;
        //Set a minimum of 2 digits after the decimal point
        if (afterCommaLength <= 1) { afterCommaLength = 2; }
        //Reduce font size of displayer if float result has more than 14 or 17 digits.
        if (eval(calcul).toFixed(afterCommaLength).toString().length > 14) {
          displayResult.style.fontSize = reducedFontSize1;
        }
        if (eval(calcul).toFixed(afterCommaLength).toString().length > 17) {
          displayResult.style.fontSize = reducedFontSize2;
        }
        //Display the rounded result with the correct number of digits.
        displayResult.textContent = eval(calcul).toFixed(afterCommaLength);

        //If the result is not a float number
      } else {
        //Reduce font size of displayer if number has more than 13 or 16 digits.
        if (eval(calcul).toString().length > 13) {
          displayResult.style.fontSize = reducedFontSize1;
        }
        if (eval(calcul).toString().length > 16) {
          displayResult.style.fontSize = reducedFontSize2;
        }

        //Display the result
        displayResult.textContent = eval(calcul);
      }
      //Put the result in the actual calculation var
      calcul = eval(calcul);

      //Else (if the button pressed is a number)
    } else {
      //If it's a new calcul clear all. (calculFromResult is True but the user has clicked on a new number so he dont want to calcul from the result)
      if (calculFromResult) {
        clearCalcul();
        clearDisplayCalcul();
        clearDisplayResult();
      }

      calculFromResult = false;

      //Add the number in calculation and show it on display
      displayCalcul.textContent += e.target.innerText;
      calcul += e.target.innerText;
    }
  });
});


