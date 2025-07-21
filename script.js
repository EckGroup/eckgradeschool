 
        // Show the selected program's courses
        function showProgram(program) {
            // Hide all course sections
            document.querySelectorAll('.course-selection').forEach(section => {
                section.classList.add('hidden');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.program-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show the selected program's courses
            document.getElementById(program + 'Courses').classList.remove('hidden');
            
            // Add active class to the clicked tab
            event.target.classList.add('active');
            
            // Update the radio button selection
            document.querySelector(`input[name="program"][value="${program === 'ib' ? 'IB Curriculum' : program === 'igcse' ? 'IGCSE Programs' : 'A-Level Programs'}"]`).checked = true;
        }
        
        // Submit form to WhatsApp
        function submitForm() {
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const dob = document.getElementById('dob').value;
            const currentSchool = document.getElementById('currentSchool').value;
            const grade = document.getElementById('grade').value;
            const program = document.querySelector('input[name="program"]:checked').value;
            
            // Get selected courses based on program
            let courses = [];
            let otherCourse = '';
            
            if (program === 'IB Curriculum') {
                document.querySelectorAll('input[name="ibCourses"]:checked').forEach(cb => {
                    courses.push(cb.value);
                });
                otherCourse = document.getElementById('ibOther').value;
            } else if (program === 'IGCSE Programs') {
                document.querySelectorAll('input[name="igcseCourses"]:checked').forEach(cb => {
                    courses.push(cb.value);
                });
                otherCourse = document.getElementById('igcseOther').value;
            } else {
                document.querySelectorAll('input[name="alevelCourses"]:checked').forEach(cb => {
                    courses.push(cb.value);
                });
                otherCourse = document.getElementById('alevelOther').value;
            }
            
            const additionalInfo = document.getElementById('additionalInfo').value;
            
            // Validate required fields
            if (!fullName || !email || !phone || !dob || !grade || courses.length === 0) {
                alert('Please fill in all required fields and select at least one course.');
                return;
            }
            
            // Validate course selection based on program
            if (program === 'IB Curriculum' && (courses.length < 3 || courses.length > 6)) {
                alert('For IB Curriculum, please select between 3 to 6 courses.');
                return;
            } else if (program === 'IGCSE Programs' && (courses.length < 5 || courses.length > 10)) {
                alert('For IGCSE Programs, please select between 5 to 10 courses.');
                return;
            } else if (program === 'A-Level Programs' && (courses.length < 3 || courses.length > 4)) {
                alert('For A-Level Programs, please select 3 or 4 courses.');
                return;
            }
            
            // Prepare WhatsApp message
            let message = `New Course Registration:\n\n`;
            message += `*Name:* ${fullName}\n`;
            message += `*Email:* ${email}\n`;
            message += `*Phone:* ${phone}\n`;
            message += `*Date of Birth:* ${dob}\n`;
            message += `*Current School:* ${currentSchool || 'Not provided'}\n`;
            message += `*Grade Level:* ${grade}\n\n`;
            message += `*Program:* ${program}\n`;
            message += `*Selected Courses:* ${courses.join(', ')}\n`;
            if (otherCourse) message += `*Other Course:* ${otherCourse}\n`;
            if (additionalInfo) message += `*Additional Info:* ${additionalInfo}\n`;
            
            // Encode message for WhatsApp URL
            const encodedMessage = encodeURIComponent(message);
            
            // Open WhatsApp with the message
            window.open(`https://wa.me/233574168196?text=${encodedMessage}`, '_blank');
            
            // Show success modal
            document.getElementById('successModal').classList.remove('hidden');
            
            // Reset form
            document.getElementById('registrationForm').reset();
        }
        
        // Close modal
        function closeModal() {
            document.getElementById('successModal').classList.add('hidden');
        }
