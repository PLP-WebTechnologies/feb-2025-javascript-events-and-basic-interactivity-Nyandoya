document.addEventListener('DOMContentLoaded', function() {
    // Event Handling Section
    let clickCount = 0;
    const clickDemo = document.getElementById('clickDemo');
    const clickCountDisplay = document.getElementById('clickCount');
    
    clickDemo.addEventListener('click', function() {
        clickCount++;
        clickCountDisplay.textContent = `Clicked ${clickCount} times`;
        this.style.transform = 'scale(0.95)';
        setTimeout(() => this.style.transform = 'scale(1)', 100);
    });

    const hoverDemo = document.getElementById('hoverDemo');
    hoverDemo.addEventListener('mouseover', function() {
        this.style.transform = 'rotate(5deg)';
        this.textContent = 'You\'re hovering over me!';
    });
    hoverDemo.addEventListener('mouseout', function() {
        this.style.transform = 'rotate(0)';
        this.innerHTML = '<h3>Hover Effect</h3><p>Hover over me!</p>';
    });

    const keypressInfo = document.getElementById('keypressInfo');
    document.addEventListener('keydown', function(e) {
        keypressInfo.textContent = `You pressed: ${e.key} (Key Code: ${e.keyCode})`;
        const keyDemo = document.getElementById('keypressDemo');
        keyDemo.style.backgroundColor = '#c0392b';
        setTimeout(() => keyDemo.style.backgroundColor = '#e74c3c', 100);
    });

    const secretDemo = document.getElementById('secretDemo');
    const secretMessage = document.querySelector('.secret-message');
    let pressTimer;
    secretDemo.addEventListener('dblclick', showSecretMessage);
    secretDemo.addEventListener('mousedown', () => pressTimer = setTimeout(showSecretMessage, 1000));
    secretDemo.addEventListener('mouseup', () => clearTimeout(pressTimer));
    secretDemo.addEventListener('mouseleave', () => clearTimeout(pressTimer));

    function showSecretMessage() {
        secretMessage.style.display = 'block';
        setTimeout(() => secretMessage.style.display = 'none', 2000);
    }

    // Interactive Elements Section
    const colorBtn = document.getElementById('changeColorBtn');
    const colors = ['#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71'];
    let colorIndex = 0;
    colorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed (${colorIndex + 1}/${colors.length})`;
    });

    document.querySelectorAll('#imageGallery img').forEach(img => {
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
            `;
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.maxHeight = '90vh';
            enlargedImg.style.maxWidth = '90vw';
            enlargedImg.style.objectFit = 'contain';
            overlay.addEventListener('click', () => document.body.removeChild(overlay));
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
        });
    });

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(this.dataset.tab).classList.add('active');
        });
    });

    // Form Validation Section
    const form = document.getElementById('demoForm');
    const [nameInput, emailInput, passwordInput] = ['name', 'email', 'password'].map(id => document.getElementById(id));

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateName() && validateEmail() && validatePassword()) {
            alert('Form submitted successfully!');
            form.reset();
            document.querySelectorAll('.success').forEach(el => el.style.display = 'none');
        } else {
            alert('Please fix the errors before submitting.');
        }
    });

    function validateName() {
        const isValid = nameInput.value.trim() !== '';
        document.getElementById('nameError').style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        document.getElementById('emailError').style.display = isValid ? 'none' : 'block';
        document.getElementById('emailSuccess').style.display = isValid ? 'block' : 'none';
        return isValid;
    }

    function validatePassword() {
        const isValid = passwordInput.value.length >= 8;
        document.getElementById('passwordError').style.display = isValid ? 'none' : 'block';
        document.getElementById('passwordSuccess').style.display = isValid ? 'block' : 'none';
        return isValid;
    }
});