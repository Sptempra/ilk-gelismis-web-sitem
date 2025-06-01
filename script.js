// --- 1. Dinamik Karşılama Mesajı ---
function updateGreeting() {
    // HTML'den ID'si 'dynamic-greeting' olan elementi seç
    const greetingElement = document.getElementById('dynamic-greeting');

    // Element yoksa, işlemi durdur ve konsola mesaj yaz
    if (!greetingElement) {
        console.log("Error: Greeting element with ID 'dynamic-greeting' not found.");
        return;
    }

    const hour = new Date().getHours(); // Şu anki saati al (0-23 arası)
    let greetingMessage; // Karşılama mesajını tutacak değişken

    if (hour < 12) {
        greetingMessage = "Günaydın!";
    } else if (hour < 18) {
        greetingMessage = "İyi günler!";
    } else {
        greetingMessage = "İyi akşamlar!";
    }

    // Elementin içeriğini değiştir
    greetingElement.textContent = greetingMessage;
}

// Sayfa tamamen yüklendiğinde karşılama mesajını güncellemek için
// window.onload yerine DOMContentLoaded kullanmak daha doğru olabilir
// çünkü DOMContentLoaded CSS ve resimler gibi diğer kaynakların yüklenmesini beklemez.
document.addEventListener('DOMContentLoaded', updateGreeting);


// --- 2. Basit Bir Buton Etkileşimi ---
// HTML'den butonu ve gizleyip göstereceğimiz alanı seç
const toggleButton = document.getElementById('toggle-content-btn');
const toggleContent = document.getElementById('toggle-area');

// Hem buton hem de içerik alanı varsa olayı dinle
if (toggleButton && toggleContent) {
    toggleButton.addEventListener('click', function() {
        // 'hidden' sınıfını ekle/kaldır
        toggleContent.classList.toggle('hidden');

        // Butonun metnini değiştir
        if (toggleContent.classList.contains('hidden')) {
            toggleButton.textContent = "Gizli İçeriği Göster";
        } else {
            toggleButton.textContent = "İçeriği Gizle";
        }
    });
} else {
    // Eğer elementler bulunamazsa konsola uyarı yaz
    console.log("Error: Toggle button or content area not found (IDs: toggle-content-btn, toggle-area).");
}


// --- 3. Form Doğrulaması (Validation) ---
const contactForm = document.getElementById('contact-form'); // Formu seç

// Form varsa, gönderim olayını dinle
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Formun varsayılan gönderimini engelle

        const nameInput = document.getElementById('full-name');
        const emailInput = document.getElementById('user-email');
        const messageInput = document.getElementById('user-message');

        // Boş alan kontrolü
        if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
            alert('Lütfen tüm zorunlu alanları doldurun!'); // Kullanıcıya uyarı göster
            return; // Fonksiyondan çık
        }

        // Basit e-posta formatı kontrolü (regex)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            alert('Lütfen geçerli bir e-posta adresi girin!');
            return;
        }

        // Tüm kontroller başarılıysa
        alert('Mesajınız başarıyla gönderildi! (Bu sadece bir simülasyondur)'); // Başarılı mesajı
        contactForm.reset(); // Formu temizle
    });
} else {
    // Eğer form bulunamazsa konsola uyarı yaz
    console.log("Error: Contact form with ID 'contact-form' not found.");
}

// --- 4. Navigasyon için Scroll Spy ---
const sections = document.querySelectorAll('main section[id]'); // Tüm section elementlerini ID'si olanları seç
const navLinks = document.querySelectorAll('.main-nav ul li a'); // Tüm navigasyon linklerini seç

function activateNavLink() {
    let current = ''; // Aktif bölümün ID'sini tutacak değişken

    // Ekrandaki her bölüm için döngü yap
    sections.forEach(section => {
        // Bölümün tarayıcının üst kısmına olan uzaklığı
        const sectionTop = section.offsetTop;
        // Bölümün yüksekliği
        const sectionHeight = section.clientHeight;

        // Eğer şu anki kaydırma pozisyonu, bölümün başlangıcını geçmişse ve bitişini geçmemişse
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
            current = section.getAttribute('id'); // O bölümün ID'sini al
        }
    });

    // Tüm navigasyon linklerindeki 'active' sınıfını kaldır
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Eğer bir 'current' ID'si varsa, o ID'ye sahip linke 'active' sınıfını ekle
    if (current) {
        const activeLink = document.querySelector(`.main-nav ul li a[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Sayfa kaydırıldığında ve sayfa yüklendiğinde fonksiyonu çalıştır
window.addEventListener('scroll', activateNavLink);
document.addEventListener('DOMContentLoaded', activateNavLink);
// --- 5. AOS (Animate On Scroll) Kütüphanesi Entegrasyonu ---

// AOS'u başlat (sayfa yüklendiğinde otomatik çalışır)
AOS.init({
    duration: 1200, // Animasyon süresi (ms)
    once: true,    // Animasyonun sadece bir kez oynamasını sağlar (kaydırma yapıldığında)
});