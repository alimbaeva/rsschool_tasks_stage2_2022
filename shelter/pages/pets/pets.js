const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");
const li = document.querySelectorAll(".header__nav-ul li");
const blackModal = document.querySelector(".black__modal");
const petsСards = document.querySelector(".pets__cards");
const modalBlock = document.querySelector(".modal__block");
const firstPage = document.querySelector("#first-page");
const prevPage = document.querySelector("#prev-page");
const nextPage = document.querySelector("#next-page");
const lastPage = document.querySelector("#last-page");
const numBtn = document.querySelector(".num-btn")


let booling768 = true;
let booling1280 = true;
let booling1279 = true;
let currentCards = [];
let indexLastOfCard = 0
let indexOfFierstCard = 0
let currentCard = 1;
let countPushNext = 0;
let countPushPrev = 0;


const modalTextLiListName = ['Age', 'Inoculations', 'Diseases', 'Parasites']



burger.addEventListener("click", (e) => {
    e.preventDefault()
    nav.classList.toggle("toggle");
    burger.classList.toggle('rotate');
    blackModal.classList.toggle("opacity")
    document.body.style.overflowY = 'hidden';
})

li.forEach((el) => {
    li[1].classList.add('activ')
    el.addEventListener("click", () => {
        const widthWindow = window.screen.availWidth;
        if (widthWindow < 768) {
            blackModal.classList.toggle("opacity")
            nav.classList.toggle("toggle");
            burger.classList.toggle("rotate");
            li.forEach((el2) => el2.classList.remove("activ"));
            el.classList.add("activ");
            document.body.style.overflowY = '';
        } else {
            li.forEach((el2) => el2.classList.remove("activ"));
            el.classList.add("activ");
        }
    })
})
blackModal.addEventListener("click", () => {
    nav.classList.toggle("toggle");
    burger.classList.remove('rotate');
    blackModal.classList.remove("opacity");
    document.body.style.overflowY = '';
})

async function cart() {
    const res = await fetch('../data/data.js')
    const dataCards = res.json();
    return dataCards

}
cart().then(dataCards => {
    windowAddEventListenerChange(dataCards)
    window.addEventListener("resize", () => {
        windowAddEventListenerChange(dataCards)
    })
})

function windowAddEventListenerChange(dataCards) {
    if (window.screen.availWidth < 768) {
        if (booling768) {
            countPushNext = Math.floor(dataCards.length / 3)
            booling768 = false
            booling1280 = true
            booling1279 = true
            cardSlides(3, dataCards)
            console.log('768', countPushNext)
        }
    } else if (window.screen.availWidth < 1280) {
        if (booling1280) {
            countPushNext = Math.floor(dataCards.length / 6)
            booling1280 = false
            booling1279 = true
            booling768 = true
            console.log('1280', countPushNext)
            cardSlides(6, dataCards)
        }
    } else if (window.screen.availWidth > 1279) {
        if (booling1279) {
            countPushNext = Math.floor(dataCards.length / 8)
            booling1279 = false
            booling768 = true
            booling1280 = true
            console.log('1279', countPushNext)
            cardSlides(8, dataCards)
        }
    }
}

