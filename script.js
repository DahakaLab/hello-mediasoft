const messageOutEl = document.querySelector('h1');
const inputStartBtn = document.querySelector('button');

const calculator = {
  expression: '',
  get resultMessage() {
    if (this._errors.length) {
      return this._errors.join('/n');
    } else {
      try {
        if (eval(this.expression) !== undefined) {
          return `Результат:\n${this.expression} = ${this._resultExpression}`;
        } else {
          return `Выражение \'${this.expression}\' некорректно`;
        }
      } catch {
        return `Выражение \'${this.expression}\' некорректно`;
      }
    }
  },
  _validCharactersRegExp: /[^0-9\+\-\*\/\(\)\ \.]/,
  get _errors() {
    const _errors = [];
    if (this._validCharactersRegExp.test(this.expression)) {
      _errors.push('Используйте только числа и допустимые символы: (\'+\', \'-\', \'*\', \'/\', \' \', \'.\').');
    }
    return _errors;
  },
  get _resultExpression() {
    return eval(this.expression);
  },
};

const changeMessage = (message) => {
  messageOutEl.innerText = message;
};

const inputStart = () => {
  calculator.expression = prompt('Введите вычисляемое выражение', '');
  if (calculator.expression) {
    changeMessage(calculator.resultMessage);
  } else {
    changeMessage('Ввод отменен');
  }
};

inputStartBtn.addEventListener('click', () => inputStart());
