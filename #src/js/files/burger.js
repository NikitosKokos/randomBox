 // * burger
    const burger = document.querySelector('.burger');
    const headerMenu = document.querySelector('.header__list');
    const wrapper = document.querySelector('body');
    burger.addEventListener("click", () =>{
        headerMenu.classList.toggle("header__list_active");
        burger.classList.toggle("burger_active");
        wrapper.classList.toggle("hidden");
    });