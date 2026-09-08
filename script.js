$(document).ready(function () {

  // ===== YEAR =====
  $('#year').text(new Date().getFullYear());

  // ===== NAVBAR SCROLL =====
  $(window).scroll(function () {
    if ($(this).scrollTop() > 60) {
      $('#mainNav').addClass('scrolled');
    } else {
      $('#mainNav').removeClass('scrolled');
    }
  });

  // ===== SMOOTH SCROLL (navbar links) =====
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 70
      }, 600, 'swing');
      // Close mobile menu
      $('#navMenu').collapse('hide');
    }
  });

  // ===== TYPING EFFECT =====
  var titles = [
    'Frontend Developer',
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Bootstrap Expert',
    'JavaScript Ninja'
  ];
  var titleIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 90;

  function typeEffect() {
    var current = titles[titleIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    $('#typedText').html(
      '&gt; ' + current.substring(0, charIndex) + '<span class="typed-cursor">|</span>'
    );

    if (!isDeleting && charIndex === current.length) {
      setTimeout(function () { isDeleting = true; }, 1800);
      typeSpeed = 55;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 90;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // ===== SCROLL REVEAL =====
  function revealOnScroll() {
    $('.reveal').each(function () {
      var elemTop = $(this).offset().top;
      var viewBottom = $(window).scrollTop() + $(window).height();
      if (elemTop < viewBottom - 60) {
        $(this).addClass('visible');
      }
    });
  }

  // Add reveal class to sections
  $('.about-card, .about-text, .skill-card, .project-card, ' +
    '.contact-info-box, .contact-form-box, .section-heading, .section-tag').addClass('reveal');

  $(window).scroll(revealOnScroll);
  revealOnScroll(); // run on load

  // ===== SKILL BARS =====
  function animateSkillBars() {
    $('.skill-fill').each(function () {
      var el = $(this);
      var parentTop = el.closest('.skill-card').offset().top;
      var viewBottom = $(window).scrollTop() + $(window).height();
      if (parentTop < viewBottom - 40 && !el.hasClass('animated')) {
        el.addClass('animated');
        el.animate({ width: el.data('width') + '%' }, 1200);
      }
    });
  }
  $(window).scroll(animateSkillBars);
  animateSkillBars();

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    $('.stat-num').each(function () {
      var el = $(this);
      var parentTop = el.closest('.about-stats').offset().top;
      var viewBottom = $(window).scrollTop() + $(window).height();
      if (parentTop < viewBottom - 40 && !el.hasClass('counted')) {
        el.addClass('counted');
        var target = parseInt(el.data('count'));
        $({ count: 0 }).animate({ count: target }, {
          duration: 1500,
          easing: 'swing',
          step: function () {
            el.text(Math.floor(this.count));
          },
          complete: function () {
            el.text(target);
          }
        });
      }
    });
  }
  $(window).scroll(animateCounters);
  animateCounters();

  // ===== PROJECTS: STATIC DATA (no backend / admin panel needed) =====
  // Add or edit projects here directly. "image" can be a relative path like
  // "image/myproject.png" — leave it null to use the plain colored thumbnail.
  var PROJECTS = [
    {
      title: 'Wonder-of-World1',
      category: 'frontend',
      description: 'A visually engaging and responsive Wonders of the World website designed to showcase the most famous natural and man-made wonders across the globe. The platform features an attractive layout, image-rich sections, and smooth navigation to provide users with an informative and immersive exploration experience of world heritage sites.',
      tech: ['HTML', 'CSS', 'Bootstrap', 'jQuery'],
      githubUrl: 'https://github.com/nomankhandev/Wonder-of-World1',
      liveUrl: 'https://nomankhandev.github.io/Wonder-of-World1/',
      image: null
    },
    {
      title: 'Wedding Planner',
      category: 'frontend',
      description: 'An elegant and fully responsive Wedding Planner website designed to showcase professional wedding planning services. The website includes beautiful UI design, smooth navigation, and well-structured sections for services, galleries, packages, and contact, creating a seamless experience for couples planning their special day.',
      tech: ['HTML', 'CSS', 'JS', 'Bootstrap'],
      githubUrl: 'https://github.com/nomankhandev/shadi-mahal',
      liveUrl: 'https://nomankhandev.github.io/shadi-mahal/',
      image: null
    },
    {
      title: 'Water World',
      category: 'frontend',
      description: 'A modern and responsive Water World themed website designed for showcasing aquatic adventures, marine experiences, or water park attractions. The website features a clean UI, smooth navigation, and visually engaging sections that highlight services, galleries, and key information in an interactive and user-friendly way.',
      tech: ['JS', 'jQuery', 'Bootstrap', 'Git'],
      githubUrl: 'https://github.com/nomankhandev/water-world',
      liveUrl: 'https://nomankhandev.github.io/water-world/',
      image: null
    },
    {
      title: 'Portfolio Template',
      category: 'frontend',
      description: 'A multi-page portfolio template for developers with dark/light mode toggle.',
      tech: ['HTML', 'CSS', 'JS', 'Bootstrap'],
      githubUrl: 'https://github.com/nomankhandev/portfoliotm',
      liveUrl: 'https://nomankhandev.github.io/portfoliotm/',
      image: null
    },
    {
      title: 'Wilson Sports',
      category: 'frontend',
      description: 'A modern and responsive Wilson Sports website designed for showcasing premium sports equipment and athletic gear. The platform features a clean, user-friendly interface with smooth navigation, product highlights, and a visually engaging layout that enhances the shopping and browsing experience for sports enthusiasts.',
      tech: ['JS', 'jQuery', 'Bootstrap', 'API'],
      githubUrl: 'https://github.com/nomankhandev/wilson-',
      liveUrl: 'https://nomankhandev.github.io/wilson-/',
      image: null
    }
  ];

  var thumbClasses = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];

  function escapeHtml(str) {
    return $('<div>').text(str == null ? '' : str).html();
  }

  function renderProjects(projects) {
    var $grid = $('#projectsGrid');
    $grid.empty();

    if (!projects || !projects.length) {
      $grid.append('<p class="text-center w-100" style="opacity:.6;">No projects yet.</p>');
      return;
    }

    projects.forEach(function (p, i) {
      var num = String(i + 1).padStart(2, '0');
      var thumbClass = thumbClasses[i % thumbClasses.length];
      var thumbStyle = p.image
        ? ' style="background-image:url(\'' + escapeHtml(p.image) + '\');background-size:cover;background-position:center;"'
        : '';
      var techHtml = (p.tech || []).map(function (t) { return '<span>' + escapeHtml(t) + '</span>'; }).join('');
      var githubLink = p.githubUrl
        ? '<a href="' + escapeHtml(p.githubUrl) + '" target="_blank" rel="noopener" class="proj-link"><i class="fab fa-github"></i></a>'
        : '';
      var liveLink = p.liveUrl
        ? '<a href="' + escapeHtml(p.liveUrl) + '" target="_blank" rel="noopener" class="proj-link"><i class="fas fa-external-link-alt"></i></a>'
        : '';

      var card = $(
        '<div class="col-md-6 col-lg-4 project-item reveal visible" data-category="' + escapeHtml(p.category || 'frontend') + '">' +
          '<div class="project-card">' +
            '<div class="project-thumb ' + thumbClass + '"' + thumbStyle + '>' +
              '<div class="project-overlay">' + githubLink + liveLink + '</div>' +
              '<span class="proj-num">' + num + '</span>' +
            '</div>' +
            '<div class="project-info">' +
              '<span class="proj-type">' + escapeHtml(p.category === 'fullstack' ? 'Full Stack' : 'Frontend') + '</span>' +
              '<h4 class="proj-title">' + escapeHtml(p.title) + '</h4>' +
              '<p class="proj-desc">' + escapeHtml(p.description) + '</p>' +
              '<div class="proj-tech">' + techHtml + '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
      $grid.append(card);
    });
  }

  // Renders straight from the PROJECTS array above — works on any static host,
  // no server/API call required (this is what was breaking on live hosting).
  renderProjects(PROJECTS);

  // ===== PROJECT FILTER =====
  $(document).on('click', '.filter-btn', function () {
    var filter = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
      $('.project-item').show().removeClass('hidden').css('opacity', 0).animate({ opacity: 1 }, 400);
    } else {
      $('.project-item').each(function () {
        if ($(this).data('category') === filter) {
          $(this).show().removeClass('hidden').css('opacity', 0).animate({ opacity: 1 }, 400);
        } else {
          $(this).animate({ opacity: 0 }, 300, function () {
            $(this).hide().addClass('hidden');
          });
        }
      });
    }
  });

  // ===== CONTACT FORM (pure frontend — no backend/server required) =====
  // Validates everything client-side, then hands the message to the user's
  // own email app via a mailto: link addressed to Noman. This works on any
  // static host (GitHub Pages, Netlify, shared hosting, etc.) with zero server code.
  var CONTACT_EMAIL = 'nomankhanaptech@gmail.com';

  $('#sendBtn').on('click', function () {
    var name    = $.trim($('#cName').val());
    var email   = $.trim($('#cEmail').val());
    var subject = $.trim($('#cSubject').val());
    var msg     = $.trim($('#cMsg').val());
    var honeypot = $.trim($('#cWebsite').val());
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    $('#formMsg').hide().removeClass('success-msg error-msg');

    // Honeypot: if this hidden field got filled in, it's a bot — silently do nothing.
    if (honeypot) {
      return;
    }

    if (!name || !email || !subject || !msg) {
      $('#formMsg')
        .text('⚠ Please fill in all fields.')
        .addClass('error-msg')
        .fadeIn(300);
      return;
    }

    if (name.length < 2 || name.length > 100) {
      $('#formMsg').text('⚠ Name must be between 2 and 100 characters.').addClass('error-msg').fadeIn(300);
      return;
    }

    if (!emailRegex.test(email) || email.length > 150) {
      $('#formMsg')
        .text('⚠ Please enter a valid email address.')
        .addClass('error-msg')
        .fadeIn(300);
      return;
    }

    if (subject.length < 3 || subject.length > 150) {
      $('#formMsg').text('⚠ Subject must be between 3 and 150 characters.').addClass('error-msg').fadeIn(300);
      return;
    }

    if (msg.length < 10 || msg.length > 5000) {
      $('#formMsg').text('⚠ Message must be between 10 and 5000 characters.').addClass('error-msg').fadeIn(300);
      return;
    }

    var btn = $(this);
    btn.html('<i class="fas fa-check me-2"></i>Opening your email app...').prop('disabled', true);

    var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + msg;
    var mailtoLink = 'mailto:' + encodeURIComponent(CONTACT_EMAIL) +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailtoLink;

    $('#cName, #cEmail, #cSubject, #cMsg').val('');
    $('#formMsg')
      .text('✅ Your email app should now open with the message pre-filled — just hit send!')
      .addClass('success-msg')
      .fadeIn(300);

    setTimeout(function () {
      btn.html('<i class="fas fa-paper-plane me-2"></i>Send Message').prop('disabled', false);
      $('#formMsg').fadeOut(400);
    }, 4500);
  });

  // ===== ACTIVE NAV ON SCROLL =====
  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop() + 100;
    $('section[id]').each(function () {
      var sectionTop = $(this).offset().top;
      var sectionBottom = sectionTop + $(this).outerHeight();
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        var id = $(this).attr('id');
        $('.nav-link').removeClass('active-link');
        $('.nav-link[href="#' + id + '"]').addClass('active-link');
      }
    });
  });

});
