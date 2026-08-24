// Click-to-zoom lightbox for award photos, with left/right navigation
// within a photo's own group (e.g. all photos of one competition).
// Also drives the inline sliding carousel for cards with multiple photos.
document.addEventListener('DOMContentLoaded', () => {
	// --- Inline sliding carousel (multi-photo award cards) ---
	const AUTOPLAY_DELAY = 1500;

	document.querySelectorAll('.award-carousel').forEach((carousel) => {
		const track = carousel.querySelector('.award-carousel-track');
		const images = Array.from(track.querySelectorAll('img'));
		const prevBtn = carousel.querySelector('.award-carousel-prev');
		const nextBtn = carousel.querySelector('.award-carousel-next');
		let index = 0;
		let timer = null;

		function goTo(i) {
			index = (i + images.length) % images.length;
			track.style.transform = `translateX(-${index * 100}%)`;
		}

		function stopAutoplay() {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
		}

		function startAutoplay() {
			stopAutoplay();
			if (images.length > 1) {
				timer = setInterval(() => goTo(index + 1), AUTOPLAY_DELAY);
			}
		}

		prevBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			goTo(index - 1);
			startAutoplay();
		});
		nextBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			goTo(index + 1);
			startAutoplay();
		});

		// Pause while the user is looking closely, resume on mouse/finger away.
		carousel.addEventListener('mouseenter', stopAutoplay);
		carousel.addEventListener('mouseleave', startAutoplay);

		startAutoplay();
	});

	// --- Lightbox ---
	const overlay = document.createElement('div');
	overlay.className = 'lightbox-overlay';
	overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button>' +
		'<button class="lightbox-prev" aria-label="Previous photo">&#10094;</button>' +
		'<img alt="" />' +
		'<button class="lightbox-next" aria-label="Next photo">&#10095;</button>';
	document.body.appendChild(overlay);

	const overlayImg = overlay.querySelector('img');
	const closeBtn = overlay.querySelector('.lightbox-close');
	const prevBtn = overlay.querySelector('.lightbox-prev');
	const nextBtn = overlay.querySelector('.lightbox-next');

	let currentGroup = [];
	let currentIndex = 0;

	function showIndex(index) {
		currentIndex = (index + currentGroup.length) % currentGroup.length;
		const img = currentGroup[currentIndex];
		overlayImg.src = img.src;
		overlayImg.alt = img.alt || '';
		const hasMultiple = currentGroup.length > 1;
		prevBtn.style.display = hasMultiple ? 'flex' : 'none';
		nextBtn.style.display = hasMultiple ? 'flex' : 'none';
	}

	function openLightbox(group, index) {
		currentGroup = group;
		showIndex(index);
		overlay.classList.add('active');
	}

	function closeLightbox() {
		overlay.classList.remove('active');
		overlayImg.src = '';
		currentGroup = [];
	}

	// Every photo in the same competition card (or the same trophy-cabinet
	// gallery) is one navigable group.
	const galleryGroup = Array.from(document.querySelectorAll('.award-gallery-item img'));
	galleryGroup.forEach((img, i) => {
		img.addEventListener('click', () => openLightbox(galleryGroup, i));
	});

	document.querySelectorAll('.project-image, .award-carousel-track').forEach((container) => {
		const group = Array.from(container.querySelectorAll('img'));
		group.forEach((img, i) => {
			img.addEventListener('click', () => openLightbox(group, i));
		});
	});

	prevBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		showIndex(currentIndex - 1);
	});
	nextBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		showIndex(currentIndex + 1);
	});
	closeBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		closeLightbox();
	});

	overlay.addEventListener('click', closeLightbox);

	document.addEventListener('keydown', (e) => {
		if (!overlay.classList.contains('active')) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowLeft') showIndex(currentIndex - 1);
		if (e.key === 'ArrowRight') showIndex(currentIndex + 1);
	});
});
