const messageOutEl = document.querySelector('h1');
const inputStartBtn = document.querySelector('button');

const calculator = {
  createResultMessage(expression) {
    const errors = this._checkErrors(expression);
    if (errors.length) {
      return errors.join('/n');
    } else {
      try {
        const resultExpression = this._resultExpression(expression);
        if (resultExpression !== undefined) {
          return `Результат:\n${expression} = ${resultExpression}`;
        } else {
          return `Выражение \'${expression}\' некорректно`;
        }
      } catch {
        return `Выражение \'${expression}\' некорректно`;
      }
    }
  },
  _validCharactersRegExp: /[^0-9\+\-\*\/\(\)\ \.]/,
  _checkErrors(expression) {
    const errors = [];
    if (this._validCharactersRegExp.test(expression)) {
      errors.push('Используйте только числа и допустимые символы: (\'+\', \'-\', \'*\', \'/\', \' \', \'.\').');
    }
    return errors;
  },
  _resultExpression(expression) {
    return eval(expression);
  },
};

const changeMessage = (message) => {
  messageOutEl.innerText = message;
};

const inputStart = () => {
  const expression = prompt('Введите вычисляемое выражение', '');
  if (expression) {
    changeMessage(calculator.createResultMessage(expression));
  } else {
    changeMessage('Ввод отменен');
  }
};

inputStartBtn.addEventListener('click', () => inputStart());
