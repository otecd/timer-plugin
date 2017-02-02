;
function TimerCounter(obj) {
    /*obj = {
        timerEl:
        type:
        showUnit:
    }*/
    let tc,
        span, spanValue, spanUnit,
        types = [
            {
                name: 'milliseconds',
                interval: 100,
                divisor: 10,
                unitEndings: ['миллисекунд','миллисекунда','миллисекунды']
            },
            {
                name: 'seconds',
                interval: 1000,
                divisor: 60,
                unitEndings: ['секунд','секунда','секунды']
            },
            {
                name: 'minutes',
                interval: 1000*60,
                divisor: 60,
                unitEndings: ['минут','минута','минуты']
            },
            {
                name: 'hours',
                interval: 1000*60*60,
                divisor: 24,
                unitEndings: ['часов','час','часа']
            },
            {
                name: 'days',
                interval: 1000*60*60*24,
                divisor: 365/12,
                unitEndings: ['дней','день','дня']
            },
            {
                name: 'months',
                interval: 1000*60*60*24*365/12,
                divisor: 12,
                unitEndings: ['месяцев','месяц','месяца']
            },
            {
                name: 'years',
                interval: 1000*60*60*24*365,
                divisor: 1,
                unitEndings: ['лет','год','года']
            }
        ];
    function hidden(b) {
        (b) ? UTIL.classList(tc.el).add('tmr-c-hidden') : UTIL.classList(tc.el).remove('tmr-c-hidden');
    }
    tc = {
        value: 0,
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
        spanUnit.innerHTML = (obj.type === 0) ? '.' : ':';
        span.insertBefore(spanUnit, spanValue);
    }
    tc.el = obj.timerEl.appendChild(span);
    hidden(true);
    this.el = tc.el;
    this.value = tc.value;
    this.name = tc.name;
    this.hide = () => hidden(true);
    this.show = () => hidden(false);
    this.setValue = function () {
        switch(arguments.length) {
            case 1: tc.value = +arguments[0];
            case 0: break;
            default: throw new Error('Incorrect argument amount. Expected 0 or 1 arguments.');
        }
        tc.el.querySelector('.tmr-c-v').innerHTML = tc.value;
        if (obj.showUnit) {
            tc.el.querySelector('.tmr-c-u').innerHTML = UTIL.unitEndings(tc.value, tc.unitEndings);
        } else if (obj.showUnit === false) {
            tc.el.querySelector('.tmr-c-u').innerHTML = (obj.type === 0) ? '.' : ':';
        }
    }
    TimerCounter.types = function () {
        if (arguments.length === 0) return types;
        else if (arguments.length === 1) {
            if (typeof types[arguments[0]] === 'undefined') throw new Error('Incorrect argument. Expected number 0 to '+(types.length-1));
            else return types[arguments[0]];
        }
        else throw new Error('Incorrect arguments amount. Expected 0 or 1 arguments.');
    }
}
;
