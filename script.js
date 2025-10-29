const navigation = document.querySelector('.navigation');
const highlight = document.querySelector('.highlight');
const items = document.querySelectorAll('.navigation li');


const courseData = {
    'six-month': [
        { title: 'First-Aid', duration: '24 weeks', level: 'Advanced', price: 'R1500' },
        { title: 'Sewing', duration: '24 weeks', level: 'Advanced'  , price: 'R1500' },
        { title: 'LandScaping', duration: '24 weeks', level: 'Advanced', price: 'R1500' },
        { title: 'Life Skills'  , duration: '24 weeks', level: 'Advanced', price: 'R1500' },
   ],
    'six-week': [
        { title: 'Child Minding'  , duration: '6 weeks', level: 'Beginner', price: 'R750' },
        { title: 'Cooking', duration: '6 weeks', level: 'Intermediate', price: 'R750' },
        { title: 'Garden Maintenance', duration: '6 weeks'  , level: 'Beginner', price: 'R750' }
    ]
};

        let currentSlides = { 'six-month': 0, 'six-week': 0 };
        function closeModal() {
            document.getElementById('signInModal').style.display = 'none';
        }



        function nextSlide(courseType) {
            const courses = courseData[courseType];
            currentSlides[courseType] = (currentSlides[courseType] + 1) % courses.length;
            updateCourseDisplay(courseType  );
        }
        function previousSlide(courseType) {
            const courses = courseData[courseType];
            currentSlides[courseType] =   (currentSlides[courseType] - 1 + courses.length) % courses.length;
            updateCourseDisplay(courseType);
        }

        function updateCourseDisplay(courseType) { 

            const course = courseData[courseType][currentSlides[courseType]];
            const card = document.querySelector(`[data-course="${courseType}"]`);
            if (!card) return;

            const title = card.querySelector('.course-title');
            const duration = card.querySelector('.course-duration');
            const button = card.querySelector('.enroll-btn');
            if (title) title.textContent = course.title;
            
            if (duration) duration.textContent = `${course.duration} • ${course.level}`;
            if (button) button.textContent = `Enroll Now - ${course.price}`;

            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 100);
        }

        function enrollCourse(courseName) {
            showLoading();
            setTimeout(() => {
                hideLoading();
                showNotification(`Successfully enrolled in ${courseName}!`);
            }, 2000);
        }

        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        function showLoading() {
            document.getElementById('loading').style.display = 'block';
        }

        function hideLoading() {
            document.getElementById('loading').style.display = 'none';
        }
        
        window.onload = function() {
            
            showLoading();
            setTimeout(() => {
                hideLoading();
                showNotification('Welcome to the Course Platform!');
            }, 1000);
        }


