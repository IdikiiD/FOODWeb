

window.addEventListener('DOMContentLoaded', function () {
    const tabs = require('./Modules/tabs'),
          modal = require('./Modules/modal'),
          calc = require('./Modules/calc'),
          cards = require('./Modules/cards'),
          forms = require('./Modules/forms'),
          timer = require('./Modules/timer'),
          slider = require('./Modules/slider');
    tabs();
    modal();
    calc();
    cards();
    forms();
    timer();
    slider();
});


