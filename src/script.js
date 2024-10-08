const menuNav = document.querySelector('.menu');
const links = document.querySelectorAll('.nav__item');
const actionClass = 'menu--active';

(links || []).forEach(item => {
  item.addEventListener('click', () => {
    menuNav.classList.remove(actionClass);
  });
});

function toggleMenu() {
  const menuNav = document.querySelector('.menu');
  menuNav.classList.toggle(actionClass);
}

function closeMenu() {
  const menuNav = document.querySelector('.menu');
  menuNav.classList.remove(actionClass);
}
