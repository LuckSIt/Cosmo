let continents = document.querySelectorAll('.country');
let popupBg = document.querySelector('.info__bg');
let popupPhoto = document.querySelector('.info__photo');
let popupTitle = document.querySelector('.info__title');
let popupText = document.querySelector('.info__text');
let tooltip = document.querySelector('.tooltip');

const countryImages = {
    'Россия': [
        { photo: 'src/Карточки_РФ_new.png' },
        { photo: 'src/ОбщСтат.png' }
    ]
    // Добавьте другие страны и их изображения здесь
};

let currentCountry = '';
let currentIndex = 0;

continents.forEach((item) => {
    item.addEventListener('click', function() {
        currentCountry = this.getAttribute('data-title'); // Получаем название страны
        currentIndex = 0; // Сбрасываем индекс при открытии
        updatePopup();
        popupBg.classList.add('active');
    });

    item.addEventListener('mouseenter', function() {
        tooltip.textContent = item.getAttribute('data-title');
        tooltip.style.display = 'block';
    });

    item.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
    });

    item.addEventListener('mousemove', function(e) {
        tooltip.style.top = (e.clientY + 20) + 'px';
        tooltip.style.left = (e.clientX + 20) + 'px';
    });
});

// Обновление содержимого всплывающего окна
function updatePopup() {
    const images = countryImages[currentCountry];
    if (images && images.length > 0) {
        popupTitle.textContent = currentCountry;
        popupPhoto.setAttribute('src', images[currentIndex].photo);
        popupText.textContent = `Изображение ${currentIndex + 1} из ${images.length}`;
    }
    else {
        popupTitle.textContent = currentCountry;
        popupPhoto.setAttribute('src', 'path/to/default/image.png'); // Путь к изображению по умолчанию
        popupText.textContent = 'Изображения отсутствуют';
    }
}

document.querySelector('.prev').addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        updatePopup();
    }
});

document.querySelector('.next').addEventListener('click', function() {
    const images = countryImages[currentCountry];
    if (images && currentIndex < images.length - 1) {
        currentIndex++;
        updatePopup();
    }
});

document.addEventListener('click', (e) => {
    if (e.target === popupBg) {
        popupBg.classList.remove('active');
    }
});
