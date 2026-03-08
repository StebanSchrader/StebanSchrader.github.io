let hero = document.querySelector(".hero");
hero.style.display = 'flex';
hero.style.flexDirection = 'column';

function basicInitalisation() {
    // Add a main title at the top
    let pageTitle = document.createElement("h1");
    pageTitle.textContent = "Portefolio d'apprentissage";
    pageTitle.style.color = "white";
    pageTitle.style.textAlign = "center";
    pageTitle.style.width = "100%";
    pageTitle.style.marginBottom = "1.5rem";
    pageTitle.style.fontSize = "4.5rem"; // Increased font size
    pageTitle.style.textTransform = "uppercase";
    pageTitle.style.letterSpacing = "4px"; // Increased letter spacing to match larger size
    pageTitle.style.fontFamily = "Sf-Pro"; // matching the rest of the site fonts
    hero.append(pageTitle);

    // Create a main wrapper to hold both the buttons on the left and content on the राइट
    let mainWrapper = document.createElement("div");
    mainWrapper.style.display = "flex";
    mainWrapper.style.flexDirection = "row";
    mainWrapper.style.gap = "4rem";
    mainWrapper.style.width = "100%";
    mainWrapper.style.maxWidth = "1200px";
    mainWrapper.style.padding = "2rem";
    mainWrapper.style.marginTop = "2rem";
    hero.append(mainWrapper);

    // Left sidebar for the main competence buttons
    let sidebar = document.createElement("div");
    sidebar.style.display = 'flex';
    sidebar.style.flexDirection = 'column';
    sidebar.style.gap = '15px';
    sidebar.style.minWidth = "150px";
    sidebar.style.transition = 'all 0.5s ease';
    mainWrapper.append(sidebar);

    // Right area for the competence content (ACs etc.)
    let contentArea = document.createElement("div");
    contentArea.id = "c-content";
    contentArea.style.flex = "1";
    contentArea.style.color = "white";
    mainWrapper.append(contentArea);

    sidebar.onclick = function () {
        if (sidebar.dataset.reduced === "true") {
            sidebar.dataset.reduced = "false";
            sidebar.style.transform = "scale(1)";
            sidebar.style.filter = "grayscale(0%)";
            sidebar.style.opacity = "1";
            sidebar.style.cursor = "default";

            contentArea.innerHTML = "";
        }
    };

    let ACColors = ["#FDCF42", "#91AE4F", "#5771BF"];

    for (let i = 0; i < ACColors.length; i++) {
        let btn = document.createElement("button");
        btn.textContent = "C" + Number(i + 3);

        // Glassy effect for the C buttons
        btn.style.color = "white";
        btn.style.border = "1px solid rgba(255, 255, 255, 0.4)";
        btn.style.background = "rgba(255, 255, 255, 0.1)";
        btn.style.backdropFilter = "blur(10px)";
        btn.style.WebkitBackdropFilter = "blur(10px)";
        btn.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

        btn.style.padding = "15px";
        btn.style.borderRadius = "12px";
        btn.style.cursor = "pointer";
        btn.style.fontWeight = "bold";
        btn.style.fontSize = "1.2rem";
        btn.style.transition = "all 0.3s ease";

        btn.onclick = function (e) {
            e.stopPropagation();

            sidebar.dataset.reduced = "true";
            sidebar.style.transform = "scale(0.85)";
            sidebar.style.filter = "grayscale(100%)";
            sidebar.style.opacity = "0.7";
            sidebar.style.cursor = "pointer";

            contentArea.innerHTML = "";
            window["C" + (i + 3)](contentArea);
        };
        btn.onmouseenter = function () {
            btn.style.background = "rgba(255, 255, 255, 0.3)";
            btn.style.transform = "translateY(-3px)";
            btn.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.2)";
        }
        btn.onmouseleave = function () {
            btn.style.background = "rgba(255, 255, 255, 0.1)";
            btn.style.transform = "translateY(0)";
            btn.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }
        sidebar.append(btn);
    }
}