if (highlight && items && items.length > 0) {
    try {
        highlight.style.width = items[0].offsetWidth + 'px';
        highlight.style.left = items[0].offsetLeft + 'px';
        items.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                items.forEach((el) => el.classList.remove('active'));
                item.classList.add('active');
                highlight.style.width = item.offsetWidth + 'px';
                highlight.style.left = item.offsetLeft + 'px';
            });

            item.addEventListener('mouseenter', (e) => {
                if (!item.classList.contains('active')) {
                    highlight.style.width = item.offsetWidth * 0.8 + 'px';
                    highlight.style.left = item.offsetLeft + item.offsetWidth * 0.1 + 'px';
                }
            });
            item.addEventListener('mouseleave', (e) => {
                const activeItem = document.querySelector('.navigation li.active');
                if (activeItem) {
                    highlight.style.width = activeItem.offsetWidth + 'px';
                    highlight.style.left = activeItem.offsetLeft + 'px';
                }
            });
        });

        window.addEventListener('resize', () => {
            const activeItem = document.querySelector('.navigation li.active');
            if (activeItem) {
                highlight.style.width = activeItem.offsetWidth + 'px';
                highlight.style.left = activeItem.offsetLeft + 'px';
            }
        });
    } catch (err) {
        console.warn('Navigation highlight setup failed:', err);
    }
}

        // ---- Fee calculator ------------------------------------------------------
        function calculateDiscount(numberOfCourses) {
            if (numberOfCourses === 1) return 0;
            if (numberOfCourses === 2) return 5;
            if (numberOfCourses === 3) return 10;
            if (numberOfCourses > 3) return 15;
            return 0;
        }

        function calculateQuote() {
            const checkboxes = document.querySelectorAll('input[name="course"]:checked');
            if (!checkboxes || checkboxes.length === 0) {
                alert('Please select at least one course before calculating the fee.');
                return;
            }

            const selectedCoursesArray = [];
            let subtotal = 0;
            checkboxes.forEach(cb => {
                const name = cb.getAttribute('data-name') || cb.id || 'Course';
                const price = parseFloat(cb.value) || 0;
                selectedCoursesArray.push({ name, price });
                subtotal += price;
            });

            const numberOfCourses = selectedCoursesArray.length;
            const discountPercentage = calculateDiscount(numberOfCourses);
            const discountAmount = (subtotal * discountPercentage) / 100;
            const afterDiscount = subtotal - discountAmount;
            const vat = afterDiscount * 0.15;
            const total = afterDiscount + vat;

            // Populate UI
            const selectedCoursesEl = document.getElementById('selectedCourses');
            if (selectedCoursesEl) {
                let html = `<h4>Selected Courses (${numberOfCourses}):</h4><ul>`;
                selectedCoursesArray.forEach(c => html += `<li>${c.name} - R${c.price.toLocaleString()}</li>`);
                html += '</ul>';
                selectedCoursesEl.innerHTML = html;
            }

            const fmt = (v) => v.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            const subtotalEl = document.getElementById('subtotal'); if (subtotalEl) subtotalEl.textContent = `R${fmt(subtotal)}`;
            const afterDiscountEl = document.getElementById('afterDiscount'); if (afterDiscountEl) afterDiscountEl.textContent = `R${fmt(afterDiscount)}`;
            const vatEl = document.getElementById('vat'); if (vatEl) vatEl.textContent = `R${fmt(vat)}`;
            const totalEl = document.getElementById('total'); if (totalEl) totalEl.textContent = `R${fmt(total)}`;

            const discountRow = document.getElementById('discountRow');
            if (discountRow) {
                if (discountPercentage > 0) {
                    discountRow.style.display = 'flex';
                    const discountPercentEl = document.getElementById('discountPercent'); if (discountPercentEl) discountPercentEl.textContent = discountPercentage;
                    const discountAmountEl = document.getElementById('discountAmount'); if (discountAmountEl) discountAmountEl.textContent = `-R${fmt(discountAmount)}`;
                } else {
                    discountRow.style.display = 'none';
                }
            }

            const quoteDisplay = document.getElementById('quoteDisplay');
            if (quoteDisplay) {
                quoteDisplay.style.display = 'block';
                quoteDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        // ---- Safe registration form submit handler --------------------------------
        const registrationForm = document.getElementById('registrationForm');
        if (registrationForm) {
            registrationForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const fullName = (document.getElementById('fullName') || {}).value || '';
                const phoneNumber = (document.getElementById('phoneNumber') || {}).value || '';
                const emailAddress = (document.getElementById('emailAddress') || {}).value || '';
                const checkboxes = document.querySelectorAll('input[name="course"]:checked');

                if (!fullName.trim() || !phoneNumber.trim() || !emailAddress.trim()) {
                    alert('Please fill in all contact details (Name, Phone Number, and Email Address)');
                    return;
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailAddress)) {
                    alert('Please enter a valid email address');
                    return;
                }
                if (!checkboxes || checkboxes.length === 0) {
                    alert('Please select at least one course');
                    return;
                }

                // Build data and log (simulate storage)
                const coursesArray = [];
                let subtotal = 0;
                checkboxes.forEach(cb => {
                    const name = cb.getAttribute('data-name') || cb.id || 'Course';
                    const price = parseFloat(cb.value) || 0;
                    coursesArray.push({ name, price });
                    subtotal += price;
                });
                const numberOfCourses = coursesArray.length;
                const discountPercentage = calculateDiscount(numberOfCourses);
                const discountAmount = (subtotal * discountPercentage) / 100;
                const afterDiscount = subtotal - discountAmount;
                const vat = afterDiscount * 0.15;
                const total = afterDiscount + vat;

                console.log('Customer Registration Data:', {
                    name: fullName,
                    phone: phoneNumber,
                    email: emailAddress,
                    numberOfCourses,
                    courses: coursesArray,
                    discountPercentage,
                    subtotal,
                    discountAmount,
                    vat,
                    total
                });

                alert('Registration submitted — check console for details (this simulates saving).');
            });
        }


