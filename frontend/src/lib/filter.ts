interface Course {
    available_seats: number;
    course_no: string;
    crn: string;
    end_time: string;
    meeting_days: string;
    section_no: string;
    start_time: string;
    subject: string;
    title: string;
}
  
// Helper function to filter out the courses (i.e., remove the specified courses)
export function filterCoursesByCodes(
    courses: Record<string, Course>, // JSON object, not an array
    keepCourses: string
  ): void {
    // Convert the courses object into an array of courses
    const courseArray = Object.values(courses);
  
    // Clean and prepare the course codes (subject + courseNum combinations)
    const keepCoursesFix = keepCourses.split(',').map(course => course.trim());
    
    courseArray.forEach((course, index) => {
        const cleanedSubject = course.subject.replace(/\s+/g, ''); // Removes all whitespaces
        const courseCode = `${cleanedSubject}${course.course_no}`; // Combine subject and course_no

        if (keepCoursesFix.includes(courseCode)) {
            const courseInfo = [courseCode, course.meeting_days, course.start_time, course.end_time, index]
            console.log(courseInfo);
        }
    })


  
    // Return the filtered list of courses (those that do not match)
    //return filteredCourses;
  }
  
  
  