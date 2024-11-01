const apiKey = 'ec466d3543563852e291e4637330cb81';

const now = new Date();
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById("time").innerText = `현재 시간: ${hours}:${minutes}:${seconds}`;
}
setInterval(updateTime, 1000);  

document.getElementById('get_weather').addEventListener('click', () => {
    const city = document.getElementById('city_select').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`)
        .then(response =>response.json())
        .then(data =>  {
            if(data.cod === 200){
                const {main, weather}= data;
                document.getElementById('weather_info').innerHTML = `
                            <h2>${data.name}</h2>
                            <p>온도: ${main.temp} °C</p>
                            <p>날씨: ${weather[0].description}</p>
                            <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">
                `;
            } else {
                document.getElementById('weatherInfo').innerHTML = `<p>도시를 찾을 수 없습니다.</p>`;
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
});
