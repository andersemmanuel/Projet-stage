// Menu responsive
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if(navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
  });
}
// Bouton retour en haut de page
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if(window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});
// Message de remerciement sur clic 'Faire un don'
const btnDon = document.querySelector('.btn-don');
if(btnDon) {
  btnDon.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Merci pour votre générosité !');
  });
} 