function createCompetenceContent(container, title, description, acData = []) {
    if (!container) {
        console.log("A implementer");
        return;
    }

    container.innerHTML = "";

    // Wrapper for the whole competence content (flex column)
    let wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.gap = "1.5rem";
    wrapper.style.alignItems = "flex-start";
    wrapper.style.width = "100%";

    // Top: Text content
    let textContainer = document.createElement("div");
    textContainer.innerHTML = "<h2>" + title + "</h2><p>" + description + "</p>";

    // Bottom wrapper: buttons and glassmorphic content panel
    let bottomWrapper = document.createElement("div");
    bottomWrapper.style.display = "flex";
    bottomWrapper.style.flexDirection = "row";
    bottomWrapper.style.gap = "2rem";
    bottomWrapper.style.width = "100%";
    bottomWrapper.style.alignItems = "stretch";

    // Bottom left: buttons (arranged vertically)
    let buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.flexDirection = "column";
    buttonsContainer.style.gap = "10px";
    buttonsContainer.style.minWidth = "180px";

    // Right: Glassy container (hidden initially)
    let detailContainer = document.createElement("div");
    detailContainer.style.display = "none";
    detailContainer.style.flex = "1";
    detailContainer.style.background = "rgba(255, 255, 255, 0.1)";
    detailContainer.style.backdropFilter = "blur(12px)";
    detailContainer.style.WebkitBackdropFilter = "blur(12px)";
    detailContainer.style.border = "1px solid rgba(255, 255, 255, 0.2)";
    detailContainer.style.borderRadius = "16px";
    detailContainer.style.padding = "2rem";
    detailContainer.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.2)";
    detailContainer.style.color = "white";

    // Store rows so we can toggle arrows easily
    let acRows = [];

    // Only create up to the number of acData provided
    let numButtons = acData.length;

    for (let i = 1; i <= numButtons; i++) {
        // Create a row for each button to contain both the button and its arrow
        let btnRow = document.createElement("div");
        btnRow.style.display = "flex";
        btnRow.style.flexDirection = "row";
        btnRow.style.alignItems = "center";
        btnRow.style.gap = "15px";

        let btn = document.createElement("button");
        btn.textContent = "AC " + i;
        btn.style.flex = "1"; // take up all space before the arrow
        btn.style.padding = "10px 15px";
        btn.style.border = "none";
        btn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        btn.style.color = "white";
        btn.style.borderRadius = "5px";
        btn.style.cursor = "pointer";
        btn.style.transition = "all 0.3s ease";

        // Arrow specifically for this button (hidden initially)
        let arrow = document.createElement("div");
        arrow.style.display = "none";
        arrow.style.fontSize = "1.5rem";
        arrow.style.color = "rgba(255, 255, 255, 0.9)";
        arrow.innerHTML = '<i class="fas fa-chevron-right"></i>';

        btn.onmouseenter = () => btn.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        btn.onmouseleave = () => {
            if (btn.dataset.active !== "true") {
                btn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            }
        };

        btn.onclick = (e) => {
            e.stopPropagation(); // Prevent closing the container

            // Reset all rows
            acRows.forEach(row => {
                row.btn.dataset.active = "false";
                row.btn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                row.btn.style.transform = "scale(1)";
                row.btn.style.fontWeight = "normal";
                row.arrow.style.display = "none"; // hide all arrows
            });

            // Update clicked button style
            btn.dataset.active = "true";
            btn.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
            btn.style.transform = "scale(1.05)";
            btn.style.fontWeight = "bold";

            // Show arrow specifically for this button
            arrow.style.display = "block";

            // Show content
            detailContainer.style.display = "block";

            let data = acData[i - 1];

            detailContainer.innerHTML = `<h3>${title} - AC ${i}</h3>
                                         <h4 style="margin-top: 0.5rem; color: #E0E0E0; font-style: italic; font-weight: bold;">${data.subtitle}</h4>
                                         <p style="margin-top: 1rem; line-height: 1.6; font-size: 1.1rem; opacity: 0.9;">
                                           ${data.content}
                                         </p>`;
        };

        btnRow.append(btn);
        btnRow.append(arrow);
        buttonsContainer.append(btnRow);

        acRows.push({ btn: btn, arrow: arrow });
    }

    bottomWrapper.append(buttonsContainer);
    bottomWrapper.append(detailContainer);

    wrapper.append(textContainer);
    wrapper.append(bottomWrapper);

    container.append(wrapper);
}

