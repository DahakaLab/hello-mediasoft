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
  const errors = [];
  if (validCharacters.test(expression)) {
    errors.push('Используйте только числа и допустимые символы: (\'+\', \'-\', \'*\', \'/\', \' \', \'.\').');
  }
  return errors;
};

const inputStart = () => {
  const inputValue = prompt('Введите вычисляемое выражение', '');
  if (inputValue) {
    const checkResult = checkExpression(inputValue);
    if (checkResult.length) {
      changeMessage(checkResult.join('/n'));
    } else {
      calculateExpression(inputValue);
    }
  } else {
    changeMessage('Ввод отменен');
  }
};

inputStartBtn.addEventListener('click', () => inputStart());
