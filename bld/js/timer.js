'use strict';

;
function Timer(obj) {
    var t = {},
        i = void 0,
        elBefore = void 0,
        elAfter = void 0,
        stopwatch = void 0;
    obj = obj || {};
    t.counters = [];
    function parseType(str) {
        var arr = str.split(''),
            i = void 0,
            tn = 0;
        i = arr.length - 1;
        while (i >= 0) {
            if (arr[i] === '1') t.counters.push({ type: tn });else if (arr[i] !== '0') return false;
            i--;
            tn++;
        }
        return true;
    }
    function initEl(isBefore, elCh) {
        var elem = document.createElement('div');
        elem.className = 'tmr-i';
        if (typeof elCh === 'undefined') elem.innerHTML = isBefore ? 'Timer will be launched soon...' : 'Timer is stopped.';else elem.appendChild(elCh);
        console.log(elem);
        return elem;
    }
    function start() {
        var i = void 0;
        t.el.removeChild(t.elIntermedia);
        i = t.counters.length - 1;
        while (i >= 0) {
            t.counters[i].show();
            i--;
        }
        stopwatch = setInterval(function () {
            var i = void 0,
                remainingTime = t.endDate - Date.now();
            for (i = 0; i < t.counters.length; i++) {
                t.counters[i].setValue(Math.floor(remainingTime / t.counters[i].interval % t.counters[i].divisor), true);
                if (i === t.counters.length - 1) t.counters[i].setValue(Math.floor(remainingTime / t.counters[i].interval), false);
                if (t.counters[i].type === 0) t.counters[i].setValue(Math.floor(remainingTime / t.counters[i].interval % t.counters[i].divisor), false);
            }
            if (remainingTime < t.interval) {
                clearInterval(stopwatch);
                finish();
            }
        }, t.interval);
    }
    function finish() {
        var i = void 0;
        t.elIntermedia = t.el.appendChild(elAfter);
        i = t.counters.length - 1;
        while (i >= 0) {
            t.counters[i].hide();
            i--;
        }
    }
    try {
        if (typeof obj.el === 'undefined' || obj.el === null) throw 'Error! Timer element is incorrect';else if (UTIL.classList(obj.el).indexOf('tmr') === -1) throw 'Error! Timer element must have a \'timer\' class';else t.el = obj.el;
        if (typeof obj.type !== 'undefined') {
            if (typeof obj.type !== 'string' || !parseType(obj.type)) throw 'Error! Timer type is incorrect';
        } else parseType('110');
        if (typeof obj.showUnits !== 'undefined') {
            if (typeof obj.showUnits !== 'boolean') throw 'Error! Timer showUnits param is incorrect';
        } else obj.showUnits = false;
        t.showUnits = obj.showUnits;
        if ((t.startDate = obj.shedule[0]).isNaN || (t.endDate = obj.shedule[1]).isNaN) {
            throw 'Error! Your shedule Dates is incorrect. Please, check it.';
        } else if (t.endDate - t.startDate <= 0 || t.endDate - Date.now() <= 0) {
            throw 'Error! Your shedule Dates is incorrect. Please, check it.';
        }
        if (typeof obj.elBefore !== 'undefined') {
            if (typeof obj.elBefore.innerHTML === 'undefined') throw 'Error! Timer in-param \'elBefore\' is incorrect!';
        }
        elBefore = initEl(true, obj.elBefore);
        if (typeof obj.elAfter !== 'undefined') {
            if (typeof obj.elAfter.innerHTML === 'undefined') throw 'Error! Timer in-param \'elAfter\' is incorrect!';
        }
        elAfter = initEl(false, obj.elAfter);
    } catch (e) {
        console.warn(e);
        return Object.create(null);
    }
    t.elIntermedia = t.el.appendChild(elBefore);
    i = t.counters.length - 1;
    while (i >= 0) {
        t.counters[i].timerEl = t.el;
        t.counters[i].showUnit = i === t.counters.length - 1 && t.showUnits === false ? null : t.showUnits;
        t.counters[i] = new TimerCounter(t.counters[i]);
        i--;
    }
    t.interval = t.counters[0].interval;
    this.el = t.el;
    this.startDate = t.startDate;
    this.endDate = t.endDate;
    i = t.startDate - Date.now();
    i = i < 0 ? 0 : i;
    setTimeout(start, i);
}
;
'use strict';

