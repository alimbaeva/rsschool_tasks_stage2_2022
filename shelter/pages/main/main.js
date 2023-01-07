
const burger = document.querySelector(".burger");
const blackModal = document.querySelector(".black__modal");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRigth = document.querySelector(".arrow-right");
const modalBlock = document.querySelector(".modal__block");
const petsBblockCards = document.querySelector(".pets__block-cards");
const nav = document.querySelector("nav");
const li = document.querySelectorAll(".header__nav-ul li");

const modalTextLiList = ['age', 'inoculations', 'diseases', 'parasites']
const modalTextLiListName = ['Age', 'Inoculations', 'Diseases', 'Parasites']

let booling768 = true;
let booling1280 = true;
let booling1279 = true;
let cardsList = [];
let previosCards = [];
let currentCards = [];
let nowcard = [];
let nextCards = [];


burger.addEventListener("click", (e) => {
    e.preventDefault()
    nav.classList.toggle("toggle");
    burger.classList.toggle('rotate');
    blackModal.classList.toggle("opacity")
    document.body.style.overflowY = 'hidden';
})

li.forEach((el) => {
    li[0].classList.add('activ')
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
    nav.classList.remove("toggle");
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
            cardSlides(1, dataCards)
            booling768 = false
        }
    } else if (window.screen.availWidth < 1280) {
        if (booling1280) {
            cardSlides(2, dataCards)
            booling1280 = false
        }
    } else if (window.screen.availWidth > 1279) {
        if (booling1279) {
            cardSlides(3, dataCards)
            booling1279 = false
        }
    }
}


function cardSlides(num, dataCards) {
    renderCard(num, dataCards, currentCards)

    arrowRigth.addEventListener("click", () => {
        previosCards = nextCards
        currentCards = []
        if (currentCards.length === 0 || currentCards.length < num) {

            let watchCard = true;
            let iddataCards = 0
            while (watchCard) {
                iddataCards = Math.floor(Math.random() * (dataCards.length - 1) + 0)
                if (nowcard.indexOf(iddataCards) === -1 && currentCards.indexOf(iddataCards) === -1 && nextCards.indexOf(iddataCards) === -1) {
                    currentCards.push(iddataCards)
                    currentCards.length === num ? watchCard = false : watchCard;

                }
            }
        }
        nextCards = currentCards
        currentCards = []
        renderCard(num, dataCards, nextCards)
    });
    arrowLeft.addEventListener("click", () => {
        if (previosCards.length === 0 || previosCards.length < num) {

            let watchCard = true;
            let iddataCards = 0
            while (watchCard) {
                iddataCards = Math.floor(Math.random() * (dataCards.length - 1) + 0)
                if (previosCards.indexOf(iddataCards) === -1 && currentCards.indexOf(iddataCards) === -1 && nextCards.indexOf(iddataCards) === -1) {
                    previosCards.push(iddataCards)
                    previosCards.length === num ? watchCard = false : watchCard;

                }
            }
        }
        nowcard = previosCards
        previosCards = []
        renderCard(num, dataCards, nowcard)
    });
}



function renderCard(num, dataCards, elements) {
    while (petsBblockCards.firstChild) {
        petsBblockCards.removeChild(petsBblockCards.firstChild);
    }
    if (elements.length === 0 || elements.length < num) {

        let watchCard = true;
        let iddataCards = 0
        while (watchCard) {
            iddataCards = Math.floor(Math.random() * (dataCards.length - 1) + 0)
            if (nowcard.indexOf(iddataCards) === -1 && currentCards.indexOf(iddataCards) === -1 && nextCards.indexOf(iddataCards) === -1) {
                elements.push(iddataCards)
                elements.length === num ? watchCard = false : watchCard;

            }
        }
    }
    for (let i = 0; i < elements.length; i++) {
        const petsCard = document.createElement('div');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const button = document.createElement('button');
        petsCard.setAttribute("class", 'pets__card');
        petsCard.setAttribute("id", `${dataCards[elements[i]].id}`);
        img.setAttribute('src', `${dataCards[elements[i]].img}`);
        img.setAttribute('alt', "foto");
        h3.innerHTML = `${dataCards[elements[i]].name}`;
        button.innerHTML = 'Learn more';
        petsCard.appendChild(img);
        petsCard.appendChild(h3);
        petsCard.appendChild(button);

        petsBblockCards.append(petsCard);
    }



    const petsCardModal = document.querySelectorAll(".pets__card")
    petsCardModal.forEach((card) => {
        card.addEventListener('click', (e) => {
            while (modalBlock.firstChild) {
                modalBlock.removeChild(modalBlock.firstChild);
            }
            console.log(e)
            console.log(card)
            blackModal.classList.toggle("opacity")
            document.body.style.overflowY = 'hidden';
            const idCard = card.getAttribute('id')
            console.log(idCard)
            console.log(dataCards[idCard - 1])
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
                }
            })
            modalButton.addEventListener('click', () => {
                console.log(1)
                while (modalBlock.firstChild) {
                    modalBlock.removeChild(modalBlock.firstChild);
                }
                blackModal.classList.toggle("opacity")
            })



        })

    })
}

console.log(window.screen.availHeight)
console.log(document.body.scrollTop)
console.log(window.pageYOffset)