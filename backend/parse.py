import json
import re

def parse_course_data(json_data):
    # Extract available seats
    seats_pattern = re.search(r"(\d+) out of (\d+)", json_data["seats"])
    available_seats = int(seats_pattern.group(1)) if seats_pattern else "Unknown"

    # Extract meeting details
    meeting_info = json_data["everything"].split(" , ")
    
    start_time = meeting_info[2] if len(meeting_info) > 2 else "Unknown"
    end_time = meeting_info[3] if len(meeting_info) > 3 else "Unknown"
    meeting_days = meeting_info[6] if len(meeting_info) > 6 else "Unknown"

    return {
        "available_seats": available_seats,
        "start_time": start_time,
        "end_time": end_time,
        "meeting_days": meeting_days
    }

data = {
        "icon": "<span class=\"ui-icon ui-icon-circle-plus ui-opacity\"> </span><span class=\"row_index\" value=0>0</span>",
        "CRN": "44457",
        "subject": "A HI",
        "courseNum": "1113",
        "sectionNum": "001",
        "title": "Understanding Art",
        "professorName": "Palmer, Allison",
        "classType": "Lecture",
        "attendence": "Traditional In-Person",
        "category": "Artistic Forms",
        "term": "Full Term",
        "startEndDate": "Aug 25 - Dec 12",
        "seats": "<span data-failsafe='20 out of 30' class='loading'> </span>",
        "everything": "Aug 25 , Dec 12 , 3:00 pm , 3:50 pm , Fred Jones Art Ctr , 205 , MWF , CLAS",
        "description": "Explanation and analysis of the principles underlying the visual arts. Consideration of formal, historical and other factors in the valuation and enjoyment of painting, sculpture, architecture and utilitarian objects. (F, Sp, Su) [IV-AF] \n",
        "professorName2": "Allison Palmer,  ,  ,  ,  ",
        "waitlist": "<span data-failsafe-waitlist='0 Waiting' class='loading-waitlist'> </span>",
        "finalDate": "Dec 18 , Dec 18 , 4:30 pm , 6:30 pm , Fred Jones Art Ctr , 205 , R , EXAM",
        "repeatable": "Not Repeatable",
        "maxHour": ""
    }

parsed = parse_course_data(data)

print(parsed)