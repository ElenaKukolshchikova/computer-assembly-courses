
window.addEventListener('DOMContentLoaded', () => {
    /* timer */

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor((t/(1000*60*60*24)));
        const seconds = Math.floor((t/1000) % 60);
        const minutes = Math.floor((t/1000/60) % 60);
        const hours = Math.floor((t/(1000*60*60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }

    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector("#days");
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', '2022-06-01');

    /* earned money */

    const counter = document.querySelectorAll('[data-count]');
    const line = document.querySelectorAll('.participant__line span');

    counter.forEach((item, i) => {

        let result = +(item.textContent.slice(0, 2));
        line[i].style.width = `${result}%`;
    });

    /* moduls */

    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const overlay = document.querySelector('.overlay');


        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                overlay.style.display = 'block';
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    
        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            modal.style.display = 'none';
            document.body.style.overflow = ''; 

        });

        overlay.addEventListener('click', (e) => {
            if(e.target === overlay) {
                overlay.style.display = 'none';
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if(e.code === 'Escape' &&  overlay.style.display === 'block') {
                overlay.style.display = 'none';
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

    }

    bindModal('.btn__account', '#account', '.modal__close_account');
    bindModal('.btn_color', '#order', '.modal__close_order');
    bindModal('.footer__btn', '#thanks', '.modal__close_thanks');


});



