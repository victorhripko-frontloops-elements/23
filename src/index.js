import './style.scss';

(() => {

  const getDataProp = date => {
    return {
      day: date.getDate(),
      month: date.toLocaleString('en', { month: 'short' }),
      firstDayOfWeek: date.getDate() - date.getDay() + 1, // +1 - start from Monday
      year: date.getFullYear()
    }
  };


  const root = document.querySelector('.week');
  const prevWeek = root.querySelector('.week__btn--prev');
  const nextWeek = root.querySelector('.week__btn--next');
  const weekWrap = root.querySelector('.week__wrap');

  const today = new Date();
  const todayProp = getDataProp(today);
  const currentDay = todayProp.day;
  const currentMonth = todayProp.month;
  const currentYear = todayProp.year;

  let arrOfDates = [];
  let week = 0;

  const setWeek = (date) => {
    const dt = date || today;
    const first = getDataProp(dt).firstDayOfWeek;

    arrOfDates = [];

    for ( let i = 0; i < 7; i++ ) {
      const nextDay = new Date(dt.setDate(first + i));

      arrOfDates.push(nextDay);
    };

    renderWeek();
  };

  const renderWeek = () => {
    weekWrap.innerHTML = '';

    arrOfDates.forEach(el => {
      const dt = getDataProp(el);
      const day = dt.day;
      const month = dt.month;
      const year = dt.year;

      const current = day === currentDay && month === currentMonth && year === currentYear;

      weekWrap.insertAdjacentHTML('beforeend', `<div class="week__item ${current ? 'week__item--current' : ''}">${day} ${month}</div>`);
    });
  };

  const getWeek = (number = 0) => {
    const dt = new Date();
    dt.setDate(dt.getDate() + number);

    return dt;
  };

  prevWeek.addEventListener('click', () => {
    week -= 7;
    setWeek(getWeek(week));
  });

  nextWeek.addEventListener('click', () => {
    week += 7;
    setWeek(getWeek(week));
  });

  setWeek();

})();
