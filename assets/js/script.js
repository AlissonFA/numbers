const form = document.querySelector("form");

const quantityInput = document.querySelector("#numbers");
const fromInput = document.querySelector("#from");
const toInput = document.querySelector("#to");
const repeatInput = document.querySelector("#repeat");

const chooseScreen = document.querySelector(".choose-screen");
const resultScreen = document.querySelector(".result-screen");

const numbersContainer = document.querySelector(".numbers");

const resultText = document.querySelector(".result-screen p");

const drawAgain = document.querySelector("#draw-again");

const ANIMATION_TIME = 800;

// Impedindo de recarregar ao enviar.
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const quantity = Number(quantityInput.value);
  const from = Number(fromInput.value);
  const to = Number(toInput.value);
  const repeat = repeatInput.checked;

  // Verificação do valor inicial e final.
  if (from >= to) {
    alert("O valor inicial deve ser menor que o final.");
    return;
  }

  // Verificação do valor do intervalo.
  const intervalSize = to - from + 1;

  if (repeat && quantity > intervalSize) {
    alert("Não existem números suficientes para um sorteio sem repetição.");
    return;
  }

  // Troca de telas.
  chooseScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const raffledNumbers = drawNumber(quantity, from, to, repeat);

  showResult(raffledNumbers);
});

drawAgain.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  chooseScreen.classList.remove("hidden");

  numbersContainer.innerHTML = "";
  resultText.textContent = "1º RESULTADO";

  quantityInput.value = "";
  fromInput.value = "";
  toInput.value = "";
  repeatInput.checked = false;

  // Esconde novamente
  drawAgain.classList.add("hidden");
});

// Funções da interface.
function showResult(raffledNumbers) {
  numbersContainer.innerHTML = "";

  // Esconde o botão de sortear novamente.
  drawAgain.classList.add("hidden");

  for (let value = 0; value < raffledNumbers.length; value++) {
    const delay = value * ANIMATION_TIME;

    setTimeout(() => {
      const number = createNumber(raffledNumbers[value]);

      numbersContainer.append(number);

      resultText.textContent = `${value + 1}º RESULTADO`;
    }, delay);
  }

  // Mostra o botão após o último número.
  setTimeout(() => {
    drawAgain.classList.remove("hidden");
  }, raffledNumbers.length * ANIMATION_TIME + ANIMATION_TIME);
}

function createNumber(numberValue) {
  const number = document.createElement("span");
  number.classList.add("number");

  const box = document.createElement("span");
  box.classList.add("number-box", "animate-number-box");

  const valueText = document.createElement("span");
  valueText.classList.add("number-value", "animate-number-value");
  valueText.textContent = numberValue;

  number.append(box);
  number.append(valueText);

  return number;
}

// Funções de lógica.
function drawNumber(quantity, from, to, repeat) {
  const numbers = [];

  // Sorteia a quantidade de números solicitada.
  for (let value = 0; value < quantity; value++) {
    let raffle = randomNumber(from, to);
    while (repeat && numbers.includes(raffle)) {
      raffle = randomNumber(from, to);
    }

    numbers.push(raffle);
  }

  return numbers;
}

// Função para pegar um número aleatório.
function randomNumber(from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}
