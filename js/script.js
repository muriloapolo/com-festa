document.addEventListener('DOMContentLoaded', function (event) {
    const menuHorizontal = document.querySelector('.navegacao-menu');
    const openMenu = document.querySelector(".btn-responsivo-open");



    const button = {
        openAndClose() {
            openMenu.addEventListener('click', () => {
                menuHorizontal.classList.toggle('active-menu-resposive');
                openMenu.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                if (!menuHorizontal.classList.contains('active-menu-resposive')) {
                    openMenu.innerHTML = '<i class="fa-solid fa-bars"></i>'
                }
            })
        },
        removeOnSize() {
            window.onresize = function () {
                if (menuHorizontal.classList.contains('active-menu-resposive') ? menuHorizontal.classList.remove('active-menu-resposive') : openMenu.innerHTML = '<i class="fa-solid fa-bars"></i>');
            }
        },
        removeOnClickPage() {
            const documento = document.querySelector('.container');

            documento.addEventListener('click', () => {

                if (menuHorizontal.classList.contains('active-menu-resposive')) {
                    menuHorizontal.classList.remove('active-menu-resposive');
                    openMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            })
        },
        closeMenuOnClick() {
            const linksOnMenu = document.querySelectorAll('.link-menu-a')
            linksOnMenu.forEach(link => {
                link.addEventListener('click', function () {
                    linksOnMenu.forEach(btnLink => btnLink.classList.remove('active-link-menu-a'));
                    this.classList.add('active-link-menu-a');
                    menuHorizontal.classList.remove('active-menu-resposive');
                    openMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
                });

            });

        }
    }
    button.openAndClose()
    button.removeOnSize()
    button.removeOnClickPage()
    button.closeMenuOnClick()


}
)



// GALERIA #########################################
//Array de itens para paginação
//Para adicionar mais itens à lista, crie mais um objeto para preencher a lista
const itensLoja = [{
    titulo: "Nome do Item",
    imagem: "../assets/gallery/1.jpg",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, vel!"
},
{
    titulo: "Nome do Item",
    imagem: "../assets/gallery/2.jpg",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, vel!"
},
{
    titulo: "Nome do Item",
    imagem: "../assets/gallery/3.jpg",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, vel!"
},
{
    titulo: "Nome do Item",
    imagem: "../assets/gallery/4.jpg",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, vel!"
},
{
    titulo: "Nome do Item",
    imagem: "../assets/gallery/5.jpg",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, vel!"
},
{
    titulo: "Nome do Item",
    imagem: "../assets/gallery/6.jpg",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, vel!"
},
{
    titulo: "Nome do Item",
    imagem: "../assets/gallery/7.jpg",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, vel!"
},
{
    titulo: "Nome do Item",
    imagem: "../assets/gallery/8.jpg",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, vel!"
},



]
const data = itensLoja.map(((item) => `<h3>${item.titulo}</h3> <img class="imgList" src="${item.imagem}" alt=""> <div class="descricaoItem"> <p>${item.descricao}</p> </div>`));




/* 
    Criar o banco de dados com os mesmos campos poupará trabalho desnecessário.
    A função 'populate list faz o trabalho semelhante ao fetch()/resolve/reject etc.
*/
//Criar lista na página //DOM

//function populateList() {
/* MAP */
//Gera a lista de itens do array principal e os imprime na página para gerar a lista de produtos
//const data = itensLoja.map(((item) => `<div class="item"> <h2>${item.titulo}</h2> <img class="imgList" src="${item.imagem}" alt=""> <p class="descricaoItem">${item.descricao}</p></div>`));

//Captura as divs necessárias para inserir na página
//const list = document.querySelector('#galeria .list');
//.join("") Apenas para corrigir possíveis erros
//list.innerHTML = data.join("");

//}
// populateList()
/*========Fim Backend========*/



//Estado da aplicação
let perPage = 4
const state = {
    page: 1,
    //Saber a quantidade do array
    perPage,
    //Quantidade total de itens // Substituir pelo retorno do banco de dados
    totalPage: Math.ceil(itensLoja.length / perPage),
    maxVisibleButtons: 3
}
//Captura dados do HTML/DOM
const html = {
    get(element) {
        return document.querySelector(element);
    }
}

// Criando controles de paginação
//Funções dentro de um objeto para organizar melhor
const controls = {
    next() {
        state.page++;
        //Definindo última página
        window.open('#galeria', '_self');
        if (state.page > state.totalPage) {
            state.page--
        }
    },
    prev() {
        state.page--;
        window.open('#galeria', '_self');
        if (state.page < 1) {
            state.page++
        }
    },
    goTo(page) {
        /*
        Quando a página solicitada for menor que a primeira página = ela não existe e será tratado como a primeira página.
        - Última página não deve ser maior que o total do array.
        */
        if (page < 1) {
            page = 1
        }
        state.page = +page;
        if (page > state.totalPage) {
            state.page = state.totalPage;
        }
        window.open('#galeria', '_self');
    },
    createListeners() {
        //Botão da primeira página
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1)
            update()
        });
        //Botão da última página
        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage)
            update()
        });
        //NEXT
        html.get('.next').addEventListener('click', () => {
            controls.next()
            update()
        });
        //Prev
        html.get('.prev').addEventListener('click', () => {
            controls.prev()
            update()
        });
    }
};
// Capturando e preenchendo a lista
const list = {
    create(item) {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = item;
        html.get('.list').appendChild(div);
    },
    update() {
        html.get('.list').innerHTML = "";
        let page = state.page - 1;
        let start = page * state.perPage;
        let end = start + state.perPage;
        const paginatedItems = data.slice(start, end);
        paginatedItems.forEach(list.create);
    }
}
//Botões de navegação
const buttons = {
    element: html.get('.pagination .numbers'),
    create(number) {
        const button = document.createElement('div');
        button.innerHTML = number;
        //Adicionar marcação de página atual 
        if (state.page == number) {
            button.classList.add('active');
        }
        //Adicionar evento de click nos botões
        button.addEventListener('click', (e) => {
            const page = e.target.innerText;
            controls.goTo(page);
            update();
        })
        buttons.element.appendChild(button);
    },
    update() {
        buttons.element.innerHTML = "";
        const {
            maxLeft,
            maxRight
        } = buttons.calculateMaxVisible();
        console.log(maxLeft, maxRight);
        for (let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }

    },
    //Botões visíveis
    calculateMaxVisible() {
        //Desestuturação do maxvisible buttons que recebe o STATE
        const {
            maxVisibleButtons
        } = state;
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2));
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2));

        if (maxLeft < 1) {
            maxLeft = 1;
            maxRight = maxVisibleButtons;
        }
        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1);
            maxRight = state.totalPage;

            if (maxLeft < 1) maxLeft = 1;

        }
        return {
            maxLeft,
            maxRight
        }
    }
}

