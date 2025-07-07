let pageViews = localStorage.getItem('page_view_count');
        if (!pageViews) {
            pageViews = 100;
        } else {
            pageViews = parseInt(pageViews);
        }
        pageViews += 1;
        localStorage.setItem('page_view_count', pageViews);
        document.getElementById('viewCount').textContent = pageViews;

        const scriptURL = 'https://script.google.com/macros/s/AKfycbx87Oiz-0CA_IIH_AQIvhxyY6LcOpZ4iW2OAJYDXKHMsKurSr6haDn42xmQeD9HF5m3Wg/exec';
        const form = document.forms['submit-to-google-sheet'];
        const statusMessage = document.getElementById("status-message");

        form.addEventListener('submit', e => {
            e.preventDefault();
            statusMessage.textContent = "Sending...";
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    statusMessage.textContent = "Message sent successfully";
                    form.reset();
                    setTimeout(() => {
                        statusMessage.textContent = "";
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    statusMessage.textContent = "An error occurred. Please try again.";
                });
        });

        const typed = new Typed('.text', {
            strings: ['Learner', 'Full Stack Developer', 'Web Designer', 'UI/UX Designer'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        window.addEventListener('load', function () {
            const loader = document.querySelector('.loader-wrapper');
            if (loader) loader.style.display = 'none';
        });

        const hamburger = document.querySelector('.hamburger');
        const navbar = document.querySelector('.navbar');

        if (hamburger && navbar) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navbar.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
                    navbar.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });

            navbar.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        document.addEventListener('DOMContentLoaded', function () {
            const navLinks = document.querySelectorAll('.navbar a');

            navLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);

                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }

                    navLinks.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            window.addEventListener('scroll', function () {
                let current = '';
                document.querySelectorAll('section').forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= sectionTop - sectionHeight / 3) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                });
            });
        });
        const toggleBtn = document.getElementById("toggleProjects");
        const toggleBtn1 = document.getElementById("toggleProjects1");
        const projectsSection = document.getElementById("More-Projects");

        const animateIn = (element, delay) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(30px) scale(0.95)";
            element.style.transition = "none";
            setTimeout(() => {
                element.style.transition = "all 0.6s ease-in-out";
                element.style.opacity = "1";
                element.style.transform = "translateY(0) scale(1)";
            }, delay);
        };

        const animateOut = (element, delay) => {
            setTimeout(() => {
                element.style.transition = "all 0.6s ease-in-out";
                element.style.opacity = "0";
                element.style.transform = "translateY(30px) scale(0.95)";
            }, delay);
        };

        const showProjects = () => {
            // Using querySelectorAll within projectsSection to target only the rows in More-Projects
            const rows = projectsSection.querySelectorAll(".portfolio-content .row");
            projectsSection.style.display = "block";
            rows.forEach((row, i) => {
                animateIn(row, 100 + i * 120);
            });
            setTimeout(() => {
                projectsSection.classList.add("show");
            }, 100);

            // Update button visibility
            toggleBtn.style.display = "none";
            toggleBtn1.style.display = "block";
        };
        const hideProjects = () => {
            const rows = projectsSection.querySelectorAll(".portfolio-content .row");
            rows.forEach((row, i) => {
                animateOut(row, i * 100);
            });
            setTimeout(() => {
                projectsSection.classList.remove("show");
                projectsSection.style.display = "none";

                // Update button visibility
                toggleBtn.style.display = "block";
                toggleBtn1.style.display = "none";
            }, rows.length * 100 + 600);
        };

        // Initialize - hide the "Less Projects" button initially
        document.addEventListener("DOMContentLoaded", () => {
            toggleBtn1.style.display = "none";
            projectsSection.style.display = "none";
        });

        toggleBtn.addEventListener("click", () => {
            showProjects();
        });

        toggleBtn1.addEventListener("click", () => {
            hideProjects();
        });
        