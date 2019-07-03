const messageOutEl = document.querySelector('h1');
const inputStartBtn = document.querySelector('button');

const changeMessage = (message) => {
  messageOutEl.innerText = message;
};

const calculateExpression = (expression) => {
  try {
    if (eval(expression) !== undefined) {
      changeMessage(`Результат:\n${expression} = ${eval(expression)}`);
    } else {
      changeMessage(`Выражение \'${expression}\' некорректно`);
    }
  } catch {
    changeMessage(`Выражение \'${expression}\' некорректно`);
  }
};

const checkExpression = (expression) => {
  const validCharacters = /[^0-9\+\-\*\/\(\)\ \.]/;
  if (!validCharacters.test(expression)) {
    calculateExpression(expression);
  } else {
    changeMessage('Используйте только числа и допустимые символы: (\'+\', \'-\', \'*\', \'/\', \' \', \'.\').');
  }
};

const inputStart = () => {
  const inputValue = prompt('Введите вычисляемое выражение', '');
  if (inputValue) {
    checkExpression(inputValue);
  } else {
    changeMessage('Ввод отменен');
  }
};

inputStartBtn.addEventListener('click', () => inputStart());
