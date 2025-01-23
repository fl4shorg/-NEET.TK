let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    document.getElementById('carouselInner').style.transform = 'translateX(-' + currentSlide * 100 + '%)';
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Inicializa o carrossel na primeira posição
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('carouselInner').style.transform = 'translateX(0)';
});