  const cards = document.querySelectorAll('.fish-card');
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const leftBtn = document.querySelector(".nav.left");
  const rightBtn = document.querySelector(".nav.right");

  let currentIndex = 0;
  const images = [];

  // Zbierz wszystkie zdjęcia i opisy
  cards.forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('h4')?.innerText || '';
    images.push({ src: img.src, alt: img.alt, title });

    // Kliknięcie = otwarcie modala
    card.addEventListener('click', () => {
      currentIndex = index;
      openModal();
    });
  });

  function openModal() {
    const { src, alt, title } = images[currentIndex];
    modal.style.display = "block";
    modalImg.src = src;
    modalImg.alt = alt;
    caption.innerText = title;
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    openModal();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openModal();
  }

  closeBtn.addEventListener('click', closeModal);
  rightBtn.addEventListener('click', showNext);
  leftBtn.addEventListener('click', showPrev);

  // Zamknij modal klikając poza obrazem
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Obsługa klawiatury
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === "block") {
      if (e.key === 'ArrowRight') showNext();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'Escape') closeModal();
    }
  });


  function openModal() {
  const { src, alt, title } = images[currentIndex];
  modal.style.display = "block";
  modalImg.src = src;
  modalImg.alt = alt;
  caption.innerText = title;
  document.body.classList.add('modal-open'); // <-- dodaj klasę do body
}

function closeModal() {
  modal.style.display = "none";
  document.body.classList.remove('modal-open'); // <-- usuń klasę
}