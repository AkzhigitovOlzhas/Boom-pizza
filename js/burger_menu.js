let isShow = false;

function showMenu() {
    let menu = document.querySelector('.burger-menu');
    if (!isShow) {
        let burgerBtn = document.querySelector('.menu__burger-icon-bars');
        burgerBtn.classList.remove('menu__burger-icon-bars');
        burgerBtn.classList.add('menu__burger-icon-times');

        menu.classList.remove('none');

        isShow = true;
    } else {
        let burgerBtn = document.querySelector('.menu__burger-icon-times');
        burgerBtn.classList.remove('menu__burger-icon-times');
        burgerBtn.classList.add('menu__burger-icon-bars');

        menu.classList.add('none');

        isShow = false;
    }
}