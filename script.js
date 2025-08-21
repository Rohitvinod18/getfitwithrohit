document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Animations
    const animatedElements = document.querySelectorAll('.animated-element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Typing Effect Logic
    const trainerBioContainer = document.getElementById('trainer-bio-container');
    const observerTyping = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTypingAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    observerTyping.observe(trainerBioContainer);
    
    function startTypingAnimation() {
        const typingText1 = document.getElementById('typing-text');
        const typingText2 = document.getElementById('typing-text-2');
        const text1 = "I am Rohit, fitness trainer with a deep passion for calisthenics and personalized fitness. My journey began with a simple goal: to help people unlock their full potential and achieve a healthier, stronger body through functional training.";
        const text2 = "I specialize in crafting personalized workout and nutrition plans that are tailored to your unique needs and goals. Whether you're a beginner looking to build a foundation or an athlete aiming to master bodyweight movements, I am here to guide you every step of the way.";

        function typeWriter(element, text, delay = 40, callback) {
            element.innerHTML = '';
            element.classList.add('typing-effect');
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, delay);
                } else {
                    element.classList.remove('typing-effect');
                    if (callback) callback();
                }
            }
            type();
        }

        typeWriter(typingText1, text1, 40, () => {
            setTimeout(() => {
                typeWriter(typingText2, text2);
            }, 1000);
        });
    }

    // Mobile Menu Logic
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu a');
    const openBmiModalMobileButton = document.getElementById('open-bmi-modal-mobile');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Modal Functions
    const contactModal = document.getElementById('contact-modal');
    const getItModal = document.getElementById('get-it-modal');
    const bmiModal = document.getElementById('bmi-modal');
    const workoutModal = document.getElementById('workout-modal');

    function openModal(modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Contact Modal Logic
    const openGetItModalButtons = document.querySelectorAll('.open-get-it-modal');
    const openContactFormButton = document.getElementById('open-contact-form-button');
    const closeGetItModalButton = document.getElementById('close-get-it-modal');
    const closeContactModalButton = document.getElementById('close-modal');
    const contactForm = document.getElementById('contact-form');
    const messageBox = document.getElementById('message-box');

    openGetItModalButtons.forEach(button => {
        button.addEventListener('click', () => openModal(getItModal));
    });

    closeGetItModalButton.addEventListener('click', () => closeModal(getItModal));
    
    openContactFormButton.addEventListener('click', () => {
        closeModal(getItModal);
        openModal(contactModal);
    });
    
    closeContactModalButton.addEventListener('click', () => closeModal(contactModal));
    
    // BMI Modal Logic
    const openBmiModalButton = document.getElementById('open-bmi-modal');
    const closeBmiModalButton = document.getElementById('close-bmi-modal');
    const bmiFormModal = document.getElementById('bmi-form-modal');
    const bmiResultModalDiv = document.getElementById('bmi-result-modal');

    openBmiModalButton.addEventListener('click', () => openModal(bmiModal));
    openBmiModalMobileButton.addEventListener('click', () => {
        openModal(bmiModal);
        mobileMenu.classList.remove('active');
    });

    closeBmiModalButton.addEventListener('click', () => {
        closeModal(bmiModal);
        bmiResultModalDiv.classList.add('hidden');
        bmiFormModal.reset();
    });
    
    bmiFormModal.addEventListener('submit', function(event) {
        event.preventDefault();
        const heightCm = document.getElementById('modal-height').value;
        const weightKg = document.getElementById('modal-weight').value;
        if (heightCm > 0 && weightKg > 0) {
            const heightM = heightCm / 100;
            const bmi = (weightKg / (heightM * heightM)).toFixed(2);
            let category = '';
            let color = '';
            if (bmi < 18.5) {
                category = 'Underweight';
                color = 'text-blue-400';
            } else if (bmi >= 18.5 && bmi < 24.9) {
                category = 'Normal weight';
                color = 'text-green-400';
            } else if (bmi >= 25 && bmi < 29.9) {
                category = 'Overweight';
                color = 'text-yellow-400';
            } else {
                category = 'Obese';
                color = 'text-red-400';
            }
            bmiResultModalDiv.innerHTML = `Your BMI is: <span class="${color}">${bmi}</span><br>Category: <span class="${color}">${category}</span>`;
            bmiResultModalDiv.classList.remove('hidden');
        } else {
            bmiResultModalDiv.innerHTML = `<span class="text-red-400">Please enter valid height and weight.</span>`;
            bmiResultModalDiv.classList.remove('hidden');
        }
    });

    // Workout Demo Modal
    const workoutModalTitle = document.getElementById('workout-modal-title');
    const workoutModalDescription = document.getElementById('workout-modal-description');
    const workoutList = document.getElementById('workout-list');
    const personalizedCard = document.getElementById('personalized-card');
    const calisthenicsCard = document.getElementById('calisthenics-card');
    const closeWorkoutModalButton = document.getElementById('close-workout-modal');
    
    personalizedCard.addEventListener('click', () => {
        const gymWorkout = [
            { title: 'Push Day', exercises: ['Barbell Bench Press', 'Incline Dumbbell Press', 'Military Press', 'Tricep Pushdowns'] },
            { title: 'Pull Day', exercises: ['Pull-ups (weighted if possible)', 'Barbell Rows', 'Lat Pulldowns', 'Hammer Curls'] },
            { title: 'Legs Day', exercises: ['Barbell Squats', 'Romanian Deadlifts', 'Leg Press', 'Calf Raises'] }
        ];
        showWorkoutModal('Personalized Gym Plans', 'Our gym-based plans are designed to maximize muscle growth and strength using a variety of equipment.', gymWorkout);
    });
    
    calisthenicsCard.addEventListener('click', () => {
        const bodyweightWorkout = [
            { title: 'Push Day', exercises: ['Decline Push-ups', 'Dips', 'Explosive Push-ups', 'Pseudo Planche Push-ups'] },
            { title: 'Pull Day', exercises: ['Pull-ups', 'Chin-ups', 'Australian Pull-ups', 'Hanging Leg Raises'] },
            { title: 'Legs Day', exercises: ['Pistol Squats', 'Bulgarian Split Squats', 'Jumping Lunges', 'Sissy Squats'] }
        ];
        showWorkoutModal('Calisthenics Training', 'Master your bodyweight with our functional training programs. Build incredible strength and a lean physique without any gym equipment.', bodyweightWorkout);
    });

    closeWorkoutModalButton.addEventListener('click', () => closeModal(workoutModal));

    function showWorkoutModal(title, description, workoutData) {
        workoutModalTitle.textContent = title;
        workoutModalDescription.textContent = description;
        workoutList.innerHTML = '';
        
        workoutData.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'bg-gray-700/50 p-4 rounded-md';
            const dayTitle = document.createElement('h4');
            dayTitle.className = 'font-bold text-lime-400 text-lg mb-2';
            dayTitle.textContent = day.title;
            dayDiv.appendChild(dayTitle);
            const ul = document.createElement('ul');
            day.exercises.forEach(exercise => {
                const li = document.createElement('li');
                li.textContent = exercise;
                ul.appendChild(li);
            });
            dayDiv.appendChild(ul);
            workoutList.appendChild(dayDiv);
        });
        
        openModal(workoutModal);
    }
    
    // Form Submission Logic
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        messageBox.textContent = 'Submitting your details...';
        messageBox.classList.remove('hidden', 'bg-red-500/20', 'text-red-300');
        messageBox.classList.add('bg-gray-700/20', 'text-gray-300');
        
        const form = event.target;
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            mode: 'no-cors'
        })
        .then(response => {
            messageBox.textContent = 'Thank you! Your details have been submitted. Rohit will contact you shortly.';
            messageBox.classList.remove('bg-gray-700/20', 'text-gray-300');
            messageBox.classList.add('bg-lime-500/20', 'text-lime-300');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            messageBox.textContent = 'An error occurred. Please try again or contact us directly.';
            messageBox.classList.remove('bg-gray-700/20', 'text-gray-300');
            messageBox.classList.add('bg-red-500/20', 'text-red-300');
        });
    });

    // Close modals on outside click
    window.addEventListener('click', (event) => {
        if (event.target === contactModal) closeModal(contactModal);
        if (event.target === getItModal) closeModal(getItModal);
        if (event.target === bmiModal) closeModal(bmiModal);
        if (event.target === workoutModal) closeModal(workoutModal);
    });
});
