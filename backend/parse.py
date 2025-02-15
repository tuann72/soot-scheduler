import json
import re

def parse_course_data(json_data):
    # Extract available seats
    seats_pattern = re.search(r"(\d+) out of (\d+)", json_data[12])
    available_seats = int(seats_pattern.group(1)) if seats_pattern else "Unknown"

    # Extract meeting details
    meeting_info = json_data[13].split(" , ")
    
    start_time = meeting_info[2] if len(meeting_info) > 2 else "Unknown"
    end_time = meeting_info[3] if len(meeting_info) > 3 else "Unknown"
    meeting_days = meeting_info[6] if len(meeting_info) > 6 else "Unknown"

    return {
        "available_seats": available_seats,
        "start_time": start_time,
        "end_time": end_time,
        "meeting_days": meeting_days
    }

data = [
        "<span class=\"ui-icon ui-icon-circle-plus ui-opacity\"> </span><span class=\"row_index\" value=0>0</span>",
        "44457",
        "A HI",
        "1113",
        "001",
        "Understanding Art",
        "Palmer, Allison",
        "Lecture",
        "Traditional In-Person",
        "Artistic Forms",
        "Full Term",
        "Aug 25 - Dec 12",
        "<span data-failsafe='20 out of 30' class='loading'> </span>",
        "Aug 25 , Dec 12 , 3:00 pm , 3:50 pm , Fred Jones Art Ctr , 205 , MWF , CLAS",
        "Explanation and analysis of the principles underlying the visual arts. Consideration of formal, historical and other factors in the valuation and enjoyment of painting, sculpture, architecture and utilitarian objects. (F, Sp, Su) [IV-AF] \n",
        "Allison Palmer,  ,  ,  ,  ",
        "<span data-failsafe-waitlist='0 Waiting' class='loading-waitlist'> </span>",
        "Dec 18 , Dec 18 , 4:30 pm , 6:30 pm , Fred Jones Art Ctr , 205 , R , EXAM",
        "Not Repeatable",
        ""
    ]

parsed = parse_course_data(data)

print(parsed)