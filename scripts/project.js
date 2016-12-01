let timer = {};

timer.timerElem = document.querySelector('.timer');
timer.daysElem = timer.timerElem.querySelector('.days>.number');
timer.hoursElem = timer.timerElem.querySelector('.hours>.number');
timer.minutesElem = timer.timerElem.querySelector('.minutes>.number');
timer.secondsElem = timer.timerElem.querySelector('.seconds>.number');
timer.deadline = new Date(2017, 0, 1, 0, 0, 0, 0);

Object.defineProperty(timer, "timerElemNew", {
    set: function(selector) {
        this.timerElem = document.querySelector(selector);
    }
});

Object.defineProperty(timer, "deadlineNew", {
    set: function(date) {
        this.deadline = date;
    }
});

Object.defineProperty(timer, "remainingTime", {
    get: function() {
        let total = Date.parse(this.deadline) - Date.parse(new Date()),
            seconds = Math.floor((total / 1000) % 60),
            minutes = Math.floor((total / 1000 / 60) % 60),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            days = Math.floor(total / (1000 * 60 * 60 * 24));
        return {
            'total': total,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
});

timer.updateClock = function() {
    timer.daysElem.innerHTML = timer.remainingTime.days;
    timer.hoursElem.innerHTML = ('0' + timer.remainingTime.hours).slice(-2);
    timer.minutesElem.innerHTML = ('0' + timer.remainingTime.minutes).slice(-2);
    timer.secondsElem.innerHTML = ('0' + timer.remainingTime.seconds).slice(-2);
    if (timer.remainingTime.total <= 0) {
        clearInterval(stopwatch);
    }
}

let stopwatch = setInterval(timer.updateClock, 1000);

// timer.updateClock();

// alert(timer.timerElem);
