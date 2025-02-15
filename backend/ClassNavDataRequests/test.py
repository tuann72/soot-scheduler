import requests
import json

def fetch_class_data(total_records=10814, page_size=100, output_file="data.json"):
    url = "https://classnav.ou.edu/index_ajax.php"
    headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Referer": "https://classnav.ou.edu/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
        "sec-ch-ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
    }

    session = requests.Session()
    main_page_url = "https://classnav.ou.edu/"
    session.get(main_page_url, headers=headers)
    
    all_data = []
    
    # Define the keys for each element in the record.
    # Note: In your desired output you showed an empty key for the 8th value.
    # It's generally better to use a descriptive name.
    # Here I've used "classType" for that field.
    keys = [
        "icon",           # index 0
        "CRN",            # index 1
        "subject",        # index 2
        "courseNum",      # index 3
        "sectionNum",     # index 4
        "title",          # index 5
        "professorName",  # index 6
        "classType",      # index 7 (was empty in your example; renamed to "classType")
        "attendence",     # index 8
        "category",       # index 9
        "term",           # index 10
        "startEndDate",   # index 11
        "seats",          # index 12
        "everything",     # index 13
        "description",    # index 14
        "professorName2", # index 15
        "waitlist",       # index 16
        "finalDate",      # index 17
        "repeatable",     # index 18
        "maxHour"         # index 19
    ]
    
    for start in range(0, total_records, page_size):
        params = {
            "sEcho": "12",
            "iColumns": "18",
            "sColumns": "",
            "iDisplayStart": str(start),
            "iDisplayLength": str(page_size),
            "semester": "202510",
            "subject": "all",
            "available": "true",
            "waitlist": "true",
        }

        response = session.get(url, headers=headers, params=params)
        if response.status_code == 200:
            data = response.json()
            if "aaData" in data and len(data["aaData"]) > 0:
                for record in data["aaData"]:
                    # Zip the keys with the values from the record to create a dictionary.
                    labeled_record = dict(zip(keys, record))
                    all_data.append(labeled_record)
                print(f"Fetched {len(data['aaData'])} records from page {start // page_size + 1}")
            else:
                print(f"No data in page {start // page_size + 1}. Stopping.")
                break
        else:
            print(f"Failed to fetch page {start // page_size + 1}: {response.status_code}")
            break

    print(f"Total records fetched: {len(all_data)}")
    
    # Save to JSON file.
    with open(output_file, "w") as f:
        json.dump(all_data, f, indent=4)
    
    return all_data

if __name__ == '__main__':
    fetch_class_data()
