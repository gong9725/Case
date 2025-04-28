let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
let autoSlideInterval;
let manualSlideTimeout;

function showSlide(index) {
    items.forEach((item, idx) => {
        item.style.opacity = idx === index ? 1 : 0;
    });
    currentIndex = index;
}

function nextSlide() {
    const nextIndex = (currentIndex + 1) % totalItems;
    showSlide(nextIndex);
    resetAutoSlide();
}

function prevSlide() {
    const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
    showSlide(prevIndex);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    if (manualSlideTimeout) clearTimeout(manualSlideTimeout);
    manualSlideTimeout = setTimeout(startAutoSlide, 3000);
}

// 初始化显示第一张图片
showSlide(currentIndex);
startAutoSlide();