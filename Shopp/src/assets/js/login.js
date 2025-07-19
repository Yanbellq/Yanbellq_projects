import API from "./services/api";


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

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.classList.add(type);
    messageDiv.classList.remove('hidden');

    setTimeout(function() {
        messageDiv.classList.remove(type);
        messageDiv.classList.add('hidden');
    }, 3000);
}
// password: 123@maksTest!

document.addEventListener('DOMContentLoaded', function() {

    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = document.getElementById('emailSignIn').value;
        const passwordInput = document.getElementById('passwordSignIn').value;        

        const signIn = async () => {
            
            try {
                const resp = await API.loginUser({username: emailInput, password: passwordInput})
                console.log(resp);

                if (resp) {
                    showMessage('Успішна авторизація!', 'success');
                    localStorage.setItem('loggedInUser', JSON.stringify({ token: resp.token }));

                    setTimeout(() => {
                        window.location.href = './account.html';
                    }, 1500);
                } else {
                    if (emailInput == '' || passwordInput == '' ) {
                        showMessage('Введіть будь-ласка дані', 'error');
                    } else {
                        showMessage('Невірний email або пароль', 'error');
                    }
                    // window.location.href = './error-404.html';
                }
            } catch (error) {
                showMessage('Вибачте будь-ласка, проблеми на сайті', 'error')
            }
        }

        signIn();
    });




    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = document.getElementById('emailSignUp').value;
        const passwordInput = document.getElementById('passwordSignUp').value; 

        const signUp = async () => {
            try {
                const resp = await API.registerUser({username: emailInput, password: passwordInput})

                if (resp) {
                    showMessage('Успішна реєстрація!', 'success');
                    localStorage.setItem('loggedInUser', JSON.stringify({ token: resp.token }));

                    setTimeout(() => {
                        window.location.href = './account.html';
                    }, 1500);
                } else {
                    if (emailInput == '' || passwordInput == '' ) {
                        showMessage('Введіть будь-ласка дані', 'error');
                    } else {
                        showMessage('Невірний email або пароль', 'error');
                    }
                }

            } catch (error) {
                showMessage('Вибачте будь-ласка, проблеми на сайті', 'error')
            }
        }
        signUp();
    })
});