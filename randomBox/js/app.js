// @ @include('files/regular.js', {})

document.addEventListener('DOMContentLoaded', () => {
    const slides = [...document.querySelectorAll('.hero__bg')];
    if(slides.length > 0){
    let indexSlide = 0;
    function showSlide(i){
        slides.forEach(el => el.classList.remove('_active'));
        if(i === slides.length - 1){
            slides[i].classList.add('_active');
            indexSlide = 0;
        }else{
            slides[i].classList.add('_active');
            indexSlide++;
        }
    }
    showSlide(indexSlide);
    setInterval(() => {
        showSlide(indexSlide);
    }, 2000);
    }
    const formCode = document.querySelector('.hero__form');
    const code = "4k9h46p336";
    const codeRed = "everyred";
    const mistake = document.querySelector('.hero__mistake');
    if(formCode){
        formCode.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const codeValue = document.querySelector('input[name="code"]').value;
            if(codeValue === code){
                localStorage.setItem('code', code);
                window.open(`${window.location.href.replace(/index.html/gi,'')}roulette.html`,'_self');
            }else if(codeValue === codeRed){
                localStorage.setItem('code', codeRed);
                window.open(`${window.location.href.replace(/index.html/gi,'')}roulette.html`,'_self');
            }else if(codeValue === ''){
                mistake.textContent = mistake.dataset.zero;
            }else{
                mistake.textContent = mistake.dataset.mistake;
            }
        });
    }



    const footerBtn = document.querySelector('.footer__btn');
    const footerCopy = document.querySelector('.footer__copy').textContent;
    const popupCopy = document.querySelector('.popup-copy');
    const popupCopyError = document.querySelector('.popup-error');
    footerBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(footerCopy).then(function() {
            popupCopy.classList.add('_active');
            setTimeout(() => {
                popupCopy.classList.remove('_active');
            },1500)
          }, function() {
            popupCopyError.classList.add('_active');
            setTimeout(() => {
                popupCopyError.classList.remove('_active');
            },1500)
          });
    });

    const boxes = [
        {class: 'dark-blue', width: 60, color: 'darkblue', colorName: 'темно синий' ,scr: 'ATVs/01.jpg'},
        {class: 'blue', width: 40, color: 'blue', colorName: 'синий' ,scr: 'ATVs/02.png'},
        {class: 'purple', width: 30, color: 'purple', colorName: 'фиолетовый' ,scr: 'ATVs/03.jpg'},
        {class: 'yellow', width: 20, color: 'yellow', colorName: 'жёлтый' ,scr: 'ATVs/04.jpg'},
        {class: 'orange', width: 10, color: 'orange', colorName: 'оранжевый' ,scr: 'ATVs/05.png'},
        {class: 'red', width: 5, color: 'red', colorName: 'красный' ,scr: 'ATVs/06.jpg'},
    ];
    const boxWrapper = document.querySelector('.random__wrapper');
    if(boxWrapper){
        if(localStorage.getItem('code') === codeRed){
            document.querySelector('.redVersion').textContent = '¿';
        }
        function createPopup(el){
            const popup = document.createElement('div');
            popup.className = `popup popup_${el.class}`;
            document.body.append(popup);
            popup.insertAdjacentHTML('afterBegin', `
            <div class="popup__content _container">
                <div class="popup__body">
                    <h3 class="popup__title">Поздравляю! Ты выиграл <span>${el.colorName}</span> квадроцикл!</h3>
                    <div class="popup__img"><img src="./img/${el.scr}" alt="ATVs"></div>
                    <div class="popup__button"><a href="#" class="popup__btn">Получить</a></div>
                    <div class="popup__close"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="121.31px" height="122.876px" viewBox="0 0 121.31 122.876" enable-background="new 0 0 121.31 122.876" xml:space="preserve"><g><path fill-rule="darkblue" fill='${el.color}' clip-rule="darkblue" d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"/></g></svg></div>
                </div>
            </div>
            `)
        }


        boxes.forEach( el => {
            const element = document.createElement('div');
            element.className = `box box_${el.class}`;
            element.style.width = `${el.width * 10}px`;
            boxWrapper.append(element);
            createPopup(el);
        })
    }
    function selectBox(arr){
        const arrWeight = [];
        const randMax = arr.reduce((acc, el) => {
            arrWeight.push(acc+el.width);
            return acc+el.width;
        },0);
        let rand;
        let findEl;
        if(localStorage.getItem('code') === codeRed){
            rand = (randMax - boxes[boxes.length-1].width) + Math.random() * boxes[boxes.length-1].width;
            findEl = arr.find((el,i) => {
                return arrWeight[i] >= rand;
            });
        }else{
            rand = Math.random() * randMax;
            findEl = arr.find((el,i) => {
                return arrWeight[i] >= rand;
            });
        }
        boxWrapper.style.transform = `translateX(-${Math.round(rand) * 10}px)`;
        return findEl;
    }

    function resetingBox(){
        boxWrapper.style.transition = '0s';
        boxWrapper.style.transform = 'translateX(0)';
    } 
    const getScrollBarWidth = () =>{
        const item = document.createElement('div');
        
        item.style.position = 'absolute';
        item.style.top = '-9999px';
        item.style.width = '50px';
        item.style.height = '50px';
        item.style.overflow = 'scroll';
        item.style.visibility = 'hidden';

        document.body.appendChild(item);
        const scrollBarWidth = item.offsetWidth - item.clientWidth;
        document.body.removeChild(item);

        return scrollBarWidth;
    }
    const randBtn = document.querySelector('.random__btn_go');
    const randBtnGet = document.querySelector('.random__btn_get');
    let winEl;
    const timeDelay = 3000;
    let keyIsDown = true;
    
    function showPopup(t){ 
        setTimeout(() => {
            document.querySelector(`.popup_${winEl.class}`).classList.add('_active');
            document.body.classList.add('hidden');
            randBtn.disabled = false;
            randBtnGet.disabled = false;
            document.body.style.paddingRight = `${getScrollBarWidth()}px`;
        },t);
     }

     function getWinPopup(t){
            setTimeout(() => {
                randBtnGet.classList.add('_active');
            },t);
            
            randBtnGet.addEventListener('click', () => {
                keyIsDown = false;
                showPopup(0);
            });
     }

     function checkWinEl(){
            resetingBox();
            setTimeout(() => {
                boxWrapper.style.transition = 'all 2.5s linear';
                winEl = selectBox(boxes);
            },0);
            randBtn.disabled = true;
            randBtnGet.disabled = true;
            keyIsDown = false;
            showPopup(timeDelay);
            getWinPopup(timeDelay);
     }

    
    if(window.location.href.slice(window.location.href.length - 13) === 'roulette.html'){
   
    randBtn.addEventListener('click',checkWinEl);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && keyIsDown) {
            checkWinEl();
        }
      });

      const popups = document.querySelectorAll('.popup');
      popups.forEach(element => {
        element.querySelector('.popup__close').addEventListener('click', () => {
            element.classList.remove('_active');
            document.body.classList.remove('hidden');
            document.body.style.paddingRight = '0px';
            keyIsDown = true;
        });
      });
    }

