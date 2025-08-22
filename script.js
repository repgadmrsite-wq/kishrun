document.addEventListener('DOMContentLoaded', () => {
    const totalPriceElement = document.getElementById('total-price');
    const sandwichBuilder = document.getElementById('sandwich-builder');
    const orderBtn = document.getElementById('order-btn');
    const modal = document.getElementById('order-summary-modal');
    const closeBtn = modal.querySelector('.close-button');
    const modalDetails = document.getElementById('modal-order-details');

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
        const sectionId = container.id.split('-')[0]; // 'bread', 'sausage', or 'ham'

        const price = parseInt(card.dataset.price, 10);
        const name = card.dataset.name;
        selections[sectionId] = { name, price };

        const allCardsInContainer = container.querySelectorAll('.option-card');
        allCardsInContainer.forEach(c => c.classList.remove('selected'));
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

        detailsHtml += `<hr><p><strong>جمع کل: ${total.toLocaleString('fa-IR')} تومان</strong></p>`;

        modalDetails.innerHTML = detailsHtml;
        modal.classList.add('show-modal');
    }

    function hideModal() {
        modal.classList.remove('show-modal');
    }

    function initializeMenu() {
        const optionContainers = sandwichBuilder.querySelectorAll('.options-container');
        optionContainers.forEach(container => {
            const firstCard = container.querySelector('.option-card');
            if (firstCard) {
                firstCard.click();
            }
        });
        calculateTotalPrice();
    }

    sandwichBuilder.addEventListener('click', handleOptionClick);
    orderBtn.addEventListener('click', showOrderSummary);
    closeBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });

    function createSnowflake() {
        const snowContainer = document.getElementById('snow-container');
        const snowflake = document.createElement('div');

        snowflake.classList.add('snowflake');

        const size = Math.random() * 5 + 2; // size between 2px and 7px
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;

        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 10 + 8}s`; // 8s to 18s
        snowflake.style.animationDelay = `${Math.random() * 10}s`;
        snowflake.style.opacity = Math.random() * 0.7 + 0.3; // 0.3 to 1.0

        snowContainer.appendChild(snowflake);
    }

    function initSnowfall() {
        const numberOfSnowflakes = 150;
        for (let i = 0; i < numberOfSnowflakes; i++) {
            createSnowflake();
        }
    }

    initializeMenu();
    initSnowfall();
});
