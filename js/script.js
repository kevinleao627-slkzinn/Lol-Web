document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // NAVBAR / MENU MOBILE
    // ==========================================

    const nav = document.querySelector(".nav");
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        navToggle.setAttribute("aria-expanded", isOpen);
        navToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Fecha o menu quando clicar em algum link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            navToggle.textContent = "☰";
            navToggle.setAttribute("aria-expanded", "false");
        });
    });


    // ==========================================
    // NAVBAR AO ROLAR A PÁGINA
    // ==========================================

    function updateNavbar() {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    // ==========================================
    // FILTRO DE CAMPEÕES
    // ==========================================

    const roleButtons = document.querySelectorAll(".role-pill");
    const championCards = document.querySelectorAll(".champ-card");

    roleButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedRole = button.textContent
                .trim()
                .toLowerCase();

            // Remove o estado ativo dos outros filtros
            roleButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");


            championCards.forEach(card => {

                const role = card
                    .querySelector(".champ-label span")
                    .textContent
                    .trim()
                    .toLowerCase();

                // Converte "assassinos" para "assassina"
                const roleNormalized = normalizeRole(selectedRole);

                if (role === roleNormalized) {

                    card.style.display = "block";

                    setTimeout(() => {
                        card.classList.add("show");
                    }, 50);

                } else {

                    card.classList.remove("show");
                    card.style.display = "none";

                }

            });

        });

    });


    // Normaliza os nomes das classes
    function normalizeRole(role) {

        const roles = {
            "assassinos": "assassina",
            "lutadores": "lutador",
            "magos": "mago",
            "atiradores": "atirador",
            "suportes": "suporte",
            "tanques": "tanque"
        };

        return roles[role] || role;
    }


    // ==========================================
    // RESETAR FILTRO
    // ==========================================

    // Duplo clique em um filtro mostra todos
    roleButtons.forEach(button => {

        button.addEventListener("dblclick", () => {

            roleButtons.forEach(item => {
                item.classList.remove("active");
            });

            championCards.forEach(card => {
                card.style.display = "block";

                setTimeout(() => {
                    card.classList.add("show");
                }, 50);
            });

        });

    });


    // ==========================================
    // ANIMAÇÃO AO ENTRAR NA TELA
    // ==========================================

    const animatedElements = document.querySelectorAll(
        ".news-card, .champ-card, .mode-card, .skins-art, .skins-copy"
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });


    // ==========================================
    // PARALLAX DO HERO
    // ==========================================

    const heroBackground = document.querySelector(".hero-background");

    window.addEventListener("scroll", () => {

        const scrollPosition = window.scrollY;

        if (scrollPosition < window.innerHeight) {

            heroBackground.style.transform =
                `translateY(${scrollPosition * 0.25}px) scale(1.05)`;

        }

    });


    // ==========================================
    // BOTÕES "JOGAR GRÁTIS"
    // ==========================================

    const playButtons = document.querySelectorAll(
        ".btn-primary, .nav-cta"
    );

    playButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            showNotification(
                "Em breve você poderá começar sua jornada na Fenda!"
            );

        });

    });


    // ==========================================
    // NOTIFICAÇÃO
    // ==========================================

    function showNotification(message) {

        // Evita várias notificações ao mesmo tempo
        const existingNotification =
            document.querySelector(".notification");

        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement("div");

        notification.className = "notification";

        notification.innerHTML = `
            <span>✦</span>
            <p>${message}</p>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add("show");
        }, 10);

        setTimeout(() => {

            notification.classList.remove("show");

            setTimeout(() => {
                notification.remove();
            }, 300);

        }, 3500);

    }


    // ==========================================
    // CARDS DE CAMPEÕES
    // ==========================================

    championCards.forEach(card => {

        card.addEventListener("click", () => {

            const championName =
                card.querySelector(".champ-label b").textContent;

            const championRole =
                card.querySelector(".champ-label span").textContent;

            showNotification(
                `${championName} — ${championRole}`
            );

        });

    });


    // ==========================================
    // CARDS DE NOTÍCIAS
    // ==========================================

    const newsCards = document.querySelectorAll(".news-card");

    newsCards.forEach(card => {

        card.addEventListener("click", () => {

            const title =
                card.querySelector("h3").textContent;

            showNotification(
                `Notícia selecionada: ${title}`
            );

        });

    });


    // ==========================================
    // MODO DE JOGO
    // ==========================================

    const modeCards = document.querySelectorAll(".mode-card");

    modeCards.forEach(card => {

        card.addEventListener("click", () => {

            const mode =
                card.querySelector("h3").textContent;

            showNotification(
                `Modo selecionado: ${mode}`
            );

        });

    });


    // ==========================================
    // EFEITO DE HOVER NOS CAMPEÕES
    // ==========================================

    championCards.forEach(card => {

        const image = card.querySelector(".champ-portrait img");

        card.addEventListener("mouseenter", () => {

            image.style.transform = "scale(1.08)";

        });

        card.addEventListener("mouseleave", () => {

            image.style.transform = "scale(1)";

        });

    });


    // ==========================================
    // ACESSIBILIDADE
    // ==========================================

    navToggle.setAttribute("aria-expanded", "false");


    // ==========================================
    // CONSOLE
    // ==========================================

    console.log(
        "%cLegends of the Rift",
        "color: #f0c33d; font-size: 20px; font-weight: bold;"
    );

    console.log(
        "Projeto acadêmico — Legends of the Rift"
    );

});