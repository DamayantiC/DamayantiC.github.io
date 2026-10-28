(function () {
  var links = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = [];

  links.forEach(function (link) {
    var el = document.querySelector(link.getAttribute('href'));
    if (el) sections.push({ link: link, el: el });
  });

  // Scroll progress bar
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  var ticking = false;

  function update() {
    var scrollY = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docHeight > 0 ? (scrollY / docHeight) * 100 : 0) + '%';

    // The current section is the last one whose top has passed the line near the top of the viewport
    var marker = scrollY + 140;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.el.offsetTop <= marker) current = s;
    });

    // At the very bottom of the page, highlight the last section
    if (docHeight > 0 && scrollY >= docHeight - 4) {
      current = sections[sections.length - 1];
    }

    sections.forEach(function (s) {
      var isActive = s === current;
      s.link.classList.toggle('active', isActive);
      if (isActive) s.link.setAttribute('aria-current', 'true');
      else s.link.removeAttribute('aria-current');
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
