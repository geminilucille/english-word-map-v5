let current = 0;
const pages = document.querySelectorAll('.page');

function init() {
  pages.forEach((page, index) => {
    page.style.zIndex = pages.length - index;
  });
}
init();

function update() {
  pages.forEach((page, index) => {
    if (index < current) {
      page.classList.add('flipped');
      // Firefox 有时需要强制更新 zIndex 确保翻转后的页不遮挡
      setTimeout(() => {
        if (index < current) page.style.zIndex = index;
      }, 300);
    } else {
      page.classList.remove('flipped');
      page.style.zIndex = pages.length - index;
    }
  });
}

function nextPage() {
  if (current < pages.length - 1) {
    current++;
    update();
  }
}

function prevPage() {
  if (current > 0) {
    current--;
    update();
  }
}

function goTo(index, e) {
  if (e) e.stopPropagation();
  current = index;
  update();
  toggleMenu(false); 
}

function toggleMenu(show) {
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('overlay');
  
  if (show === undefined) {
    show = !menu.classList.contains('open');
  }

  if (show) {
    menu.classList.add('open');
    overlay.classList.add('show');
  } else {
    menu.classList.remove('open');
    overlay.classList.remove('show');
  }
}

function play(word) {
  const audio = new Audio(`https://dict.youdao.com/dictvoice?type=2&audio=${encodeURIComponent(word)}`);
  audio.play().catch(e => console.log("等待交互后播放"));
}