const clock = document.getElementById('clock');

function clockTimer(){
    const daysWrap = clock.querySelector('.days');
    const hoursWrap = clock.querySelector('.hours');
    const minutesWrap = clock.querySelector('.minutes');
    const secondsWrap = clock.querySelector('.seconds');

    function getTime(){
        const date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        daysWrap.innerText = `${year}.${month < 10 ? `0${month}` : month}.${day < 10 ? `0${day}` : day}`;
        hoursWrap.innerText = `${hour < 10 ? `0${hour}` : hour}`;
        minutesWrap.innerText = `${minute < 10 ? `0${minute}` : minute}`;
        secondsWrap.innerText = `${second < 10 ? `0${second}` : second}`;
    }

    getTime();
    setInterval(getTime, 1000);
}

function init(){
    clockTimer();
}

init();