// end
});
// @ @include('files/forms.js', {})
// поддержка webp
function testWebP(callback) {
  let webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

// da
("use strict");

(function () {
  let originalPositions = [];
  let daElements = document.querySelectorAll("[data-da]");
  let daElementsArray = [];
  let daMatchMedia = [];
  //Заполняем массивы
  if (daElements.length > 0) {
    let number = 0;
    for (let index = 0; index < daElements.length; index++) {
      const daElement = daElements[index];
      const daMove = daElement.getAttribute("data-da");
      if (daMove != "") {
        const daArray = daMove.split(",");
        const daPlace = daArray[1] ? daArray[1].trim() : "last";
        const daBreakpoint = daArray[2] ? daArray[2].trim() : "767";
        const daType = daArray[3] === "min" ? daArray[3].trim() : "max";
        const daDestination = document.querySelector("." + daArray[0].trim());
        if (daArray.length > 0 && daDestination) {
          daElement.setAttribute("data-da-index", number);
          //Заполняем массив первоначальных позиций
          originalPositions[number] = {
            parent: daElement.parentNode,
            index: indexInParent(daElement),
          };
          //Заполняем массив элементов
          daElementsArray[number] = {
            element: daElement,
            destination: document.querySelector("." + daArray[0].trim()),
            place: daPlace,
            breakpoint: daBreakpoint,
            type: daType,
          };
          number++;
        }
      }
    }
    dynamicAdaptSort(daElementsArray);

    //Создаем события в точке брейкпоинта
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index];
      const daBreakpoint = el.breakpoint;
      const daType = el.type;

      daMatchMedia.push(
        window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)")
      );
      daMatchMedia[index].addListener(dynamicAdapt);
    }
  }
  //Основная функция
  function dynamicAdapt(e) {
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index];
      const daElement = el.element;
      const daDestination = el.destination;
      const daPlace = el.place;
      const daBreakpoint = el.breakpoint;
      const daClassname = "_dynamic_adapt_" + daBreakpoint;

      if (daMatchMedia[index].matches) {
        //Перебрасываем элементы
        if (!daElement.classList.contains(daClassname)) {
          let actualIndex = indexOfElements(daDestination)[daPlace];
          if (daPlace === "first") {
            actualIndex = indexOfElements(daDestination)[0];
          } else if (daPlace === "last") {
            actualIndex = indexOfElements(daDestination)[
              indexOfElements(daDestination).length
            ];
          }
          daDestination.insertBefore(
            daElement,
            daDestination.children[actualIndex]
          );
          daElement.classList.add(daClassname);
        }
      } else {
        //Возвращаем на место
        if (daElement.classList.contains(daClassname)) {
          dynamicAdaptBack(daElement);
          daElement.classList.remove(daClassname);
        }
      }
    }
    customAdapt();
  }

  //Вызов основной функции
  dynamicAdapt();

  //Функция возврата на место
  function dynamicAdaptBack(el) {
    const daIndex = el.getAttribute("data-da-index");
    const originalPlace = originalPositions[daIndex];
    const parentPlace = originalPlace["parent"];
    const indexPlace = originalPlace["index"];
    const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
    parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
  }
  //Функция получения индекса внутри родителя
  function indexInParent(el) {
    var children = Array.prototype.slice.call(el.parentNode.children);
    return children.indexOf(el);
  }
  //Функция получения массива индексов элементов внутри родителя
  function indexOfElements(parent, back) {
    const children = parent.children;
    const childrenArray = [];
    for (let i = 0; i < children.length; i++) {
      const childrenElement = children[i];
      if (back) {
        childrenArray.push(i);
      } else {
        //Исключая перенесенный элемент
        if (childrenElement.getAttribute("data-da") == null) {
          childrenArray.push(i);
        }
      }
    }
    return childrenArray;
  }
  //Сортировка объекта
  function dynamicAdaptSort(arr) {
    arr.sort(function (a, b) {
      if (a.breakpoint > b.breakpoint) {
        return -1;
      } else {
        return 1;
      }
    });
    arr.sort(function (a, b) {
      if (a.place > b.place) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  //Дополнительные сценарии адаптации
  function customAdapt() {
    //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
})();
// ibg
function ibg() {
  let ibg = document.querySelectorAll("._ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage =
        "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}

ibg();

;
// @ @include('files/burger.js', {});
// @ @include("files/spoller.js",{});
// @ @include("files/select.js",{});
// @ @include("files/tabs.js",{});
// @ @include("files/sliders.js",{});
    