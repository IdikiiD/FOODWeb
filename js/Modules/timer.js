function timer(){
    const endDate = "2024-05-20";

    function getRemaining(endTime) {
        const t = Date.parse(endDate) - Date.now();
        let days, hours, minutes, seconds;
        if (t <= 0) {
            days = hours = minutes = seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), hours = Math.floor((t / (1000 * 60 * 60)) % 24), minutes = Math.floor((t / 1000 / 60) % 60), seconds = Math.floor((t / 1000) % 60);
        }
        return {
            total: t, days: days, hours: hours, minutes: minutes, seconds: seconds
        };
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector), days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'), minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'), timeInterval = setInterval(updateTime, 1000);

        updateTime();

        function updateTime() {
            const t = getRemaining(endTime);

            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', endDate);
}
module.exports = timer;