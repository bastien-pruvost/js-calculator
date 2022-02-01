const buttons = document.querySelectorAll(".btn");
const displayCalcul = document.querySelector(".displayer__calcul");
const displayResult = document.querySelector(".displayer__result");
let calcul = "";
let calculFromResult = false; //Becomes true when user want to calculate from the previous result.


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
        displayCalcul.textContent = displayResult.textContent;
        clearDisplayResult();
      }

      calculFromResult = false;

      //Show operator on calculation display.
      displayCalcul.textContent += " " + e.target.innerText + " ";
      calcul += e.target.name;

      //If equal button is pressed : put the equal on display, do the calculation and show the result on display.
    } else if (e.target.classList.contains("btn--equal")) {
      calculFromResult = true;
      displayCalcul.textContent += " " + e.target.innerText + " ";
      displayResult.textContent = eval(calcul);
      calcul = displayResult.textContent;

      //If other button is pressed (Numbers)
    } else {
      //Clear all if it's a new calcul
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
