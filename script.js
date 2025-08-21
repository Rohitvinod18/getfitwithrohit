document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButton = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('contact-modal');
    const contactForm = document.getElementById('contact-form');
    const messageBox = document.getElementById('message-box');
    const bmiResultBox = document.getElementById('bmi-result-box');
    const bmiValueSpan = document.getElementById('bmi-value');
    const bmiCategoryP = document.getElementById('bmi-category');

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('mobile-menu-open');
    });

    // Open the modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalOverlay.style.display = 'flex';
        });
    });

    // Close the modal
    closeModalButton.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
        resetForm();
    });

    // Close modal if user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            resetForm();
        }
    });

    // Function to calculate BMI
    function calculateBMI(weight, height) {
        // Height is in cm, convert to meters
        const heightMeters = height / 100;
        // BMI formula: weight (kg) / [height (m)]^2
        const bmi = weight / (heightMeters * heightMeters);
        return bmi.toFixed(1); // Return BMI rounded to 1 decimal place
    }

    // Function to determine BMI category
    function getBMICategory(bmi) {
        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return "Normal weight";
        } else if (bmi >= 25 && bmi <= 29.9) {
            return "Overweight";
        } else {
            return "Obesity";
        }
    }

    // Handle form submission
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Calculate and display BMI
        const weight = parseFloat(data.weight);
        const height = parseFloat(data.height);

        if (weight > 0 && height > 0) {
            const bmi = calculateBMI(weight, height);
            const category = getBMICategory(bmi);

            bmiValueSpan.textContent = bmi;
            bmiCategoryP.textContent = `Category: ${category}`;
            bmiResultBox.classList.remove('hidden');
        } else {
            bmiResultBox.classList.add('hidden');
        }

        // Show a success message
        messageBox.textContent = 'Thank you for your submission! We will get back to you shortly.';
        messageBox.classList.remove('hidden');
        messageBox.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-200');

        // Optional: Send data to a server (not implemented here)
        console.log('Form data:', data);
    });

    // Function to reset form and messages on close
    function resetForm() {
        contactForm.reset();
        messageBox.classList.add('hidden');
        messageBox.classList.remove('bg-green-100', 'text-green-800', 'border', 'border-green-200');
        bmiResultBox.classList.add('hidden');
    }
});
