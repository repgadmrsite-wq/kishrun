document.addEventListener('DOMContentLoaded', () => {
    const totalPriceElement = document.getElementById('total-price');
    const sandwichBuilder = document.getElementById('sandwich-builder');

    const selections = {
        bread: 0,
        sausage: 0,
        ham: 0
    };

    function calculateTotalPrice() {
        const total = Object.values(selections).reduce((sum, price) => sum + price, 0);
        totalPriceElement.textContent = total.toLocaleString('fa-IR');
    }

    function handleOptionClick(event) {
        const card = event.target.closest('.option-card');
        if (!card) return;

        const container = card.parentElement;
        const sectionId = container.id.split('-')[0]; // 'bread', 'sausage', or 'ham'

        // Update the selection state
        const price = parseInt(card.dataset.price, 10);
        selections[sectionId] = price;

        // Update visual state
        const allCardsInContainer = container.querySelectorAll('.option-card');
        allCardsInContainer.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        // Recalculate price
        calculateTotalPrice();
    }

    function initializeMenu() {
        // Select the first option in each section by default
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

    // Set the initial state of the menu
    initializeMenu();
});
