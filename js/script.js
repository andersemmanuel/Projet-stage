
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if(navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
  });
}
// Bouton retour en haut de page
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
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
}
// Message de remerciement sur clic 'Faire un don'
const btnDon = document.querySelector('.btn-don');
if(btnDon) {
  btnDon.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Merci pour votre générosité !');
  });
}

document.addEventListener('DOMContentLoaded', function() {
    // Gestion dynamique des champs de paiement
    const paymentBtns = document.querySelectorAll('.payment-btn');
    const paiementInput = document.getElementById('paiement');
    const paymentFields = document.getElementById('paymentFields');
    const donForm = document.getElementById('donForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    function clearPaymentFields() {
        paymentFields.innerHTML = '';
        paymentFields.style.display = 'none';
    }

    function createField(label, id, type = 'text', placeholder = '', required = true) {
        const group = document.createElement('div');
        group.className = 'don-form-group';
        const lbl = document.createElement('label');
        lbl.setAttribute('for', id);
        lbl.textContent = label;
        const input = document.createElement('input');
        input.type = type;
        input.id = id;
        input.name = id;
        input.placeholder = placeholder;
        if (required) input.required = true;
        group.appendChild(lbl);
        group.appendChild(input);
        return group;
    }

    function showFieldsFor(method) {
        clearPaymentFields();
        if (method === 'Carte bancaire') {
            paymentFields.appendChild(createField('Numéro de carte', 'cb_numero', 'text', '1234 5678 9012 3456'));
            paymentFields.appendChild(createField('Nom du titulaire', 'cb_nom', 'text', 'Nom sur la carte'));
            paymentFields.appendChild(createField('Date d\'expiration', 'cb_exp', 'text', 'MM/AA'));
            paymentFields.appendChild(createField('CVC', 'cb_cvc', 'password', '3 chiffres'));
        } else if (method === 'PayPal') {
            paymentFields.appendChild(createField('Adresse email PayPal', 'paypal_email', 'email', 'email@paypal.com'));
        } else if (method === 'Apple Pay' || method === 'Google Pay') {
            paymentFields.appendChild(createField('Nom du titulaire', 'apgp_nom', 'text', 'Nom associé'));
            paymentFields.appendChild(createField('Identifiant ou email', 'apgp_id', 'text', 'Identifiant ou email'));
        }
        if (method) paymentFields.style.display = 'flex';
    }

    clearPaymentFields();

    paymentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            paymentBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            const method = this.getAttribute('data-value');
            paiementInput.value = method;
            showFieldsFor(method);
            console.log('Moyen de paiement sélectionné :', method);
        });
    });

    donForm && donForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!paiementInput.value) {
            paiementInput.setCustomValidity('Veuillez choisir un moyen de paiement.');
            paiementInput.reportValidity();
            return;
        } else {
            paiementInput.setCustomValidity('');
        }
        confirmationMessage.style.display = 'block';
        this.reset();
        clearPaymentFields();
        paymentBtns.forEach(b => b.classList.remove('selected'));
        paiementInput.value = '';
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 8000);
    });
}); 