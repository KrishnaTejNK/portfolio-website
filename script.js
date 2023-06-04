// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add active class to navigation link based on scrolling
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 50;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Toggle navigation menu on mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('show');
});

// Form submission
const form = document.querySelector('#contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate form inputs
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#message');

  let isValid = true;

  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Please enter your name');
    isValid = false;
  } else {
    showSuccess(nameInput);
  }

  if (emailInput.value.trim() === '') {
    showError(emailInput, 'Please enter your email');
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, 'Please enter a valid email');
    isValid = false;
  } else {
    showSuccess(emailInput);
  }

  if (messageInput.value.trim() === '') {
    showError(messageInput, 'Please enter your message');
    isValid = false;
  } else {
    showSuccess(messageInput);
  }

  if (isValid) {
    // Perform form submission or AJAX request
    form.reset();
    alert('Thank you for your message!');
  }
});

function showError(input, message) {
  const formControl = input.parentElement;
  const errorText = formControl.querySelector('.error-text');
  formControl.classList.add('error');
  errorText.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
