'use strict'

// console.log("Самооценка pt1:\n1. Вёрстка +10; \n2. При загрузке приложения на странице отображаются полученные от API изображения +10\n3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10\n4. Активный в данный момент интерактивный элемент выделяется стилем +10\n5. Кнопка Play/Pause +20\n6. Внизу табы переключающие жанр = дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n Итог: 70 баллов.");








const quoteBtn = document.querySelector('.btn'),
    quoteBackground = document.querySelector('.subheader');


/// qoutes 

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



///old code

// function cards() {
    // Используем классы для создание карточек меню

    // class MenuCard {
    //     constructor(src, alt, title, descr, price, parentSelector, ...classes) {
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.classes = classes;
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 60;
    //     }


        // render() {
        //     const element = document.createElement('div');

        //     if (this.classes.length === 0) {
        //         this.classes = "menu__item";
        //         element.classList.add(this.classes);
        //     } else {
        //         this.classes.forEach(className => element.classList.add(className));
        //     }

        //     element.innerHTML = `
        //         <img src=${this.src} alt=${this.alt}>
        //         <h3 class="menu__item-subtitle">${this.title}</h3>
        //         <div class="menu__item-descr">${this.descr}</div>
        //         <div class="menu__item-divider"></div>
        //         <div class="menu__item-price">
        //             <div class="menu__item-cost">Цена:</div>
        //             <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        //         </div>
        //     `;
        //     this.parent.append(element);
        // }
    // }

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({ img, altimg, title, descr, price }) => {
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    //     });

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container"
    // ).render();

// }



