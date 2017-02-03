let ti1, ti2, elB, elA;
elB = document.createElement('img');
elB.src = 'http://shtab-group.ru/wp-content/uploads/start.jpg';
elA = document.createElement('img');
elA.src = 'http://whatnextbook.com/wordpress/wp-content/uploads/2016/01/finish-line.jpg';
window.onload = function () {
    ti1 = new Timer({
        el: document.querySelector('.timer1'),
        type: '111',
        showUnits: true,
        shedule: [Date.now()+3000, Date.now()+6000],
        elBefore: elB,
        elAfter: elA
    });
    ti2 = new Timer({
        el: document.querySelector('.timer2'),
        type: '111',
        showUnits: false,
        shedule: [Date.now(), Date.parse(new Date(2018, 0, 1, 0, 0, 0, 0))]
        // elBefore:
        // elAfter:
    });
}
