
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scroll w dół — chowamy navbar
    navbar.classList.add('hidden');
  } else {
    // Scroll w górę — pokazujemy navbar
    navbar.classList.remove('hidden');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // zapobiega ujemnej wartości
});
