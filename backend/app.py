from flask import Flask, jsonify
from test import fetch_class_data
import json
import re

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    fetched = fetch_class_data(total_records=10814, page_size=100, output_file="data.json")
    data = {}
    for i in range(len(fetched)):
        data[f"Class {i+1}"] = parse_course_data(fetched[i])
    return jsonify(data)

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

if __name__ == '__main__':
    app.run(debug=True)
