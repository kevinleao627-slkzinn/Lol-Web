document.addEventListener("DOMContentLoaded", () => {

    const editButton = document.querySelector(".edit-profile");

    editButton.addEventListener("click", () => {

        const nameElement =
            document.querySelector(".profile-info h1");

        const usernameElement =
            document.querySelector(".username");

        const newName = prompt(
            "Digite seu nome:",
            nameElement.textContent.trim()
        );

        if (newName && newName.trim() !== "") {

            nameElement.textContent = newName.trim();

            showNotification(
                "Nome do perfil atualizado!"
            );
        }

        const newUsername = prompt(
            "Digite seu nome de usuário:",
            usernameElement.textContent.trim().replace("@", "")
        );

        if (newUsername && newUsername.trim() !== "") {

            usernameElement.textContent =
                "@" + newUsername.trim().replace("@", "");

            showNotification(
                "Nome de usuário atualizado!"
            );
        }

    });


    const logoutButton =
        document.querySelector(".action-button.logout");

    logoutButton.addEventListener("click", (event) => {

        event.preventDefault();

        const confirmLogout = confirm(
            "Deseja realmente sair do seu perfil?"
        );

        if (confirmLogout) {

            showNotification(
                "Você saiu do perfil."
            );

            setTimeout(() => {

                window.location.href = "../index.html";

            }, 1200);

        }

    });


    function showNotification(message) {

        const existingNotification =
            document.querySelector(".profile-notification");

        if (existingNotification) {
            existingNotification.remove();
        }

        const notification =
            document.createElement("div");

        notification.className =
            "profile-notification";

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

        }, 3000);

    }


    const statCards =
        document.querySelectorAll(".stat-card");

    statCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-4px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0)";

        });

    });


    const matchCards =
        document.querySelectorAll(".match-card");

    matchCards.forEach(card => {

        card.addEventListener("click", () => {

            const result =
                card.querySelector(".match-info strong")
                    .textContent;

            const champion =
                card.querySelector(".match-champion img")
                    .alt;

            const score =
                card.querySelector(".match-score strong")
                    .textContent;

            showNotification(
                `${result} — ${champion} — ${score}`
            );

        });

    });


    const favoriteCard =
        document.querySelector(".favorite-card");

    favoriteCard.addEventListener("click", () => {

        const champion =
            favoriteCard.querySelector(".favorite-info h2")
                .textContent;

        showNotification(
            `${champion} é seu campeão favorito!`
        );

    });


    const settingsButton =
        document.querySelector(
            ".action-button:not(.logout)"
        );

    settingsButton.addEventListener("click", (event) => {

        event.preventDefault();

        showNotification(
            "Configurações estarão disponíveis em breve."
        );

    });


    const profileElements =
        document.querySelectorAll(
            ".profile-header, .stat-card, .favorite-card, .match-card"
        );

    profileElements.forEach((element, index) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(15px)";

        setTimeout(() => {

            element.style.transition =
                "opacity .5s ease, transform .5s ease";

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";

        }, 100 + (index * 80));

    });


    console.log(
        "%cLegends of the Rift",
        "color: #f0c33d; font-size: 20px; font-weight: bold;"
    );

    console.log(
        "Perfil do jogador carregado."
    );

});