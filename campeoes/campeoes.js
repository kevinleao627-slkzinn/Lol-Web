document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // MENU MOBILE
    // ========================================

    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            const isOpen = navLinks.classList.contains("open");
            navToggle.setAttribute("aria-expanded", isOpen);
        });

        // Fecha o menu ao clicar em um link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ========================================
    // FILTRO DE CAMPEÕES
    // ========================================

    const roleButtons = document.querySelectorAll(".role-pill");
    const championCards = document.querySelectorAll(".champ-card");
    const searchInput = document.querySelector("#championSearch");
    const noResults = document.querySelector("#noResults");

    let selectedRole = "todos";

    // Normaliza texto para facilitar comparação
    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    // ========================================
    // ATUALIZAR CAMPEÕES
    // ========================================

    function updateChampions() {
        const searchTerm = normalizeText(searchInput.value.trim());
        let visibleCards = 0;

        championCards.forEach(card => {
            const championName = normalizeText(
                card.dataset.name || ""
            );
            const championRole = normalizeText(
                card.dataset.role || ""
            );

            // Verifica função
            const matchesRole =
                selectedRole === "todos" ||
                championRole === selectedRole;

            // Verifica pesquisa
            const matchesSearch =
                championName.includes(searchTerm);

            // Exibe ou esconde
            if (matchesRole && matchesSearch) {

                card.classList.remove("hidden");

                // Reinicia a animação
                card.style.animation = "none";
                card.offsetHeight;
                card.style.animation = "";

                visibleCards++;

            } else {

                card.classList.add("hidden");

            }
        });

        // ========================================
        // RESULTADO DA PESQUISA
        // ========================================

        if (noResults) {
            if (visibleCards === 0) {
                noResults.classList.add("show");
            } else {
                noResults.classList.remove("show");
            }
        }
    }

    // ========================================
    // BOTÕES DE FUNÇÃO
    // ========================================

    roleButtons.forEach(button => {
        button.addEventListener("click", () => {

            // Remove estado ativo
            roleButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            // Ativa botão selecionado
            button.classList.add("active");

            // Atualiza função
            selectedRole = normalizeText(
                button.dataset.role || "todos"
            );
            updateChampions();
        });

    });

    // ========================================
    // PESQUISA POR NOME
    // ========================================

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            updateChampions();
        });

    }

    // ========================================
    // ENTER NA PESQUISA
    // ========================================

    if (searchInput) {
        searchInput.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                searchInput.value = "";
                updateChampions();
                searchInput.blur();
            }
        });
    }

    // ========================================
    // CARDS DOS CAMPEÕES
    // ========================================

    championCards.forEach(card => {
        card.addEventListener("click", () => {
            const championName =
                card.querySelector(".champ-name")?.textContent ||
                card.dataset.name ||
                "Campeão";

            console.log(`Campeão selecionado: ${championName}`);

            // Efeito visual
            card.classList.add("selected");

            setTimeout(() => {
                card.classList.remove("selected");
            }, 300);
        });
    });

    // ========================================
    // BOTÃO "VOLTAR AO INÍCIO"
    // ========================================

    const homeButton = document.querySelector(".champions-cta a");
    if (homeButton) {
        homeButton.addEventListener("click", () => {
            console.log("Voltando para a página inicial...");
        });
    }

    // ========================================
    // ANIMAÇÃO AO ENTRAR NA TELA
    // ========================================

    const animatedElements =
        document.querySelectorAll(
            ".champions-hero-content, .section-heading, .champ-card, .champions-cta"
        );

    if ("IntersectionObserver" in window) {
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
    } else {
        animatedElements.forEach(element => {
            element.classList.add("visible");
        });

    }

    // ========================================
    // NAVBAR AO ROLAR
    // ========================================

    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });

    }

    // ========================================
    // ACESSIBILIDADE
    // ========================================
    if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menu");
    }

    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    updateChampions();
    console.log("Champions page carregada com sucesso.");
});