function C3(container) {
    let listContentAC1 = `
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En sécurisant le système d'information</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Lors du développement de mes applications communicantes (en C et en Java), la gestion prudente des ports et des sockets a été indispensable pour éviter les failles d'accès de base et maintenir le contrôle sur les flux d'informations.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En appliquant les normes en vigueur et les bonnes pratiques architecturales et de sécurité</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Le respect rigoureux des protocoles de transport standards comme TCP (pour la fiabilité) et UDP (pour la rapidité) m'a permis de concevoir des architectures réseau conformes aux modèles reconnus.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En offrant une qualité de service optimale</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    En ciblant le bon protocole (TCP ou UDP) selon les besoins du projet (perte de paquet tolérée ou non, vitesse de transmission), j'ai pu garantir une application fluide et adaptée à son cas d'usage.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En assurant la continuité d'activité</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    La gestion correcte des adresses IP et des sockets côté serveur assure qu'en cas de déconnexion d'un client, le service global ne s'interrompt pas pour les autres utilisateurs connectés.
                </div>
            </li>
        </ul>
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <span style="font-weight: bold; color: #FDCF42;">Bilan :</span>
            <p style="margin-top: 0.5rem; font-weight: normal; opacity: 0.9; font-size: 0.95rem;">
                Ce cours d'architecture réseau m'a permis de comprendre concrètement les couches de communication. La manipulation bas niveau en C et orientée objet en Java m'a donné une vision complète de la façon dont les machines dialoguent entre elles.
            </p>
        </div>
    `;

    let listContentAC2 = `
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En sécurisant le système d'information</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    La publication de services web via Docker sur un réseau local et depuis l'extérieur m'a demandé de configurer avec attention la redirection de port sur routeur, contrôlant ainsi précisément quels conteneurs étaient exposés sur internet.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En appliquant les normes en vigueur et les bonnes pratiques architecturales et de sécurité</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Ce projet m'a permis d'exploiter les protocoles et services standards de réseau (DNS personnalisé, DHCP, UPnP natif) et d'évoluer d'une architecture lourde (machines virtuelles) vers les bonnes pratiques modernes de conteneurisation.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En offrant une qualité de service optimale</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    La simulation initiale sur des machines virtuelles s'étant avérée trop peu performante pour mon réseau d'entreprise, le passage sur une architecture Docker (conteneurs légers) a drastiquement amélioré la légèreté et la fluidité du SI.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En assurant la continuité d'activité</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Malgré les restrictions imposées par le réseau d'établissement (Eduroam), j'ai su m'adapter et déployer ma propre infrastructure personnelle pour garantir l'accessibilité ininterrompue de mes sites et services réseau.
                </div>
            </li>
        </ul>
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <span style="font-weight: bold; color: #FDCF42;">Bilan :</span>
            <p style="margin-top: 0.5rem; font-weight: normal; opacity: 0.9; font-size: 0.95rem;">
                Cette expérience m'a confronté à la réalité des déploiements réseaux. J'ai pu expérimenter concrètement la différence d'optimisation entre la virtualisation classique et la conteneurisation, tout en apprenant à bâtir des accès réseau fiables via le routage DHCP/DNS et le NAT.
            </p>
        </div>
    `;

    let listContentAC3 = `
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En sécurisant le système d'information</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    J'ai appris à évaluer les compromis de sécurité : bien qu'un conteneur soit plus léger, une faille peut compromettre la machine hôte entière, contrairement à une machine virtuelle qui offre une isolation système beaucoup plus stricte.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En appliquant les normes en vigueur et les bonnes pratiques architecturales et de sécurité</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Le choix entre VM et conteneur Docker dicte l'architecture de sécurité à adopter. J'ai compris l'importance de durcir les configurations Docker (gestion des privilèges, isolation réseau) pour pallier le partage du noyau hôte.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En offrant une qualité de service optimale</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Il a fallu jongler entre les besoins de performances brutes (où les conteneurs excellent) et les impératifs de sécurité critique (où la lourdeur d'une machine virtuelle se justifie par son isolation).
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En assurant la continuité d'activité</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Comprendre ces vulnérabilités permet de s'assurer qu'une attaque sur un service conteneurisé ne provoque pas l'effondrement ou la compromission de toute l'infrastructure sous-jacente.
                </div>
            </li>
        </ul>
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <span style="font-weight: bold; color: #FDCF42;">Bilan :</span>
            <p style="margin-top: 0.5rem; font-weight: normal; opacity: 0.9; font-size: 0.95rem;">
                La sécurisation n'est pas qu'une question de pare-feu, c'est aussi un choix d'infrastructure. Savoir distinguer les véritables isolements (VM) des isolements applicatifs (conteneurs) a été une leçon essentielle dans ma compréhension de la défense d'un système.
            </p>
        </div>
    `;

    createCompetenceContent(
        container,
        "Compétence 3",
        "Administrer des systèmes informatiques communicants complexes",
        [
            { subtitle: "Concevoir et développer des applications communicantes", content: listContentAC1 },
            { subtitle: "Utiliser des serveurs et des services réseaux virtualisés", content: listContentAC2 },
            { subtitle: "Sécuriser les services et données d’un système", content: listContentAC3 }
        ]
    );
}

