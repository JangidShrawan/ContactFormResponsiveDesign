// Get the form element
const form = document.getElementById('myForm');

// Form submit event listener
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Clear any existing error messages
    const existingErrMessages = document.querySelectorAll('.err-message');
    existingErrMessages.forEach(error => error.style.display = 'none');

    let isValid = true;

    // Validate required inputs (text and email)
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        const errorMessage = input.parentElement.querySelector('.err-message');

        // Email validation
        if (input.type === 'email') {
            const validationMessage = document.querySelector('.email-address .validation-message');
            if (!validateEmail(input.value)) {
                showError(input, validationMessage);
                isValid = false;
            } else {
                hideError(validationMessage);
            }

            input.addEventListener('input', function() {
                if (validateEmail(input.value)) {
                    hideError(validationMessage);
                }
            });
        } 
        // Text validation
        else {
            if (!input.value.trim()) {
                showError(input, errorMessage);
                isValid = false;
            }

            input.addEventListener('input', function() {
                if (input.value.trim()) {
                    hideError(errorMessage);
                }
            });
        }
    });

    // Validate checkbox (terms and conditions)
    const checkInput = document.querySelector('.terms input');
    const checkErrorMessage = checkInput.parentElement.nextElementSibling;
    if (!checkInput.checked) {
        showError(checkInput, checkErrorMessage);
        isValid = false;
    }

    checkInput.addEventListener('change', function() {
        if (checkInput.checked) {
            hideError(checkErrorMessage);
        }
    });

    // Validate textarea (message field)
    const textareaInput = document.querySelector('.message-field textarea');
    const textareaErrorMessage = textareaInput.nextElementSibling;
    if (!textareaInput.value.trim()) {
        showError(textareaInput, textareaErrorMessage);
        isValid = false;
    }

    textareaInput.addEventListener('input', function() {
        if (textareaInput.value.trim()) {
            hideError(textareaErrorMessage);
        }
    });

    // Validate radio buttons (query type)
    const radioInputs = document.querySelectorAll('input[name="queryType"]');
    const radioChecked = Array.from(radioInputs).some(radio => radio.checked);
    const radioErrorMessage = document.querySelector('.query-type .err-message');
    if (!radioChecked) {
        showError(radioInputs[0], radioErrorMessage);
        isValid = false;
    }

    radioInputs[0].closest('fieldset').addEventListener('change', function() {
        if (Array.from(radioInputs).some(radio => radio.checked)) {
            hideError(radioErrorMessage);
        }
    });

    // Show modal if the form is valid
    const modal = document.querySelector('.modal');
    if (isValid) {
        modal.classList.add('show');
        setTimeout(() => {
            modal.classList.remove('show');
            location.reload();
        }, 5000);
    }
});

// Helper function to show error message
function showError(input, errorMessage) {
    errorMessage.style.display = 'block';
}

// Helper function to hide error message
function hideError(errorMessage) {
    errorMessage.style.display = 'none';
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
