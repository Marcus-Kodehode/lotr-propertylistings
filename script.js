document.addEventListener("DOMContentLoaded", () => {
    const detailButtons = document.querySelectorAll(".details-btn");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-btn");
    const propertyContainer = document.querySelector(".property-container");

    // 📜 Åpne popup-vindu
    detailButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modalId = btn.parentElement.getAttribute("data-modal");
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.style.display = "flex";
                propertyContainer.classList.add("faded");
            } else {
                console.error(`Modal with ID "${modalId}" not found.`);
            }
        });
    });

    // 📜 Lukke popup-vindu
    closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.closest(".modal").style.display = "none";
            propertyContainer.classList.remove("faded");
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
            propertyContainer.classList.remove("faded");
        }
    });

// 📜 Filterfunksjon for eiendommer
document.getElementById('filter-select').addEventListener('change', function () {
    const selectedCategory = this.value;
    const properties = document.querySelectorAll('.property-card');

    properties.forEach((property) => {
        if (selectedCategory === 'all' || property.classList.contains(selectedCategory)) {
            property.style.display = 'flex';  // 'flex' for å beholde lik layout
            property.style.width = '300px';   // 🔥 Sørger for korrekt bredde
            property.style.height = '400px';  // 🔥 Sørger for korrekt høyde
        } else {
            property.style.display = 'none';
        }
    });
});
});




  