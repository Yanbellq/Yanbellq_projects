const supportForm = document.getElementById("supportForm");

document.addEventListener('DOMContentLoaded', function () {
    if (!supportForm) return; // Exit if form doesn't exist

    supportForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let isValid = true;

        isValid = validateField(document.getElementById('name'), (value) => validateName(value, "Name")) && isValid;
        isValid = validateField(document.getElementById('surname'), (value) => validateName(value, "Surname")) && isValid;
        isValid = validateField(document.getElementById('email'), validateEmail) && isValid;
        isValid = validateField(document.getElementById('phone'), validatePhone) && isValid;

        if (isValid) {
            const formData = {
                name: e.target.elements['name'].value,
                surname: e.target.elements['surname'].value,
                email: e.target.elements['email'].value,
                phone: (e.target.elements['region'].value + e.target.elements['phone'].value).replace(/\s/g, ''),
                checkbox: e.target.elements['checkbox'].checked,
                message: e.target.elements['message'].value
            };

            try {
                const response = await fetch('/api/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="_csrf"]').content
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Помилка сервера');
                }

                const result = await response.json();
                // alert(result.message);
                e.target.reset();
            } catch (error) {
                console.error('Error:', error);
                alert(error.message || 'Помилка з\'єднання з сервером');
            }
        }
    });

    
    // Only setup validation for fields that exist
    const fieldsToValidate = [
        { id: 'name', validator: (value) => validateName(value, "Name") },
        { id: 'surname', validator: (value) => validateName(value, "Surname") },
        { id: 'email', validator: validateEmail },
        { id: 'phone', validator: validatePhone }
    ];
    
    fieldsToValidate.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            setupFieldValidation(element, field.validator);
        }
    });
});

// Налаштування валідації поля при втраті фокусу
function setupFieldValidation(field, validator) {
    if (!field || typeof validator !== 'function') return;
    
    field.addEventListener('blur', function () {
        validateField(field, validator);
    });

}

// Валідація поля
function validateField(field, validator) {
    if (!field) return false;
    
    const errorElement = document.getElementById(`${field.id}-error`);
    const { isValid, message } = validator(field.value);
    
    if (isValid) {
        field.classList.add('valid');
        field.classList.remove('invalid');
        errorElement.style.display = 'none';
    } else {
        field.classList.add('invalid');
        field.classList.remove('valid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    return isValid;
}

// Валідатори
function validateName(value, type) {
    if (!value) {
        return { isValid: false, message: `${type} is required` };
    }
    return { isValid: true, message: '' };
}

function validateEmail(value) {
    if (!value) {
        return { isValid: false, message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return { isValid: false, message: 'Please enter a valid email' };
    }
    return { isValid: true, message: '' };
}

function validatePhone(value) {
    if (!value) {
        return { isValid: false, message: 'Phone is required' };
    }
    if (value.length != 9) {
        return { isValid: false, message: 'Please enter a valid phone number' };
    }
    return { isValid: true, message: '' };
}