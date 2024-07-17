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
    loadCards(language);
};

// Function to handle tab clicks and filter cards accordingly
const tabsClick = () => {
    const tabs = document.querySelectorAll(".tab-focus");
    tabs.forEach((tab) => {
        tab.addEventListener("click", (event) => {
            event.preventDefault();
            tabs.forEach((tab) => tab.classList.remove("active"));
            event.currentTarget.classList.add("active");
            const tabId = event.currentTarget.getAttribute("id");
            handleService(tabId);
        });
    });
};

const loadCards = (language) => {
    // const language = localStorage.getItem("i18next") || "en";
    const technicalData = translations[language]["Cards"];
    const marketingData = translations[language]["MarketingCard"];
    const imageService = ["assets/cpu.svg", "assets/designer.svg", "assets/setting.svg", "assets/gear.svg", "assets/digitalization.svg"];
    const imageMarketing = [
        "assets/online-marketing.svg",
        "assets/social-media.svg",
        "assets/headphone.svg",
        "assets/creative-work.svg",
        "assets/pen-tablet.svg",
        "assets/palette.svg",
    ];
    const techContainer = document.getElementById("tech-container");
    const marketingContainer = document.getElementById("marketing-container");
    techContainer.innerHTML = ""; // Clear existing technical cards
    marketingContainer.innerHTML = ""; // Clear existing marketing cards
    if (language === "en") {
        document.getElementById("marketing-a").classList.add("sm:rounded-e-lg");
        document.getElementById("marketing-a").classList.remove("sm:rounded-l-lg");
    } else {
        document.getElementById("marketing-a").classList.add("sm:rounded-l-lg");
        document.getElementById("marketing-a").classList.remove("sm:rounded-e-lg");
    }
    const allServiceCards = [];

    technicalData.forEach((card, index) => {
        const serviceCard = document.createElement("div");
        serviceCard.className = "service-card flex flex-col items-start justify-evenly p-4 lg:p-8 rounded-lg shadow";
        allServiceCards.push(serviceCard);

        let description = card.description;
        const maxLength = 140;

        if (description.length > maxLength) {
            const shortDescription = description.substring(0, maxLength) + "...";
            serviceCard.innerHTML = `
                <div class='flex justify-start items-center gap-3'>
                    <img src='${imageService[index]}' alt='${card.title}' class='w-10 text-white' />
                    <h4 class='text-white font-bold'>${card.title}</h4>
                </div>
                <div class='flex flex-col justify-center'>
                    <h5 class='text-justify text-md leading-tight text-white'>${shortDescription}</h5>
                    <a href="#" class='text-secondary hover:underline see-more'>${card.SeeMore}</a>
                    <a href="#" class='text-secondary hover:underline see-less hidden'>${card.SeeLess}</a>
                </div>
                <a href="#contactus" class='flex gap-1 text-md font-semibold text-secondary items-center hover:underline'>
                    <svg class='w-3 h-3 rtl:rotate-[270deg]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'>
                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778'/>
                    </svg>
                    ${card.buttonText}
                </a>
            `;

            const seeMoreBtn = serviceCard.querySelector(".see-more");
            const seeLessBtn = serviceCard.querySelector(".see-less");
            const descriptionEl = serviceCard.querySelector("h5");

            seeMoreBtn.addEventListener("click", function (e) {
                e.preventDefault();
                closeAllOtherCards(serviceCard);
                serviceCard.style.height = "fit-content";
                serviceCard.style.gap = "1rem";
                descriptionEl.textContent = description;
                seeMoreBtn.classList.add("hidden");
                seeLessBtn.classList.remove("hidden");
            });

            seeLessBtn.addEventListener("click", function (e) {
                e.preventDefault();
                if (window.innerWidth <= 768) {
                    serviceCard.style.height = "450px";
                } else {
                    serviceCard.style.height = "400px";
                }
                serviceCard.style.gap = "0";
                descriptionEl.textContent = shortDescription;
                seeMoreBtn.classList.remove("hidden");
                seeLessBtn.classList.add("hidden");
            });
        } else {
            serviceCard.innerHTML = `
                <div class='flex justify-start items-center gap-3'>
                    <img src='${imageService[index]}' alt='${card.title}' class='w-10 text-white' />
                    <h4 class='text-white font-bold'>${card.title}</h4>
                </div>
                <div class='flex flex-col justify-center'>
                    <h5 class='text-justify leading-tight text-md text-white'>${description}</h5>
                </div>
                <a href="#contactus" class='flex gap-1 text-md font-semibold text-secondary items-center hover:underline'>
                    <svg class='w-3 h-3 rtl:rotate-[270deg]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'>
                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778'/>
                    </svg>
                    ${card.buttonText}
                </a>
            `;
        }

        techContainer.appendChild(serviceCard);
    });

    function closeAllOtherCards(currentCard) {
        allServiceCards.forEach((card) => {
            if (card !== currentCard) {
                const seeMoreBtn = card.querySelector(".see-more");
                const seeLessBtn = card.querySelector(".see-less");
                const descriptionEl = card.querySelector("h5");

                if (seeMoreBtn && seeLessBtn && descriptionEl) {
                    // card.style.height = '400px';
                    descriptionEl.textContent = descriptionEl.textContent.substring(0, 180) + "...";
                    seeMoreBtn.classList.remove("hidden");
                    seeLessBtn.classList.add("hidden");
                }
            }
        });
    }

    const allMarketingCards = [];

    marketingData.forEach((card, index) => {
        const marketingCard = document.createElement("div");
        marketingCard.className = "service-card flex flex-col items-start justify-evenly p-4 lg:p-8 rounded-lg shadow";
        allMarketingCards.push(marketingCard);

        let description = card.description;
        const maxLength = 148;

        if (description.length > maxLength) {
            const shortDescription = description.substring(0, maxLength) + "...";
            marketingCard.innerHTML = `
                <div class='flex justify-start items-center gap-4'>
                    <img src='${imageMarketing[index]}' alt='${card.title}' class='w-10 text-white' />
                    <h4 class='text-white font-bold'>${card.title}</h4>
                </div>
                <div class='flex flex-col justify-center'>
                    <h5 class=' text-justify text-md leading-tight text-white'>${shortDescription}</h5>
                    <a href="#" class='text-secondary hover:underline see-more'>${card.SeeMore}</a>
                    <a href="#" class='text-secondary hover:underline see-less hidden'>${card.SeeLess}</a>
                </div>
                <a href="#contactus" class='flex gap-1 text-md font-semibold text-secondary items-center hover:underline'>
                    <svg class='w-3 h-3 rtl:rotate-[270deg]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'>
                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778'/>
                    </svg>
                    ${card.buttonText}
                </a>
            `;

            const seeMoreBtn = marketingCard.querySelector(".see-more");
            const seeLessBtn = marketingCard.querySelector(".see-less");
            const descriptionEl = marketingCard.querySelector("h5");

            seeMoreBtn.addEventListener("click", function (e) {
                e.preventDefault();
                closeAllOtherMarketingCards(marketingCard);
                marketingCard.style.height = "fit-content";
                marketingCard.style.gap = "1rem";
                descriptionEl.textContent = description;
                seeMoreBtn.classList.add("hidden");
                seeLessBtn.classList.remove("hidden");
            });

            seeLessBtn.addEventListener("click", function (e) {
                e.preventDefault();
                if (window.innerWidth <= 768) {
                    marketingCard.style.height = "450px";
                } else {
                    marketingCard.style.height = "400px";
                }
                marketingCard.style.gap = "0";
                descriptionEl.textContent = shortDescription;
                seeMoreBtn.classList.remove("hidden");
                seeLessBtn.classList.add("hidden");
            });
        } else {
            marketingCard.innerHTML = `
                <div class='flex justify-start items-center gap-4'>
                    <img src='${imageMarketing[index]}' alt='${card.title}' class='w-10 text-white' />
                    <h4 class='text-white font-bold'>${card.title}</h4>
                </div>
                <div class='flex flex-col justify-center'>
 description-control                </div>
                <a href="#contactus" class='flex gap-1 text-md font-semibold text-secondary items-center hover:underline'>
                    <svg class='w-3 h-3 rtl:rotate-[270deg]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'>
                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778'/>
                    </svg>
                    ${card.buttonText}
                </a>
            `;
        }

        marketingContainer.appendChild(marketingCard);
    });

    function closeAllOtherMarketingCards(currentCard) {
        allMarketingCards.forEach((card) => {
            if (card !== currentCard) {
                const seeMoreBtn = card.querySelector(".see-more");
                const seeLessBtn = card.querySelector(".see-less");
                const descriptionEl = card.querySelector("h5");

                if (seeMoreBtn && seeLessBtn && descriptionEl) {
                    if (window.innerWidth <= 768) {
                        card.style.height = "450px";
                    } else {
                        card.style.height = "400px";
                    }
                    descriptionEl.textContent = descriptionEl.textContent.substring(0, 180) + "...";
                    seeMoreBtn.classList.remove("hidden");
                    seeLessBtn.classList.add("hidden");
                }
            }
        });
    }
};