;
function TimerCounter(obj) {
    var tc = void 0,
        span = void 0,
        spanValue = void 0,
        spanUnit = void 0,
        types = [{
        name: 'milliseconds',
        interval: 100,
        divisor: 10,
        unitEndings: ['миллисекунд', 'миллисекунда', 'миллисекунды']
    }, {
        name: 'seconds',
        interval: 1000,
        divisor: 60,
        unitEndings: ['секунд', 'секунда', 'секунды']
    }, {
        name: 'minutes',
        interval: 1000 * 60,
        divisor: 60,
        unitEndings: ['минут', 'минута', 'минуты']
    }, {
        name: 'hours',
        interval: 1000 * 60 * 60,
        divisor: 24,
        unitEndings: ['часов', 'час', 'часа']
    }, {
        name: 'days',
        interval: 1000 * 60 * 60 * 24,
        divisor: 365 / 12,
        unitEndings: ['дней', 'день', 'дня']
    }, {
        name: 'months',
        interval: 1000 * 60 * 60 * 24 * 365 / 12,
        divisor: 12,
        unitEndings: ['месяцев', 'месяц', 'месяца']
    }, {
        name: 'years',
        interval: 1000 * 60 * 60 * 24 * 365,
        divisor: 1,
        unitEndings: ['лет', 'год', 'года']
    }];
    function hidden(b) {
        b ? UTIL.classList(tc.el).add('tmr-c-hidden') : UTIL.classList(tc.el).remove('tmr-c-hidden');
    }
    tc = {
        value: 0,
        type: obj.type,
        name: types[obj.type].name,
        interval: types[obj.type].interval,
        divisor: types[obj.type].divisor,
        unitEndings: types[obj.type].unitEndings
    };
    span = document.createElement('span');
    span.className = 'tmr-c tmr-c-' + tc.name;
    spanValue = document.createElement('span');
    spanValue.className = 'tmr-c-v';
    spanValue.innerHTML = tc.value;
    span.appendChild(spanValue);
    spanUnit = document.createElement('span');
    spanUnit.className = 'tmr-c-u';
    if (obj.showUnit) {
        spanUnit.innerHTML = UTIL.unitEndings(tc.value, tc.unitEndings);
        span.appendChild(spanUnit);
    } else if (obj.showUnit === false) {
        spanUnit.innerHTML = obj.type === 0 ? '.' : ':';
        span.insertBefore(spanUnit, spanValue);
    }
    tc.el = obj.timerEl.appendChild(span);
    hidden(true);
    this.el = tc.el;
    this.type = tc.type;
    this.value = tc.value;
    this.name = tc.name;
    this.interval = tc.interval;
    this.divisor = tc.divisor;
    this.hide = function () {
        return hidden(true);
    };
    this.show = function () {
        return hidden(false);
    };
    this.setValue = function (v, withZero) {
        tc.value = v;
        if (withZero) tc.el.querySelector('.tmr-c-v').innerHTML = ('0' + tc.value).slice(-2);else tc.el.querySelector('.tmr-c-v').innerHTML = tc.value;
        if (obj.showUnit) {
            tc.el.querySelector('.tmr-c-u').innerHTML = UTIL.unitEndings(tc.value, tc.unitEndings);
        } else if (obj.showUnit === false) {
            tc.el.querySelector('.tmr-c-u').innerHTML = obj.type === 0 ? '.' : ':';
        }
    };
    TimerCounter.types = function () {
        if (arguments.length === 0) return types;else if (arguments.length === 1) {
            if (typeof types[arguments[0]] === 'undefined') throw new Error('Incorrect argument. Expected number 0 to ' + (types.length - 1));else return types[arguments[0]];
        } else throw new Error('Incorrect arguments amount. Expected 0 or 1 arguments.');
    };
}
;
"use strict";