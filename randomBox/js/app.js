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
    const mistake = document.querySelector('.hero__mistake');
    if(formCode){
        formCode.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const codeValue = document.querySelector('input[name="code"]').value;
            if(codeValue === code){
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
        {class: 'dark-blue', width: 60},
        {class: 'blue', width: 40},
        {class: 'purple', width: 30},
        {class: 'yellow', width: 20},
        {class: 'orange', width: 10},
        {class: 'red', width: 5},
    ];
    const boxWrapper = document.querySelector('.random__wrapper');
    if(boxWrapper){
        boxes.forEach( el => {
            const element = document.createElement('div');
            element.className = `box box_${el.class}`;
            element.style.width = `${el.width}vw`;
            boxWrapper.append(element);
        })
    }
    function selectBox(arr){
        const arrWeight = [];
        const randMax = arr.reduce((acc, el) => {
            arrWeight.push(acc+el.width);
            return acc+el.width;
        },0);
        const rand = Math.random() * randMax;
        const findEl = arr.find((el,i) => {
            return arrWeight[i] >= rand;
        });
        boxWrapper.style.transform = `translateX(-${Math.round(rand)}vw)`;
        return findEl;
    }

    function resetingBox(){
        boxWrapper.style.transition = '0s';
        boxWrapper.style.transform = 'translateX(0)';
    }

    let winEl;
    if(window.location.href.slice(window.location.href.length - 13) === 'roulette.html'){
    const randBtn = document.querySelector('.random__btn');
    randBtn.addEventListener('click', () => {
        if(!winEl){
            winEl = selectBox(boxes);
        }else{
            resetingBox();
            setTimeout(() => {
                boxWrapper.style.transition = 'all 2.5s linear';
                winEl = selectBox(boxes);
            },0);
        }
            
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            if(!winEl){
                winEl = selectBox(boxes);
                // setTimeout(resetingBox,5000);
            }else{
                resetingBox();
                setTimeout(() => {
                    boxWrapper.style.transition = 'all 2.5s linear';
                    winEl = selectBox(boxes);
                },0);
            }
        }
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
    