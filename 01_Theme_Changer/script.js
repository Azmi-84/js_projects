function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = (Math.random() * 1).toFixed(2); 
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
    return { rgb, rgba, hex };
}

function displayColorInfo(box, info, color) {
    box.style.backgroundColor = color.rgb;
    info.innerHTML = `RGB: ${color.rgb}<br>RGBA: ${color.rgba}<br>HEX: ${color.hex}`;
    info.dataset.rgb = color.rgb;
    info.dataset.rgba = color.rgba;
    info.dataset.hex = color.hex;
}

function toggleColorInfo(type) {
    const infoDivs = document.querySelectorAll(".color-info");
    infoDivs.forEach(div => {
        const rgb = div.dataset.rgb;
        const rgba = div.dataset.rgba;
        const hex = div.dataset.hex;

        if (type === "all") {
            div.innerHTML = `RGB: ${rgb}<br>RGBA: ${rgba}<br>HEX: ${hex}`;
        } else if (type === "rgb") {
            div.innerHTML = `RGB: ${rgb}`;
        } else if (type === "rgba") {
            div.innerHTML = `RGBA: ${rgba}`;
        } else if (type === "hex") {
            div.innerHTML = `HEX: ${hex}`;
        }
    });
}

document.getElementById("generateButton").addEventListener("click", function () {
    const colorBox1 = document.getElementById("color-box1");
    const colorBox2 = document.getElementById("color-box2");
    const colorBox3 = document.getElementById("color-box3");
    const colorInfo1 = document.getElementById("color-info1");
    const colorInfo2 = document.getElementById("color-info2");
    const colorInfo3 = document.getElementById("color-info3");

    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const color3 = getRandomColor();

    displayColorInfo(colorBox1, colorInfo1, color1);
    displayColorInfo(colorBox2, colorInfo2, color2);
    displayColorInfo(colorBox3, colorInfo3, color3);
});

document.querySelectorAll(".toggle-button").forEach(button => {
    button.addEventListener("click", function () {
        toggleColorInfo(button.getAttribute("data-type"));
    });
});

document.querySelectorAll(".color-info").forEach(info => {
    info.addEventListener("mouseover", function () {
        const tooltip = document.createElement("span");
        tooltip.className = "tooltip";
        tooltip.innerText = "Copy";
        info.appendChild(tooltip);
    });

    info.addEventListener("mouseout", function () {
        const tooltip = info.querySelector(".tooltip");
        if (tooltip) {
            tooltip.remove();
        }
    });

    info.addEventListener("click", function () {
        const tooltip = info.querySelector(".tooltip");
        navigator.clipboard.writeText(info.innerText).then(() => {
            tooltip.innerText = "Copied!";
            setTimeout(() => {
                tooltip.innerText = "Copy";
            }, 1000);
        });
    });
});