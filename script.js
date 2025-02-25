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
        dwarven: new Audio("sounds/good.mp3") // Midlertidig lyd for dwarven
    };

    // 🔄 🎵 Sett lydene til å loope og juster volum
    Object.values(sounds).forEach((audio) => {
        audio.loop = true;
        audio.volume = 0.5;
    });

    // 🔇 Stopper all lyd
    const stopAllAudio = () => {
        Object.values(sounds).forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
    };

    // 🎬 Åpner modal, spiller lyd og fader bakgrunn
    detailButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modalId = btn.parentElement.getAttribute("data-modal");
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.style.display = "flex";
                propertyContainer.classList.add("faded");
                stopAllAudio(); // Stopper eventuell lyd som spiller

                // 🎵 Spiller riktig lyd basert på kategori
                const categories = ["dark", "hobbit", "elven", "kingdoms", "dwarven"];
                categories.forEach((category) => {
                    if (btn.parentElement.classList.contains(category)) {
                        sounds[category].play();
                    }
                });
            } else {
                console.error(`Modal with ID "${modalId}" not found.`);
            }
        });
    });

    // ❌ Lukk modal + stopp lyd + fjern fade
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

    // 📜 Filterfunksjon for eiendommer + 🏗 Dynamisk størrelse
    document.getElementById('filter-select').addEventListener('change', function () {
        const selectedCategory = this.value;
        const properties = document.querySelectorAll('.property-card');

        properties.forEach((property) => {
            if (selectedCategory === 'all' || property.classList.contains(selectedCategory)) {
                property.style.display = 'flex';  // Beholder flex-layouten for riktig formatering
            } else {
                property.style.display = 'none';
            }
        });

        const visibleProperties = Array.from(properties).filter(
            (property) => property.style.display === 'flex'
        );

        // 🎯 ✅ Riktig størrelse når kun 1 annonse vises
        if (visibleProperties.length === 1) {
            visibleProperties[0].classList.add("single-item");
        } else {
            visibleProperties.forEach((item) => item.classList.remove("single-item"));
        }
    });
});

