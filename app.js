const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const solutionAndLoadingDisplay = document.querySelector("#solution");
const squares = 81;
let submission = [];

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", "1");
  inputElement.setAttribute("max", "9");
  if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    inputElement.classList.add("odd-section");
  }

  puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value) {
      submission.push(input.value);
    } else {
      submission.push(".");
    }
  });
  console.log(submission);
};

const populateValues = (isSolvable, solution) => {
  const inputs = document.querySelectorAll("input");
  if (isSolvable && solution) {
    inputs.forEach((input, i) => {
      input.value = solution[i];
    });
    solutionAndLoadingDisplay.innerHTML = "Solved!";
  } else {
    solutionAndLoadingDisplay.innerHTML = "Not Solvable";
  }
};

const solve = () => {
  solutionAndLoadingDisplay.innerHTML = "Loading...";
  joinValues();
  // data needs to be an object
  const data = { numbers: submission.join("") };
  console.log("data", data);

  // calling our own backend. We want to hide our API key
  // http://localhost:8000/solve for dev
  fetch("https://sudoku-solver-backend.adaptable.app/solve", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // body is going to the server
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success: ", data);
      populateValues(data.solvable, data.solution);
      submission = [];
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

solveButton.addEventListener("click", solve);
