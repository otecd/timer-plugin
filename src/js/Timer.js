;
function Timer(obj) {
    let t = {}, i;
    obj = obj || {};
    t.counters = [];
    function parseType(str) {
        let arr = str.split(''), i, tn = 0;
        i = arr.length-1;
        while (i >= 0) {
            if (arr[i] === '1') t.counters.push({type: tn});
            else if (arr[i] !== '0') return false;
            i--;
            tn++;
        }
        return true;
    }
    try {
        if ((typeof obj.el === 'undefined') || (obj.el === null)) throw 'Error! Timer element incorrect';
        else if (UTIL.classList(obj.el).indexOf('tmr') === -1) throw 'Error! Timer element must have a \'timer\' class';
        else t.el = obj.el;
        if (typeof obj.type !== 'undefined') {
            if ((typeof obj.type !== 'string') || !(parseType(obj.type))) throw 'Error! Timer type incorrect';
        } else parseType('110');
        if (typeof obj.showUnits !== 'undefined') {
            if (typeof obj.showUnits !== 'boolean') throw 'Error! Timer showUnits param incorrect';
        } else obj.showUnits = false;
        t.showUnits = obj.showUnits;
    } catch (e) {
        console.warn(e);
        return Object.create(null);
    }
    i = t.counters.length-1;
    while (i >= 0) {
        t.counters[i].timerEl = t.el;
        t.counters[i].showUnit = ((i === t.counters.length-1) && (t.showUnits === false)) ? null : t.showUnits;
        t.counters[i] = new TimerCounter(t.counters[i]);
        i--;
    }
}

// class Timer {
//
//     constructor(elemSelector, shedule) {
//
//         this.elem = document.querySelector('.timer' + elemSelector);
//
//         function isTimerCounter(value) {
//             return value.indexOf('timer-counter-') >= 0
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
//             let TimerChildrenN = this.elem.children.length,
//                 i = 0, j = 0, classList, counterName;
//
//             this.counters = [];
//
//             while (i < TimerChildrenN) {
//                 classList = this.elem.children[i].className.split(' '),
//                 counterName = classList.filter(isTimerCounter)[0].split('-')[2];
//                 if (counterName in TimerCounters.list) {
//                     this.counters[j] = new TimerCounters(counterName, this.elem.children[i], 0);
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
//         let k, r = TimerCounters.list[this.counters[0].name].interval;
//         for (k = 1; k < this.counters.length; k++) {
//             if (TimerCounters.list[this.counters[k].name].interval < r) {
//                 r = TimerCounters.list[this.counters[k].name].interval;
//             }
//         }
//         return r;
//     }
//
//     static start(t) {
//         if (Object.keys(t).length) {
//             let stopwatch = setInterval(function() {
//                 for (let k = 0; k < t.counters.length; k++) {
//                     t.counters[k].value = ('0' + Math.floor((t.remainingTime / TimerCounters.list[t.counters[k].name].interval) % TimerCounters.list[t.counters[k].name].divisor)).slice(-2);
//                     if (k === 0) t.counters[k].value = Math.floor(t.remainingTime / TimerCounters.list[t.counters[k].name].interval);
//                     if (t.counters[k].name === 'milliseconds') t.counters[k].value = Math.floor((t.remainingTime / TimerCounters.list[t.counters[k].name].interval) % TimerCounters.list[t.counters[k].name].divisor);
//                 }
//                 if (t.remainingTime < t.interval) {
//                     clearInterval(stopwatch);
//                 }
//             }, t.interval);
//         }
//     }
//
// }
;
