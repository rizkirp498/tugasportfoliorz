// --- HAMBURGER MENU LOGIC ---
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Tutup menu saat diklik di HP
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        hamburger.classList.remove('toggle');
    });
});

// --- LIQUID GLASS NAVIGATION EFFECT ---
const indicator = document.querySelector('.glass-indicator');
const sections = document.querySelectorAll('section');

function moveIndicator(element) {
    if(!element || window.innerWidth <= 768) return;
    
    // Memberikan sedikit ruang lega (padding) agar pil kaca tidak terlalu ngepas dengan teks
    const pad = 12; 
    indicator.style.width = `${element.offsetWidth + pad}px`;
    indicator.style.left = `${element.offsetLeft - (pad / 2)}px`;
    indicator.style.opacity = '1';
}

// Inisialisasi awal
setTimeout(() => {
    let activeItem = document.querySelector('.nav-links a.active');
    if(activeItem) moveIndicator(activeItem);
}, 100);

// Hover interaktif
navLinksItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        moveIndicator(e.target);
    });
});

// Kembali ke posisi menu yang aktif
navLinksContainer.addEventListener('mouseleave', () => {
    let activeItem = document.querySelector('.nav-links a.active');
    if(activeItem) moveIndicator(activeItem);
});

// Spy Scroll: Update indikator otomatis saat di-scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
            if (!navLinksContainer.matches(':hover')) {
                moveIndicator(item);
            }
        }
    });
});

// --- ANIMASI SCROLL FADE-IN ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((element) => {
    observer.observe(element);
});

// --- EFEK 3D HOVER ID CARD ---
const cardContainer = document.querySelector('.id-card-container');
const idCard = document.querySelector('.id-card');

if (cardContainer && idCard) {
    cardContainer.addEventListener('mousemove', (e) => {
        const rect = idCard.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -12; 
        const rotateY = ((x - centerX) / centerX) * 12;
        
        // Mematikan efek 3D di HP
        if(window.innerWidth > 768) {
            idCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }
    });

    cardContainer.addEventListener('mouseleave', () => {
        if(window.innerWidth > 768) {
            idCard.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            idCard.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        }
    });

    cardContainer.addEventListener('mouseenter', () => {
        if(window.innerWidth > 768) {
            idCard.style.transition = 'none';
        }
    });
}