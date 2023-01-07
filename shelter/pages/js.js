
// console.log(window.screen.availWidth())
// window.addEventListener('resize', () => {
//     console.log(window.screen.availWidth)
// })


const burger = document.querySelector(".burger");
const blackModal = document.querySelector(".black__modal");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRigth = document.querySelector(".arrow-right");
const petsBblockCards = document.querySelector(".pets__block-cards");
const nav = document.querySelector("nav");
const li = document.querySelectorAll(".header__nav-ul li");


let booling768 = true;
let booling1280 = true;
let booling1279 = true;
let cardsList = [];
let previosCards = [];
let currentCards = [];
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


// arrowLeft.addEventListener("click", slide);
// arrowRigth.addEventListener("click", slide);

function slide() {
    console.log(111)
}

async function cart() {
    const res = await fetch('../data/data.js')
    const dataCards = res.json();
    return dataCards

}


cart().then(dataCards => {
    window.addEventListener("resize", () => {
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
    })
})


function cardSlides(num, dataCards) {
    previosCards = currentCards;
    currentCards = []
    while (petsBblockCards.firstChild) {
        petsBblockCards.removeChild(petsBblockCards.firstChild);
    }
    let watchCard = true;
    let iddataCards = 0
    for (let i = 0; i < num; i++) {
        while (currentCards.length !== num) {
            while (watchCard) {
                iddataCards = Math.floor(Math.random() * (dataCards.length - 1) + 1)
                if (currentCards.includes(iddataCards) === -1 || previosCards.includes(iddataCards) === -1) {
                    currentCards.push(iddataCards)
                    currentCards.length === num ? watchCard = false : watchCard;

                }
            }
        }
    }
    for (let i = 0; i < currentCards.length; i++) {
        const petsCard = document.createElement('div');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const button = document.createElement('button');
        petsCard.setAttribute("class", 'pets__card');
        img.setAttribute('src', `${dataCards[currentCards[i]].img}`);
        img.setAttribute('alt', "foto");
        h3.innerHTML = `${dataCards[currentCards[i]].name}`;
        button.innerHTML = 'Learn more';
        petsCard.appendChild(img);
        petsCard.appendChild(h3);
        petsCard.appendChild(button);

        petsBblockCards.append(petsCard);

    }

    arrowRigth.addEventListener("click", () => {
        previosCards = currentCards;
        currentCards = []
        while (petsBblockCards.firstChild) {
            petsBblockCards.removeChild(petsBblockCards.firstChild);
        }

        if (nextCards.length === 0) {

            let watchCard = true;
            let iddataCards = 0
            for (let i = 0; i < num; i++) {
                while (watchCard) {
                    iddataCards = Math.floor(Math.random() * (dataCards.length - 1) + 1)
                    if (currentCards.indexOf(iddataCards) === -1 && previosCards.indexOf(iddataCards) === -1) {
                        currentCards.push(iddataCards)
                        currentCards.length === num ? watchCard = false : watchCard;

                    }
                }
            }
            for (let i = 0; i < currentCards.length; i++) {
                const petsCard = document.createElement('div');
                const img = document.createElement('img');
                const h3 = document.createElement('h3');
                const button = document.createElement('button');
                petsCard.setAttribute("class", 'pets__card');
                img.setAttribute('src', `${dataCards[currentCards[i]].img}`);
                img.setAttribute('alt', "foto");
                h3.innerHTML = `${dataCards[currentCards[i]].name}`;
                button.innerHTML = 'Learn more';
                petsCard.appendChild(img);
                petsCard.appendChild(h3);
                petsCard.appendChild(button);

                petsBblockCards.append(petsCard);
            }
        } else {
            for (let i = 0; i < nextCards.length; i++) {
                const petsCard = document.createElement('div');
                const img = document.createElement('img');
                const h3 = document.createElement('h3');
                const button = document.createElement('button');
                petsCard.setAttribute("class", 'pets__card');
                img.setAttribute('src', `${dataCards[nextCards[i]].img}`);
                img.setAttribute('alt', "foto");
                h3.innerHTML = `${dataCards[nextCards[i]].name}`;
                button.innerHTML = 'Learn more';
                petsCard.appendChild(img);
                petsCard.appendChild(h3);
                petsCard.appendChild(button);

                petsBblockCards.append(petsCard);
            }
            nextCards = [];
        }


    });



    arrowLeft.addEventListener("click", () => {
        while (petsBblockCards.firstChild) {
            petsBblockCards.removeChild(petsBblockCards.firstChild);
        }
        if (previosCards.length === 0) {

            let watchCard = true;
            let iddataCards = 0
            for (let i = 0; i < num; i++) {
                while (watchCard) {
                    iddataCards = Math.floor(Math.random() * (dataCards.length - 1) + 1)
                    if (currentCards.indexOf(iddataCards) === -1 && previosCards.indexOf(iddataCards) === -1) {
                        previosCards.push(iddataCards)
                        previosCards.length === num ? watchCard = false : watchCard;

                    }
                }
            }
        }
        for (let i = 0; i < previosCards.length; i++) {
            const petsCard = document.createElement('div');
            const img = document.createElement('img');
            const h3 = document.createElement('h3');
            const button = document.createElement('button');
            petsCard.setAttribute("class", 'pets__card');
            img.setAttribute('src', `${dataCards[previosCards[i]].img}`);
            img.setAttribute('alt', "foto");
            h3.innerHTML = `${dataCards[previosCards[i]].name}`;
            button.innerHTML = 'Learn more';
            petsCard.appendChild(img);
            petsCard.appendChild(h3);
            petsCard.appendChild(button);

            petsBblockCards.append(petsCard);
        }
        nextCards = currentCards;
        currentCards = previosCards
        previosCards = [];
    });
}
