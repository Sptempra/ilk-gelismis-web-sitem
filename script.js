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