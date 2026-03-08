let hero = document.querySelector(".hero");
hero.style.display = 'flex';
hero.style.flexDirection = 'column';

function basicInitalisation() {
    let grid = document.createElement("div");
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    grid.style.gap = '10px';
    grid.style.transition = 'all 0.5s ease';
    hero.append(grid);

    grid.onclick = function () {
        if (grid.dataset.reduced === "true") {
            grid.dataset.reduced = "false";
            grid.style.transform = "scale(1)";
            grid.style.filter = "grayscale(0%)";
            grid.style.opacity = "1";
            grid.style.cursor = "default";

            let contentContainer = document.getElementById("ac-content");
            if (contentContainer) {
                contentContainer.remove();
            }
        }
    };

    let ACColors = ["#FDCF42", "#91AE4F", "#5771BF"];

    for (let i = 0; i < ACColors.length; i++) {
        let btn = document.createElement("button");
        btn.textContent = "AC " + Number(i + 3);
        btn.style.color = "black";
        btn.style.border = "none";
        btn.style.backgroundColor = "white";
        btn.style.padding = "10px";
        btn.style.borderRadius = "5px";
        btn.style.cursor = "pointer";
        btn.onclick = function (e) {
            e.stopPropagation();

            grid.dataset.reduced = "true";
            grid.style.transform = "scale(0.8)";
            grid.style.filter = "grayscale(100%)";
            grid.style.opacity = "0.7";
            grid.style.cursor = "pointer";

            let contentContainer = document.getElementById("ac-content");
            if (!contentContainer) {
                contentContainer = document.createElement("div");
                contentContainer.id = "ac-content";
                contentContainer.style.marginTop = "2rem";
                contentContainer.style.width = "100%";
                contentContainer.style.maxWidth = "800px";
                contentContainer.style.color = "white";
                hero.append(contentContainer);
            } else {
                contentContainer.innerHTML = "";
            }

            window["C" + (i + 3)](contentContainer);
        };
        btn.onmouseenter = function () {
            btn.style.backgroundColor = ACColors[i];
            btn.style.color = "white";
        }
        btn.onmouseleave = function () {
            btn.style.backgroundColor = "white";
            btn.style.color = "black";
        }
        grid.append(btn);
    }
}

function C3(container) {
    if (container) {
        container.innerHTML = "<h2>AC 3</h2><p>A implementer</p>";
    } else {
        console.log("A implementer");
    }
}

function C4(container) {
    if (container) {
        container.innerHTML = "<h2>AC 4</h2><p>A implementer</p>";
    } else {
        console.log("A implementer");
    }
}

function C5(container) {
    if (container) {
        container.innerHTML = "<h2>AC 5</h2><p>A implementer</p>";
    } else {
        console.log("A implementer");
    }
}

basicInitalisation();
