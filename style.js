const navigation = document.querySelector('.navigation')
const highlight = document.querySelector('.highlight');
const items = document.querySelectorAll('.navigation li');


highlight.style.width = items[0].offsetWidth + 'px';
highlight.style.left = items[0].offsetLeft + 'px';
items.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    items.forEach((el) => el.classList.remove('active'));
    item.classList.add('active');
    highlight.style.width = item.offsetWidth + 'px';
    highlight.style.left = item.offsetLeft + 'px';
  });

  item.addEventListener('mouseenter', (e) => {
    if (!item.classList.contains('active')) {
      highlight.style.width = item.offsetWidth * 0.8 + 'px';
      highlight.style.left = item.offsetLeft + item.offsetWidth * 0.1 + 'px';
    }
  });
  item.addEventListener('mouseleave', (e) => {
    const activeItem = document.querySelector('.navigation li.active');
    highlight.style.width = activeItem.offsetWidth + 'px';
    highlight.style.left = activeItem.offsetLeft + 'px';
  });
});

window.addEventListener('resize', () => {
  const activeItem = document.querySelector('.navigation li.active');
  highlight.style.width = activeItem.offsetWidth + 'px';
  highlight.style.left = activeItem.offsetLeft + 'px';
});