function C4(container) {
    let listContentAC1 = `
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les réglementations sur le respect de la vie privée et la protection des données personnelles</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Bien que l'optimisation soit primordiale, la création de vues matérialisées et d'index doit se faire en gardant à l'esprit quelles données (parfois sensibles) sont dupliquées et stockées pour un accès rapide.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les enjeux économiques, sociétaux et écologiques de l'utilisation du stockage de données, ainsi que les différentes infrastructures (data centers, cloud, etc.)</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Une requête optimisée avec un bon index sollicite beaucoup moins le processeur du serveur de base de données. À grande échelle, cela réduit l'empreinte énergétique et les coûts d'infrastructure liés au requêtage massif.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En s'appuyant sur des bases mathématiques</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    La compréhension des complexités algorithmiques (notamment l'arbre B-tree pour les index) a été cruciale pour structurer intelligemment mes données et accélérer réellement le temps de réponse.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En assurant la cohérence et la qualité</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    L'utilisation de fonctions SQL directement dans le moteur de base de données permet d'éviter les erreurs de manipulations côté applicatif et garantit que la donnée est traitée de manière consistante à la source.
                </div>
            </li>
        </ul>
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <span style="font-weight: bold; color: #FDCF42;">Bilan :</span>
            <p style="margin-top: 0.5rem; font-weight: normal; opacity: 0.9; font-size: 0.95rem;">
                L'optimisation des modèles de données ne s'arrête pas au schéma initial de la base. J'ai compris l'importance de déporter la logique grâce aux vues et fonctions SQL, tout en maîtrisant la création d'index pour drastiquement réduire les temps d'exécution des requêtes métiers.
            </p>
        </div>
    `;

    let listContentAC2 = `
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les réglementations sur le respect de la vie privée et la protection des données personnelles</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    J'ai mis en place un hachage systématique des mots de passe utilisateurs en base de données, m'assurant ainsi d'être en stricte conformité avec les directives du RGPD en matière de stockage de données sensibles.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les enjeux économiques, sociétaux et écologiques de l'utilisation du stockage de données, ainsi que les différentes infrastructures (data centers, cloud, etc.)</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Gérer finement les accès (GRANT/REVOKE) permet d'éviter la duplication de bases de données de test entières entre étudiants, mutualisant ainsi l'espace de stockage sur notre serveur.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En s'appuyant sur des bases mathématiques</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Le hachage s'appuie sur des algorithmes cryptographiques asymétriques puissants, garantissant qu'une donnée volée reste mathématiquement irrésoluble et inutilisable pour un attaquant.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En assurant la cohérence et la qualité</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Le partage croisé de droits d'accès sur certaines tables avec mes camarades m'a confronté à la gestion des rôles et privilèges SQL, essentielle pour maintenir l'intégrité de mes propres données tout en permettant le travail collaboratif.
                </div>
            </li>
        </ul>
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <span style="font-weight: bold; color: #FDCF42;">Bilan :</span>
            <p style="margin-top: 0.5rem; font-weight: normal; opacity: 0.9; font-size: 0.95rem;">
                La gestion des droits et le hachage m'ont prouvé que la sécurité des données n'est pas une option. Savoir exactement qui a accès à quoi (collaboration sécurisée) et garantir l'opacité des données critiques (RGPD) sont des réflexes de conception désormais acquis.
            </p>
        </div>
    `;

    let listContentAC3 = `
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les réglementations sur le respect de la vie privée et la protection des données personnelles</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Lors de la restitution des profils utilisateurs et des posts sur le web, j'ai dû m'assurer de ne requêter et de n'afficher que les données publiques, masquant strictement les informations sensibles stockées en base.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les enjeux économiques, sociétaux et écologiques de l'utilisation du stockage de données, ainsi que les différentes infrastructures (data centers, cloud, etc.)</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Pour réaliser un système de "feed" fluide, j'ai optimisé les requêtes d'affichage (pagination, limit) afin de ne pas surcharger le serveur avec le téléchargement de milliers de messages simultanément.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En s'appuyant sur des bases mathématiques</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    La structuration des requêtes SQL complexes (jointures entre les tables d'utilisateurs et de messages) repose sur la théorie des ensembles (algèbre relationnelle), essentielle pour faire correspondre le bon post à son auteur.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En assurant la cohérence et la qualité</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    J'ai lié dynamiquement mon backend (qui interroge la BD) et mon frontend (interfaces web) pour garantir que l'affichage d'un profil ou d'un message soit toujours le reflet exact et mis à jour de la base de données.
                </div>
            </li>
        </ul>
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <span style="font-weight: bold; color: #FDCF42;">Bilan :</span>
            <p style="margin-top: 0.5rem; font-weight: normal; opacity: 0.9; font-size: 0.95rem;">
                À travers le développement de ces sites web, j'ai appris à jeter une passerelle entre le stockage brut et l'expérience utilisateur finale. Maîtriser l'extraction (SQL) et l'injection des données dans des composants visuels m'a rendu capable de rendre la donnée exploitable et lisible pour le client end-user.
            </p>
        </div>
    `;

    let listContentAC4 = `
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les réglementations sur le respect de la vie privée et la protection des données personnelles</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Lors de l'ingestion de flux de données externes (APIs), j'ai vérifié la conformité et nettoyé les données entrantes pour m'assurer de ne pas importer et stocker d'informations interdites ou sensibles à mon insu.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les enjeux économiques, sociétaux et écologiques de l'utilisation du stockage de données, ainsi que les différentes infrastructures (data centers, cloud, etc.)</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    L'optimisation des scripts d'importation de JSON permet de réduire la charge réseau et de limiter l'insertion redondante, ce qui économise l'espace de stockage en base de données.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En s'appuyant sur des bases mathématiques</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    La transformation complexe d'arbres JSON hiérarchiques vers de l'algèbre relationnelle (lignes et colonnes) implique une logique de mapping (tables de liaisons, clés étrangères) stricte pour ne perdre aucune relation.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En assurant la cohérence et la qualité</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    J'ai dû concevoir des routines de manipulation en code pour "parser", valider et reformater les données de l'API avant de les insérer, évitant ainsi de corrompre l'intégrité de mon schéma SQL existant.
                </div>
            </li>
        </ul>
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <span style="font-weight: bold; color: #FDCF42;">Bilan :</span>
            <p style="margin-top: 0.5rem; font-weight: normal; opacity: 0.9; font-size: 0.95rem;">
                Manipuler des API m'a fait comprendre la nécessité absolue de la transformation de données (ETL). Savoir ingérer un flux JSON brut, le qualifier, le découper selon les contraintes de ma base relationnelle et l'intégrer proprement est une compétence charnière dans tout SI moderne.
            </p>
        </div>
    `;

    createCompetenceContent(
        container,
        "Compétence 4",
        "Gérer des données de l’information",
        [
            { subtitle: "Optimiser les modèles de données de l’entreprise", content: listContentAC1 },
            { subtitle: "Assurer la confidentialité des données (intégrité et sécurité)", content: listContentAC2 },
            { subtitle: "Organiser la restitution de données à travers la programmation et la visualisation", content: listContentAC3 },
            { subtitle: "Manipuler des données hétérogènes", content: listContentAC4 }
        ]
    );
}

