"use server"
require('dotenv').config();
import OpenAI from 'openai';

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
    professor: string;
}
  
// Helper function to filter out the courses (i.e., remove the specified courses)
export async function filterCoursesByCodes(
    courses: Record<string, Course>, // JSON object, not an array
    keepCourses: string
  ): Promise<void> {

    const courseListForModel: [string, string, string, string, number][] = [];
    // Convert the courses object into an array of courses
    const courseArray = Object.values(courses);
  
    // Clean and prepare the course codes (subject + courseNum combinations)
    const keepCoursesFix = keepCourses.split(',').map(course => course.trim());
    
    courseArray.forEach((course, index) => {
        const cleanedSubject = course.subject.replace(/\s+/g, ''); // Removes all whitespaces
        const courseCode = `${cleanedSubject}${course.course_no}`; // Combine subject and course_no

        if (keepCoursesFix.includes(courseCode) && course.available_seats > 0) {
            courseListForModel.push([courseCode, course.meeting_days, course.start_time, course.end_time, index])
        }
    })

    // CREATE A VARIABLE FOR POST MODEL FILTERING
    // EXAMPLE: modelResults
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not defined in environment variables');
    }

    const openai = new OpenAI({
        apiKey: apiKey,
    });

    const response = await openai.chat.completions.create({
        messages: [{
            role: "system",
            content: `You are a helpful university course planner. The number of hours a course is, is the last digit of the course number
            for example: CS 1021 is 1 hour, CS 1023 is 3 hours, etc. Consider the letters M, T, W, R, F as days of the week respectively.
            I want the schedule to have at most 16 hours and minimum 12 hours. 
            Use this JSON format:
            {
              "schedule": [
                {
                  "semester": "Season Year",
                  "courses": []
                }
              ]
            }`
          }, {
            role: "user",
            content: `Here are my required courses: ${courseListForModel}`
          }],
          model: "gpt-4o",
          response_format: { type: "json_object" }
    });

    const responseText = response.choices[0].message.content;
    if (responseText === null) {
        throw new Error('Response text is null');
    }
    const parsedResponse = JSON.parse(responseText);
    console.log(parsedResponse)
    console.log(courseListForModel);

    // Return the filtered list of courses (those that do not match)
    //return filteredCourses;
  }
  
  
  