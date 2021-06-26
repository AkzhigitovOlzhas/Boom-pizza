let form = document.getElementById('payment_form');

form.addEventListener('submit', () => {
    localStorage.clear();
});

if (localStorage.getItem('total') != null) {
    let wrap = document.createElement('div');
    wrap.classList.add('payment__total');
    wrap.innerHTML = `
    <div class="payment__form-title">Итого заказ на сумму: ${localStorage.getItem('total')} руб.</div>
    <button class="payment__total-btn">Оформить заказ!</button>
    `;

    form.append(wrap);
}