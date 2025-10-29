$(document).ready(function () {
    function updateDots() {
        const $carouselControlList = $('.carousel-control-list');
        const slickInstance = $('.categories').slick('getSlick');
        const slideCount = slickInstance.slideCount; // Загальна кількість слайдів
        const slidesToShow = slickInstance.options.slidesToShow; // Кількість слайдів, які показуються одночасно
        const slidesToScroll = slickInstance.options.slidesToScroll; // Кількість слайдів, які прокручуються за раз
        const dotCount = Math.ceil((slideCount - slidesToShow) / slidesToScroll) + 1; // Кількість дотсів

        // Очищуємо список дотсів
        $carouselControlList.empty();

        // Генеруємо дотси
        for (let i = 0; i < dotCount; i++) {
            const dotClass = i === 0 ? 'carousel-control-item active' : 'carousel-control-item';
            $carouselControlList.append(`<li class="${dotClass}"></li>`);
        }
    }

    // Ініціалізація слайдера
    $('.categories').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        waitForAnimate: false,
        speed: 200,
        cssEase: 'linear',
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        dots: false,
        draggable: false,
        swipe: true,
        touchThreshold: 10,
        touchMove: true,
        lazyLoad: 'ondemand',
        // autoplay: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            // {
            //     breakpoint: 1440,
            //     settings: {
            //         slidesToShow: 3,
            //         slidesToScroll: 1,
            //     },
            // },
            {
                breakpoint: 391,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                },
            },
        ],
    });

    // Оновлення дотсів при завантаженні
    updateDots();

    // Оновлення дотсів при зміні розміру екрану
    $(window).on('resize', function () {
        updateDots();
    });

    // Restart autoplay when reaching the end
    $('.categories').on('afterChange', function (event, slick, currentSlide) {
        if (slick.options.autoplay && currentSlide === slick.slideCount - slick.options.slidesToShow) {
            setTimeout(() => {
                $('.categories').slick('slickGoTo', 0); // Повертаємося на початок
            }, slick.options.autoplaySpeed);
        }
    });

    // Custom navigation buttons
    $('.arrow-btn-prev').on('click', function () {
        const slickInstance = $('.categories').slick('getSlick');
        if (slickInstance.currentSlide === 0) {
            $('.categories').slick('slickGoTo', slickInstance.slideCount - slickInstance.options.slidesToShow); // Переходимо в кінець
        } else {
            $('.categories').slick('slickPrev');
        }
    });

    $('.arrow-btn-next').on('click', function () {
        const slickInstance = $('.categories').slick('getSlick');
        if (slickInstance.currentSlide === slickInstance.slideCount - slickInstance.options.slidesToShow) {
            $('.categories').slick('slickGoTo', 0); // Повертаємося на початок
        } else {
            $('.categories').slick('slickNext');
        }
    });


    // Додаємо обробник кліків для дотсів
    $('.carousel-control-list').on('click', '.carousel-control-item', function () {
        const index = $(this).index(); // Отримуємо індекс натиснутого дотса
        const slidesToScroll = $('.categories').slick('getSlick').options.slidesToScroll;
        $('.categories').slick('slickGoTo', index * slidesToScroll); // Переходимо до відповідної групи слайдів
    });

    // Оновлюємо активний дотс при зміні слайду
    $('.categories').on('afterChange', function (event, slick, currentSlide) {
        const slidesToScroll = slick.options.slidesToScroll;
        const currentDot = Math.floor(currentSlide / slidesToScroll); // Визначаємо активний дотс
        $('.carousel-control-item').removeClass('active'); // Видаляємо клас active з усіх дотсів
        $('.carousel-control-item').eq(currentDot).addClass('active'); // Додаємо клас active до поточного дотса
    });
});
