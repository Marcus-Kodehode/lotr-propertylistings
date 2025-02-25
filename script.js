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
        dwarven: new Audio("sounds/good.mp3")// Hvis du legger til dwarven senere
    };
    Object.entries(sounds).forEach(([key, audio]) => {
        audio.addEventListener('canplaythrough', () => {
            console.log(`${key} lydfilen er klar.`);
        }, false);
        audio.addEventListener('error', () => {
            console.error(`Feil under lasting av lydfil for ${key}.`);
        });
    });
    

    // 🎵 Sett lydene til å loope
    Object.values(sounds).forEach((audio) => {
        audio.loop = true;
        audio.volume = 0.5;
    });

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

                // 🎵 Spill av lyd basert på klasse
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