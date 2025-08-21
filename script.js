document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
            }
        });
    });

    // Modal functionality
    const modalOverlay = document.getElementById('contact-modal');
    const closeModalButton = document.getElementById('close-modal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const contactForm = document.getElementById('contact-form');
    const messageBox = document.getElementById('message-box');

    // Function to show the modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalOverlay.classList.add('show');
        });
    });

    // Function to hide the modal
    closeModalButton.addEventListener('click', () => {
        modalOverlay.classList.remove('show');
        messageBox.classList.add('hidden');
    });

    // Close modal when clicking outside the content
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('show');
            messageBox.classList.add('hidden');
        }
    });

    // Handle form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Log the data to the console
        console.log('Submitted Form Data:', data);
        
        // Show a success message
        messageBox.textContent = 'Thank you! Your details have been submitted. I will get in touch with you shortly.';
        messageBox.classList.remove('hidden');
        messageBox.classList.add('bg-green-700', 'text-white');
        
        // Reset the form after submission
        contactForm.reset();
    });
});