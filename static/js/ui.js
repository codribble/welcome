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

        daysWrap.innerText = `${year}.${month}.${day}`;
        hoursWrap.innerText = `${hour}`;
        minutesWrap.innerText = `${minute}`;
        secondsWrap.innerText = `${second}`;
    }

    getTime();
    setInterval(getTime, 1000);
}

function init(){
    clockTimer();
}

init();