function cardSlides(num, dataCards) {
    if (currentCard > countPushNext || currentCard === 0) {
        currentCards = dataCards.slice(0, num);
        numBtn.textContent = 1;
        currentCard = 1;
        changeBtnsPageP(currentCards, dataCards)
    }
    console.log(currentCard)
    indexLastOfCard = currentCard * num;
    indexOfFierstCard = indexLastOfCard - num;
    currentCards = dataCards.slice(indexOfFierstCard, indexLastOfCard);

    renderCard(currentCards, dataCards)
    nextPage.addEventListener('click', () => {
        currentCard++
        indexLastOfCard = currentCard * num;
        indexOfFierstCard = indexLastOfCard - num;
        numBtn.textContent = currentCard
        currentCards = dataCards.slice(indexOfFierstCard, indexLastOfCard);
        firstPage.classList.add('activ-brn')
        prevPage.classList.add('activ-brn')
        firstPage.classList.remove('disabled')
        prevPage.classList.remove('disabled')
        document.querySelector('#first-page svg').classList.add('activ-brnArr')
        document.querySelector('#prev-page svg').classList.add('activ-brnArr')

        if (currentCard >= countPushNext) {
            currentCards = dataCards.slice(dataCards.length - num, dataCards.length);
            changeBtnsPageN(currentCards, dataCards)
        }
        renderCard(currentCards, dataCards)
    })

    lastPage.addEventListener("click", () => {
        currentCards = dataCards.slice(dataCards.length - num, dataCards.length);
        numBtn.textContent = countPushNext
        currentCard = countPushNext;
        changeBtnsPageN(currentCards, dataCards)
    })

    prevPage.addEventListener('click', () => {
        if (currentCard > countPushNext || currentCard === 0 || currentCard === 1) {
            currentCards = dataCards.slice(0, num);
            numBtn.textContent = 1;
            currentCard = 1;
            changeBtnsPageP(currentCards, dataCards)
        }
        currentCard--;
        numBtn.textContent = currentCard
        indexLastOfCard = currentCard * num;
        indexOfFierstCard = indexLastOfCard - num;
        currentCards = dataCards.slice(indexOfFierstCard, indexLastOfCard);

        nextPage.removeAttribute('disabled');
        lastPage.removeAttribute('disabled');
        nextPage.classList.remove('disabled');
        lastPage.classList.remove('disabled');
        nextPage.classList.add('activ-brn')
        lastPage.classList.add('activ-brn')
        document.querySelector('#next-page svg').classList.remove('disabledsvg')
        document.querySelector('#last-page svg').classList.remove('disabledsvg')


        renderCard(currentCards, dataCards)
    })

    firstPage.addEventListener('click', () => {
        currentCards = dataCards.slice(0, num);
        numBtn.textContent = 1;
        currentCard = 1
        changeBtnsPageP(currentCards, dataCards)

    })
}


function renderCard(currentCards, dataCards) {
    while (petsСards.firstChild) {
        petsСards.removeChild(petsСards.firstChild);
    }




    for (let i = 0; i < currentCards.length; i++) {
        const petsCard = document.createElement('div');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const button = document.createElement('button');
        petsCard.setAttribute("class", 'pets__card');
        petsCard.setAttribute("id", `${currentCards[i].id}`);
        img.setAttribute('src', `${currentCards[i].img}`);
        img.setAttribute('alt', "foto");
        h3.innerHTML = `${currentCards[i].name}`;
        button.innerHTML = 'Learn more';
        petsCard.appendChild(img);
        petsCard.appendChild(h3);
        petsCard.appendChild(button);

        petsСards.append(petsCard);
    }



    const petsCardModal = document.querySelectorAll(".pets__card")
    petsCardModal.forEach((card) => {
        card.addEventListener('click', (e) => {
            while (modalBlock.firstChild) {
                modalBlock.removeChild(modalBlock.firstChild);
            }
            blackModal.classList.toggle("opacity")
            document.body.style.overflowY = 'hidden';
            document.querySelector('header').classList.add('zIndex')
            const idCard = card.getAttribute('id')
            const modalButton = document.createElement('button');
            const modalDivImg = document.createElement('div');
            const modalImg = document.createElement('img');
            const modalDivText = document.createElement('div');
            const modalTextH3 = document.createElement('h3');
            const modalTextH4 = document.createElement('h4');
            const modalTextP = document.createElement('p');
            const modalTextUl = document.createElement('ul');

            modalButton.textContent = 'X';
            modalDivImg.setAttribute("class", "modal__img");
            modalImg.setAttribute("src", `${dataCards[idCard - 1].img}`)
            modalImg.setAttribute("alt", `foto`)
            modalDivImg.appendChild(modalImg)
            modalDivText.setAttribute("class", "modal__text")
            modalTextH3.innerHTML = `${dataCards[idCard - 1].name}`
            modalTextH4.innerHTML = `${dataCards[idCard - 1].breed}`
            modalTextP.innerHTML = `${dataCards[idCard - 1].description}`

            const modalTextLi = document.createElement('li')
            const modalTextLiSpan = document.createElement("span")
            const modalTextLiP = document.createElement('p')
            modalTextLiSpan.innerHTML = `${modalTextLiListName[0]}:`
            modalTextLiP.innerHTML = dataCards[idCard - 1].age
            modalTextLi.appendChild(modalTextLiSpan)
            modalTextLi.appendChild(modalTextLiP)
            modalTextUl.appendChild(modalTextLi)

            const modalTextLi2 = document.createElement('li')
            const modalTextLiSpan2 = document.createElement("span")
            const modalTextLiP2 = document.createElement('p')
            modalTextLiSpan2.innerHTML = `${modalTextLiListName[1]}:`
            modalTextLiP2.innerHTML = dataCards[idCard - 1].inoculations
            modalTextLi2.appendChild(modalTextLiSpan2)
            modalTextLi2.appendChild(modalTextLiP2)
            modalTextUl.appendChild(modalTextLi2)

            const modalTextLi3 = document.createElement('li')
            const modalTextLiSpan3 = document.createElement("span")
            const modalTextLiP3 = document.createElement('p')
            modalTextLiSpan3.innerHTML = `${modalTextLiListName[2]}:`
            modalTextLiP3.innerHTML = dataCards[idCard - 1].diseases
            modalTextLi3.appendChild(modalTextLiSpan3)
            modalTextLi3.appendChild(modalTextLiP3)
            modalTextUl.appendChild(modalTextLi3)

            const modalTextLi4 = document.createElement('li')
            const modalTextLiSpan4 = document.createElement("span")
            const modalTextLiP4 = document.createElement('p')
            modalTextLiSpan4.innerHTML = `${modalTextLiListName[3]}:`
            modalTextLiP4.innerHTML = dataCards[idCard - 1].parasites
            modalTextLi4.appendChild(modalTextLiSpan4)
            modalTextLi4.appendChild(modalTextLiP4)
            modalTextUl.appendChild(modalTextLi4)

            modalDivText.appendChild(modalTextH3)
            modalDivText.appendChild(modalTextH4)
            modalDivText.appendChild(modalTextP)
            modalDivText.appendChild(modalTextUl)

            modalBlock.appendChild(modalButton)
            modalBlock.appendChild(modalDivImg)
            modalBlock.appendChild(modalDivText)
            modalBlock.style.top = `${window.pageYOffset + 200}px`;

            blackModal.addEventListener('click', () => {
                while (modalBlock.firstChild) {
                    modalBlock.removeChild(modalBlock.firstChild);
                    document.querySelector('header').classList.remove('zIndex')
                }
            })
            modalButton.addEventListener('click', () => {
                while (modalBlock.firstChild) {
                    modalBlock.removeChild(modalBlock.firstChild);
                    document.querySelector('header').classList.remove('zIndex')
                }
                blackModal.classList.toggle("opacity")
            })



        })

    })
}

