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