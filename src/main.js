import translations from "./translations.js";

// Function to set language based on user selection
const setLanguage = (language) => {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
        const translationKey = element.getAttribute("data-i18n");
        element.textContent = translations[language][translationKey];
    });

    const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
    placeholderElements.forEach((element) => {
        const translationKey = element.getAttribute("data-i18n-placeholder");
        element.placeholder = translations[language][translationKey];
    });

    const htmlElements = document.querySelectorAll("[data-i18n-html]");
    htmlElements.forEach((element) => {
        const translationKey = element.getAttribute("data-i18n-html");
        element.innerHTML = translations[language][translationKey];
    });

    document.dir = language === "ar" ? "rtl" : "ltr";
};

// Function to handle tab clicks and filter cards accordingly
const tabsClick = () => {
    const tabs = document.querySelectorAll(".tab-focus");
    tabs.forEach((tab) => {
        tab.addEventListener("click", (event) => {
            event.preventDefault();

            // Remove active class from all tabs
            tabs.forEach((tab) => tab.classList.remove("active"));

            // Add active class to the clicked tab
            event.currentTarget.classList.add("active");

            // Get the id of the clicked tab
            const tabId = event.currentTarget.getAttribute("id");

            // Call function to handle service display based on tabId
            handleService(tabId);
        });
    });
};

// Function to load and render cards based on selected language
const loadCards = () => {
    const language = localStorage.getItem("i18next") || "ar";
    const technicalData = translations[language]["Cards"];
    const marketingData = translations[language]["MarketingCard"];
    const imageService = ["assets/cpu.svg", "assets/designer.svg", "assets/setting.svg", "assets/gear.svg", "assets/digitalization.svg"];
    const imageMarketing = ["assets/online-marketing.svg", "assets/social-media.svg", "assets/headphone.svg", "assets/creative-work.svg", "assets/pen-tablet.svg", "assets/palette.svg"];
    const techContainer = document.getElementById("tech-container");
    const marketingContainer = document.getElementById("marketing-container");

    techContainer.innerHTML = ""; // Clear existing cards
    marketingContainer.innerHTML = ""; // Clear existing cards

    technicalData.forEach((card, index) => {
        const serviceCard = document.createElement("div");
        serviceCard.className = "service-card flex sm:gap-3 gap-4 flex-col justify-center sm:justify-around px-4 sm:p-10 rounded-lg shadow";
        serviceCard.innerHTML = `
            <div class='flex items-center gap-4'>
                <img src='${imageService[index]}' alt='${card.title}' class='w-10 text-white' />
                <h4 class='text-white font-bold'>${card.title}</h4>
            </div>
            <div class='flex flex-col justify-center'>
                <h5 class='mb-4 text-justify text-md sm:text-sm text-white'>${card.description}</h5>
                <a href="#contactus" class='flex gap-1 text-md sm:text-sm font-semibold text-secondary items-center hover:underline'>
                    <svg class='w-3 h-3 rtl:rotate-[270deg]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'>
                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778'/>
                    </svg>
                    ${card.buttonText}
                </a>
            </div>
        `;
        techContainer.appendChild(serviceCard);
    });

    marketingData.forEach((card, index) => {
        const marketingCard = document.createElement("div");
        marketingCard.className = "service-card flex sm:gap-3 gap-4 flex-col justify-center sm:justify-around px-4 sm:p-10 rounded-lg shadow";
        marketingCard.innerHTML = `
            <div class='flex items-center gap-4'>
                <img src='${imageMarketing[index]}' alt='${card.title}' class='w-10 text-white' />
                <h4 class='text-white font-bold'>${card.title}</h4>
            </div>
            <div class='flex flex-col justify-center'>
                <h5 class='mb-4 text-justify text-md sm:text-sm text-white'>${card.description}</h5>
                <a href="#contactus" class='flex gap-1 text-md sm:text-sm font-semibold text-secondary items-center hover:underline'>
                    <svg class='w-3 h-3 rtl:rotate-[270deg]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'>
                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778'/>
                    </svg>
                    ${card.buttonText}
                </a>
            </div>
        `;
        marketingContainer.appendChild(marketingCard);
    });
};

// Function to handle service selection based on tab id (Technical or Marketing)
function handleService(tabId) {
    const techContainer = document.getElementById("tech-container");
    const marketingContainer = document.getElementById("marketing-container");

    if (tabId === 'tech-tab') {
        techContainer.style.display = "grid";
        marketingContainer.style.display = "none";
        document.getElementById("selected-title").textContent = "الخدمات التقنية";
    } else if (tabId === 'marketing-tab') {
        techContainer.style.display = "none";
        marketingContainer.style.display = "grid";
        document.getElementById("selected-title").textContent = "الخدمات التسويقية";
    }
}

// Initialize language selection and card loading on DOM load
document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.querySelector("select");
    languageSelector.addEventListener("change", (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        localStorage.setItem("i18next", selectedLanguage);
    });

    const initialLanguage = localStorage.getItem("i18next") || "en";
    setLanguage(initialLanguage);
    loadCards();
    tabsClick();
});
