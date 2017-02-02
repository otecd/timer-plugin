;
function TimerCounter(obj) {
    /*obj = {
        timerEl:
        type:
        showUnit:
    }*/
    let tc = {value: 0},
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


    span = document.createElement('span');
    span.className = 'tmr-c tmr-c-' + types[obj.type].name;
    spanValue = document.createElement('span');
    spanValue.className = 'tmr-c-v';
    spanValue.innerHTML = tc.value;
    span.appendChild(spanValue);
    spanUnit = document.createElement('span');
    spanUnit.className = 'tmr-c-u';
    if (obj.showUnit) {
        spanUnit.innerHTML = ' ' + UTIL.unitEndings(tc.value, types[obj.type].unitEndings) + ' ';
        span.appendChild(spanUnit);
    } else if (obj.showUnit === false) {
        spanUnit.innerHTML = ' : ';
        span.insertBefore(spanUnit, spanValue);
    }
    tc.elValue = obj.timerEl.appendChild(span);

    this._name = function () {
        if (arguments.length === 0) return name;
        else throw new Error('Incorrect argument amount.');
    }

    this._elem = function () {
        if (arguments.length === 0) return elem;
        else throw new Error('Incorrect argument amount.');
    }

    this._value = function () {
        switch(arguments.length) {
            case 1: elem.innerHTML = arguments[0];
            case 0: break;
            default: throw new Error('Incorrect argument amount. Expected 0 or 1 arguments.');
        }
        return elem.innerHTML;
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
