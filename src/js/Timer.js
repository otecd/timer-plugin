;
function Timer(obj) {
    let t = {}, i, imgElBef, imgElAft;
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
    function initImgEl(src) {
        let imgEl = document.createElement('img');
        imgEl.className = 'tmr-i';
        imgEl.src = src;
        return imgEl;
    }
    function start() {
        t.el.removeChild(t.elPic);
        let i = t.counters.length-1;
        while (i >= 0) {
            t.counters[i].show();
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
    } catch (e) {
        console.warn(e);
        return Object.create(null);
    }
    imgElBef = initImgEl('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAMigAwAEAAAAAQAAAMgAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAMgAyAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/3QAEAA3/2gAMAwEAAhEDEQA/APAKKKKACiiigApyruOPQE02nxfeP+638jQB7dH+zreuiH+3tPDMm/b5Emcf99V5RB4U1q8juJrLTL27ggdkeaC2d1BBweQP5Zr7Ih/5D1p/2DW/9CSsT4eqIfA3hcRDYJVd5QvG5iHZs++7n60AfKWkeFNc16GSbTNKvLuONgrtBCXCkjOD+FPufB3iG01CCwn0bUEurhS0ULW7b3A6kAZzX0V4bW40PQfiDqWn28wZ9VuTZrDEWLsAFygAOfnyOB1BrtZIVPjpLho/3iaS6xyEdMyDcAfwX9KAPj0eEfEDX8tiui6kbuJN7wC1fzFXJAYrjpkdRxSp4Q8RSJbumhaoy3H+qK2bnfxn5eOeOa+tXa8/4Sjw3LaxQSyPp0wunncqwjzCcggEk7scHjk81dtharaaN9keR2USfZBL8oc7G++QOOM9qAPkKy8E+JNRNwLXRNRlNvL5UoS3JMb4B2t6HBHHvT38CeJ0nmgbQtSEkMQmdTbnKocgMeenynn2NfRPhP8AtrSvCvijUry3ePUr3XJSsdvGzgEukWV4yy8E7sdBmurltXufGmsQkOqT6PBEJNpxkyTg4PQkZH5j1oA+PLvw7q1jpdtqVzp11FZ3WPJneIhJMjI2nvwCacvhnWn0k6oul3rWAGTcrbuYwMZzuxjHHXp717z8bvsf/CtNDjsFVbOK8MMKqMAKkMqjHt8temWCxwaLpdpbWu+A6aFESuqxhNqjp+PHtmgD5Gj8DeJpRalNC1FhdLvhxbn5xjOV5545qvdeE9cstNm1G50q8htIZTFJNJDtRXDbSCex3cfWvrLSY9sXgny1PlpZMMjkAeSuOaxNVh3eBZ45422N4nBZXUjKnURzz2IPXpQB8y3vhjWtPsI7270q+gtpPuyy27ojemCR/PGe1ZFfY/xGbzPBHimE27Sxrp7MzO42oQhI2j8AfrXx3N/rnyMHceKAGUUUUAFFFFABRRRQB//Q8AooooAKKKKAClBKnj0xSUUAehr8aPGS3KTjUYt6QmEH7In3cg4/Qc1maP8AE7xZoWmPp+n6tJBbMzOEEaNtLNubaSDtySfXrXH0oUntQB6ja/GjWNK8HaVpGlbre7tWc3F1KVm8/cSeQRkHJznNGtfGrW7+10Oa0kltdVsUkW4uwUIuN2M/JjAGVHFeXhDS7PegDsv+FreMRrT6t/bD/bGhMAcwoQke7dtVcYHIGe5wOadD8WfGUK2SrrDBbMkxDyI+Mgg5454J61xWwijaaAPWbn476+uh6Za6e32e9hVvtlw6JILhic5C4G3nJ/Gmav8AHTxBc2unHT5DaXcdq0N5MyI4uHOPmAx8nQ/n7V5RtNGDQB0Go+NNZ1Tw1p+gXVyr6fYEGCPylBXClRlup4Y9av23xO8W2nh0aHBrM8diIvJVFVdypjG1XxuAx+PvXH0UAeh2Pxo8Zafp9tZW+oxJBbxLFGv2RDhVGAPyFaL/ABs1jUfC2taVrIN3NexCO3mjCw+R6nA5Pb8q8rooA7DWPib4s1zRjpV/q801o3DIUQFxngMwALdP8c1x5JJyTkmiigAooooAKKKKACiiigD/0fAKKKXFACYzTghNOAqQDIFAEYQd6cIgSvvUsMLzOqIjO7cBVGTXS6d4NvrpQ07pAoHTG5sf0pOSjuaQpTn8KOYWPIPHSn+V8vAr0C28HadCN1y88p75faP0rUttK8LRjabKzZxx8zBjUe2XQ3+qSXxOx5X5fA4oMW3rzXqz+HtEeQmOxg2t0AXBH0NSweCNCuwVaB4ycYaOQgij28Q+qTex5GUwelM2kGvVb/4WxCFpLLUXDjOFmUEH8Rg1xup+EtW0xnZ7czRgZ8yHkY+nWqjVi9mZzw9SCu0cyenSkxUzoQOajOckVZgMAy2KCuKcBh6djNICAiipGXBpu2gBtFO20uOKAGUU7FGKAG0UuKMUAJRRRQB//9LwICl296VeDkinMwbouKAFA9ulaUGkXstsLkW7LBuAEhHBz6etdl4e8KWkdpBcyqLi6ba6qRlV9iO9dBq0izeXbG38kg7imMAfT2rKVXsd8cHaPNIwdH0qCxjQogLsMs5HJrrLMopwRkd6x4VCuBjpxW9Yw7lHr3rllds9HDqKVhb6xhuoAAgODnHrVFtGYStKTGkczKr/ACZ2gHOV9PTjrXRRwhACF/OpNkbKRhQaqEuXYdbDqZm6ilncTK1pG24Y3Mq4yPX61JGotbpV3Bsrk49anMIjyydh1xWaQ7S5PrUtNu5rSopR5TV1W+S3sCy/exkY7muce4uniyxVEfjJOM/n1q5rEgECZOQMGi8i+2aZDEhhLQtvDMvL55wfX0+lNRVzGvFrRHHaj4UXUw88EtuJuu5e/wBQK4O+sZ7G5aCdcSD8iPavVZrS3g06WVp0jvC25fL42+xHp7VwviOSS5t7WaZCshYrzXTCTTte55lamnFytZnOImWPtTycUsSbmPQVIVUtt6mtjiIOOOKQrzxTym1qAKAGbaNtPwaUjNAEJWkI9alxz7UjL34NAEWKSpCB3ppxmkBHjNLsp6DMij3FXPL+lAH/0/CxOMfdH4ikVlY8rj3FQCl7UrFcx6t4Q1JrvTIo43Cunyv6itTU4ilzCzyb5HB3e3pXk+iXd1bajH9mmZCx+baeor0a3kaWZmdixULkk1zVI2Z69PERqUkralxIgZAQOK6SwUYUD0rHhiyCe9a1iSGUjjIxisjWLNtI+AP50w2w3HPGemKkhO7HpRI3OBz6U0zeLbdiKeIeSQTwKwZWBuNo4X2q9qtw6BYEPzNyT7VRsIDI+CcuT3NCbN4J7lXWVxZNjr6VLbc2aBuDjrT9dt3hgkjkXDL1FW/KVbVCoBUgECmRUV53MS9thPGVYAVwfjEgG2jAAC7v5V6ROFCn36GvLfGMwk1gQqeI059s/wD6q0or3jzcbaMNDAjGOT0JqVSFJ2jHv3pq/d9K0NL0yXU71IU+VSfmk28KO5rpvbc8tRb0RQ2lm7kmtOy8PalflQlvsUn70h24/DrXYaL4VhguwfJE4im3ec7Ebkx0x0989e3Sur+wRLDPOoC7eVAz8vtz1rCrW5djqpYXm1kcZa/DV2TzLrUBjusMfP5nNSv4I0+IMSJ5FUcktj+Vei2coewJ2gHAJ4qlE6MzwPwCcg1zSq1H1OxYaC6HCy+C7P8A0eVIy+7IeCMlSOOCWqifAzRxIZWG4jkMOfwxXp6WRiydxx1z1qGS2Ej5IzitPbPlI+rR5jzW68Bj7N5lvcEP/ccZB/GuRvtPnsJjFPGVI/EH8a9uuotoOBXIalFFNNsmjDqeCCKqlVezMcRh4x1R5ug/ep/vD+daW01seIvCg0ryby0lD2rMmVY/MuSO/cVm7DXSpKSujicHF2Z//9TwPFKBzSAljTxwc46UAbPh+18ydpyOF+UfWvQNPi/dlj/EK4LQtTS2lEE2BAzZLf3Tj+VekWaD7KpXBHYiuWvdM78Pbl0NO2XIBI4YVZjykgFQ2ozGParEn3lPTmsDsRrxybYxTkcFsn8Kroc2+Twapz6hFBkFxu+tCOyCsWb2COdkdvvL+oqjJaNb4lgU5JyVBqo+r25Y5uAPwp6ampO5J1cD+E1STR0WdrFe7luL9niKsv171rxLjTok3AlECk/SsWW9VLjfjAbrV2K5VYGH8OMim2znnK25T1a6W1tHkcgIikmvGbq7a+vJ7lusjk49B2rr/HWslohaRt98/Nj0FcLGcPz0NdNKNlc8TFVeadjSs7c3N1DB/fYDPoK9TsdOgiEQgUIFGBiuB8LWq3F1cyFuYId6j1Of8K9M0pg8KnA6VniG7mmEjvc07WPIwxzTtXkEenmNeC3BxViBPu5FVdeULpzMOoIxXM3d6npcqQtlPm3UL024INU5yiTht2Mmm2KyGIBAWJHYUXlozjaeH67c80M1aujdtWMltk8ikdQOnSsnRbmWKSSBySowea1jMqnnj3pGd7GZfLhDXH6gmJwSeMjp9a7DUBhCQc1ymsoUjLHp1rWna5yYjWJ55faneT3f2OS4dreKchEPQDdxVjBrJJ8zVC396fP/AI9W55ddqR5Lbe5//9XwNfen9abTl4P+eKAHocHHb+dd14P10HGm3LHLf6lj0H+zXBjr9KmRmUg5O7sQcYqZwU1ZmlOo4O6PcrJxgjuKtyqGQ9u9cZ4W8Qi+QRzsq3EfBGfvjHWuxWQNxnNefJOLsz16UlON0TJIfs56kVSvbFJoTlN2OeOtWoWIJFWFRz261KbudcHbU5pbMxwyTWsqxSqOV6Fh7f4VRuZ7yQqkqJlRjLJz+NdNcaUrHeAytnPymsu50+ZQds+eckMK3VTudCqU5azRglpVdYoyXMh6E8LWtdzNZaeoLDeyhRUa2cdvIJZW3uOc9hXJ+L9dLDyImw7DaB/dX1/GrS5nY83F1orWOxyur3n23UJJAcoDtT3A7/jVDpRRXUeI3d3LllqE9lcLLG5XoGx3XPIr13w/ch4UPbtXi1emeDrv7VpiKDmRBtPPcVlWjeNzpws2p2PTbcgLk+nWs/Wt1xa7VU4UgkDvT4JTIkIB4KbjUF1ckSYBH+Fef1PWi7lC3uLiAk275z/yzcEEfjU0EdxJvllRt54UA4x70iXUMTZdgTjoaWTV4+ikFvQVd7m3s3uyS2H2Z2ZmLSPxuYVopMJFIOCQOawn1CZjmO3dxgt07Cksby4uXLiIJH05OTSa6szkuxpXIClgfusDXNeJXWLTAx/551v3sgNsjZ53YriPHN8FsTEp5ICCrpK7RxV5WTuefWxLXkR7mRT+orpdprm7IZvYf+ui/wDoQrr/AC1r0Tyj/9bwOnA0nf3paYDvwpwbFMzxR/SgC7aXUlrMksTbGQ5De9ekeHPES6lAI3YLcoBkdj7ivLFbnnmrNvcywTpLE5WRTkMO1ZVaamjejWdN3PdLeYNMMnrWzCUAHc15fovitLpFSZhHcD1PDfSupt9cU4DNtNcTg46M9enXjJXOoc5JA6dqx78qknsRikXUUcEh+2Oaxdc1u3tLUu8o4HJ9aFG+hcqkVFu5l67qcNhbyM7ZIHT19q8uurl7u5eeU5Zzn6e1amp3VxqlyJ7gFYXG6Nc9R0zWVLCY29j0NdtOHKjxa9V1H5EVFLijBFaGAgroPCeptYamFJ/dPjP17Vz+Kt2wxEWH3s0NX0HGXK7o9w066SSRVDeoH0PNM1S2mkDOjsmP7tcV4a1qSeHLE74Wwc9xXex3S3FqHHIIwRXBUg4M9ahXTVzAtfIictdQS3AGeFfH0rorfVNPi2G3t44RjDFl/wAKoPYKx3pw3tTBbzqeFXPrjNPmTOyUaVRXbaIL24luZ1IZ1hXO1c4yT/StDT4jFbliMZ6CiKwcvvlJZv5VeK7FA7Com7kTnGMeWBm6jIE2jgBBuP1NeaeI7gXl40ZJKp39zXYeJNSW2jbnLN0Fefu+WLscknJ+tdWGp9TysTUvoUbaIx30Wef3qf8AoQrrea5aEM19A+ODKn/oQrrMe1dDORH/1/BBwc0vbPelI9KQ5pgAJFL/ACpOvU80mfyoAU0BjSj+dGeSKAHrK1X7bVryIhY7hwo7Mc1m96vaZZnUtQhs42K+YSNwXOOCen4Uml1KUmti7/wkOoncEuSo9QKy7q9nu3BmmeVj3c9KZNhAgRXAZFY7h1JHb2qIDBoSS2Bzk92TROFYg8BvSp5I8oQenUVU+h6GtCL97bhu+KZJmFSrEGjPzcVPcx4+f04NQxrvcAc5NAF9YoJUzswfaoxEYHK5+U9+9SKyqOCOPeoJHLuCWHPpQNm94Ymji1F4ZXCiUBRn1rubWd9Pn8qXmF/0ryqOXkBsgjo1dtonii3ltxY6yQABhLg/+zf41jVhfU2pTS0Z6BbbXC4bir0UcZbpXLQ3H9njdHcRz23UFXGQKuQeI7N03LcJg9Oa5HBnfTrRW50Lsq5OB7CsjWL6O0tnkZgvGayb/wAX2NtkCZWf0Xk1wuueIp9WcgkpCOi56/WtIUXJ6mVbExSsirqupNqF20rEhB0FZwwxDvwM8Cms+7HBPsKYcsfm6eldyVkebJtu7J4pA99bheglT/0IV1mBXI22PtkHr5qf+hCuw2ihjR//0PB+1I3QUtFMBMUhHPNO9qDQAzODSilx+NN6UAOyAM/hUlu5jnUrJIhAJDRnBBx61EBkEfjSw/61aAH3HCxBmYsq4JJ4xngCou1S3PVfpUQoAXPFXrM/unHoao9KuW2YYXkccHoKYENw+SV9TTY28kk8FsYGO1MLZYnpSUWAUsXI9PQVI4JVSvYUzbzUgcgDIyfWnYQxW2mphKeAB+FN3nHSlDHJPAxTQE0fy/MY1XPtVhZs5449qqBwTk5qRXVQSWxxiixNxeXY7jigRgk5xjPeoomyzk8mn7z2FAnoOPUL+QFQk9QeKeX6t3qM9aBpEsLbr63HrInP/AhXV+Wf75rk7YZvbf8A66pj/voV1201nI0jsf/R8HFFFJxTAWilVWOMKxHsM07yZRz5Tj/gJoAZSYqTyZT/AMs3/wC+TR5Mw/5YyY/3TQBEB83tSx8Sr9aRgQcEYPoeKVPvqfeiwElyOF+tQDjg1pXtjNHYpct5YQybMbxuB255H071DY23mHzXHyg8D1NDBCwWpCea49wKbcSGQ4H3RxWhIfl/Ss0cPg9jVJAxnl+p/CnKgxuNOkODmlXJSmTcaqhjk04rj6U1eDUh4oEMHWkIxSt6ilU54oEwXnrTmUbDilFEnCcHtQGwyHlnPrT6iiPz9e1S0IbE7cUmDSjil5GRQIdbA/a4Cf8Anqn/AKEK6zK+/wCVcpbn/SoP+uqf+hCuq59DWctzWD0P/9LxKGxZ+ZTtX0HWr0VrDH92MbuxbmpNo49aUEg4NMqw7p6elKOe/wCdNpRwaGOwv8VKCehoHNL60AyK4gjmQ70U+h71njSpZnjW2BkeR1jVOMksQB+pArW60+xeO01S0uZG2xR3MMjn0VZFJP4AGi4mupozfDvxnd6n/ZMuiT/aYYVuHjWSLdsJKhs78dVI69qwD5cWU3xpsO0guOD6H8jX1vawpceO7nVYLm2ltptJihQRzBnJEjsTtH8OGHNc14asrLVrDw74he2tW8jSrqC4HlLgyBowSeOoMbfmaLkrQ+aZHiZOJov+/i/41QbHn5DKQfRgf5V9I6X4sa4+CV14s/sbShfW4dEjNvmMhWCjPcnHuKt+NfhzH400fQobC6sdPuoLcyhGg/12UUdVIIAJHPPUUXA+Y5cEDtz1JxSj7mN8ef8AfH+Neo+HPhtqukal4f1/UW037Eb+2DwiffJ87hApXbjqwzzXtOuW9lpGl+KdSOmwbbWMTp+4X5gkQJxkexp8xKR8iAYY/Mn/AH2Kccf34/8Av4v+NfUPixLHwrofirxHbWNkzS/ZZ4BLCChfCqBj0OBwKm1rVUhsvBjJpWmf8Ty6gS4/0cfICof5PTkd88Ucwcp8rtwvUH6EGmqa99+Lvw3bUJNV8Tadd2ccdjbIZrJYtrAICSQwOMkNnBHYc14GRsYr3BxxTTuS1YkAyfeiTBU0LzQ3KkUwIoeHH0qXuahjGXX8KmPU0IbEPGM9KAfxxQelAHPJ/GgCW0XN7B/12T/0IV2fle361x1kf+JhbDbn9/Hxnr84rvP+3Zf+/lZT3Naex//T8jUmng569aYnQfSnD7tNFC9DjrTu5pB98UrdT9KYxR+lLSdlpVoEwNHUY6UHp+NJ60h2Or+H/jOPwHf310NM+1rdwpEVjkWPaVYnPTnr+ldVo/xG0Pwx8LLrTUu7m61aeOZ0gFo6LBJLklN5+UhSx+YHnsK8ob7gpuof8eJ/3RQyWdHpnxCit/hTdeCRp7tJOXIuvNAABcN93r2rtk+P1vbWtv5fhgteW9uIEkku1wAduegzglQfwrwu0/4+V+hqST/WP+FCVxFi5u55b/7duCXLymcyR/KwctuyCORgnjmvQ9M+LN7L4T1jQNbN1fS6nmH7dLMD9njZAh+QDLY+ZsDGenvXm0n3YqI/9f8AjTaEexfEX4h6JqXw3tfC+lX1xqNziGOe6ktmgBWPB3YYckkDge9ZWofFiO9tfCUY0aRDoU8crE3CnztqbcDjjPXmvOrz7i/71QHpQkJs9d8UfG6PWvD+qabZ+HxayalEYpp5LkNwRtyAByccdq8eLbnJxjJJpG6CgdapKwpMlB6fypW5BPamj71L/wAsnoJRAhAcYqU/fOahT7w/z3qZ/vGkipFuKwmniDo0O3/akwR9RThps643Pb/9/RUtp/x6P/umpW6R/SmITS9LuZtTtlTytwnTgvnowPTvXoX9kX3pD/3yf8a5Lw3/AMjBZ/74/lXqNc9WTudFFe6f/9k=');
    imgElAft = initImgEl('data:image/jpeg;base64,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');
    t.elPic = t.el.appendChild(imgElBef);
    i = t.counters.length-1;
    while (i >= 0) {
        t.counters[i].timerEl = t.el;
        t.counters[i].showUnit = ((i === t.counters.length-1) && (t.showUnits === false)) ? null : t.showUnits;
        t.counters[i] = new TimerCounter(t.counters[i]);
        i--;
    }
    t.interval = t.counters[0].interval;
    t.remainingTime = t.endDate - Date.now();
    this.el = t.el;
    this.startDate = t.startDate;
    this.endDate = t.endDate;
    i = t.startDate - Date.now();
    i = (i < 0) ? 0 : i;
    setTimeout(start, i);
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
