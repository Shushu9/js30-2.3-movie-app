'use strict'
// console.log("Самооценка pt4 цитаты:\n1. Вёрстка +10; \n2. При загрузке страницы приложения отображается рандомная цитата +10\n3. При перезагрузке страницы цитата обновляется (заменяется на другую) +10\n4. Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +10\n5. Смена цитаты сопровождается любым другим эффектом, например,  меняется фоновый цвет страницы +10\n Итог: 50 баллов.");
// console.log("Самооценка pt6 фильмы:\n1. Вёрстка +10; \n2. При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10\n3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10\n4. Поиск +30\n5. Доп функционал: если Api не предоставляет данные по запросу поиска, то пользователь видит ошибку. Если кликнуть на карточку фильма, то произойдет переход на страницу фильма на imdb +10\n Итог: 60 баллов.");




/// qoutes 

const quoteBtn = document.querySelector('.btn'),
    quoteBackground = document.querySelector('.subheader');


async function getQuote() {
    const url = 'https://type.fit/api/quotes';
    const res = await fetch(url);
    const data = await res.json();
    let quote;
    do {
        quote = data[Math.round(Math.random() * data.length)];
    } while (quote.author === null);

    renderQuote(quote);
}


function renderQuote(item) {

    const quoteContainer = document.querySelector('.quote__wrap');
    const element = document.createElement('div');

    element.innerHTML = `
    <p class="quote__text">"${item.text}"</p>
    <div class="quote__author">${item.author}</div>
    `;

    quoteContainer.innerHTML = '';
    quoteContainer.append(element);
}

getQuote();


quoteBtn.addEventListener("click", getQuote);

function toggleBg() {
    quoteBackground.classList.toggle("bg__change");
}

quoteBtn.addEventListener("click", toggleBg);




////Cards 


const inputField = document.querySelector('#input'),
    inputClose = document.querySelector('#close'),
    inputSearch = document.querySelector('#search');
// prevBtn = document.querySelector('#prev'),
// nextBtn = document.querySelector('#next');

let searchWord = "game",
    pageIndex = "1";

inputClose.addEventListener('click', () => {
    inputField.value = '';
})

function searchMovies() {
    let searchText = inputField.value,
        re = / /gi;
    searchText = searchText.replace(re, '_');

    getCards(searchText, '1');
    // document.querySelector('.wrapper').innerHTML = '';
}


inputSearch.addEventListener('click', searchMovies);


document.addEventListener('keydown', function (e) {
    if (e.code === "Enter" && inputField.value !== '') {
        searchMovies();
    }
});



async function getCards(word, page) {
    document.querySelector('.wrapper').innerHTML = '';
    const url = `https://www.omdbapi.com/?s=${word}&apikey=841a117d&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True") {
        renderCards(data.Search)
    } else {
        alert('Error: no any films with that name')
    }
}

document.querySelector('.wrapper').innerHTML = '';
getCards(searchWord, pageIndex);


function renderCards(item) {

    const cardsContainer = document.querySelector('.wrapper');
    // cardsContainer.innerHTML = '';

    item.forEach(elem => {
        const card = document.createElement('a');
        card.classList.add('movie');
        card.href = `https://www.imdb.com/title/${elem.imdbID}/`;

        card.innerHTML = `
    <div class="movie__img">
        <img src="${elem.Poster}" alt="poster">
    </div>
    <div class="movie__info">
        <div class="movie__name">"${elem.Title}"</div>
        <div class="movie__year">${elem.Year}</div>
    </div>
    `;

        cardsContainer.append(card);
    })

}






