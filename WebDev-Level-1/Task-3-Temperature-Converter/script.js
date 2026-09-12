function convertTemperature() {


const input = document.getElementById("temperature").value.trim();
const unit = document.getElementById("unit").value;

const error = document.getElementById("error");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

// Clear previous error
error.textContent = "";

// Check empty input
if (input === "") {
    error.textContent = "Please enter a temperature value.";
    return;
}

// Convert input to number
const temperature = Number(input);

// Check non-numeric input
if (!Number.isFinite(temperature)) {
    error.textContent = "Please enter a valid numeric temperature.";
    return;
}

let celsius;
let fahrenheit;
let kelvin;

// Convert according to selected unit
if (unit === "celsius") {

    celsius = temperature;
    fahrenheit = (celsius * 9 / 5) + 32;
    kelvin = celsius + 273.15;

} else if (unit === "fahrenheit") {

    fahrenheit = temperature;
    celsius = (fahrenheit - 32) * 5 / 9;
    kelvin = celsius + 273.15;

} else if (unit === "kelvin") {

    kelvin = temperature;
    celsius = kelvin - 273.15;
    fahrenheit = (celsius * 9 / 5) + 32;
}

// Absolute zero validation
if (celsius < -273.15) {
    error.textContent =
        "Temperature cannot be below absolute zero (-273.15°C).";
    return;
}

// Display results
celsiusResult.textContent =
    `Celsius: ${celsius.toFixed(2)} °C`;

fahrenheitResult.textContent =
    `Fahrenheit: ${fahrenheit.toFixed(2)} °F`;

kelvinResult.textContent =
    `Kelvin: ${kelvin.toFixed(2)} K`;


}
