"use strict";

//  Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeExisting: true
    });
}



document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener("click", function (e) {
        const target = e.target;

        if (target.matches('.accordion-list__item-caption')) {
            target.classList.toggle('active');
            target.nextElementSibling.slideToggle();
        }

        if (target.closest('.icon-menu')) {
            document.querySelector('.header').classList.toggle('open-menu');
            document.body.classList.toggle('open-mobile-menu');
        }

        if (target.matches('.menu__arrow')) {
            target.parentNode.classList.toggle('active');
        }
    })

    if (document.querySelector('.clients__slider')) {
        new Swiper('.clients__slider', {
            slidesPerView: "auto",
            watchOverflow: true,
            spaceBetween: 16,
            navigation: {
                nextEl: '.clients__next',
                prevEl: '.clients__prev',
            }
        })
    }

    if (document.querySelector('.certs__slider')) {
        new Swiper('.certs__slider', {

            watchOverflow: true,
            spaceBetween: 16,
            navigation: {
                nextEl: '.certs__next',
                prevEl: '.certs__prev',
            },
            breakpoints: {
                575.98: {
                    slidesPerView: 2,
                },
                991.98: {
                    slidesPerView: 3,
                }
            }
        })
    }

    if (document.querySelectorAll('.carousel').length > 0) {
        document.querySelectorAll('.carousel')?.forEach(carouselBlock => {

            const sliderBlock = carouselBlock.querySelector('.carousel__slider');
            const nextBtn = carouselBlock.querySelector('.carousel__next');
            const prevBtn = carouselBlock.querySelector('.carousel__prev');
            const paginationBlock = carouselBlock.querySelector('.carousel__pagination');
            const isLargeSlider = carouselBlock.querySelector('.carousel__slider').classList.contains('carousel__slider--large');

            new Swiper(sliderBlock, {
                watchOverflow: true,
                spaceBetween: 16,
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn,
                },
                pagination: {
                    el: paginationBlock,
                    clickable: true
                },
                breakpoints: {
                    575.98: {
                        slidesPerView: isLargeSlider ? 1.5 : 2,
                    },
                    991.98: {
                        slidesPerView: isLargeSlider ? 2 : 3,
                    },
                    1199.98: {
                        slidesPerView: isLargeSlider ? 3 : 4,
                    }
                }
            })
        })
    }

    if (document.querySelectorAll('.services__block').length > 0) {
        document.querySelectorAll('.services__block')?.forEach(serviceBlock => {

            const serviceSlider = serviceBlock.querySelector('.services__slider');

            const nextBtn = serviceBlock?.querySelector('.services__next');
            const prevBtn = serviceBlock?.querySelector('.services__prev');
            const paginationBlock = serviceBlock?.querySelector('.services__pagination');


            new Swiper(serviceSlider, {

                watchOverflow: true,
                spaceBetween: 16,
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn,
                },
                pagination: {
                    el: paginationBlock,
                    dynamicBullets: true,
                    clickable: true
                },
                breakpoints: {
                    767.98: {
                        slidesPerView: 1.5,
                    },
                    991.98: {
                        slidesPerView: 2,
                    },
                    1199.98: {
                        slidesPerView: 3,
                    }
                }
            })
        })
    }

    initPhoneMask();


});




function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    const getInputNumbersValue = (input) => input.value.replace(/\D/g, '');

    const onPhonePaste = (e) => {
        const input = e.target;
        const inputNumbersValue = getInputNumbersValue(input);
        const pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            const pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
            }
        }
    };

    const onPhoneInput = (e) => {
        const input = e.target;
        let inputNumbersValue = getInputNumbersValue(input);
        const selectionStart = input.selectionStart;
        let formattedInputValue = "";

        if (!inputNumbersValue) {
            input.value = "";
            return;
        }

        if (input.value.length !== selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;
            const firstSymbols = (inputNumbersValue[0] === "8") ? "8" : "+7";
            formattedInputValue = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    };

    const onPhoneKeyDown = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode === 8 && inputValue.length === 1) {
            e.target.value = "";
        }
    };

    phoneInputs.forEach(phoneInput => {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    });
}


HTMLElement.prototype.slideToggle = function (duration, callback) {
    if (this.clientHeight === 0) {
        _s(this, duration, callback, true);
    } else {
        _s(this, duration, callback);
    }
};

HTMLElement.prototype.slideUp = function (duration, callback) {
    _s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
    _s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {
    if (typeof duration === 'undefined') duration = 400;
    if (typeof isDown === 'undefined') isDown = false;

    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";

    const elStyles = window.getComputedStyle(el);

    const elHeight = parseFloat(elStyles.getPropertyValue('height'));
    const elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
    const elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
    const elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
    const elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));

    const stepHeight = elHeight / duration;
    const stepPaddingTop = elPaddingTop / duration;
    const stepPaddingBottom = elPaddingBottom / duration;
    const stepMarginTop = elMarginTop / duration;
    const stepMarginBottom = elMarginBottom / duration;

    let start;

    function step(timestamp) {
        if (start === undefined) start = timestamp;

        const elapsed = timestamp - start;

        if (isDown) {
            el.style.height = `${stepHeight * elapsed}px`;
            el.style.paddingTop = `${stepPaddingTop * elapsed}px`;
            el.style.paddingBottom = `${stepPaddingBottom * elapsed}px`;
            el.style.marginTop = `${stepMarginTop * elapsed}px`;
            el.style.marginBottom = `${stepMarginBottom * elapsed}px`;
        } else {
            el.style.height = `${elHeight - stepHeight * elapsed}px`;
            el.style.paddingTop = `${elPaddingTop - stepPaddingTop * elapsed}px`;
            el.style.paddingBottom = `${elPaddingBottom - stepPaddingBottom * elapsed}px`;
            el.style.marginTop = `${elMarginTop - stepMarginTop * elapsed}px`;
            el.style.marginBottom = `${elMarginBottom - stepMarginBottom * elapsed}px`;
        }

        if (elapsed >= duration) {
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.marginTop = "";
            el.style.marginBottom = "";
            el.style.overflow = "";
            if (!isDown) el.style.display = "none";
            if (typeof callback === "function") callback();
        } else {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}