// Smooth scroll for anchor links

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Dynamic payment fields
    const paymentBtns = document.querySelectorAll('.payment-btn');
    const paiementInput = document.getElementById('paiement');
    const paymentFields = document.getElementById('paymentFields');
    const donForm = document.getElementById('donForm');

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
        if (method === 'Credit Card') {
            paymentFields.appendChild(createField('Card number', 'cb_numero', 'text', '1234 5678 9012 3456'));
            paymentFields.appendChild(createField('Cardholder name', 'cb_nom', 'text', 'Name on card'));
            paymentFields.appendChild(createField('Expiration date', 'cb_exp', 'text', 'MM/YY'));
            paymentFields.appendChild(createField('CVC', 'cb_cvc', 'password', '3 digits'));
        } else if (method === 'PayPal') {
            paymentFields.appendChild(createField('PayPal email address', 'paypal_email', 'email', 'email@paypal.com'));
        } else if (method === 'Apple Pay' || method === 'Google Pay') {
            paymentFields.appendChild(createField('Cardholder name', 'apgp_nom', 'text', 'Associated name'));
            paymentFields.appendChild(createField('ID or email', 'apgp_id', 'text', 'ID or email'));
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
        });
    });

    donForm && donForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!paiementInput.value) {
            paiementInput.setCustomValidity('Please select a payment method.');
            paiementInput.reportValidity();
            return;
        } else {
            paiementInput.setCustomValidity('');
        }
        // Redirect to thank you page
        window.location.href = 'merci_en.html';
    });

    // Back to top button (if present)
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
}); 