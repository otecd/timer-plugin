;
function Timer(obj) {
    let t = {}, i, elBefore, elAfter, stopwatch;
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
    function initEl(isBefore, elCh) {
        let elem = document.createElement('div');
        elem.className = 'tmr-i';
        if (typeof elCh === 'undefined') elem.innerHTML = (isBefore) ? 'Timer will be launched soon...' : 'Timer is stopped.';
        else elem.appendChild(elCh);
        console.log(elem);
        return elem;
    }
    function start() {
        let i;
        t.el.removeChild(t.elIntermedia);
        i = t.counters.length-1;
        while (i >= 0) {
            t.counters[i].show();
            i--;
        }
        stopwatch = setInterval(function() {
            let i, remainingTime = t.endDate - Date.now();
            for (i = 0; i < t.counters.length; i++) {
                t.counters[i].setValue(Math.floor((remainingTime / t.counters[i].interval) % t.counters[i].divisor), true);
                if (i === t.counters.length - 1) t.counters[i].setValue(Math.floor(remainingTime / t.counters[i].interval), false);
                if (t.counters[i].type === 0) t.counters[i].setValue(Math.floor((remainingTime / t.counters[i].interval) % t.counters[i].divisor), false);
            }
            if (remainingTime < t.interval) {
                clearInterval(stopwatch);
                finish();
            }
        }, t.interval);
    }
    function finish() {
        let i;
        t.elIntermedia = t.el.appendChild(elAfter);
        i = t.counters.length-1;
        while (i >= 0) {
            t.counters[i].hide();
            i--;
        }
    }
    try {
        if ((typeof obj.el === 'undefined') || (obj.el === null)) throw 'Error! Timer element is incorrect';
        else if (UTIL.classList(obj.el).indexOf('tmr') === -1) throw 'Error! Timer element must have a \'timer\' class';
        else t.el = obj.el;
        if (typeof obj.type !== 'undefined') {
            if ((typeof obj.type !== 'string') || !(parseType(obj.type))) throw 'Error! Timer type is incorrect';
        } else parseType('110');
        if (typeof obj.showUnits !== 'undefined') {
            if (typeof obj.showUnits !== 'boolean') throw 'Error! Timer showUnits param is incorrect';
        } else obj.showUnits = false;
        t.showUnits = obj.showUnits;
        if ((t.startDate = obj.shedule[0]).isNaN || (t.endDate = obj.shedule[1]).isNaN) {
            throw 'Error! Your shedule Dates is incorrect. Please, check it.';
        } else if ((t.endDate - t.startDate <= 0) || (t.endDate - Date.now() <= 0)) {
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
    i = t.counters.length-1;
    while (i >= 0) {
        t.counters[i].timerEl = t.el;
        t.counters[i].showUnit = ((i === t.counters.length-1) && (t.showUnits === false)) ? null : t.showUnits;
        t.counters[i] = new TimerCounter(t.counters[i]);
        i--;
    }
    t.interval = t.counters[0].interval;
    this.el = t.el;
    this.startDate = t.startDate;
    this.endDate = t.endDate;
    i = t.startDate - Date.now();
    i = (i < 0) ? 0 : i;
    setTimeout(start, i);
}
;
