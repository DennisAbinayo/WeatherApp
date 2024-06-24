const apiKey = "9e1c9c74e2ec8adc9aee474ca5c131e0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const input = document.querySelector(".search input");
const button = document.querySelector(".search button");
const image = document.querySelector(".weather .weather-icon");
const loading = document.querySelector(".loading");

async function getWeather(city) {
    try {
        // Show loading indicator
        loading.style.display = "block";

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            let data = await response.json();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

            switch (data.weather[0].main) {
                case 'Clouds':
                    image.src = './images/clouds.png';
                    break;
                case 'Clear':
                    image.src = './images/clear.png';
                    break;
                case 'Snow':
                    image.src = './images/snow.png';
                    break;
                case 'Mist':
                    image.src = './images/mist.png';
                    break;
                case 'Drizzle':
                    image.src = './images/drizzle.png';
                    break;
                case 'Rain':
                    image.src = './images/rain.png';
                    break;
                default:
                    image.src = './images/clouds.png';
            };

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        loading.style.display = "none";
    }
}

button.addEventListener("click", () => {
    getWeather(input.value);
});
