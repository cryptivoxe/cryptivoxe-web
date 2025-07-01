document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar-links');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link (modified)
    const navItems = document.querySelectorAll('.nav-link:not(.dropdown > .nav-link)');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.querySelector('.dropdown').classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Active link highlighting
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Dropdown functionality (updated)
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');

        if (window.innerWidth <= 768) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        } else {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = this.getAttribute('href');
            });
        }
    });

    // Close dropdown when clicking outside (updated)
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    function setDropdownBehavior() {
        dropdowns.forEach(dropdown => {
            const oldLink = dropdown.querySelector('a');
            const newLink = oldLink.cloneNode(true);
            oldLink.replaceWith(newLink);

            if (window.innerWidth <= 768) {
                newLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                });
            } else {
                newLink.addEventListener('click', function (e) {
                    // Let the link go to its href
                });
            }
        });
    }

    window.addEventListener('resize', setDropdownBehavior);
    setDropdownBehavior();


    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate service cards
    gsap.utils.toArray('.service-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Animate portfolio items
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });

    // Animate about section
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    // Simple counter animation with easing
    function animateValue(obj, start, end, duration, addPlus) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2; // easeInOutQuad

            const value = Math.floor(easedProgress * (end - start) + start);
            obj.textContent = addPlus && progress === 1 ? `${value}+` : value;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Initialize counters when section is visible
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate each counter
                document.querySelectorAll('.countup').forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const hasPlus = counter.classList.contains('add-plus');
                    animateValue(counter, 0, target, 2000, hasPlus);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Animate contact section
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.footer-newsletter form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Here you would typically send the email to a server
            // For demonstration, we'll just show an alert
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
});


// Portfolio Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.portfolio-item').forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
