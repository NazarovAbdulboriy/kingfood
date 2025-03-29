// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    setupShaurmanLines();
    setupBurgerMenu();
    setupScrollHeader();
    setupRoadmapAnimation();
    setupPriceUpdate();
    setupMenuCarousel();
    setupCopyContractButton();
    setupSmoothScroll();
    setupRandomEffects();
});

// Генерация бегущих строк SHAURMAN
function setupShaurmanLines() {
    const lines = document.querySelectorAll('.shaurman-lines .line');
    const text = 'KING FOOD ';
    const repeatCount = 50; // Количество повторений текста
    
    lines.forEach(line => {
        line.textContent = text.repeat(repeatCount);
    });
}

// Бургер-меню
function setupBurgerMenu() {
    const burger = document.querySelector('.burger-menu');
    const navList = document.querySelector('.nav-list');
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Блокировка скролла при открытом меню
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Изменение шапки и параллакс эффект
function setupScrollHeader() {
    const header = document.querySelector('.header');
    const parallaxSections = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        // Эффект для шапки
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Параллакс эффект для секций
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionPosition = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition > sectionPosition - window.innerHeight && 
                scrollPosition < sectionPosition + sectionHeight) {
                const speed = 0.3; // Скорость параллакса
                const yPos = -(scrollPosition - sectionPosition) * speed;
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
}

// Анимация дорожной карты
function setupRoadmapAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Обновление цены
function setupPriceUpdate() {
    const priceElement = document.querySelector('.current-price');
    const changeElement = document.querySelector('.price-change');
    
    function getRandomPrice() {
        const changes = ['+15%', '+50%', '+300%', '-90%', '-99%', '🚀', '🌕'];
        return changes[Math.floor(Math.random() * changes.length)];
    }
    
    function updatePrice() {
        const randomChange = getRandomPrice();
        const isPositive = !randomChange.startsWith('-') && !randomChange.includes('99');
        
        // Генерация случайной цены
        const basePrice = 0.001;
        const randomMultiplier = isPositive ? 
            (1 + Math.random() * 3) : 
            (1 - Math.random() * 0.9);
        const newPrice = (basePrice * randomMultiplier).toFixed(6);
        
        priceElement.textContent = `1 KING FOOD = $${newPrice}`;
        changeElement.textContent = randomChange;
        
        if (typeof randomChange === 'string' && randomChange.includes('🚀')) {
            changeElement.className = 'price-change moon';
        } else {
            changeElement.className = `price-change ${isPositive ? 'up' : 'down'}`;
        }
    }
    
    // Обновляем цену каждые 3-8 секунд
    setInterval(updatePrice, 3000 + Math.random() * 5000);
    updatePrice();
}

// Карусель меню
function setupMenuCarousel() {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const productCards = document.querySelectorAll('.product-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Размер прокрутки (ширина одной карточки + gap)
    const scrollAmount = 270; // Уменьшено для узких карточек
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    // Фильтрация
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Копирование контракта
function setupCopyContractButton() {
    const copyButton = document.getElementById('copyContract');
    const confirmation = document.getElementById('copyConfirmation');
    
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            const contractText = 'EQD7xs4SRg0kk0CP9sfeMbYZ1QD6YoT0c5VLLrgFYbeAqelU';
            
            navigator.clipboard.writeText(contractText).then(() => {
                copyButton.style.display = 'none';
                confirmation.style.display = 'inline-block';
                confirmation.textContent = 'Скопировано!';
                
                setTimeout(() => {
                    copyButton.style.display = 'inline-block';
                    confirmation.style.display = 'none';
                }, 2000);
            }).catch(err => {
                console.error('Ошибка при копировании: ', err);
                copyButton.textContent = 'Ошибка!';
                copyButton.style.backgroundColor = '#FF5722';
                
                setTimeout(() => {
                    copyButton.textContent = 'Копировать CA';
                    copyButton.style.backgroundColor = '';
                }, 2000);
            });
        });
    }
}

// Плавная прокрутка для якорных ссылок
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Случайные мемные эффекты
function setupRandomEffects() {
    // Случайные эффекты для элементов
    setInterval(() => {
        const elements = document.querySelectorAll('h1, h2, h3, .feature, .product-card');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        if (randomElement && Math.random() > 0.8) {
            randomElement.classList.add('shaking');
            setTimeout(() => {
                randomElement.classList.remove('shaking');
            }, 500);
        }
    }, 5000);
    
    // Эффект при наведении на логотип
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.classList.add('shaking');
            setTimeout(() => {
                logo.classList.remove('shaking');
            }, 500);
        });
    }
}