// Function to handle service selection based on tab id (Technical or Marketing)
function handleService(tabId) {
    const techContainer = document.getElementById("tech-container");
    const marketingContainer = document.getElementById("marketing-container");

    if (tabId === "tech-tab") {
        techContainer.style.display = "grid";
        marketingContainer.style.display = "none";
        localStorage.getItem("i18next") === "ar"
            ? (document.getElementById("selected-title").textContent = "الخدمات التقنية")
            : (document.getElementById("selected-title").textContent = "Tech Solutions");
    } else if (tabId === "marketing-tab") {
        techContainer.style.display = "none";
        marketingContainer.style.display = "grid";
        localStorage.getItem("i18next") === "ar"
            ? (document.getElementById("selected-title").textContent = "الخدمات التسويقية")
            : (document.getElementById("selected-title").textContent = "Marketing Solutions");
    }
}
function removeClass() {
    document.getElementById("select-div").removeClass("order-last");
}

emailjs.init("qtccHPQN3hT81SgUx"); // Replace with your actual public key

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("body").style.display = "block";
    const navLinks = document.querySelectorAll("#navbar-default .nav-link");
    const navbarToggle = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const languageSelector = document.querySelector("select");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navbarToggle.getAttribute("aria-expanded") === "true") {
                navbarToggle.click();
            }
        });
    });

    languageSelector.addEventListener("change", (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        localStorage.setItem("i18next", selectedLanguage);
    });

    const initialLanguage = localStorage.getItem("i18next") || "en";
    setLanguage(initialLanguage);
    loadCards(initialLanguage);
    tabsClick();

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        emailjs.sendForm("service_44aydbo", "template_vlze3xf", form).then(
            () => {
                console.log("SUCCESS!");
                alert("Message sent successfully!");
            },
            (error) => {
                console.log("FAILED...", error.text);
                alert("Failed to send message: " + error.text);
            }
        );
    });
});