function update() {
    list.update()
    buttons.update()
}

function init() {
    update()
    controls.createListeners()
}
init()


// CAROUSEL

let carousel = document.querySelector('.carousel');

let carouselInner = document.querySelector('.carousel-inner');

let prev = document.querySelector('.carousel-controls .prev');

let next = document.querySelector('.carousel-controls .next');

let slides = document.querySelectorAll('.carousel-inner .carousel-item');

let totalSlides = slides.length;

let step = 100 / totalSlides;

let activeSlide = 0;

let activeIndicator = 0;

let direction = -1;

let jump = 1;

let interval = 2000;

let time;



//Init carousel
carouselInner.style.minWidth = (totalSlides * 100) + '%';
loadIndicators();
loop(true);


//Carousel events

next.addEventListener('click', () => {
    slideToNext();
});

prev.addEventListener('click', () => {
    slideToPrev();
});

carouselInner.addEventListener('transitionend', () => {
    if (direction === -1) {
        if (jump > 1) {
            for (let i = 0; i < jump; i++) {
                activeSlide++;
                carouselInner.append(carouselInner.firstElementChild);
            }
        } else {
            activeSlide++;
            carouselInner.append(carouselInner.firstElementChild);
        }
    } else if (direction === 1) {
        if (jump > 1) {
            for (let i = 0; i < jump; i++) {
                activeSlide--;
                carouselInner.prepend(carouselInner.lastElementChild);
            }
        } else {
            activeSlide--;
            carouselInner.prepend(carouselInner.lastElementChild);
        }
    };

    carouselInner.style.transition = 'none';
    carouselInner.style.transform = 'translateX(0%)';
    setTimeout(() => {
        jump = 1;
        carouselInner.style.transition = 'all ease .5s';
    });
    updateIndicators();
});

document.querySelectorAll('.carousel-indicators span').forEach(item => {
    item.addEventListener('click', (e) => {
        let slideTo = parseInt(e.target.dataset.slideTo);

        let indicators = document.querySelectorAll('.carousel-indicators span');

        indicators.forEach((item, index) => {
            if (item.classList.contains('active')) {
                activeIndicator = index
            }
        })

        if (slideTo - activeIndicator > 1) {
            jump = slideTo - activeIndicator;
            step = jump * step;
            slideToNext();
        } else if (slideTo - activeIndicator === 1) {
            slideToNext();
        } else if (slideTo - activeIndicator < 0) {

            if (Math.abs(slideTo - activeIndicator) > 1) {
                jump = Math.abs(slideTo - activeIndicator);
                step = jump * step;
                slideToPrev();
            }
            slideToPrev();
        }
        step = 100 / totalSlides;
    })
});

carousel.addEventListener('mouseover', () => {
    loop(false);
})

carousel.addEventListener('mouseout', () => {
    loop(true);
})

//Carousel functions

function loadIndicators() {
    slides.forEach((slide, index) => {
        if (index === 0) {
            document.querySelector('.carousel-indicators').innerHTML +=
                `<span data-slide-to="${index}" class="active"></span>`;
        } else {
            document.querySelector('.carousel-indicators').innerHTML +=
                `<span data-slide-to="${index}"></span>`;
        }
    });
};

function updateIndicators() {
    if (activeSlide > (totalSlides - 1)) {
        activeSlide = 0;
    } else if (activeSlide < 0) {
        activeSlide = (totalSlides - 1);
    }
    document.querySelector('.carousel-indicators span.active').classList.remove('active');
    document.querySelectorAll('.carousel-indicators span')[activeSlide].classList.add('active');
};

function slideToNext() {
    if (direction === 1) {
        direction = -1;
        carouselInner.prepend(carouselInner.lastElementChild);
    };

    carousel.style.justifyContent = 'flex-start';
    carouselInner.style.transform = `translateX(-${step}%)`;
};

function slideToPrev() {
    if (direction === -1) {
        direction = 1;
        carouselInner.append(carouselInner.firstElementChild);
    };
    carousel.style.justifyContent = 'flex-end'
    carouselInner.style.transform = `translateX(${step}%)`;
};

function loop(status) {
    if (status === true) {
        time = setInterval(() => {
            slideToNext();
        }, interval);
    } else {
        clearInterval(time);
    }
}



