import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"; // Import the HoverCard components
  
  // Define the type for the schedules
  type Schedule = {
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
  };
  
  type Schedules = {
    [key: string]: Schedule[];
  };
  
  // Sample course data (schedules)
  const schedules: Schedules = {
    schedule1: [
      {
        available_seats: 20,
        course_no: 'BIO101',
        crn: '11223',
        end_time: '10:00 AM',
        meeting_days: 'Mon, Wed',
        section_no: '01',
        start_time: '8:00 AM',
        subject: 'Biology',
        title: 'Introduction to Biology',
        professor: 'Dr. Lisa Green',
      },
      {
        available_seats: 15,
        course_no: 'CHEM101',
        crn: '33445',
        end_time: '11:30 AM',
        meeting_days: 'Tue, Thu',
        section_no: '02',
        start_time: '9:00 AM',
        subject: 'Chemistry',
        title: 'General Chemistry',
        professor: 'Dr. Mark Brown',
      },
      {
        available_seats: 25,
        course_no: 'PHYS101',
        crn: '22334',
        end_time: '12:30 PM',
        meeting_days: 'Mon, Wed, Fri',
        section_no: '03',
        start_time: '10:00 AM',
        subject: 'Physics',
        title: 'Introduction to Physics',
        professor: 'Dr. Amy White',
      },
      {
        available_seats: 30,
        course_no: 'CS101',
        crn: '55678',
        end_time: '2:00 PM',
        meeting_days: 'Mon, Wed, Fri',
        section_no: '04',
        start_time: '1:00 PM',
        subject: 'Computer Science',
        title: 'Fundamentals of Computing',
        professor: 'Dr. John Smith',
      },
      {
        available_seats: 18,
        course_no: 'ENG101',
        crn: '99876',
        end_time: '3:30 PM',
        meeting_days: 'Tue, Thu',
        section_no: '05',
        start_time: '2:00 PM',
        subject: 'English',
        title: 'Composition I',
        professor: 'Prof. Emily Lee',
      },
    ],
    schedule2: [
      {
        available_seats: 25,
        course_no: 'CS101',
        crn: '45678',
        end_time: '12:00 PM',
        meeting_days: 'Mon, Wed, Fri',
        section_no: '03',
        start_time: '10:00 AM',
        subject: 'Computer Science',
        title: 'Introduction to Computer Science',
        professor: 'Dr. John Doe',
      },
      {
        available_seats: 30,
        course_no: 'MATH201',
        crn: '78901',
        end_time: '1:30 PM',
        meeting_days: 'Mon, Wed',
        section_no: '01',
        start_time: '12:00 PM',
        subject: 'Mathematics',
        title: 'Calculus I',
        professor: 'Dr. Sarah Miller',
      },
      {
        available_seats: 20,
        course_no: 'BIO102',
        crn: '34210',
        end_time: '2:00 PM',
        meeting_days: 'Mon, Wed, Fri',
        section_no: '02',
        start_time: '1:00 PM',
        subject: 'Biology',
        title: 'Biology Lab',
        professor: 'Dr. Lisa Green',
      },
      {
        available_seats: 15,
        course_no: 'CHEM102',
        crn: '34230',
        end_time: '3:30 PM',
        meeting_days: 'Tue, Thu',
        section_no: '06',
        start_time: '2:00 PM',
        subject: 'Chemistry',
        title: 'General Chemistry II',
        professor: 'Dr. Robert Brown',
      },
      {
        available_seats: 10,
        course_no: 'ART101',
        crn: '99812',
        end_time: '5:00 PM',
        meeting_days: 'Mon, Wed',
        section_no: '07',
        start_time: '3:00 PM',
        subject: 'Art',
        title: 'Art Appreciation',
        professor: 'Prof. Ann Taylor',
      },
    ],
  };
  
  export default function Schedules() {
    // Extract all the schedule keys (e.g., 'schedule1', 'schedule2')
    const scheduleKeys = Object.keys(schedules);
  
    return (
      <div className="flex justify-center min-h-screen items-center">
        <Carousel className="w-full max-w-xs h-full ">
          <CarouselContent>
            {scheduleKeys.map((scheduleKey, index) => (
              <CarouselItem key={scheduleKey}>
                <Card className="z-0">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="w-full">
                      <h3 className="text-xl font-semibold mb-4">
                        {scheduleKey.replace('schedule', 'Schedule ')}
                      </h3>
                      <ul className="space-y-4">
                        {schedules[scheduleKey].map((course, courseIndex) => (
                          <li key={course.crn} className="border-b pb-4">
                            {/* HoverCard for each course */}
                            <HoverCard>
                              <HoverCardTrigger className="semi-bold hover:text-blue-500 cursor-pointer">
                              {course.title} ({course.course_no})
                              </HoverCardTrigger>
                              <HoverCardContent className="p-4 bg-white shadow-lg rounded-lg max-w-xs z-10">
                                <p><strong>Professor:</strong> {course.professor}</p>
                                <p><strong>Time:</strong> {course.start_time} - {course.end_time}</p>
                                <p><strong>Meeting Days:</strong> {course.meeting_days}</p>
                                <p><strong>Available Seats:</strong> {course.available_seats}</p>
                              </HoverCardContent>
                            </HoverCard>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }
  