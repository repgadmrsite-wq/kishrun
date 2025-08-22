document.addEventListener('DOMContentLoaded', () => {
    // Main elements
    const totalPriceElement = document.getElementById('total-price');
    const sandwichBuilder = document.getElementById('sandwich-builder');
    const orderBtn = document.getElementById('order-btn');

    // Modal elements
    const modal = document.getElementById('order-summary-modal');
    const modalBody = document.getElementById('modal-body');
    const modalDetails = document.getElementById('modal-order-details');
    const successMessage = document.getElementById('modal-success-message');
    const closeBtn = modal.querySelector('.close-button');

    // Form elements
    const customerForm = document.getElementById('customer-form');
    const customerNameInput = document.getElementById('customer-name');
    const customerPhoneInput = document.getElementById('customer-phone');

    const selections = {
        bread: { name: '', price: 0 },
        sausage: { name: '', price: 0 },
        ham: { name: '', price: 0 }
    };

    function calculateTotalPrice() {
        const total = Object.values(selections).reduce((sum, item) => sum + item.price, 0);
        totalPriceElement.textContent = total.toLocaleString('fa-IR');
    }

    function handleOptionClick(event) {
        const card = event.target.closest('.option-card');
        if (!card) return;

        const container = card.parentElement;
        const sectionId = container.id.split('-')[0];

        selections[sectionId] = {
            name: card.dataset.name,
            price: parseInt(card.dataset.price, 10)
        };

        container.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        calculateTotalPrice();
    }

    function showOrderSummary() {
        let detailsHtml = '';
        let total = 0;

        if (selections.bread.price > 0) {
            detailsHtml += `<p>نان: ${selections.bread.name} - ${selections.bread.price.toLocaleString('fa-IR')} تومان</p>`;
            total += selections.bread.price;
        }
        if (selections.sausage.price > 0) {
            detailsHtml += `<p>سوسیس: ${selections.sausage.name} - ${selections.sausage.price.toLocaleString('fa-IR')} تومان</p>`;
            total += selections.sausage.price;
        }
        if (selections.ham.price > 0) {
            detailsHtml += `<p>کالباس: ${selections.ham.name} - ${selections.ham.price.toLocaleString('fa-IR')} تومان</p>`;
            total += selections.ham.price;
        }

        if (total === 0) {
            alert('لطفاً حداقل یک مورد را برای سفارش انتخاب کنید.');
            return;
        }

        detailsHtml += `<hr><p><strong>جمع کل: ${total.toLocaleString('fa-IR')} تومان</strong></p>`;

        modalDetails.innerHTML = detailsHtml;
        modal.classList.add('show-modal');
    }

    function hideModal() {
        modal.classList.remove('show-modal');
        // Reset modal state after a short delay to allow animation to finish
        setTimeout(() => {
            modalBody.style.display = 'block';
            successMessage.style.display = 'none';
            customerForm.reset();
        }, 300);
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        if (customerNameInput.value.trim() === '' || customerPhoneInput.value.trim() === '') {
            alert('لطفاً نام و شماره تماس خود را وارد کنید.');
            return;
        }

        modalBody.style.display = 'none';
        successMessage.style.display = 'block';
    }

    function createSnowflake() {
        const snowContainer = document.getElementById('snow-container');
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        const size = Math.random() * 5 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 10 + 8}s`;
        snowflake.style.animationDelay = `${Math.random() * 10}s`;
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowContainer.appendChild(snowflake);
    }

    function init() {
        // Set initial selections
        sandwichBuilder.querySelectorAll('.options-container').forEach(container => {
            const firstCard = container.querySelector('.option-card');
            if (firstCard) {
                firstCard.click();
            }
        });
        calculateTotalPrice();

        // Set up event listeners
        sandwichBuilder.addEventListener('click', handleOptionClick);
        orderBtn.addEventListener('click', showOrderSummary);
        closeBtn.addEventListener('click', hideModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) hideModal();
        });
        customerForm.addEventListener('submit', handleFormSubmit);

        // Start animations
        const numberOfSnowflakes = 150;
        for (let i = 0; i < numberOfSnowflakes; i++) {
            createSnowflake();
        }
    }

    init();
});
