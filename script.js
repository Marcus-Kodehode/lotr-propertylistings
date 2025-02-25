document.addEventListener("DOMContentLoaded", () => {
    const detailButtons = document.querySelectorAll(".details-btn");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-btn");
    const propertyContainer = document.querySelector(".property-container");

// 🎵 Lydfiler for hver kategori
const sounds = {
    dark: new Audio("sounds/evil.mp3"),
    hobbit: new Audio("sounds/good.mp3"),
    elven: new Audio("sounds/forest.mp3"),
    kingdoms: new Audio("sounds/river.mp3"),
    dwarven: new Audio("sounds/river.mp3"),
    joakim: new Audio("sounds/joakim.mp3") // 🔊 Egen lyd for Joakim's Junkplace
};

// 🎵 Sett lydene til å loope
Object.values(sounds).forEach((audio) => {
    audio.loop = true;
    audio.volume = 0.5;
});

// 🔈 Stopp all lyd før ny spilles
const stopAllAudio = () => {
    Object.values(sounds).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    });
};

// 🎬 Åpne modal og spill riktig lyd
detailButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const modalId = btn.parentElement.getAttribute("data-modal");
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.style.display = "flex";
            propertyContainer.classList.add("faded");
            stopAllAudio();

            // 🎵 Sjekk om det er Joakim's Junkyard Keep som åpnes
            if (modalId === "modal-joakimkeep") {
                sounds.joakim.volume = 0.8; // 🔊 Økt volum for Joakim
                sounds.joakim.play();
            } else {
                // 🎵 Spill av basert på kategori
                const categories = ["dark", "hobbit", "elven", "kingdoms", "dwarven"];
                categories.forEach((category) => {
                    if (btn.parentElement.classList.contains(category)) {
                        sounds[category].play();
                    }
                });
            }
        } else {
            console.error(`Modal with ID "${modalId}" not found.`);
        }
    });
});



    // ❌ Lukk modal og stopp lyd
    closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.closest(".modal").style.display = "none";
            propertyContainer.classList.remove("faded");
            stopAllAudio();
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
            propertyContainer.classList.remove("faded");
            stopAllAudio();
        }
    });

    // 📜 Filterfunksjon for eiendommer
    document.getElementById('filter-select').addEventListener('change', function () {
        const selectedCategory = this.value;
        const properties = document.querySelectorAll('.property-card');

        properties.forEach((property) => {
            if (selectedCategory === 'all' || property.classList.contains(selectedCategory)) {
                property.style.display = 'flex';
            } else {
                property.style.display = 'none';
            }
        });
    });
});


