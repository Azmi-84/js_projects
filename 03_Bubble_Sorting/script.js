// Event Listener for Start Button
document.getElementById('start-btn').addEventListener('click', function () {
    const input = document.getElementById('input').value.split(' ').map(Number); // Split input by spaces and convert to numbers

    // Validate input: Ensure it contains valid numbers
    if (!input.length || input.some(isNaN)) {
        alert('Please give a valid number.');
        return;
    }

    // Check if the input is sorted in ascending or descending order
    let isAscending = input.every((val, i, arr) => !i || arr[i - 1] <= val);
    let isDescending = input.every((val, i, arr) => !i || arr[i - 1] >= val);

    // Display sorted status or enable sorting options if not sorted
    if (isAscending) {
        displaySorted(input, 'sorted in ascending order');
    } else if (isDescending) {
        displaySorted(input, 'sorted in descending order');
    } else {
        enableSortingOptions(); // Show sorting options if not sorted
    }
});

// Function to display sorted numbers and their description
function displaySorted(arr, descriptions) {
    document.getElementById('bubble-sorted').textContent = arr.join(', ');
    document.getElementById('bubble-sorted-description').textContent = `The provided number is ${descriptions}`;
}

// Function to enable sorting options dropdown
function enableSortingOptions() {
    const dropdown = document.getElementById('dropdown');
    dropdown.style.display = 'block';
}

// Event Listener for Dropdown Menu Items
document.querySelectorAll('.dropdown-menu').forEach(item => {
    item.addEventListener('click', function () {
        const input = document.getElementById('input').value.split(' ').map(Number);

        // Sort the input based on user selection
        let sortedArray;
        if (this.textContent === 'lower to upper') {
            sortedArray = input.sort((a, b) => a - b);
        } else {
            sortedArray = input.sort((a, b) => b - a);
        }

        displaySorted(sortedArray, `sorted ${this.textContent}`);
    });
});

// Tooltip and Copy-to-Clipboard Functionality for Input Fields
document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('focus', () => {
        input.nextElementSibling.style.opacity = '1'; // Show tooltip on focus
    });

    input.addEventListener('blur', () => {
        input.nextElementSibling.style.opacity = '0'; // Hide tooltip on blur
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
            tooltip.remove(); // Remove tooltip on mouse out
        }
    });

    input.addEventListener('click', function () {
        const tooltip = input.querySelector('.tooltip');
        navigator.clipboard.writeText(input.innerText).then(() => {
            if (tooltip) {
                tooltip.innerText = 'Copied!'; // Change tooltip text on copy
                setTimeout(() => {
                    tooltip.innerText = 'Copy'; // Revert tooltip text after a second
                }, 1000);
            }
        });
    });
});
