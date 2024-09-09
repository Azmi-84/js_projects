# Bubble Sorting Solution

This project provides a sorting solution using bubble sorting methods. It detects if the given sequence of numbers is already sorted and offers sorting options when needed.

## Features
- **Sorting Check**: Determine if numbers are sorted in ascending or descending order.
- **Sorting Options**: If unsorted, offers a dropdown to select sorting from "lower to upper" or "upper to lower".
- **Interactive Tooltips**: Provides tooltips for guidance and supports clipboard copying on click.

## Usage Guide

1. **Input Field**: Enter numbers separated by spaces.
2. **Start Button**: Click to check the sorting status of the input.
3. **Dropdown Options**: If not sorted, select "lower to upper" or "upper to lower" to sort accordingly.
4. **Result Section**: Displays sorted numbers and a sorting description.

## Example Code

```javascript
// JavaScript Code to Start Sorting
document.getElementById('start-btn').addEventListener('click', function () {
    const input = document.getElementById('input').value.split(' ').map(Number);

    if (!input.length || input.some(isNaN)) {
        alert('Please provide a valid number.');
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

function displaySorted(arr, description) {
    document.getElementById('bubble-sorted').textContent = arr.join(', ');
    document.getElementById('bubble-sorted-description').textContent = `The provided numbers are ${description}`;
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
