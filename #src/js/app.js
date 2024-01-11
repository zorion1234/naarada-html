(function isWebP() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {

      if (support == true) {
         document.querySelector('html').classList.add('webp');
      } else {
         document.querySelector('html').classList.add('no-webp');
      }
   });
})()

document.addEventListener("DOMContentLoaded", () => {
   accordion(".cottage-spoiler__header", ".cottage-spoiler__main")
})

if (document.querySelector('.cottage-comfort__swiper')) {
   new Swiper('.cottage-comfort__swiper', {
      slidesPerView: 1,
      loop: true,

      navigation: {
         nextEl: '.cottage-comfort__btn_next',
         prevEl: '.cottage-comfort__btn_prev',
      },
   });
}
if (document.querySelector('.cottage-bath__swiper')) {
   new Swiper('.cottage-bath__swiper', {
      slidesPerView: 1,
      loop: true,
      pagination: {
         el: '.cottage-bath__pagination',
      },
      navigation: {
         nextEl: '.cottage-bath__btn_next',
         prevEl: '.cottage-bath__btn_prev',
      },
   });
}
if (document.querySelector('.cottage-fullpage__swiper')) {
   new Swiper('.cottage-fullpage__swiper', {
      slidesPerView: 1,
      effect: 'fade',
      speed: 500,
      loop: true,
      navigation: {
         nextEl: '.cottage-fullpage__btn_next',
         prevEl: '.cottage-fullpage__btn_prev',
      },
   });
}
if (document.querySelector('.cottage-reviews__swiper')) {
   new Swiper('.cottage-reviews__swiper', {
      loop: true,
      navigation: {
         nextEl: '.cottage-reviews__btn_next',
         prevEl: '.cottage-reviews__btn_prev',
      },
      breakpoints: {
         320: {
            slidesPerView: 1,
            spaceBetween: 24,

         },
         768: {
            slidesPerView: 2,
         },
         992: {
            slidesPerView: 3,
            spaceBetween: 40,

         },
      }
   });
}

if (document.querySelector('.banket-views__swiper')) {
   new Swiper('.banket-views__swiper', {
      loop: true,
      speed: 1000,
      pagination: {
         el: '.banket-views__pagination',
      },
      centeredSlides: true,
      navigation: {
         nextEl: '.banket-views__btn_next',
         prevEl: '.banket-views__btn_prev',
      },
      breakpoints: {
         320: {
            slidesPerView: 1,
            initialSlide: 0,
            spaceBetween: 24,
         },
         768: {
            slidesPerView: 2,
            initialSlide: 1,
            spaceBetween: 40,

         }
      }
   });
}
function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`)
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`)
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return
               } // Иначе
               // все прячем
               slideHide(contents[j], 500)
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = openLink.nextElementSibling;
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active")
            } else {
               openLink.classList.add("active")
            }
            // показываем нужный
            slideShow(content, 500)

         })
      }
   }
}



function slideShow(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (el.classList.contains('collapsing') || el.classList.contains('collapse_show')) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove('collapse');
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style['height'] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style['overflow'] = 'hidden';
   // создание анимации скольжения с помощью CSS свойства transition
   el.style['transition'] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add('collapsing');
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style['height'] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove('collapsing');
      // добавим классы collapse и collapse_show
      el.classList.add('collapse');
      el.classList.add('collapse_show');
      // удалим свойства height, transition и overflow
      el.style['height'] = '';
      el.style['transition'] = '';
      el.style['overflow'] = '';
   }, duration);
}
function slideHide(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (el.classList.contains('collapsing') || !el.classList.contains('collapse_show')) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style['height'] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style['height'] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style['overflow'] = 'hidden';
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style['transition'] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove('collapse');
   el.classList.remove('collapse_show');
   // добавим класс collapsing
   el.classList.add('collapsing');
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove('collapsing');
      // добавим класс collapsing
      el.classList.add('collapse');
      // удалим свойства height, transition и overflow
      el.style['height'] = '';
      el.style['transition'] = '';
      el.style['overflow'] = '';
   }, duration);
}