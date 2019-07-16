const messageOutEl = document.querySelector('h1'); // Поиск элемента в документе для вставки сообщения.
const inputStartBtn = document.querySelector('button'); // Поиск кнопки по клику которой открывается окно с полем для ввода выражения.

const changeMessage = (message) => { // Функция вставки текста в элемент документа.
  messageOutEl.innerText = message;
};

class AddMessage { // Класс для добавления елементов. 
  constructor(targetEl = document.body) {
    this.targetEl = targetEl;
  }

  heading(number = 2, message = '') { // Метод добавления заголовков
    const correctNumberHeading = (number && number > 0 && number <= 6);
    const heading = correctNumberHeading ? document.createElement(`h${number}`) : document.createElement('h2');
    heading.innerHTML = correctNumberHeading ? message : 'Неккоректный номер заголовка';
    this.targetEl.appendChild(heading);    
  }
}

class addNode {
  static option(select, value = '') {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = value;
    select.appendChild(option);
  }
}

class FilmsInfo {
  constructor(filmsTarget = [], filmsInfoEl = document.body) {
    this._filmsTarget = filmsTarget;
    this._addingMessage = new AddMessage(filmsInfoEl);
    this._state = this._filmsTarget.reduce((state, film) => {
      if (film.title) {
        state.films[film.title] = FilmsInfo._deleteKeys(film, 'title');
        this._addingMessage.heading(2, `Фильм: ${film.title}`);
      };
      if (film.director && film.director.name) {
        state.directors[film.director.name] = FilmsInfo._deleteKeys(film.director, 'name');
        this._addingMessage.heading(3, `Режжисер: ${film.title}`);
      }
      if (film.actors) {
        const currentActorsObj = FilmsInfo._conversionArrToObject(film.actors);
        Object.assign(state.actors, currentActorsObj);
        this._addingMessage.heading(5, `Актеры: ${Object.keys(currentActorsObj).join(', ')}`);
      }
      this._addingMessage.heading(2, '***');
      return state;
    }, {
      actors: {},
      directors: {},
      films: {},
    });
  }

  get directors() {
    return this._state.directors;
  }

  get state() {
    return this._state;
  }

  static _conversionArrToObject(arr) {
    const currentObj = {};
    arr.forEach((obj) => {
      const key = obj.name || obj.title;
      if (key) {
        currentObj[key] = Object.assign({}, FilmsInfo._deleteKeys(obj, 'name', 'title'));
      }
    });
    return currentObj;
  }

  static _deleteKeys(obj, ...keys) {
    const currentObj = Object.assign({}, obj);
    keys.forEach((key) => {
      delete currentObj[key];
    })
    return currentObj;
  }
}

const initSelects = (directors = {}, state) => {
  const selectDirectorsEl = document.querySelector('[name = \'directors\']');
  const selectOscarsCountEl = document.querySelector('[name = \'oscarCount\']');
  const currentOscarsCountsVariations = [];
  Object.keys(directors).forEach((director) => {
    const currentOscarsCounts = +directors[director].oscarsCount || 0;
    addNode.option(selectDirectorsEl, director);
    if (!~currentOscarsCountsVariations.indexOf(currentOscarsCounts)) {
      addNode.option(selectOscarsCountEl, directors[director].oscarsCount);
      currentOscarsCountsVariations.push(currentOscarsCounts);
    }
  });
  if (selectDirectorsEl.value && selectOscarsCountEl.value && state) {
    averageAgeActors(state, selectDirectorsEl.value, selectOscarsCountEl.value);
    Array.of(selectDirectorsEl, selectOscarsCountEl).forEach((select) => {
      select.addEventListener('change', () => averageAgeActors(state, selectDirectorsEl.value, selectOscarsCountEl.value));
    });
  }
}

const averageAgeActors = (state, directorName = '', directorOscarsCount = 0) => {
  const actorsAverageAgeEl = document.querySelector('.actors-average-age');
  const { directors, actors, films } = state;
  const validDirectors = [];
  const validActors = [];
  Object.keys(directors).forEach((currentDirectorName) => {
    if (+directors[currentDirectorName].oscarsCount === +directorOscarsCount && currentDirectorName === directorName) {
      validDirectors.push(currentDirectorName);
    }
  });
  if (validDirectors.length) {
    Object.keys(films).forEach((filmTitle) => {
      if (films[filmTitle].director && films[filmTitle].actors && ~validDirectors.indexOf(films[filmTitle].director.name)) {
        films[filmTitle].actors.forEach((currentActor) => {
          if (currentActor.name) validActors.push(currentActor.name);
        })
      }
    });
    const averageAgeValidActors = validActors.reduce((maxAge, currentValidActiors) => {
      const currentValidActiorsAge = actors[currentValidActiors].age || 0;
      return maxAge + currentValidActiorsAge;
    }, 0) / validActors.length;

    console.log(`Средний возраст актеров: ${+averageAgeValidActors.toFixed(2)}`);
    actorsAverageAgeEl.innerHTML = `Средний возраст актеров: ${+averageAgeValidActors.toFixed(2)}`;
  } else {
    actorsAverageAgeEl.innerHTML = 'Нет такого режиссера с таким количеством оскара';
  }
}

const loadSuccess = (filmsTarget) => {
  const filmsInfoEl = document.querySelector('.films-info'); // Поиск елемента для вставки информации по фильмам.
  const filmInputsEl = document.querySelector('.film-inputs');
  const filmsInfo = new FilmsInfo(filmsTarget, filmsInfoEl);
  console.log(filmsTarget);
  changeMessage('Данные загружены.\n\n***');
  inputStartBtn.style.display = 'none';
  initSelects(filmsInfo.directors, filmsInfo.state);
  filmInputsEl.style.display = 'block';
};

// inputStartBtn.addEventListener('click', () => inputStart()); // По клику на кнопку запусе функции получния значения.
inputStartBtn.addEventListener('click', () => {
  changeMessage('Обновление данных...');
  fetch('./films.json')
    .then(response => response.json())
    .then(loadSuccess)
    .catch(changeMessage);
});
