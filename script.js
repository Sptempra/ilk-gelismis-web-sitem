// AOS kütüphanesini içeri aktar
import AOS from 'aos'; 

// --- Ürün Verileri (JavaScript Dizisi) ---
// Bu veriler, ürünlerin displayProducts() fonksiyonu tarafından kullanılabilmesi için
// ürünleri gösteren fonksiyondan önce tanımlanmalıdır.
const products = [
    {
        id: 1,
        name: "Akıllı Telefon X",
        price: 15999.00,
        image: "https://images.unsplash.com/photo-1511707172595-cd981d36d246?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBob25lfGVufDB8fDB8fHww",
        description: "Yüksek performanslı işlemci, muhteşem kamera ve uzun pil ömrü ile kusursuz bir deneyim sunar."
    },
    {
        id: 2,
        name: "Kablosuz Kulaklık Y",
        price: 2499.50,
        image: "https://images.unsplash.com/photo-1546435770-a3e429ad7fb8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
        description: "Gelişmiş gürültü engelleme, kristal netliğinde ses ve gün boyu konfor."
    },
    {
        id: 3,
        name: "Akıllı Saat Z",
        price: 4999.00,
        image: "https://images.unsplash.com/photo-1523275371512-01d10e206979?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
        description: "Kalp atış hızı takibi, bildirimler ve spor aktiviteleriniz için ideal bir yol arkadaşı."
    },
    {
        id: 4,
        name: "Dizüstü Bilgisayar A",
        price: 24999.00,
        image: "https://images.unsplash.com/photo-1517336714730-49689e4726c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
        description: "Güçlü bir işlemci ve geniş depolama alanı ile hem iş hem de eğlence için mükemmel."
    },
    {
        id: 5,
        name: "Oyun Konsolu B",
        price: 18999.00,
        image: "https://images.unsplash.com/photo-1621257404325-1e03c4f90117?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGdhbWluZyUyMGNvbnNvbGV8ZW58MHx8MHx8fDA%3D",
        description: "Sürükleyici oyun deneyimleri için tasarlanmış yeni nesil oyun konsolu."
    },
    {
        id: 6,
        name: "Bluetooth Hoparlör C",
        price: 999.00,
        image: "https://images.unsplash.com/photo-1594954477382-76a03c391789?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJsdWV0b290aCUyMHNwZWFrZXJ8ZW5wfDB8fDB8fHww",
        description: "Taşınabilir tasarım ve zengin ses kalitesi ile müziğinizi her yere taşıyın."
    }
];

// Sepetimiz global olarak tanımlayalım, başlangıçta boş bir dizi
let cart = []; 

// --- Fonksiyon Tanımlamaları (Çağrılmadan önce burada tanımlanmalı) ---

// 1. Dinamik Karşılama Mesajı
function updateGreeting() {
    const greetingElement = document.getElementById('dynamic-greeting');
    if (!greetingElement) {
        console.error("Hata: 'dynamic-greeting' ID'li karşılama elementi bulunamadı.");
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

// 2. Basit Bir Buton Etkileşimi (Artık HTML'de kullanılmıyor olabilir)
// Yine de bu şekilde tanımlı kalmasında bir sakınca yok.
function setupToggleButton() {
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
    }
}


// 3. Form Doğrulaması (Validation)
function setupContactForm() {
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
    }
}


// 4. Navigasyon için Scroll Spy
function activateNavLink() {
    let current = '';
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - (document.querySelector('.main-header')?.offsetHeight || 0) - 50; 
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// 5. Ürünleri Ekrana Yükleme Fonksiyonu
function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) {
        console.error("Hata: 'product-grid' sınıfına sahip ürün grid elementi bulunamadı.");
        return;
    }
    productGrid.innerHTML = ''; // Önceki ürünleri temizle
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.setAttribute('data-aos', 'fade-up'); 
        productCard.setAttribute('data-aos-delay', product.id * 100);

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toFixed(2)} TL</p>
            <button data-product-id="${product.id}">Sepete Ekle</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// --- Sepet Yönetimi Fonksiyonları ---

// Sepet verilerini yerel depolamadan (localStorage) yükleme
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartDisplay(); 
    }
}

// Sepet verilerini yerel depolamaya kaydetme
function saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Sepete ürün ekleme
function addToCart(productId) {
    const product = products.find(p => p.id === productId); 
    if (product) {
        const cartItem = cart.find(item => item.id === productId); 
        if (cartItem) {
            cartItem.quantity++; 
        } else {
            cart.push({ ...product, quantity: 1 }); 
        }
        saveCartToLocalStorage(); 
        updateCartDisplay(); 
        alert(`${product.name} sepete eklendi!`); 
    }
}

