document.getElementById('calculate-btn').addEventListener('click', function() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    console.log(weight);
    console.log(height);
    
    if (isNaN(weight) || isNaN(height) || height < 0 || weight < 0 || height === " " || weight === " ") {
        alert('Please provide valid numbers for weight and height.');
        return;
    }

    const heightInMeters = height * 0.3048;
    const bmi = (weight / (heightInMeters ** 2)).toFixed(2);
    const resultElement = document.getElementById('bmi-result');
    const descriptionElement = document.getElementById('bmi-description');

console.log(heightInMeters);
console.log(bmi);
console.log(resultElement);
console.log(descriptionElement);

    resultElement.textContent = `Your BMI: ${bmi}`;
    descriptionElement.textContent = getBMIDescription(bmi);
});

document.querySelectorAll('.color-info').forEach(info => {
    info.addEventListener('mouseover', function () {
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.innerText = 'Copy';
        info.appendChild(tooltip);

        console.log(tooltip);
        
    });

    info.addEventListener('mouseout', function () {
        const tooltip = info.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });

    info.addEventListener('click', function () {
        const tooltip = info.querySelector('.tooltip');
        navigator.clipboard.writeText(info.innerText).then(() => {
            tooltip.innerText = 'Copied!';
            setTimeout(() => {
                tooltip.innerText = 'Copy';
            }, 1000);
        });
    });
});

function getBMIDescription(bmi) {
    if (bmi < 16) {
        return 'Severe Thinness';
    } else if (bmi < 17) {
        return 'Moderate Thinness';
    } else if (bmi < 18.5) {
        return 'Mild Thinness';
    } else if (bmi < 25) {
        return 'Normal';
    } else if (bmi < 30) {
        return 'Overweight';
    } else if (bmi < 35) {
        return 'Obese Class I';
    } else if (bmi < 40) {
        return 'Obese Class II';
    } else {
        return 'Obese Class III';
    }
}
