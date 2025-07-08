document.addEventListener('DOMContentLoaded', function() {
    const genreFilter = document.getElementById('genre-filter');
    const yearFilter = document.getElementById('year-filter');
    const animeCards = document.querySelectorAll('.anime-card');

    function filterAnime() {
        const selectedGenre = genreFilter.value;
        const selectedYear = yearFilter.value;

        animeCards.forEach(card => {
            const genre = card.querySelector('.genre').textContent;
            const year = card.querySelector('.year').textContent;

            const genreMatch = selectedGenre === 'all' || genre === selectedGenre;
            const yearMatch = selectedYear === 'all' || year === selectedYear;

            if (genreMatch && yearMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    genreFilter.addEventListener('change', filterAnime);
    yearFilter.addEventListener('change', filterAnime);
});

const themeToggle = document.getElementById('theme-toggle');

// Проверяем сохраненную тему
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Иконка кнопки
themeToggle.textContent = currentTheme === 'dark' ? '🌞' : '🌙';

themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '🌞' : '🌙';
});


document.addEventListener('DOMContentLoaded', function() {
  const scrollContainer = document.querySelector('.team-scroll');
  const scrollLeftBtn = document.querySelector('.scroll-button.left');
  const scrollRightBtn = document.querySelector('.scroll-button.right');
  const cards = document.querySelectorAll('.team-card');
  const cardWidth = cards[0].offsetWidth + 20; // Ширина карточки + gap

  // Клонируем первые 3 карточки и добавляем в конец, последние 3 — в начало
  const firstCards = Array.from(cards).slice(0, 3).map(card => card.cloneNode(true));
  const lastCards = Array.from(cards).slice(-3).map(card => card.cloneNode(true));

  lastCards.forEach(card => scrollContainer.prepend(card));
  firstCards.forEach(card => scrollContainer.appendChild(card));

  // Прокручиваем к "настоящим" карточкам после клонирования
  scrollContainer.scrollLeft = cardWidth * 3;

  // Прокрутка вправо
  scrollRightBtn.addEventListener('click', () => {
    if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - cardWidth * 3) {
      // Если близко к концу — мгновенно (без анимации) перескакиваем в начало
      scrollContainer.scrollTo({
        left: cardWidth * 3,
        behavior: 'instant'
      });
    }
    // Плавная прокрутка
    scrollContainer.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });
  });

  // Прокрутка влево
  scrollLeftBtn.addEventListener('click', () => {
    if (scrollContainer.scrollLeft <= cardWidth * 3) {
      // Если близко к началу — мгновенно перескакиваем в конец
      scrollContainer.scrollTo({
        left: scrollContainer.scrollWidth - cardWidth * 6,
        behavior: 'instant'
      });
    }
    // Плавная прокрутка
    scrollContainer.scrollBy({
      left: -cardWidth,
      behavior: 'smooth'
    });
  });

  // Блокируем стандартное поведение колеса мыши (опционально)
  scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollContainer.scrollLeft += e.deltaY;
  });
});

let isDragging = false;
let startX, scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseup', () => isDragging = false);
scrollContainer.addEventListener('mouseleave', () => isDragging = false);

scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2;
  scrollContainer.scrollLeft = scrollLeft - walk;
});