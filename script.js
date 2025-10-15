const navigation = document.querySelector('.navigation')
const highlight = document.querySelector('.highlight');
const items = document.querySelectorAll('.navigation li');


        const courseData = {
            'six-month': [
                { title: 'First-Aid', duration: '24 weeks', level: 'Advanced', price: 'R1500' },
                { title: 'Sewing', duration: '24 weeks', level: 'Advanced', price: 'R1500' },
                { title: 'LandScaping', duration: '24 weeks', level: 'Advanced', price: 'R1500' },
                { title: 'Life Skills', duration: '24 weeks', level: 'Advanced', price: 'R1500' }
            ],
            'six-week': [
                { title: 'Child Minding', duration: '6 weeks', level: 'Beginner', price: 'R750' },
                { title: 'Cooking', duration: '6 weeks', level: 'Intermediate', price: 'R750' },
                { title: 'Garden Maintenance', duration: '6 weeks', level: 'Beginner', price: 'R750' }
            ]
        };

        let currentSlides = { 'six-month': 0, 'six-week': 0 };

        function closeModal() {
            document.getElementById('signInModal').style.display = 'none';
        }


        function nextSlide(courseType) {
            const courses = courseData[courseType];
            currentSlides[courseType] = (currentSlides[courseType] + 1) % courses.length;
            updateCourseDisplay(courseType);
        }

        function previousSlide(courseType) {
            const courses = courseData[courseType];
            currentSlides[courseType] = (currentSlides[courseType] - 1 + courses.length) % courses.length;
            updateCourseDisplay(courseType);
        }

        function updateCourseDisplay(courseType) {
            const course = courseData[courseType][currentSlides[courseType]];
            const card = document.querySelector(`[data-course="${courseType}"]`);
            const title = card.querySelector('.course-title');
            const duration = card.querySelector('.course-duration');
            const button = card.querySelector('.enroll-btn');
            
            title.textContent = course.title;
            duration.textContent = `${course.duration} • ${course.level}`;
            button.textContent = `Enroll Now - ${course.price}`;
            
            
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

        
        window.onclick = function(event) {
            const modal = document.getElementById('signInModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        
        window.onload = function() {
            
            showLoading();
            setTimeout(() => {
                hideLoading();
                showNotification('Welcome to the Course Platform!');
            }, 1000);
        }


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
    highlight.style.width = activeItem.offsetWidth + 'px';
    highlight.style.left = activeItem.offsetLeft + 'px';
  });
});

window.addEventListener('resize', () => {
  const activeItem = document.querySelector('.navigation li.active');
  highlight.style.width = activeItem.offsetWidth + 'px';
  highlight.style.left = activeItem.offsetLeft + 'px';
});
