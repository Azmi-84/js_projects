document.getElementById('start-btn').addEventListener('click', function () {
    const input = document.getElementById('input').value.split(' ').map(Number); 

    if (!input.length || input.some(isNaN)) {
        alert('Please give a valid number.');
        return;
    }

    let isAscending = input.every((val, i, arr) => !i || arr[i - 1] <= val);
    let isDescending = input.every((val, i, arr) => !i || arr[i - 1] >= val);

    if (isAscending) {
        displaySorted(input, 'sorted in ascending order');
    } else if (isDescending) {
        displaySorted(input, 'sorted in descending order');
    } else {
        enableSortingOptions(); 
    }
});

function displaySorted(arr, descriptions) {
    document.getElementById('bubble-sorted').textContent = arr.join(', ');
    document.getElementById('bubble-sorted-description').textContent = `The provided number is ${descriptions}`;
}

function enableSortingOptions() {
    const dropdown = document.getElementById('dropdown');
    dropdown.style.display = 'block';
}

document.querySelectorAll('.dropdown-menu').forEach(item => {
    item.addEventListener('click', function () {
        const input = document.getElementById('input').value.split(' ').map(Number);

        let sortedArray;
        if (this.textContent === 'lower to upper') {
            sortedArray = input.sort((a, b) => a - b);
        } else {
            sortedArray = input.sort((a, b) => b - a);
        }

        displaySorted(sortedArray, `sorted ${this.textContent}`);
    });
});

document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('focus', () => {
        input.nextElementSibling.style.opacity = '1'; 
    });

    input.addEventListener('blur', () => {
        input.nextElementSibling.style.opacity = '0'; 
    });

    input.addEventListener('mouseover', function () {
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.innerText = 'Copy';
        input.appendChild(tooltip);
    });

    input.addEventListener('mouseout', function () {
        const tooltip = input.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove(); 
        }
    });

    input.addEventListener('click', function () {
        const tooltip = input.querySelector('.tooltip');
        navigator.clipboard.writeText(input.innerText).then(() => {
            if (tooltip) {
                tooltip.innerText = 'Copied!'; 
                setTimeout(() => {
                    tooltip.innerText = 'Copy'; 
                }, 1000);
            }
        });
    });
});