// Sepetten ürün miktarını artırma/azaltma
function changeQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId); 
        }
        saveCartToLocalStorage();
        updateCartDisplay();
    }
}

// Sepetten ürün kaldırma
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    updateCartDisplay();
    alert("Ürün sepetten kaldırıldı.");
}

// Sepet görüntüsünü güncelleyen ve modalı dolduran
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    const cartItemCountElement = document.getElementById('cart-item-count');

    if (!cartItemsContainer || !cartTotalPriceElement || !cartItemCountElement) {
        console.error("Hata: Sepet görüntüleme elementlerinden biri veya daha fazlası bulunamadı.");
        return;
    }

    cartItemsContainer.innerHTML = ''; 
    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Sepetiniz boş.</p>';
    } else {
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price.toFixed(2)} TL</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-btn" data-product-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase-btn" data-product-id="${item.id}">+</button>
                </div>
                <button class="remove-item-button" data-product-id="${item.id}">Kaldır</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);

            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });
    }

    cartTotalPriceElement.textContent = totalPrice.toFixed(2);
    cartItemCountElement.textContent = totalItems;

    // Miktar değiştirme ve kaldırma butonlarına event listener ekle
    // Bu dinleyicileri, updateCartDisplay her çalıştığında yeniden eklemeliyiz,
    // çünkü içerik dinamik olarak değişiyor.
    cartItemsContainer.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            const change = event.target.classList.contains('increase-btn') ? 1 : -1;
            changeQuantity(productId, change);
        });
    });

    cartItemsContainer.querySelectorAll('.remove-item-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            removeFromCart(productId);
        });
    });
}

// Ürün kartlarındaki "Sepete Ekle" butonlarına olay dinleyicisi ekle
// Delegasyon kullanarak, ürünler yüklendikten sonra eklenecek butonlar için de çalışmasını sağlarız.
function attachAddToCartListeners() {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.addEventListener('click', (event) => {
            // Tıklanan öğenin bir buton olup olmadığını ve data-product-id özelliği olup olmadığını kontrol et
            if (event.target.tagName === 'BUTTON' && event.target.dataset.productId) {
                const productId = parseInt(event.target.dataset.productId);
                addToCart(productId);
            }
        });
    }
}

// --- Sepet Modal Yönetimi ---
function setupCartModal() {
    const cartModal = document.getElementById('cart-modal');
    const cartIconLink = document.getElementById('cart-icon-link');
    const closeButton = document.querySelector('.modal .close-button');
    const checkoutButton = document.getElementById('checkout-button');

    // Sepet ikonuna tıklayınca modalı aç
    if (cartIconLink && cartModal) {
        cartIconLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            cartModal.style.display = 'block'; 
            updateCartDisplay(); 
        });
    }

    // Kapatma butonuna tıklayınca modalı kapat
    if (closeButton && cartModal) {
        closeButton.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    }

    // Modal dışına tıklayınca modalı kapat
    if (cartModal) {
        window.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }

    // Ödeme Yap butonuna tıklama (simülasyon)
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                alert('Ödeme işlemine geçiliyor... (Bu bir simülasyondur!)');
                cart = []; 
                saveCartToLocalStorage(); 
                updateCartDisplay(); 
                cartModal.style.display = 'none'; 
            } else {
                alert('Sepetiniz boş, ödeme yapamazsınız.');
            }
        });
    }
}


// --- Sayfa Yüklendiğinde Çalışacak Kodlar (TEK VE MERKEZİ NOKTA) ---
document.addEventListener('DOMContentLoaded', () => {
    // Tüm fonksiyon çağrıları, fonksiyon tanımlarından sonra olmalı
    updateGreeting(); 
    displayProducts(); 
    attachAddToCartListeners(); 
    loadCartFromLocalStorage(); 
    setupContactForm(); // Form fonksiyonunu da burada çağır
    setupToggleButton(); // Eğer hala HTML'de varsa bu butonu etkinleştirir
    setupCartModal(); // Sepet modalının olay dinleyicilerini kur

    // Scroll Spy için window listener zaten globalde tanımlı olduğu için burada tekrar çağırmaya gerek yok
    // activateNavLink(); // İlk yüklemede linkin aktif olmasını istiyorsak çağırabiliriz

    AOS.init({
        duration: 1200, 
        once: true,    
    });
});

// Scroll olayı dinleyicisi her zaman aktif olmalı (DOMContentLoaded dışında)
window.addEventListener('scroll', activateNavLink);