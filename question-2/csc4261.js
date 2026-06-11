// --- Get the display elements from the HTML ---
var expressionDisplay = document.getElementById("expression");
var resultDisplay     = document.getElementById("result");


// --- Our main variable ---
var expression = "";


function appendChar(char) {

  // Add the character to our expression
  expression = expression + char;

  // Show the updated expression on screen
  expressionDisplay.textContent = expression;

  // Try to show a live preview of the result
  try {
    // Handle the special \ (integer division) operation
    var evalExpr = expression.replace(/\\/g, " // ");

    // Handle ^ (power) - convert to ** which JavaScript understands
    evalExpr = evalExpr.replace(/\^/g, "**");

    // Calculate and show the live result
    var liveResult = eval(evalExpr);
    resultDisplay.textContent = formatResult(liveResult);

  } catch (error) {
  }
}

function clearAll() {

  // Empty the expression
  expression = "";

  // Reset both displays
  expressionDisplay.textContent = "";
  resultDisplay.textContent = "0";
}

function backspace() {

  // Remove the last character from the expression
  // slice(0, -1) means "everything except the last character"
  expression = expression.slice(0, -1);

  // Update the expression display
  expressionDisplay.textContent = expression;

  // If expression is now empty, show 0
  if (expression === "") {
    resultDisplay.textContent = "0";
    return;
  }

  // Otherwise recalculate the live preview
  try {
    var evalExpr = expression.replace(/\\/g, " // ");
    evalExpr = evalExpr.replace(/\^/g, "**");
    resultDisplay.textContent = formatResult(eval(evalExpr));
  } catch (error) {
    // incomplete expression — do nothing
  }
}


function calculate() {

  // Don't calculate if nothing was typed
  if (expression === "") return;

  try {
    // Convert \ to // (integer division in JS)
    var evalExpr = expression.replace(/\\/g, " // ");

    // Convert ^ to ** (power in JS)
    evalExpr = evalExpr.replace(/\^/g, "**");

    // Calculate the final result
    var answer = eval(evalExpr);

    // Show the expression with = sign at the top
    expressionDisplay.textContent = expression + " =";

    // Show the answer in big text
    resultDisplay.textContent = formatResult(answer);

    // Save the answer so user can continue calculating
    expression = String(answer);

  } catch (error) {
    // Something went wrong e.g. division by zero
    resultDisplay.textContent = "Error";
    expression = "";
  }
}


function formatResult(value) {

  // Check for division by zero (gives Infinity in JS)
  if (!isFinite(value)) {
    return "Cannot ÷ 0";
  }

  // If it's a whole number, remove the decimal point
  if (Number.isInteger(value)) {
    return String(value);
  }

  // Otherwise round to 10 significant figures to avoid long decimals
  return parseFloat(value.toPrecision(10)).toString();
}

document.addEventListener("keydown", function(event) {

  var key = event.key;

  if (key >= "0" && key <= "9") appendChar(key);  // number keys
  else if (key === "+")  appendChar("+");
  else if (key === "-")  appendChar("-");
  else if (key === "*")  appendChar("*");
  else if (key === "/")  { event.preventDefault(); appendChar("/"); }
  else if (key === "%")  appendChar("%");
  else if (key === "^")  appendChar("^");
  else if (key === "\\") appendChar("\\");
  else if (key === ".")  appendChar(".");
  else if (key === "Enter")     calculate();
  else if (key === "Backspace") backspace();
  else if (key === "Escape")    clearAll();
});
