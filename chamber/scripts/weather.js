// ======================================
// ABUJA WEATHER
// ======================================

const API_KEY = "bd22bbdeb54ed9f9b89614ccd4f19ecf";

const LATITUDE = 9.0765;
const LONGITUDE = 7.3986;

const CURRENT_URL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;

const FORECAST_URL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;


// ======================================
// CHECK API KEY
// ======================================

function checkAPIKey() {
    if (
        !API_KEY ||
        API_KEY === "PASTE_YOUR_NEW_API_KEY_HERE"
    ) {
        throw new Error("Please add your OpenWeather API key.");
    }
}


// ======================================
// GET WEATHER DATA
// ======================================

async function fetchWeatherData(url) {
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || `Weather API error: ${response.status}`
        );
    }

    return data;
}


// ======================================
// DISPLAY CURRENT WEATHER
// ======================================

async function getCurrentWeather() {
    const weatherContainer =
        document.querySelector("#weather-current");

    if (!weatherContainer) return;

    try {
        checkAPIKey();

        const weatherData = await fetchWeatherData(CURRENT_URL);

        weatherContainer.innerHTML = "";

        // Heading
        const heading = document.createElement("h3");
        heading.textContent = "Current Conditions";

        // Weather icon
        const icon = document.createElement("img");

        icon.src =
            `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        icon.alt = weatherData.weather[0].description;

        // Temperature
        const temperature = document.createElement("p");

        temperature.textContent =
            `Temperature: ${Math.round(weatherData.main.temp)}°C`;

        // Description
        const description = document.createElement("p");

        description.textContent =
            weatherData.weather[0].description;

        // Feels like
        const feelsLike = document.createElement("p");

        feelsLike.textContent =
            `Feels like: ${Math.round(weatherData.main.feels_like)}°C`;

        // Humidity
        const humidity = document.createElement("p");

        humidity.textContent =
            `Humidity: ${weatherData.main.humidity}%`;

        // Wind speed
        const wind = document.createElement("p");

        wind.textContent =
            `Wind speed: ${weatherData.wind.speed} m/s`;

        weatherContainer.append(
            heading,
            icon,
            temperature,
            description,
            feelsLike,
            humidity,
            wind
        );

    } catch (error) {

        console.error("Current weather error:", error);

        weatherContainer.textContent =
            `Current weather unavailable: ${error.message}`;
    }
}


// ======================================
// ABUJA LOCAL DATE HELPERS
// ======================================

function getAbujaDateParts(timestamp) {
    const date = new Date(timestamp * 1000);

    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Lagos",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hourCycle: "h23"
    }).formatToParts(date);

    const values = {};

    parts.forEach(part => {
        values[part.type] = part.value;
    });

    return {
        dateKey: `${values.year}-${values.month}-${values.day}`,
        hour: Number(values.hour)
    };
}


// ======================================
// DISPLAY THREE-DAY FORECAST
// ======================================

async function getWeatherForecast() {
    const forecastContainer =
        document.querySelector("#weather-forecast");

    if (!forecastContainer) return;

    try {
        checkAPIKey();

        const forecastData =
            await fetchWeatherData(FORECAST_URL);

        // Group forecast records by Abuja date.
        const dailyForecasts = {};

        forecastData.list.forEach(item => {

            const localTime = getAbujaDateParts(item.dt);

            const dateKey = localTime.dateKey;

            // Choose the record closest to midday.
            const distanceFromNoon =
                Math.abs(localTime.hour - 12);

            if (
                !dailyForecasts[dateKey] ||
                distanceFromNoon < dailyForecasts[dateKey].distance
            ) {
                dailyForecasts[dateKey] = {
                    item: item,
                    distance: distanceFromNoon
                };
            }
        });

        // Get today's date in Abuja.
        const today = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Africa/Lagos",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(new Date());

        // Select the next three days.
        const nextThreeDays = Object.keys(dailyForecasts)
            .filter(date => date > today)
            .sort()
            .slice(0, 3);

        forecastContainer.innerHTML = "";

        // Create a card for each forecast day.
        nextThreeDays.forEach(dateKey => {

            const forecast =
                dailyForecasts[dateKey].item;

            const card = document.createElement("article");

            card.classList.add("forecast-card");

            // Date
            const dateHeading = document.createElement("h4");

            const [year, month, day] = dateKey.split("-");

            const localDate = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );

            dateHeading.textContent =
                localDate.toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "short"
                });

            // Weather icon
            const icon = document.createElement("img");

            icon.src =
                `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

            icon.alt = forecast.weather[0].description;

            // Temperature
            const temperature = document.createElement("p");

            temperature.textContent =
                `${Math.round(forecast.main.temp)}°C`;

            // Description
            const description = document.createElement("p");

            description.textContent =
                forecast.weather[0].description;

            // Add everything to the card.
            card.append(
                dateHeading,
                icon,
                temperature,
                description
            );

            forecastContainer.appendChild(card);
        });

        if (nextThreeDays.length < 3) {
            forecastContainer.textContent =
                "The three-day forecast is not fully available yet. Please try again later.";
        }

    } catch (error) {

        console.error("Forecast error:", error);

        forecastContainer.textContent =
            `Forecast unavailable: ${error.message}`;
    }
}


// ======================================
// RUN WEATHER FUNCTIONS
// ======================================

getCurrentWeather();

getWeatherForecast();