function changeBtnsPageN(currentCards, dataCards) {
    nextPage.setAttribute('disabled', false);
    lastPage.setAttribute('disabled', false);
    nextPage.setAttribute('class', 'disabled');
    lastPage.setAttribute('class', 'disabled');
    prevPage.removeAttribute('disabled');
    firstPage.removeAttribute('disabled');
    firstPage.classList.add('activ-brn')
    prevPage.classList.add('activ-brn')
    firstPage.classList.remove('disabled')
    prevPage.classList.remove('disabled')
    document.querySelector('#next-page svg').classList.add('disabledsvg')
    document.querySelector('#last-page svg').classList.add('disabledsvg')
    document.querySelector('#first-page svg').classList.add('activ-brnArr')
    document.querySelector('#prev-page svg').classList.add('activ-brnArr')
    renderCard(currentCards, dataCards)

}

function changeBtnsPageP(currentCards, dataCards) {

    nextPage.removeAttribute('disabled');
    lastPage.removeAttribute('disabled');
    prevPage.setAttribute('disabled', false);
    firstPage.setAttribute('disabled', false);

    firstPage.classList.remove('activ-brn')
    prevPage.classList.remove('activ-brn')
    nextPage.classList.add('activ-brn')
    lastPage.classList.add('activ-brn')
    nextPage.classList.remove('disabled');
    lastPage.classList.remove('disabled');
    firstPage.classList.add('disabled')
    prevPage.classList.add('disabled')
    document.querySelector('#first-page svg').classList.remove('activ-brnArr')
    document.querySelector('#prev-page svg').classList.remove('activ-brnArr')
    document.querySelector('#next-page svg').classList.remove('disabledsvg')
    document.querySelector('#last-page svg').classList.remove('disabledsvg')
    document.querySelector('#next-page svg').classList.add('activ-brnArr')
    document.querySelector('#last-page svg').classList.add('activ-brnArr')

    renderCard(currentCards, dataCards);
}
