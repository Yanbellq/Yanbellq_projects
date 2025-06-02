const signIn = document.querySelector('[data-signIn]');
const signInForm = document.querySelector('[data-signInForm]');
const signUp = document.querySelector('[data-signUp]');
const signUpForm = document.querySelector('[data-signUpForm]');
const resetLink = document.querySelector('[data-resetLink]');
const switchActive = document.querySelector('.switch__active');

console.log(switchActive);

if (signIn && signUp && signInForm && signUpForm && resetLink && switchActive) {
    signIn.addEventListener('click', e => {
        const $this = e.currentTarget;

        if(!$this.classList.contains('active')) {
            $this.classList.add('active');
            signUp.classList.remove('active');
            signUpForm.classList.add('disabled');
            signInForm.classList.remove('disabled');
            resetLink.classList.remove('disabled');
            switchActive.removeAttribute('style');
        }
    });

    signUp.addEventListener('click', e => {
        const $this = e.currentTarget;

        if(!$this.classList.contains('active')) {
            $this.classList.add('active');
            signIn.classList.remove('active');
            signInForm.classList.add('disabled');
            signUpForm.classList.remove('disabled');
            resetLink.classList.add('disabled');

            switchActive.style.left = "250px";
        }
    });
}



// -----------------------------------



const messageDiv = document.getElementById('message');

document.addEventListener('DOMContentLoaded', function() {

    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = document.getElementById('emailSignIn').value;
        const passwordInput = document.getElementById('passwordSignIn').value;

        // Завантаження даних користувачів з локального файлу (НЕ РЕКОМЕНДУЄТЬСЯ ДЛЯ РЕАЛЬНИХ ПРОЕКТІВ)
        fetch('users.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.username === emailInput && u.password === passwordInput);

                if (user) {
                    showMessage('Успішна авторизація!', 'success');
                    localStorage.setItem('loggedInUser', JSON.stringify({ username: user.username, name: user.name }));

                    setTimeout(function() {
                        window.location.href = './account.html';
                    }, 2000);
                } else {
                    showMessage('Введіть будь-ласка дані', 'error');

                    if (emailInput !== "" && passwordInput !== "") {
                        window.location.href = './error-404.html';
                    }
                }
            })
            .catch(error => {
                console.error('Помилка завантаження файлу users.json:', error);
                showMessage('Сталася помилка при авторизації.', 'error');
            });
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.classList.add(type);
        messageDiv.classList.remove('hidden');

        setTimeout(function() {
            messageDiv.classList.remove(type);
            messageDiv.classList.add('hidden');
        }, 3000);
    }
});

// console.log(messageDiv.innerHTML);