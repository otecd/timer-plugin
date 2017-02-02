// let TimerDefault = new Timer('.Timer-default', [new Date(), new Date(2017, 0, 1, 0, 0, 0, 0)]);
// Timer.start(TimerDefault);
//
// // переделать входные параметры класса на объект

window.onload = function () {
    let ti = new Timer({
        el: document.querySelector('.timer1'),
        type: '110',
        showUnits: true
    });
    let ti2 = new Timer({
        el: document.querySelector('.timer2'),
        type: '110',
        showUnits: false
    });
}