function C5(container) {
    let listContentAC1 = `
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En communiquant efficacement avec les différents acteurs d'un projet</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Lors de notre dernière SAÉ, nous avons organisé des points réguliers (dans l'esprit des "Daily Scrum" ou réunions de sprint) avec l'équipe pour identifier précisément les enjeux et s'assurer que notre compréhension du besoin client était parfaitement alignée.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les règles juridiques et les normes en vigueur</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    L'application d'un cadre de travail Agile strict nécessite la formalisation de documents de suivi (backlog, user stories). Ce respect des "règles du jeu" du framework a cadré notre processus de réflexion et de développement.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En sensibilisant à une gestion éthique, responsable, durable et interculturelle</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    La méthodologie Agile valorise l'adaptation et la collaboration humaine. Dès les premières phases d'identification des processus, nous avons assuré une répartition des tâches équitable et responsable selon les forces de chaque membre du groupe.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En adoptant une démarche proactive, créative et critique</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Avant même d'écrire une ligne de code, notre démarche a consisté à remettre en question le besoin initial pour concevoir un plan stratégique itératif, capable d'absorber les changements de direction en cours de route.
                </div>
            </li>
        </ul>
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <span style="font-weight: bold; color: #FDCF42;">Bilan :</span>
            <p style="margin-top: 0.5rem; font-weight: normal; opacity: 0.9; font-size: 0.95rem;">
                Cette SAÉ fut particulièrement riche en gestion de projet globale. Appliquer l'agilité à la phase d'analyse (et non seulement au développement) nous a permis d'extraire la substantifique moelle du besoin client et de poser des fondations solides pour l'ensemble du cycle de vie logiciel.
            </p>
        </div>
    `;

    let listContentAC2 = `
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En communiquant efficacement avec les différents acteurs d'un projet</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    La présentation systématique de nos avancées lors des "Sprint Reviews" a permis d'instaurer un dialogue transparent avec le client, validant ce qui fonctionnait ou corrigeant ce qui n'allait pas.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les règles juridiques et les normes en vigueur</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    La rédaction méthodique des User Stories et du Product Backlog garantit que chaque fonctionnalité développée répond à un besoin explicite et validé par le client, formalisant ainsi nos livrables.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En sensibilisant à une gestion éthique, responsable, durable et interculturelle</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Nous avons pris soin de recueillir et d'intégrer les retours clients à chaque fin de sprint, plaçant la satisfaction de l'utilisateur final au centre de nos préoccupations de manière responsable.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En adoptant une démarche proactive, créative et critique</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Planifier les sprints suivants en fonction des "reviews" a demandé une grande adaptabilité. Nous avons su ajuster notre trajectoire de développement pour coller au plus près des véritables attentes découvertes au fil du projet.
                </div>
            </li>
        </ul>
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <span style="font-weight: bold; color: #FDCF42;">Bilan :</span>
            <p style="margin-top: 0.5rem; font-weight: normal; opacity: 0.9; font-size: 0.95rem;">
                La formalisation des besoins par des User Stories et la validation itérative par des Sprint Reviews m'ont convaincu de l'efficacité de l'Agilité. Le client n'est plus un donneur d'ordre lointain, mais un partenaire impliqué en continu dans la création de valeur.
            </p>
        </div>
    `;

    let listContentAC3 = `
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En communiquant efficacement avec les différents acteurs d'un projet</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    L'organisation de réunions quasi-quotidiennes nous a permis d'évaluer en continu notre capacité à livrer les fonctionnalités prévues, ajustant ainsi nos efforts de développement en temps réel avec l'équipe.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les règles juridiques et les normes en vigueur</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    L'utilisation des "points d'effort" (story points) pour chiffrer la complexité des tâches est une norme essentielle que nous avons appliquée pour objectiver et rationaliser la charge calendaire de chaque sprint.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En sensibilisant à une gestion éthique, responsable, durable et interculturelle</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Plutôt que de cacher nos erreurs de conception, nous avons assumé en toute transparence l'accumulation de dette technique, l'expliquant et budgétisant son nettoyage ("fix") lors des remises de livrables de manière responsable.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En adoptant une démarche proactive, créative et critique</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    La capacité à mesurer la faisabilité implique du recul : admettre qu'un choix technologique initial n'était finalement pas le bon et planifier son refactoring démontre un vrai sens critique sur notre propre travail technique.
                </div>
            </li>
        </ul>
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <span style="font-weight: bold; color: #FDCF42;">Bilan :</span>
            <p style="margin-top: 0.5rem; font-weight: normal; opacity: 0.9; font-size: 0.95rem;">
                Estimer la faisabilité ne s'arrête pas à la phase de conception initiale. L'évaluation continue via les story points et l'acceptation assumée de la dette technique m'ont appris qu'un projet réaliste est un projet qui sait mesurer ses propres limites et rectifier ses erreurs en continu.
            </p>
        </div>
    `;

    let listContent = `
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En communiquant efficacement avec les différents acteurs d'un projet</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En respectant les règles juridiques et les normes en vigueur</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <span style="font-weight: bold;">En sensibilisant à une gestion éthique, responsable, durable et interculturelle</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </div>
            </li>
            <li style="margin-bottom: 0.5rem;">
                <span style="font-weight: bold;">En adoptant une démarche proactive, créative et critique</span>
                <div style="padding-left: 1.5rem; margin-top: 0.5rem; font-weight: normal; opacity: 0.8; font-size: 0.95rem;">
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </li>
        </ul>
    `;

    createCompetenceContent(
        container,
        "Compétence 5",
        "Conduire un projet",
        [
            { subtitle: "Identifier les processus présents dans une organisation en vue d’améliorer les systèmes d’information", content: listContentAC1 },
            { subtitle: "Formaliser les besoins du client et de l’utilisateur", content: listContentAC2 },
            { subtitle: "Identifier les critères de faisabilité d’un projet informatique", content: listContentAC3 },
            { subtitle: "Définir et mettre en œuvre une démarche de suivi de projet", content: listContent }
        ]
    );
}

basicInitalisation();
