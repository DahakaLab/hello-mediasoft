const messageOutEl = document.querySelector('h1');
const inputStartBtn = document.querySelector('button');

const calculator = {
  createResultMessage(expression) {
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
        console.log(e);
        return `Выражение \'${expression}\' некорректно`;
      }
    }
  },
  _checkErrors: {
    _validCharactersRegExp: /[^0-9\+\-\*\/\(\)\ \.]/,
    resultErrors(expression) {
      const errors = [];
      const resultValidCharacters = this._validCharacters(expression);
      if (resultValidCharacters) errors.push(resultValidCharacters);

      const resultCountBrackers = this._countBrackets(expression);
      if (resultCountBrackers) errors.push(resultCountBrackers);
      
      return errors;
    },
    _validCharacters(expression) {
      if (this._validCharactersRegExp.test(expression)) {
        return 'Используйте только числа и допустимые символы: (\'+\', \'-\', \'*\', \'/\', \' \', \'.\').';
      }
    },
    _countBrackets(expression) {
      const openBrackets = expression.match(/\(/g) ? expression.match(/\(/g).length : 0;
      const closeBrackets = expression.match(/\)/g) ? expression.match(/\)/g).length : 0;
      if (openBrackets !== closeBrackets) {
        return 'Количество открывающих и закрывающих скобок должно быть одинаковым.';
      }
    }
  },
  _clearingExpression(expression) {
    return expression.replace(/\s/g, '');
  },
  _calculate: {
    simplifiedExpression: [],
    resultsExpression: [],
    resultExpression(expression) {
      this.simplifiedExpression = this._openingBrackets(expression);
      this.resultsExpression = this._calculationExpression(this.simplifiedExpression);
      return this.resultsExpression[this.resultsExpression.length - 1];
    },
    _calculationOperation(expression) {
      // TODO: Написать алгоритм расчета операции
      return eval(expression);
    },
    _openingBrackets(expression, simplifiedExpressions = []) {
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
    _calculationExpression(simplifiedExpression) {
      const resultsSimplifiedExpression = [];
      simplifiedExpression.forEach((operation) => {
        const finalOperation = this._substitutionValue(resultsSimplifiedExpression, operation);
        resultsSimplifiedExpression.push(this._calculationOperation(finalOperation));
      });
      return resultsSimplifiedExpression;
    },
    _substitutionValue(resultsSimplifiedExpression, operation) {
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
