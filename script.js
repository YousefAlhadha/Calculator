const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Numbers and decimal
    if (!isNaN(value) || value === ".") {
      expression += value;
      display.textContent = expression;
    }

    // Clear all
    else if (value === "AC") {
      expression = "";
      display.textContent = "0";
    }

    // Delete last character
    else if (value === "DEL") {
      expression = expression.slice(0, -1);
      display.textContent = expression || "0";
    }

    // Equals
    else if (value === "=") {
      try {
        const result = eval(
          expression
            .replace("×", "*")
            .replace("÷", "/")
            .replace("−", "-")
        );
        expression = result.toString();
        display.textContent = expression;
      } catch {
        display.textContent = "Error";
        expression = "";
      }
    }

    // Operators
    else {
      if (!expression) return;

      const lastChar = expression.slice(-1);
      if ("+-×÷−%".includes(lastChar)) return;

      expression += ` ${value} `;
      display.textContent = expression;
    }
  });
});

//keyboard supprt

document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Numbers & decimal
  if (!isNaN(key) || key === ".") {
    expression += key;
    display.textContent = expression;
  }

  // Operators
  if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
    if (!expression) return;

    const lastChar = expression.slice(-1);
    if ("+-*/%".includes(lastChar)) return;

    const operatorMap = {
      "*": "×",
      "/": "÷",
      "-": "−"
    };

    expression += ` ${operatorMap[key] || key} `;
    display.textContent = expression;
  }

  // Equals
  if (key === "Enter" || key === "=") {
    try {
      const result = eval(
        expression
          .replace("×", "*")
          .replace("÷", "/")
          .replace("−", "-")
      );
      expression = result.toString();
      display.textContent = expression;
    } catch {
      display.textContent = "Error";
      expression = "";
    }
  }

  // Delete
  if (key === "Backspace") {
    expression = expression.slice(0, -1);
    display.textContent = expression || "0";
  }

  // Clear
  if (key === "Escape") {
    expression = "";
    display.textContent = "0";
  }
});



