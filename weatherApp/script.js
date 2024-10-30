const apiKey = 'ec466d3543563852e291e4637330cb81';
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', () => {
    const city = document.getElementById('city').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const { main, weather } = data;
                weatherInfo.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>온도: ${main.temp} °C</p>
                    <p>날씨: ${weather[0].description}</p>
                    <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">
                `;
            } else {
                weatherInfo.innerHTML = `<p>도시를 찾을 수 없습니다.</p>`;
            }
        })
        .catch(err => {
            weatherInfo.innerHTML = `<p>오류가 발생했습니다.</p>`;
            console.error(err);
        });
});