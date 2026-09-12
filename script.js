// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Reservation Form Handler
const reservationForm = document.getElementById('reservationForm');
const reservationMessage = document.getElementById('reservationMessage');

if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate date is not in the past
        const selectedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showMessage('Lütfen gelecek bir tarih seçiniz.', 'error');
            return;
        }
        
        // Validate time
        const [hours, minutes] = data.time.split(':');
        if (hours < 11 || hours >= 22) {
            showMessage('Çalışma saatleri: 11:00 - 22:00', 'error');
            return;
        }
        
        // Show success message
        showMessage(`Rezervasyon başarılı! ${data.name} ismine kayıt edildi. Teşekkürler!`, 'success');
        
        // Log reservation data (in real app, send to server)
        console.log('Rezervasyon Verileri:', data);
        
        // Reset form
        this.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            reservationMessage.classList.remove('success', 'error');
            reservationMessage.textContent = '';
        }, 5000);
    });
}

// Show message function
function showMessage(message, type) {
    reservationMessage.textContent = message;
    reservationMessage.className = 'message ' + type;
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items and contact items
document.querySelectorAll('.menu-item, .contact-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});