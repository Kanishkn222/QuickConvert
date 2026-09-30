const units = {

    length: {
        "Millimeter": 0.001,
        "Centimeter": 0.01,
        "Meter": 1,
        "Kilometer": 1000,
        "Inch": 0.0254,
        "Foot": 0.3048,
        "Yard": 0.9144,
        "Mile": 1609.344
    },

    weight: {
        "Milligram": 0.000001,
        "Gram": 0.001,
        "Kilogram": 1,
        "Ounce": 0.0283495,
        "Pound": 0.453592
    },

    volume: {
        "Milliliter": 0.001,
        "Liter": 1,
        "Cubic Meter": 1000,
        "US Gallon": 3.78541,
        "Cup": 0.236588
    },

    time: {
        "Second": 1,
        "Minute": 60,
        "Hour": 3600,
        "Day": 86400,
        "Week": 604800
    },

    data: {
        "Byte": 1,
        "Kilobyte": 1024,
        "Megabyte": 1024 ** 2,
        "Gigabyte": 1024 ** 3,
        "Terabyte": 1024 ** 4
    }

};

let currentCategory = "length";

const input = document.getElementById("inputValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");
const status = document.getElementById("status");


function loadUnits() {

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    if (currentCategory === "temperature") {

        addOption(fromUnit, "Celsius");
        addOption(fromUnit, "Fahrenheit");
        addOption(fromUnit, "Kelvin");

        addOption(toUnit, "Fahrenheit");
        addOption(toUnit, "Celsius");
        addOption(toUnit, "Kelvin");

    } else {

        const categoryUnits = units[currentCategory];

        for (let unit in categoryUnits) {
            addOption(fromUnit, unit);
            addOption(toUnit, unit);
        }

        if (toUnit.options.length > 1) {
            toUnit.selectedIndex = 1;
        }
    }

    convert();
}


function addOption(select, text) {

    const option = document.createElement("option");

    option.value = text;
    option.textContent = text;

    select.appendChild(option);
}


function changeCategory(category, button) {

    currentCategory = category;

    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    input.value = "";

    loadUnits();
}


function convert() {

    const value = parseFloat(input.value);

    if (isNaN(value)) {
        result.textContent = "0";
        return;
    }

    const from = fromUnit.value;
    const to = toUnit.value;

    let converted;

    if (currentCategory === "temperature") {

        converted = convertTemperature(value, from, to);

    } else {

        const baseValue = value * units[currentCategory][from];

        converted = baseValue / units[currentCategory][to];

    }

    result.textContent = formatNumber(converted);
}


function convertTemperature(value, from, to) {

    let celsius;

    // Convert to Celsius

    if (from === "Celsius") {
        celsius = value;

    } else if (from === "Fahrenheit") {
        celsius = (value - 32) * 5 / 9;

    } else {
        celsius = value - 273.15;
    }

    // Celsius to target

    if (to === "Celsius") {
        return celsius;
    }

    if (to === "Fahrenheit") {
        return (celsius * 9 / 5) + 32;
    }

    return celsius + 273.15;
}


function formatNumber(number) {

    if (!Number.isFinite(number)) {
        return "Error";
    }

    return Number(number.toFixed(8)).toLocaleString();
}


function swapUnits() {

    const temp = fromUnit.value;

    fromUnit.value = toUnit.value;
    toUnit.value = temp;

    convert();
}


function clearConverter() {

    input.value = "";
    result.textContent = "0";
    status.textContent = "";
}


function copyResult() {

    const value = result.textContent;

    if (value === "0") {
        return;
    }

    navigator.clipboard.writeText(value);

    status.textContent = "✓ Result copied!";

    setTimeout(() => {
        status.textContent = "";
    }, 2000);
}


function toggleTheme() {

    document.body.classList.toggle("dark");

    const button = document.getElementById("themeBtn");

    if (document.body.classList.contains("dark")) {
        button.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        button.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
}


// Load saved theme

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    document.getElementById("themeBtn").textContent = "☀️";
}


// Start application

loadUnits();