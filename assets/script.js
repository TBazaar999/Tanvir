(function () {
  // Mobile menu
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }
  });

  // Hero slider
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.dots button');
  var current = 0, timer;
  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle('is-active', n === current); });
    dots.forEach(function (d, n) { d.classList.toggle('is-active', n === current); });
  }
  function start() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(timer);
    timer = setInterval(function () { show(current + 1); }, 6500);
  }
  dots.forEach(function (d, n) { d.addEventListener('click', function () { show(n); start(); }); });
  start();

  // Service search and category filter
  var cards = document.querySelectorAll('#service-grid .card');
  var input = document.getElementById('svc-search');
  var empty = document.getElementById('empty');
  var clear = document.getElementById('clear-filter');
  function apply(tag, text) {
    var shown = 0;
    text = (text || '').toLowerCase().trim();
    cards.forEach(function (c) {
      var okTag = !tag || tag === 'all' || c.dataset.tags.split(' ').indexOf(tag) > -1;
      var okText = !text || c.textContent.toLowerCase().indexOf(text) > -1;
      var ok = okTag && okText;
      c.hidden = !ok;
      if (ok) shown++;
    });
    empty.hidden = shown !== 0;
    clear.hidden = !(tag && tag !== 'all') && !text;
  }
  document.querySelectorAll('.cats a').forEach(function (a) {
    a.addEventListener('click', function () { input.value = ''; apply(a.dataset.filter, ''); });
  });
  input.addEventListener('input', function () {
    apply('', input.value);
    if (input.value.trim()) document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  });
  clear.addEventListener('click', function () { input.value = ''; apply('', ''); });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
