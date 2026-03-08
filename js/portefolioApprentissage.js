let hero = document.querySelector(".hero");
hero.style.display = 'flex';
function basicInitalisation() {
    let grid = document.createElement("div");
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    grid.style.gap = '10px';
    hero.append(grid);

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
        btn.onclick = function () {
            fadeOut(grid);
            window["C" + (i + 3)]();
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

function C3() {
    console.log("A implementer")
}

function C4() {
    console.log("A implementer")
}

function C5() {
    console.log("A implementer")
}

function fadeOut(el) {
    el.animate([
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 500,
        fill: 'forwards',
        easing: 'ease-out'
    });
}

function fadeIn(el) {
    el.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 500,
        fill: 'forwards',
        easing: 'ease-in'
    });
}

basicInitalisation();
