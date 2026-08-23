/* =========================================================
   MAHEK LALU — PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. NAVBAR — ACTIVE SECTION
    ===================================================== */

    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");

    const updateActiveNav = () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =====================================================
       2. SMOOTH SCROLL
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

    });


    /* =====================================================
       3. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-main, " +
        ".stat-box, " +
        ".project-card, " +
        ".skill-category, " +
        ".journey-item, " +
        ".certificate-card, " +
        ".focus-box, " +
        ".next-content, " +
        ".contact-wrapper"
    );

    revealElements.forEach((element) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       4. STAGGER CARD ANIMATIONS
    ===================================================== */

    const cardGroups = [
        ".projects-grid .project-card",
        ".skills-layout .skill-category",
        ".certifications-grid .certificate-card"
    ];

    cardGroups.forEach((selector) => {

        const cards = document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 0.08}s`;

        });

    });


    /* =====================================================
       5. HERO ORBIT ANIMATION
    ===================================================== */

    const heroVisual = document.querySelector(".hero-visual");

    const floatingTags = document.querySelectorAll(
        ".floating-tag"
    );

    if (heroVisual && floatingTags.length > 0) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;

                floatingTags.forEach((tag, index) => {

                    const strength =
                        10 + index * 4;

                    const moveX =
                        x * strength;

                    const moveY =
                        y * strength;

                    tag.style.transform =
                        `translate(${moveX}px, ${moveY}px)`;

                });

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                floatingTags.forEach((tag) => {
                    tag.style.transform =
                        "translate(0, 0)";
                });

            }
        );

    }


    /* =====================================================
       6. DEVELOPER CARD — SUBTLE MOUSE EFFECT
    ===================================================== */

    const developerCard =
        document.querySelector(".developer-card");

    if (developerCard && heroVisual) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;

                const rotateX = -y * 5;
                const rotateY = x * 5;

                developerCard.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                developerCard.style.transform =
                    "rotate(-4deg)";

            }
        );

    }


    /* =====================================================
       7. BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons = document.querySelectorAll(
        ".primary-button, .secondary-button, .nav-button"
    );

    buttons.forEach((button) => {

        button.addEventListener("click", function (event) {

            const ripple =
                document.createElement("span");

            const rect =
                button.getBoundingClientRect();

            const size =
                Math.max(
                    rect.width,
                    rect.height
                );

            const x =
                event.clientX -
                rect.left -
                size / 2;

            const y =
                event.clientY -
                rect.top -
                size / 2;

            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.left =
                `${x}px`;

            ripple.style.top =
                `${y}px`;

            ripple.classList.add("button-ripple");

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });


    /* =====================================================
       8. CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.querySelector("#current-year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       9. SCROLL TO TOP
    ===================================================== */

    const scrollTopButton =
        document.querySelector(".scroll-top");

    if (scrollTopButton) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {
                    scrollTopButton.classList.add("show");
                } else {
                    scrollTopButton.classList.remove("show");
                }

            }
        );


        scrollTopButton.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       10. PERFORMANCE — DISABLE HEAVY EFFECTS ON MOBILE
    ===================================================== */

    const isMobile =
        window.matchMedia(
            "(max-width: 760px)"
        ).matches;

    if (isMobile) {

        if (heroVisual) {
            heroVisual.onmousemove = null;
        }

        if (developerCard) {
            developerCard.style.transform =
                "rotate(0deg)";
        }

        floatingTags.forEach((tag) => {
            tag.style.animationDuration =
                "7s";
        });

    }


    /* =====================================================
       11. REDUCED MOTION ACCESSIBILITY
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        revealElements.forEach((element) => {

            element.style.opacity = "1";

            element.style.transform =
                "none";

            element.style.transition =
                "none";

        });

    }

});