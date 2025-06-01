import AOS from 'aos'; // AOS kütüphanesini içeri aktar
// --- 1. Dinamik Karşılama Mesajı ---
function updateGreeting() {
    const greetingElement = document.getElementById('dynamic-greeting');

    if (!greetingElement) {
        console.error("Error: Greeting element with ID 'dynamic-greeting' not found.");
        return;
    }

    const hour = new Date().getHours();
    let greetingMessage;

    if (hour < 12) {
        greetingMessage = "Günaydın!";
    } else if (hour < 18) {
        greetingMessage = "İyi günler!";
    } else {
        greetingMessage = "İyi akşamlar!";
    }

    greetingElement.textContent = greetingMessage;
}

document.addEventListener('DOMContentLoaded', updateGreeting);


// --- 2. Basit Bir Buton Etkileşimi ---
const toggleButton = document.getElementById('toggle-content-btn');
const toggleContent = document.getElementById('toggle-area');

if (toggleButton && toggleContent) {
    toggleButton.addEventListener('click', function() {
        toggleContent.classList.toggle('hidden');

        if (toggleContent.classList.contains('hidden')) {
            toggleButton.textContent = "Gizli İçeriği Göster";
        } else {
            toggleButton.textContent = "İçeriği Gizle";
        }
    });
} else {
    console.error("Error: Toggle button or content area not found (IDs: toggle-content-btn, toggle-area).");
}


// --- 3. Form Doğrulaması (Validation) ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Formun varsayılan gönderimini engelle

        const nameInput = document.getElementById('full-name');
        const emailInput = document.getElementById('user-email');
        const messageInput = document.getElementById('user-message');

        if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
            alert('Lütfen tüm zorunlu alanları doldurun!');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            alert('Lütfen geçerli bir e-posta adresi girin!');
            return;
        }

        alert('Mesajınız başarıyla gönderildi! (Bu sadece bir simülasyondur)');
        contactForm.reset();
    });
} else {
    console.error("Error: Contact form with ID 'contact-form' not found.");
}

// --- 4. Navigasyon için Scroll Spy ---
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav ul li a');

function activateNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (current) {
        const activeLink = document.querySelector(`.main-nav ul li a[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

window.addEventListener('scroll', activateNavLink);
document.addEventListener('DOMContentLoaded', activateNavLink);


// --- 5. AOS (Animate On Scroll) Kütüphanesi Entegrasyonu ---
// AOS kütüphanesini npm ile kurup, CDN'den yüklemiştik. Şimdi başlatıyoruz.
// "import AOS from 'aos';" ifadesi normalde modern JS modüllerinde kullanılır,
// ancak AOS CDN'den yüklendiği için global olarak erişilebilir oluyor.
// Eğer AOS'u npm ile kurup bundle etseydik, o zaman import ifadesi gerekirdi.
AOS.init({
    duration: 1200, // Animasyon süresi (ms)
    once: true,    // Animasyonun sadece bir kez oynamasını sağlar (kaydırma yapıldığında)
});