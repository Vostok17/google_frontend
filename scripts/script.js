'use strict';

const form = document.forms[0];
const inputEl = form.elements.namedItem('q');
const historyEl = document.querySelector('.history');

const maxHistoryLength = 3;

const history = [];
history.add = function (value) {
    if (history.length === maxHistoryLength) {
        history.pop();
    }
    history.unshift(value);
};
history.read = function () {
    for (let i = 0; i < maxHistoryLength; i++) {
        const prompt = localStorage.getItem(i.toString());
        if (prompt !== null) {
            history.push(prompt);
        }
    }
};
history.write = function () {
    for (let i = 0; i < maxHistoryLength; i++) {
        localStorage.setItem(i.toString(), history[i]);
    }
};

history.read();

form.addEventListener('submit', () => {
    const prompt = inputEl.value;
    history.add(prompt);
    history.write();
});

for (let i = 0; i < history.length; i++) {
    if (history[i] !== undefined) {
        const el = document.createElement('div');
        historyEl.appendChild(el);
    }
}

const showHistory = () => {
    for (let i = 0; i < historyEl.children.length; i++) {
        const el = historyEl.children[i];
        el.innerHTML = localStorage.getItem(i.toString());
        console.log(el.innerHTML);
    }
};

inputEl.addEventListener('focus', () => {
    historyEl.style.visibility = 'visible';
    showHistory();
});
inputEl.addEventListener('blur', () => {
    historyEl.style.visibility = 'hidden';
});

for (let i = 0; i < historyEl.children.length; i++) {
    const el = historyEl.children[i];
    el.addEventListener('mousedown', () => {
        inputEl.value = el.innerHTML;
        form.submit();
    });
}
