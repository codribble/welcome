const wrapper = document.getElementById('wrapper');
const weather = document.querySelector('.weather');

const API_KEY = "b14cf64744446e27398eb549f83d0290";
const COORDS_LS = 'coords';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        const main = json.weather[0].main;
        const description = json.weather[0].description;
        const weatherIcon = json.weather[0].icon;
        const descriptionTrim = description.replace(/\s/gi, '');
        let txt = '';

        switch(description){
            case 'clear sky':
                txt = '맑음';
                break;
            case 'few clouds':
                txt = '구름 약간';
                break;
            case 'scattered clouds':
                txt = '흐림';
                break;
            case 'broken clouds':
                txt = '매우 흐림';
                break;
            case 'shower rain':
                txt = '소나기';
                break;
            case 'rain':
                txt = '비';
                break;
            case 'thunderstorm':
                txt = '천둥번개';
                break;
            case 'snow':
                txt = '눈';
                break;
            case 'mist':
                txt = '안개';
                break;
        }
        
        wrapper.classList.add(descriptionTrim);
        weather.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${description}"> ${txt}<br />${temperature}&deg;C`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const coordsObj = {
        lat,
        lng
    };

    saveCoords(coordsObj);
    getWeather(lat, lng);
}

function handleGeoError(){
    weather.innerHTML = `<span>위치권한 허용하시면 해당 지역의 날씨를 확인할 수 있습니다.</span>`;
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS_LS);

    if( loadedCoords === null ){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.lat, parsedCoords.lng);
    }
}

function init(){
    loadCoords();
}

init();