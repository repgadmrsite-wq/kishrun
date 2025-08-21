document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sandwich-form');
    const totalPriceElement = document.getElementById('total-price');

    const breadSelect = document.getElementById('bread');
    const sausageSelect = document.getElementById('sausage');
    const hamSelect = document.getElementById('ham');

    function calculateTotalPrice() {
        const breadPrice = parseInt(breadSelect.value) || 0;
        const sausagePrice = parseInt(sausageSelect.value) || 0;
        const hamPrice = parseInt(hamSelect.value) || 0;

        const totalPrice = breadPrice + sausagePrice + hamPrice;

        totalPriceElement.textContent = totalPrice.toLocaleString('fa-IR');
    }

    form.addEventListener('change', calculateTotalPrice);

    // Initial calculation
    calculateTotalPrice();
});
