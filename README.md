# README #

# Timer-plugin - плагин для вашего веб-сайта

С помощью timer-plugin можно создавать таймер обратного отсчета исходя из нужной вам даты в календаре и времени.

## Как подключить



1. В html файле подключить файл плагина `timer.min.js`, а также набор утилит (установится автоматически в bower) `utility.min.js`, если потребуется совместимость с IE8, то следует подключить дополнительно библиотеки `es5-shim` и `html5shiv`. В итоге должно быть примерно так:
```html
<script src="libs/es5-shim/es5-shim.min.js"></script>
<script src="libs/es5-shim/es5-sham.min.js"></script>
<script src="libs/html5shiv/dist/html5shiv.min.js"></script>
<script src="libs/html5shiv/dist/html5shiv-printshiv.min.js"></script>
<script src="libs/utility.js/bld/js/utility.min.js"></script>
<script src="libs/timer-plugin/bld/js/timer.min.js"></script>
```

2. В верстку вставьте в нужном месте следующий элемент
```html
<div class="tmr timer-yourclass"></div>
```

3. А в ваш рабочий файл js:
```javascript
window.onload = function () {

    var tmr, elB, elA;

    elB = document.createElement('img');
    elB.src = 'image-before-timer.jpg';
    elA = document.createElement('img');
    elA.src = 'image-after-timer.jpg';

    tmr = new Timer({
        el: document.querySelector('.timer-yourclass'),
        type: '111',
        showUnits: true,
        shedule: [Date.now()+3000, Date.now()+6000],
        elBefore: elB,
        elAfter: elA
    });
}
```
4. В css файл добавьте следующее:
```css
.tmr-c-hidden {
    display: none;
}
```
