document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset previous error messages and styles
        clearErrors();

        // Validate inputs
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        // If all validations pass
        if (isNameValid && isEmailValid && isMessageValid) {
            // Show success message
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            successMessage.style.display = 'block';

            // Reset form
            form.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });

    function validateName() {
        const nameValue = nameInput.value.trim();

        if (nameValue === '') {
            showError('nameError', 'Name is required');
            nameInput.classList.add('error');
            return false;
        }

        // Check for special characters (optional)
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (specialChars.test(nameValue)) {
            showError('nameError', 'Name should not contain special characters');
            nameInput.classList.add('error');
            return false;
        }

        nameInput.classList.add('valid');
        return true;
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();

        if (emailValue === '') {
            showError('emailError', 'Email is required');
            emailInput.classList.add('error');
            return false;
        }

        if (!emailRegex.test(emailValue)) {
            showError('emailError', 'Please enter a valid email address');
            emailInput.classList.add('error');
            return false;
        }

        emailInput.classList.add('valid');
        return true;
    }

    function validateMessage() {
        const messageValue = messageInput.value.trim();

        if (messageValue === '') {
            showError('messageError', 'Message is required');
            messageInput.classList.add('error');
            return false;
        }

        if (messageValue.length < 10) {
            showError('messageError', 'Message should be at least 10 characters');
            messageInput.classList.add('error');
            return false;
        }

        messageInput.classList.add('valid');
        return true;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function clearErrors() {
        // Clear all error messages
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });

        // Remove error/valid classes
        nameInput.classList.remove('error', 'valid');
        emailInput.classList.remove('error', 'valid');
        messageInput.classList.remove('error', 'valid');

        // Hide success message
        successMessage.style.display = 'none';
    }

    // Optional: Add real-time validation on input change
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
});