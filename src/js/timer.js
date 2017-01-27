;(function (G){

function TimerSCounter(obj) {

    let name = name || obj.name,
        elem = elem || obj.elem,
        list = {
            years: {
                interval: 1000*60*60*24*365,
                divisor: 1,
                unitEndings: ['год','года','лет']
            },
            months: {
                interval: 1000*60*60*24*365/12,
                divisor: 12,
                unitEndings: ['месяц','месяца','месяцев']
            },
            days: {
                interval: 1000*60*60*24,
                divisor: 365/12,
                unitEndings: ['день','дня','дней']
            },
            hours: {
                interval: 1000*60*60,
                divisor: 24,
                unitEndings: ['час','часа','часов']
            },
            minutes: {
                interval: 1000*60,
                divisor: 60,
                unitEndings: ['минута','минуты','минут']
            },
            seconds: {
                interval: 1000,
                divisor: 60,
                unitEndings: ['секунда','секунды','секунд']
            },
            milliseconds: {
                interval: 100,
                divisor: 10,
                unitEndings: ['миллисекунда','миллисекунды','миллисекунд']
            }
        };

    if (typeof name !== 'string' || typeof elem.innerHTML !== 'string') throw new Error('TimerSCounter() - Incorrect arguments.');

    this._name = function () {
        if (arguments.length === 0) return name;
        else throw new Error('Incorrect argument count.');
    }

    this._elem = function () {
        if (arguments.length === 0) return elem;
        else throw new Error('Incorrect argument count.');
    }

    this._value = function () {
        switch(arguments.length) {
            case 1: elem.innerHTML = arguments[0];
            case 0: break;
            default: throw new Error('Incorrect argument count. Expected 0 or 1 arguments.');
        }
        return elem.innerHTML;
    }

    TimerSCounter._list = function () {
        if (arguments.length === 0) return list;
        else throw new Error('Incorrect argument count.');
    }

}


// class TimerS {
//
//     constructor(elemSelector, shedule) {
//
//         this.elem = document.querySelector('.timers' + elemSelector);
//
//         function isTimerSCounter(value) {
//             return value.indexOf('timers-counter-') >= 0
//         }
//
//         try {
//
//             if ((this.elem === null) || (this.elem.className.indexOf('timer') < 0)) {
//                 throw 'Error! Your element selector is incorrect. Please, check it.';
//             }
//
//             this.elem.hidden = true;
//             // сделать заглушку вместо пустого места
//
//             if (Number.isNaN(Date.parse(this.startDate = shedule[0])) || Number.isNaN(Date.parse(this.endDate = shedule[1]))) {
//                 throw 'Error! Your shedule Dates is incorrect. Please, check it.';
//             } else if ((Date.parse(this.endDate) - Date.parse(this.startDate) <= 0) || (Date.parse(this.endDate) - Date.now() <= 0)) {
//                 throw 'Error! Your shedule Dates is incorrect. Please, check it.';
//             }
//
//             let timerSChildrenN = this.elem.children.length,
//                 i = 0, j = 0, classList, counterName;
//
//             this.counters = [];
//
//             while (i < timerSChildrenN) {
//                 classList = this.elem.children[i].className.split(' '),
//                 counterName = classList.filter(isTimerSCounter)[0].split('-')[2];
//                 if (counterName in TimerSCounters.list) {
//                     this.counters[j] = new TimerSCounters(counterName, this.elem.children[i], 0);
//                 }
//                 i++;
//                 j++;
//             }
//
//             if (this.counters.length > 0) this.elem.hidden = false
//             else {
//                 throw 'Error! Your counter element selector is incorrect. Please, check it.'
//             }
//
//         } catch (e) {
//
//             console.warn(e);
//             return Object.create(null);
//
//         } finally {
//
//         }
//
//         // сделать заглушку (событие закончилось, таймер на 00:00) если вышел дедлайн
//
//     }
//
//     get remainingTime() {
//         return Date.parse(this.endDate) - Date.now();
//     }
//
//     get interval() {
//         let k, r = TimerSCounters.list[this.counters[0].name].interval;
//         for (k = 1; k < this.counters.length; k++) {
//             if (TimerSCounters.list[this.counters[k].name].interval < r) {
//                 r = TimerSCounters.list[this.counters[k].name].interval;
//             }
//         }
//         return r;
//     }
//
//     static start(t) {
//         if (Object.keys(t).length) {
//             let stopwatch = setInterval(function() {
//                 for (let k = 0; k < t.counters.length; k++) {
//                     t.counters[k].value = ('0' + Math.floor((t.remainingTime / TimerSCounters.list[t.counters[k].name].interval) % TimerSCounters.list[t.counters[k].name].divisor)).slice(-2);
//                     if (k === 0) t.counters[k].value = Math.floor(t.remainingTime / TimerSCounters.list[t.counters[k].name].interval);
//                     if (t.counters[k].name === 'milliseconds') t.counters[k].value = Math.floor((t.remainingTime / TimerSCounters.list[t.counters[k].name].interval) % TimerSCounters.list[t.counters[k].name].divisor);
//                 }
//                 if (t.remainingTime < t.interval) {
//                     clearInterval(stopwatch);
//                 }
//             }, t.interval);
//         }
//     }
//
// }
//
// let timersDefault = new TimerS('.timers-default', [new Date(), new Date(2017, 0, 1, 0, 0, 0, 0)]);
// TimerS.start(timersDefault);
//
// // переделать входные параметры класса на объект

}(this));

let t = new TimerSCounter({
    name: 'ttt',
    elem: document.querySelector('.timers-counter-days')
});
