
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