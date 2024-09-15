// JavaScript to handle modal open and close
document.addEventListener('DOMContentLoaded', function() {
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const signInModal = document.getElementById('signInModal');
    const signUpModal = document.getElementById('signUpModal');
    const closeSignIn = document.getElementById('closeSignIn');
    const closeSignUp = document.getElementById('closeSignUp');

    signInBtn.addEventListener('click', function() {
        signInModal.style.display = 'flex';
    });

    signUpBtn.addEventListener('click', function() {
        signUpModal.style.display = 'flex';
    });

    closeSignIn.addEventListener('click', function() {
        signInModal.style.display = 'none';
    });

    closeSignUp.addEventListener('click', function() {
        signUpModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === signInModal) {
            signInModal.style.display = 'none';
        }
        if (event.target === signUpModal) {
            signUpModal.style.display = 'none';
        }
    });
});
