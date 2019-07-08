const messageOutEl = document.querySelector('h1'); // Поиск элемента в документе для вставки сообщения.
const inputStartBtn = document.querySelector('button'); // Поиск кнопки по клику которой открывается окно с полем для ввода выражения.

const calculator = { // объект калькулятора где описана вся логика проверок, вычислений выражения и подготовка финального сообщения.
  createResultMessage(expression) { // Публичный метод который возвращает финальное сообщение.
    const errors = this._checkErrors.resultErrors(expression);
    if (errors.length) {
      return errors.join('\n');
    } else {
      try {
        const resultExpression = this._calculate.resultExpression(this._clearingExpression(expression));
        if (resultExpression !== undefined) {
          let solutionMessage = 'Решение:\n';
          const resultMessage = `Результат:\n${expression} = ${resultExpression}`;
          const resultsExpression = this._calculate.resultsExpression;
          this._calculate.simplifiedExpression.forEach((expression, index) => {
            solutionMessage = `${solutionMessage}x${index}: ${expression} = ${resultsExpression[index]};\n`;
          });
          return `${solutionMessage}\n${resultMessage}`;
        } else {
          return `Выражение \'${expression}\' некорректно`;
        }
      } catch(e) {
        return `Выражение \'${expression}\' некорректно`;
      }
    }
  },
  _checkErrors: { // Приватная абстракция калькулятора, где описана все логика проверок корректности выражения. Возвращает массив ошибок. 
    _validCharactersRegExp: /[^0-9\+\-\*\/\(\)\ \.]/, // Приватное свойство проверки, где описаны допустимые символы.
    resultErrors(expression) { // Публичный метод проверки, возврщает массив ошибок.
      const errors = [];
      const resultValidCharacters = this._validCharacters(expression);
      if (resultValidCharacters) errors.push(resultValidCharacters);

      const resultCountBrackers = this._countBrackets(expression);
      if (resultCountBrackers) errors.push(resultCountBrackers);
      
      return errors;
    },
    _validCharacters(expression) { // Приватный метод проверки, возвращает сообщение с ошибкой если выражение содержит недопустимые символы
      if (this._validCharactersRegExp.test(expression)) {
        return 'Используйте только числа и допустимые символы: (\'+\', \'-\', \'*\', \'/\', \' \', \'.\').';
      }
    },
    _countBrackets(expression) { // Приватный метод проверки, возвращает сообщение с ошибкой если выражение имеет разное количество открывающих и закрывающих скобок.
      const openBrackets = expression.match(/\(/g) ? expression.match(/\(/g).length : 0;
      const closeBrackets = expression.match(/\)/g) ? expression.match(/\)/g).length : 0;
      if (openBrackets !== closeBrackets) {
        return 'Количество открывающих и закрывающих скобок должно быть одинаковым.';
      }
    }
  },
  _clearingExpression(expression) { // Приватный метод калькулятора, возвращает выражение без пробелов.
    return expression.replace(/\s/g, '');
  },
  _calculate: { // Приватная абстракция калькулятора, где описана вся логика вычисления вычисления.
    simplifiedExpression: [], // Публичное свойство расчета, куда записыватся упрощенное выражение после раскрытия скобок.
    resultsExpression: [], // Публичное свойство расчета, куда записываются результаты каждой операции выражения.
    resultExpression(expression) { // Публичный метод расчета, который возвращает расчет и производит запись в свойства simplifiedExpression и resultsExpression.
      this.simplifiedExpression = this._openingBrackets(expression);
      this.resultsExpression = this._calculationExpression(this.simplifiedExpression);
      return this.resultsExpression[this.resultsExpression.length - 1];
    },
    _calculationOperation(expression) { // Приватный метод расчета, которое возвращает результат принятого выражения.
      return eval(expression);
    },
    _openingBrackets(expression, simplifiedExpressions = []) { // Приватный метод расчета. Рекурсивное раскрытие скобок, котрое возвращает массив пошаговых операций если скобок не осталось.
      const indexTo = expression.indexOf(')');
      if(~indexTo) {
        let indexFrom = expression.indexOf('(');
        while (true) {
          const currentIndexFrom = expression.indexOf('(', (indexFrom + 1));
          if (~currentIndexFrom && currentIndexFrom < indexTo) {
            indexFrom = currentIndexFrom;
          } else {
            break;
          }
        }
        const currentExpression = `${expression.slice(0, indexFrom)}x${simplifiedExpressions.length}${expression.slice(indexTo + 1)}`;
        simplifiedExpressions.push(expression.slice(indexFrom + 1, indexTo));
        return this._openingBrackets(currentExpression, simplifiedExpressions);
      } else {
        simplifiedExpressions.push(expression);
        return simplifiedExpressions;
      }
    },
    _calculationExpression(simplifiedExpression) { // Приватный метод расчета, возвращает массив результатов пошаговых операций.
      const resultsSimplifiedExpression = [];
      simplifiedExpression.forEach((operation) => {
        const finalOperation = this._substitutionValue(resultsSimplifiedExpression, operation);
        resultsSimplifiedExpression.push(this._calculationOperation(finalOperation));
      });
      return resultsSimplifiedExpression;
    },
    _substitutionValue(resultsSimplifiedExpression, operation) { // Приватный метод расчета. Рекурсивная подстановка значений вместо переменных. Возвращает конечное выражение.
      const entryPoint = operation.indexOf('x');
      if (~entryPoint) {
        const targetOperationIndex = parseInt(operation.charAt(entryPoint + 1), 10);
        const currentOperation = `${operation.slice(0, entryPoint)}${resultsSimplifiedExpression[targetOperationIndex]}${operation.slice(entryPoint+2)}`;
        return this._substitutionValue(resultsSimplifiedExpression, currentOperation);
      } else {
        return operation;
      }
    },
  },
};

const changeMessage = (message) => { // Функция вставки текста в элемент документа.
  messageOutEl.innerText = message;
};

const inputStart = () => { // Функция получения значения и запуск метода получения финального сообщения после расчета выражения в калькуляторе.
  const expression = prompt('Введите вычисляемое выражение', '');
  if (expression) {
    changeMessage(calculator.createResultMessage(expression));
  } else {
    changeMessage('Ввод отменен');
  }
};

inputStartBtn.addEventListener('click', () => inputStart()); // По клику на кнопку запусе функции получния значения.
