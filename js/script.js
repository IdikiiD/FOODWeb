
import tabs from './Modules/tabs';
import modal from './Modules/modal';
import calc from './Modules/calc';
import cards from './Modules/cards';
import forms from './Modules/forms';
import timer from './Modules/timer';
import slider from './Modules/slider';
import {triggerModalOpen} from "./Modules/modal";
import {open} from "openurl";
window.addEventListener('DOMContentLoaded', ()=> {
    const modalTimerId = setTimeout(() => triggerModalOpen('.modal', modalTimerId),50000);

    tabs();
    modal('[data-modal]','.modal', modalTimerId);
    calc();
    cards();
    forms();
    timer();
    slider();
});


