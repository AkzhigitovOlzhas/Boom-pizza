function minus(btn) {
    let el = btn.parentElement.querySelector('.product-card__counter');
    if(el.value>1){
        el.value = +el.value - 1;
    }
}

function plus(btn) {
    let el = btn.parentElement.querySelector('.product-card__counter');
    el.value = +el.value + 1;
}