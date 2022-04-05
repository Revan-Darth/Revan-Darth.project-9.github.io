$(document).ready(function(){
	
	$('.example-content__carousel').slick({
		infinite: false,
		dots: true,
		arrows: true,
		swipe: false,
		prevArrow: '<button type="button" class="slick-prev"><span class="example-content__prev-arrow"></span></button>',
		nextArrow: '<button type="button" class="slick-next"><span class="example-content__prev-next"></span></button>',
		responsive: [{
      breakpoint: 769,
      	settings: {
        		swipe: true,
      	}
     	}
  		]
	});
	
	$('.land-popular__row').slick({
		infinite: true,
		arrows: true,
		waitForAnimate: false,
		slidesToShow: 4,
		prevArrow: '<button type="button" class="slick-prev"><img src="images/icon/arrow-left.png" alt="Стрелочка влево"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="images/icon/arrow-right.png" alt="Стрелочка вправо"></button>',
  		responsive: [{
      breakpoint: 1201,
      	settings: {
        		slidesToShow: 3,
      	}
     	},
     	{
      breakpoint: 867,
      	settings: {
        		slidesToShow: 2,
        		arrows: false,
      	}
     	},
     	{
      breakpoint: 640,
      	settings: {
        		slidesToShow: 1,
        		arrows: false,
      	}
     	},
  		]
	});
	
	$('select, .in-num').styler();

		$('.side-filter__item-drop, .product-card__accord-drop').on('click', function(){
		$(this).toggleClass('active');
		$(this).next().slideToggle(200)
	});

	$('.product-card__favorites-but').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('active');
	});

	$('.product-card__mainslider').slick({
		infinite: false,
		arrows: false,
		slidesToShow: 1,
  		slidesToScroll: 1,
  		asNavFor: '.product-card__subslider'
	});
	$('.product-card__subslider').slick({
		infinite: false,
		arrows: false,
		slidesToShow: 4,
  		slidesToScroll: 1,
		focusOnSelect: true,
		asNavFor: '.product-card__mainslider',
		responsive: [{
      breakpoint: 471,
      	settings: {
        		slidesToShow: 1,
      	}
     	}
     	]
	});

	$('.tab').on('click', function(e){
		e.preventDefault();
		$($(this).siblings()).removeClass('tab--active');
		 $($(this).closest('.tabs__wrapper').siblings().find('.tabs__content')).removeClass('tabs__content--active');
		$(this).addClass('tab--active');
		$($(this).attr('href')).addClass('tabs__content--active');
		$('.slick-slider').slick('setPosition');  // Это чтобы при табах небыло прогрузов
	});

	$('.aside__btn').on('click', function(){
  		$(this).next().slideToggle();
  	});

});

//========================================== Range-slider с обновлением =============

var $range = $(".js-range-slider"),
    $inputFrom = $(".js-input-from"),
    $inputTo = $(".js-input-to"),
    instance,
    min = 0,
    max = 100000,
    from = 0,
    to = 0;

$range.ionRangeSlider({
    type: "double",
    min: min,
    max: max,
    from: 12000,
    to: 89200,
    onStart: updateInputs,
    onChange: updateInputs
});
instance = $range.data("ionRangeSlider");

function updateInputs (data) {
	from = data.from;
    to = data.to;
    
    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);	
}

$inputFrom.on("input", function () {
    var val = $(this).prop("value");
    
    // validate
    if (val < min) {
        val = min;
    } else if (val > to) {
        val = to;
    }
    
    instance.update({
        from: val
    });
});

$inputTo.on("input", function () {
    var val = $(this).prop("value");
    
    // validate
    if (val < from) {
        val = from;
    } else if (val > max) {
        val = max;
    }
    
    instance.update({
        to: val
    });
});

//=================================================================

// Звёздочный Рейтинг 


const raitings = document.querySelectorAll('.rait');

if (raitings.length > 0){
	initRaitings();
}

// Основная функция
function initRaitings(){
	let raitingActive, raitingValue;
	// Ищем все рейтинги на странице
	for (let index = 0; index < raitings.length; index++) {
		const raiting = raitings[index];
		initRaiting(raiting);	
	}

	// Инициализация конкретного рейтинга
	function initRaiting(raiting){
		initRaitingVars(raiting);
		setRaitingActiveWidth();

		if (raiting.classList.contains('rait-set')) {
			setRaiting(raiting);
		}
	}


	// Инициализация переменных
	function initRaitingVars(raiting){
		raitingActive = raiting.querySelector('.rait-active');
		raitingValue = raiting.querySelector('.rait-value');
	}

	// Изменение ширины активных звёзд
	function setRaitingActiveWidth (index = raitingValue.innerHTML){
		const raitingActiveWidth = index / 0.05;
		raitingActive.style.width = `${raitingActiveWidth}%`;
	}

	// Возможность указать оценку
	function setRaiting(raiting){
		const raitingItems = raiting.querySelectorAll('.rait-item');
		for (let index = 0; index < raitingItems.length; index++) {
			const raitingItem = raitingItems[index];

			raitingItem.addEventListener("mouseenter", function(e){
				// Обновление переменных
				initRaitingVars(raiting);
				// Обновление активных звёзд
				setRaitingActiveWidth(raitingItem.value);
			});
			raitingItem.addEventListener("mouseleave", function (e) {
				// Обновление активных звёзд
				setRaitingActiveWidth();
			});

			raitingItem.addEventListener("click", function (e) {
				// Обновление переменных
				initRaitingVars(raiting);

				if (raiting.dataset.ajax){
					// Отправить на сервер
					setRaitingValue(raitingItem.value, raiting);
				} else {
					// Отобразить указанную оценку
					raitingValue.innerHTML = index + 1;
					setRaitingActiveWidth();
				}
			});

		}
	}
}
//====================================================================

      // Попап на Чистом JavaScript

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding'); // Добавлять элементу, который багается при Lock'е

let unlock = true;
const timeout = 200; // Время выполнения transition, как и в CSS

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++){
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e){
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.popup__close');
if (popupCloseIcon.length > 0){
	for (let index = 0; index < popupCloseIcon.length; index++){
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}
function popupOpen(curentPopup) {
	if (curentPopup && unlock){
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock){
			bodyUnLock();
		}
	}
}
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	if (lockPadding.length > 0){
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');
	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}
function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);
	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}
document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

// (function () {
// 	if (!Elemnt.prototype.closest) {
// 		Elemnt.prototype.closest = function (css) {
// 			var node = this;
// 			while (node) {
// 				if (node.matches(css)) return node;
// 				else node = node.parentElement;
// 			}
// 			return null;
// 		};
// 	}
// })();
// (function () {
// 	if (!Elemnt.prototype.matches) {
// 		Elemnt.prototype.matches = Elemnt.prototype.matchesSelector ||
// 			Elemnt.prototype.webkitMatchesSelector ||
// 			Elemnt.prototype.mozMatchesSelector ||
// 			Elemnt.prototype.msMatchesSelector;
// 	}
// })();

//====================================================================
		// Меню Бургер

const menuBurger = document.querySelector('.menu__burger');
const menuBody = document.querySelector('.header__menu');
if(menuBurger) {
	menuBurger.addEventListener('click', function (e) {
		document.body.classList.toggle('lock');
		menuBurger.classList.toggle('active');
		menuBody.classList.toggle('active');
	});
}